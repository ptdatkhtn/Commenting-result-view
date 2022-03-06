import React, { useState, useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { getRadar, getPhenomenaTypes } from '@sangre-fp/connectors/drupal-api';
import radarDataApi from '@sangre-fp/connectors/radar-data-api';
import {getPhenomena} from '../helpers/phenomenonFetcher'
import {commentingApi} from '../helpers/commentingFetcher'
import { getUserId } from '@sangre-fp/connectors/session'
import {likeApi} from '../helpers/likeFetcher'
import styled from "styled-components/macro";
import * as tokens from "@sangre-fp/css-framework/tokens/fp-design-tokens"
import edit2 from './edit2.svg'
import {EditButton} from './styles'
import EditCommentModal from './EditCommentModal'
import ThumbUp from './Thumbs/ThumbUp'

import {
  Container,
  RadarFilter,
  PhenomenonList,
  ItemContent,
  ItemHeaderTitle,
  PhenomenonListHeader,
  PhenomenonItem,
  PhenomenonMeta,
  MetaSector,
  MetaState,
  ItemHeader,
  PhenomenonIngres,
  MessageTopicContent,
  MessageTopicHeader,
  MessageContainer,
  MessageInfo,
  MessageInfoDate,
  MessageBody,
  MessageVotingIcon
} from './styles'

const INIT_STATE = {
  showSummary: false,
  showComment: false
}
const RadarComments = React.memo(function RadarComments ({dataSource, onClickHeader, onClickVote, radarId}) {
  const multiFetchersRadars = async (radarId) => {
    const [getRadar_radarDataApi, getRadar_drupal_api] = await Promise.all([
      radarDataApi.getRadar(radarId),
      getRadar(radarId)
    ])

    const phenomenaIds = !!getRadar_radarDataApi?.data?.phenomena.length && getRadar_radarDataApi?.data?.phenomena.map(p => {
      return p.id
    })
    const group  = 
       getRadar_drupal_api?.group?.id

    const [getPhenomena_helpers, getPhenomenaTypes_drupal_api] = await Promise.all([
          getPhenomena({'phenomena': phenomenaIds, undefined, groups: [0, group], page: 0, size: phenomenaIds?.length || 10}),
          getPhenomenaTypes(group || 0)
        ])

        let phenonmena = []
        /* eslint-disable */
        getPhenomena_helpers?.result.map((phenonmenon) => {
          /* eslint-disable */
          getPhenomenaTypes_drupal_api?.map((type) => {
              if (String(phenonmenon?.content?.type) === String(type?.id)) {
                phenonmenon['content-type-alias'] = type.alias
                phenonmenon['content-type-title'] = type.title
                /* eslint-disable */
                if (String(phenonmenon?.content?.type).includes('fp:doc-types')) {
                    const nameCustomType = String(phenonmenon?.content?.type).split('/')[3]
                    phenonmenon['color'] = String(type?.style?.color)
                } else {
                    phenonmenon['color'] = 'none'
                }
                phenonmena?.push(phenonmenon)
              }
          })
      })

      !!getRadar_radarDataApi?.data.phenomena.length && getRadar_radarDataApi?.data.phenomena
        .map((phen) => {
          phenonmena.map((phe => {
            if(phen.id === phe.id) {
              phe['sectorId'] = phen['sectorId']
            }
          }))
          
        })

      !!phenonmena?.length && phenonmena.map(phenomenon => {
        let iconClassName = ''
        let backgroundColor = ''
        if(String(phenomenon?.['color']) === 'none'){
          if(phenomenon?.['content-type-alias'] === 'rising'){
            iconClassName = 'rising'
          } 
          else if(phenomenon?.['content-type-alias'] === 'weaksignal'){
            iconClassName = 'weaksignal'
          }
          else if (phenomenon?.['content-type-alias'] === 'summary'){
            iconClassName = 'summary'
          }
          else if (phenomenon?.['content-type-alias'] === 'cooling'){
            iconClassName = 'cooling'
          }
          else if (phenomenon?.['content-type-alias'] === 'wildcard'){
            iconClassName = 'wildcard'
          }
          else {
            iconClassName = 'undefined'
          }
        } else {
          iconClassName = 'undefined'
          backgroundColor = phenomenon?.['color']
        }

        phenomenon['iconClassName'] = iconClassName
        phenomenon['backgroundColor'] = backgroundColor

        getRadar_radarDataApi?.data.sectors
          .map((sector) => {
            if(sector.id === phenomenon.sectorId) {
              phenomenon['sector_title'] = sector.title
            }
          })
      })
    return [phenonmena, group]
  }
  
  const userId = getUserId()

  const {data: getDataFromConnectors} 
    = useSWR( (radarId && userId) 
      ? [ 'getDataFromConnectors', radarId, userId ] : null, 
        (url, node_id) => multiFetchersRadars(node_id),
        // { refreshInterval: 4000 }
        // {
        //   // compare: (a, b) => {
        //   //   return (a === b)
        //   // },
        //   // serialize: true
        // }
    )

  const {data: getAllCommentsByRadarId} 
    = useSWR( (!!getDataFromConnectors?.length && getDataFromConnectors[1] && userId) 
      ? ['getAllCommentsByRadarId', JSON.stringify(getDataFromConnectors[1]) , radarId, userId] : null, 
        async(url, group, radarId) => {
      const res = await commentingApi.getAllComments(group, radarId)
      return res.data
    },
    // { refreshInterval: 4000 }
    // {
    // //   compare: (a, b) => {
    // //     return (a === b)
    // //   },
    //   // serialize: true
    // }
  )

  const [isEditedCmt, setIsEditedCmt] = React.useState(false)

  const phenResults = React.useMemo( () => {
    // const arrayPhenonDataFromConnectors = 
    const getDataFromConnectorsClone = getDataFromConnectors && getDataFromConnectors[0] && Array.from(getDataFromConnectors[0])
    if (getAllCommentsByRadarId?.length > 0) {
      // added new property if the phen has comment
      return !!getDataFromConnectorsClone?.length && !!getDataFromConnectorsClone.length > 0 && getDataFromConnectorsClone.map(phe => {
        // phe.cmt = null

        if ( isEditedCmt ) {
          phe.cmt = null
        }
        getAllCommentsByRadarId?.length > 0 && getAllCommentsByRadarId.map(cmt => {
          cmt['phenId'] = cmt['entity_uri'].split('/')[5]
          if (String(phe.id) === String(cmt['phenId'])) {
            cmt['section'] = cmt['entity_uri'].split('/')[6]
            // check if the cmt is this current user or not
            if (getUserId().toString() === cmt.uid.toString()) {
              cmt['isAuthor'] = true
            } else {
              cmt['isAuthor'] = false
            }

            if(phe.cmt === undefined || phe.cmt === null) 
              phe['cmt'] = {}

            if (phe.cmt[`${cmt['section']}`] === undefined
                  || phe.cmt[`${cmt['section']}`] === null) {
                    phe.cmt[`${cmt['section']}`] = []
                    phe.cmt[`${cmt['section']}`].push(cmt)
            }
            else {
              if (!phe.cmt[`${cmt['section']}`].some( ph_cmt => ph_cmt['comment_id'] === cmt['comment_id'])) {
                phe.cmt[`${cmt['section']}`].push(cmt)
              }
            }
          }
        })
        setIsEditedCmt(false)
        return phe
      })
    } else 
        return []
  }, [radarId, getAllCommentsByRadarId])

  // const { refreshInterval, mutate, cache, ...restConfig } = useSWRConfig()
    
  const [state, setState] = useState(INIT_STATE)
  const { showSummary, showComment } = state
  const [ isOpenEditCommentingModal, setIsOpenEditCommentingModal] = useState(false)
  const [ commentIdIsEditing, setCommentIdIsEditing] = useState(null)

  const radarList = useMemo(() => {
    if (!showComment) return phenResults.sort((a,b) => {
      return (a?.content['short_title'] ? a?.content['short_title'] : a.content.title)
          .localeCompare((b?.content['short_title'] ? b?.content['short_title'] : b?.content.title))
    })

    return !!phenResults?.length && phenResults.filter(item => item?.cmt)
      .sort((a,b) => {
        return (a?.content['short_title'] ? a?.content['short_title'] : a.content.title)
          .localeCompare((b?.content['short_title'] ? b?.content['short_title'] : b?.content.title))
      })
  }, [showComment, phenResults])

  const handleChangeCommented = (event) => {
    const checked = event.target.checked
    setState(prevState => ({ ...prevState, showComment: +checked }))
  }

  const handleChangeSummary = (event) => {
    const checked = event.target.checked
    setState(prevState => ({ ...prevState, showSummary: +checked }))
  }

  const handleClickItemHeader = (data) => {
    onClickHeader && onClickHeader(data)
  }

  const functionFromRadatComment = (value) => {
    setIsEditedCmt(value)
  }

  const renderPhenomenonItem = (item) => {
    
    const { id } = item

    const renderSubComments = (data, index) => {
      const { user_name: author, comment, 
        updated_timestamp: updatedAt, voted } 
        = data[1]
      
        // improve with fetching the votes of all comments of the phen by only 1 api,
        // instead of using such apis in Thumb component to fetch current users' vote comments and 
        // votes comments of other users ( all vote comments) 
        // data tra ve dang nay:
        const a = {
          "myVotes": [
              {
                  "entityUri": "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84560",
                  "up": true
              },
              {
                  "entityUri": "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84561",
                  "up": true
              },
              {
                  "entityUri": "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84562",
                  "up": true
              },
              {
                  "entityUri": "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84563",
                  "up": true
              },
              {
                  "entityUri": "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84564",
                  "up": true
              }
            ],
            "allVotes": [
                {
                    "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84560": {
                        "plus_votes": 1,
                        "minus_votes": 0,
                        "sum": 1
                    }
                },
                {
                    "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84562": {
                        "plus_votes": 1,
                        "minus_votes": 0,
                        "sum": 1
                    }
                },
                {
                    "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84563": {
                        "plus_votes": 1,
                        "minus_votes": 0,
                        "sum": 1
                    }
                },
                {
                    "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84561": {
                        "plus_votes": 1,
                        "minus_votes": 0,
                        "sum": 1
                    }
                },
                {
                    "/290/radar/195080/phenomenon/c4ad9b29-6d99-465d-b68e-315c90015e66/comment/84564": {
                        "plus_votes": 1,
                        "minus_votes": 0,
                        "sum": 1
                    }
                }
            ]
        }
      // const phenId = !!data?.length && data[0]?.phenId
      // const groupId = !!data?.length && data[0]?.entity_uri.split('/')[1]
      
      // const getLikesByPhenId = await likeApi.getLikesByPhenId(groupId, radarId, phenId)
      // console.log('getLikesByPhenId', getLikesByPhenId)
      const onClosemodal = () => {
        setIsOpenEditCommentingModal(false)
      }

      const onEditing = async (data) => {
        setCommentIdIsEditing(data.comment_id)
        setIsOpenEditCommentingModal(true)
      }
      
      return (
        <>
          <MessageTopicHeader>{data[0]}</MessageTopicHeader>

          <MessageContainer key={index}>
            
            {
              data && data[1].length > 0 && data[1].map ( cmt_data => {
                const {updated_timestamp: updatedAt, user_name, isAuthor, comment_text} = cmt_data
                const convert2HumunDate = (new Date(+updatedAt * 1000)).toString().split(' ')
                console.log('cmt_data', cmt_data )
                const gid = cmt_data?.entity_uri.split('/')[1]
                console.log('gid...', gid )
                return (
                  <>
                  <EditCommentModal
                    key={cmt_data?.comment_id}
                    comment_id={cmt_data.comment_id}
                    isCmtIdIsEditing={commentIdIsEditing}
                    isOpenEditCommentingModal={isOpenEditCommentingModal}
                    isCloseEditCommentingModal={!isOpenEditCommentingModal}
                    onClosemodal={onClosemodal}
                    data={cmt_data}
                    getAllCommentsByRadarId={getAllCommentsByRadarId}
                    getDataFromConnectors={getDataFromConnectors}
                    radarId={radarId}
                    userId={userId}
                    functionFromRadatComment={functionFromRadatComment}
                    // onRequestClose={onClosemodal}
                  />
                    <MessageInfo>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{fontSize: '13px', width: 'fit-content', minWidth: '50px', maxWidth: '60%'}}> {user_name}</div>
                        <MessageInfoDate>{convert2HumunDate[2] + "." + new Date(+updatedAt * 1000).toLocaleDateString().split('/')[1] + "." + convert2HumunDate[3] + " " + convert2HumunDate[4]}</MessageInfoDate>
                        <MessageVotingIcon>
                          <ThumbUp 
                            view={'thumb_up_results'}
                            gid={gid}
                            rid={radarId}
                            pid={cmt_data.phenId}
                            cid={cmt_data.comment_id}
                            size={'24'}
                            isLike={false}
                            />
                        </MessageVotingIcon>
                      </div>
                      {
                        isAuthor && (
                          <div style={{marginLeft: 'auto', marginRight: '60px'}} onClick={() => onEditing(cmt_data)}>
                            <EditButton src={edit2}/>
                          </div>
                        )
                      }
                    </MessageInfo>
                    {
                      comment_text && <MessageBody>{comment_text}</MessageBody>
                    }
                  </>
                )
              })
              
            }
          </MessageContainer>
        </>
      )
    }

    return (
      <PhenomenonItem key={id}>
        <ItemHeader onClick={() => handleClickItemHeader(item)}>
          <ItemHeaderTitle>
            {item?.content?.short_title || item?.content?.title}
          </ItemHeaderTitle>
          
          <PhenomenonMeta className='phenom-meta'>
            {item['sector_title'] && (
              <MetaSector style={{fontSize: '13px'}}>{item['sector_title']}</MetaSector>
            )}
            <MetaState style={{fontSize: '13px'}}>
              <RatingItemHeader className= {`left icon-issue ${item.iconClassName}`}
              // data-href={getPhenomenonUrl(radar?.id, phenomenon)}
                backgroundColor={item.backgroundColor}>
              </RatingItemHeader>
              <TypePhen style={{marginBottom: '6px'}}>
                {item['content-type-title']}
              </TypePhen>
            </MetaState>
          </PhenomenonMeta>
          {!!showSummary && (
            <PhenomenonIngres className='phenom-meta'>
              <div dangerouslySetInnerHTML={{ __html: item?.content.summary }} />
            </PhenomenonIngres>
          )}
        </ItemHeader>
        {item?.cmt && (
          <ItemContent>
            <MessageTopicContent>
              {
                Object.entries(item?.cmt && item.cmt).length > 0 && Object.entries(item?.cmt && item.cmt)
                  .map(renderSubComments)
              }
            </MessageTopicContent>
          </ItemContent>
        )}
      </PhenomenonItem>
    )
  }

  return (
    <Container>

      <RadarFilter>
        <div className="custom-control custom-checkbox" style={{display: 'inline-block', marginRight: '30px'}}>
          <input type="checkbox" id="commented" name="vehicommentedcle1" value="commented" className="custom-control-input" onChange={handleChangeCommented} />
          <label htmlFor="commented" className="custom-control-label" style={{fontWeight: 400, fontSize: '13px', paddingTop: '2px', paddingLeft: '6px'}}>Show only commented</label>
        </div>
        
        <div className="custom-control custom-checkbox" style={{display: 'inline-block'}}>
          <input type="checkbox" id="summary" name="summary" value="summary" onChange={handleChangeSummary} className="custom-control-input"  />
          <label htmlFor="summary" className="custom-control-label" style={{fontWeight: 400, fontSize: '13px', paddingTop: '2px', paddingLeft: '6px'}}>Show summaries</label>
        </div>
       
      </RadarFilter>
      <PhenomenonListHeader>
        <MetaSector>Phenomenon</MetaSector>
        <MetaState>Type</MetaState>
      </PhenomenonListHeader>
      <PhenomenonList>
        {radarList?.length > 0 && radarList.map(renderPhenomenonItem)}
      </PhenomenonList>
    </Container>
  )
})

export default RadarComments

export const RatingItemHeader = styled.div`
    font-size: ${tokens.FontSize14};
    min-height: 25px;
    padding-left: 26px !important;
    width: 99%;
    word-wrap: break-word;
    // width: 410px;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;

    &:before {
      position: absolute;
      left: 0;
      top: 3px;
      background:${props => props.backgroundColor} !important;
    }
`
export const TypePhen = styled.p`

`