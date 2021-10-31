import React from "react";
import { Modal, paddingModalStyles, confirmDialogModalStyles } from '@sangre-fp/ui'
import { requestTranslation } from '@sangre-fp/i18n'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  .ReactModal__Overlay--after-open {
    background-color: rgba(0,0,0,.77)!important;
    z-index: 100;
  }
  .ReactModal__Content__Wrapper {
    position: relative;
    background-color: rgb(255, 255, 255);
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

const EditCommentModal = ({
  isOpenEditCommentingModal,
  isCloseEditCommentingModal,
  onClosemodal
}) => {
  return (
    <>
      <GlobalStyle />
      {isOpenEditCommentingModal && (
        <Modal
          isOpen={isOpenEditCommentingModal}
          onRequestClose={onClosemodal}
          style={confirmDialogModalStyles}
          ariaHideApp={false}
        >
           <div className="modal-form-sections">
    <div className="modal-form-section modal-form-header">
      <h2>Share the radar</h2>
    </div>
    <div className="modal-form-section">
      <h3>Section title</h3>
      <div className="form-group">
        <label htmlFor="example1">Label</label>
        <input type="text" className="form-control" id="example1" />
      </div>
      <div className="form-group">
        <label htmlFor="example12">Label</label>
        <input type="text" className="form-control" id="example12" />
      </div>
    </div>
    <div className="modal-form-section">
      <h3>Section title</h3>
      <div className="form-group">
        <p>You can also use columns</p>
        <div className="row">
          <div className="col-6">
            <input type="text" className="form-control" id="example2" placeholder="Placeholder..."/>
          </div>
          <div className="col-6">
            <input type="text" className="form-control" id="example3" placeholder="Placeholder..."/>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-form-section">
      <h3>Section title</h3>
      <div className="form-group">
        <label htmlFor="example4" className="sr-only">Url to copy</label>
        <input type="text" className="form-control" id="example4" value=""/>
        <p className="description">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  </div>
  <div className="modal-form-section modal-form-actions">
    <button type="button" class="btn btn-lg btn-plain-gray">Cancel</button>
    <button type="button" className="btn btn-lg btn-primary">Close</button>
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
