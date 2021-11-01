import React from "react";
import { Modal, paddingModalStyles, confirmDialogModalStyles } from '@sangre-fp/ui'
import { requestTranslation } from '@sangre-fp/i18n'
import styled, { createGlobalStyle } from 'styled-components'
import {commentingApi} from '../helpers/commentingFetcher'
import { useSWRConfig } from 'swr'
import DeleteConfirmationModal from './DeleteConfirmationModal'

const GlobalStyle = createGlobalStyle`
  .ReactModal__Overlay--after-open {
    background-color: rgba(0,0,0,.77)!important;
    z-index: 100;
  }
  .ReactModal__Content__Wrapper {
    position: relative;
    background-color: rgb(255, 255, 255);
    font-size: 1.6rem;
    // width: 70%;
  }
  .form-control{
    font-size: 1.6rem;
  }
  .btn-close-modal {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(0, 105, 152);
    position: absolute;
    top: -15px;
    right: -15px;
    color: rgb(255, 255, 255);
    line-height: 30px;
    vertical-align: middle;
    text-align: center;
  }

  .btn-close-modal .material-icons {
    font-size: 20px;
    display: inline-block;
    line-height: inherit;
  }
`

const MAXCHARS = 1000
const EditCommentModal = ({
  isOpenEditCommentingModal,
  isCloseEditCommentingModal,
  onClosemodal,
  comment_id,
  isCmtIdIsEditing,
  data,
  getAllCommentsByRadarId,
  getDataFromConnectors,
  radarId,
  userId,
  functionFromRadatComment,
}) => {
  const { mutate } = useSWRConfig()
  const isOpenModal = React.useMemo(() => (comment_id === isCmtIdIsEditing) , [isCmtIdIsEditing])
  const [valueInput, setValueInput] = React.useState(data?.comment_text)
  const [remainingChars, setRemainingChars] = React.useState(MAXCHARS - (+data.comment_text.length))

  const checRemainingCharsInput = (value) => {
    var textAreaValue = +value.length;
    var charactersLeft = MAXCHARS - textAreaValue;
    return Number(charactersLeft)
  }
  
  const handleChangeInput = (e) => {
    const tempInputValue = e.target.value
    const remainingChars = checRemainingCharsInput(tempInputValue)
    setRemainingChars(() => remainingChars)
    setValueInput(() => tempInputValue)
  }
  const passingValueToRadarComments= (value) => {
    functionFromRadatComment(value)
  }

  const handleSave = async() => {
        const arrayDataClone = [].concat([data])
        // here find all the items that are not it the arr1
        const temp = getAllCommentsByRadarId.filter(obj1 => !arrayDataClone.some(obj2 => obj1.comment_id === obj2.comment_id))
        // then just concat it
        // arr1 = [...temp, ...arr2]
        const newData = {
          comment_id: data.comment_id,
          comment_name: data.comment_name,
          comment_source: data.comment_source,
          comment_text: valueInput,
          created_timestamp: data.created_timestamp,
          entity_uri: data.entity_uri,
          isAuthor: data.isAuthor,
          phenId: data.phenId,
          section: data.section,
          uid: data.uid,
          updated_timestamp: data.updated_timestamp,
          user_name: data.user_name
        }
        const arr1 = [...temp, 
          newData
        ]

        mutate(['getAllCommentsByRadarId', JSON.stringify(getDataFromConnectors[1]) , radarId, userId], 
          arr1, false)
        const groupIdEditing = data?.entity_uri.split('/')[1]
        const radarIdEditing = data?.entity_uri.split('/')[3]
        const phenIdIdEditing = data?.entity_uri.split('/')[5]
        const sectionNameIdEditing = data?.entity_uri.split('/')[6]

        // gid, radarId, pid, section, payload
        await commentingApi.upsertComment(
          groupIdEditing, 
          radarIdEditing,
          phenIdIdEditing,
          sectionNameIdEditing,
          {
            // "text": "Nana 456" + abc,
            "text": valueInput
          }
        )

        mutate(['getAllCommentsByRadarId', JSON.stringify(getDataFromConnectors[1]) , radarId, userId])
        
        passingValueToRadarComments(true)
        onClosemodal()
  }

  const handleClose = () => {
    setValueInput(() => data?.comment_text)
  }

  const handleCloseModal = () => {
    handleClose()
    onClosemodal()
    setRemainingChars(MAXCHARS - (+data.comment_text.length))
  }

  const [isConfirmModalOpened, setIsConfirmModalOpened] = React.useState(false)
  const handleRemoveComment = () => {
    setIsConfirmModalOpened(true)
  }

  const handleCloseConfirmModal = (value) => {
    setIsConfirmModalOpened(value)
  }

  return (
    <>
      <GlobalStyle />
      {isOpenModal && isOpenEditCommentingModal && (
        <Modal
          isOpen={isOpenModal}
          onRequestClose={handleCloseModal}
          style={paddingModalStyles}
          ariaHideApp={false}
        >
           <div className="modal-form-sections">
            <div className="modal-form-section modal-form-header">
              <h3 style={{fontSize:'1.8rem', color:'121212'}}>Edit comment</h3>
            </div>
            <div className="modal-form-section" style={{paddingTop: 0}}>
              <div className="form-group">
                <textarea
                  onChange={handleChangeInput} 
                  maxlength="1000" type="text" className="form-control" id='comment_textarea' value={valueInput} placeholder={'Message *'}
                  style={{fontSize:'1.3rem', color:'121212', width: '100%', height: 'fit-content', minHeight: '36rem'}}
                  />
                  <label htmlFor="example1" style={{fontSize:'1.2rem', color:'#000', marginBottom: 0}}>{remainingChars} characters remaining</label>
              </div>
            </div>
    
          </div>
          <div className="modal-form-section modal-form-actions" style={{display: 'flex', justifyContent: 'space-between', paddingTop: 0}}>
            <div>
              <DeleteConfirmationModal 
                handleCloseConfirmModal={handleCloseConfirmModal}
                isConfirmModalOpened={isConfirmModalOpened}
                data={data}
                handleCloseModal={handleCloseModal}
                radarId={radarId}
                />
              <button type="button" class="btn btn-lg btn-plain-gray" onClick={handleRemoveComment} style={{paddingLeft: 0}}>REMOVE COMMENT</button>
            </div>
            <div>
              <button type="button" class="btn btn-lg btn-plain-gray" onClick={handleCloseModal}>Cancel</button>
              <button type="button" className="btn btn-lg btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

const CanvasContainer = styled.canvas`
  border: 1px solid #979797;
`
const ButtonModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 18px;
`
const ModalContent = styled.div`
  padding: 12px 30px;
`
const EditButton = styled.img`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`
const ModalTitle = styled.h3`
  color: #121212;
  font-size: 20px;
  margin: 0;
  margin-bottom: 24px;
`
const ModalInputHint = styled.div`
  color: #121212;
  font-weight: 400;
  font-size: 14px;
  // margin: 24px 0;
  margin-top: 10px;
`
const ModalInputValue = styled.input`
  width: 100%;
  height: 44px;
  border: 1px solid #bababa;
  box-sizing: border-box;
  padding: 12px;
`

export default EditCommentModal;
