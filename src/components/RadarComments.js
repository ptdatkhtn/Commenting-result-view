import React, { useState, useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import iconUndefined from './icon-phenomenon-undefined.svg'
import iconFp from './watermark-fp-white.png'
import { getRadar, getPhenomenaTypes } from '@sangre-fp/connectors/drupal-api';
import radarDataApi from '@sangre-fp/connectors/radar-data-api';
import {getPhenomena} from '../helpers/phenomenonFetcher'
import {commentingApi} from '../helpers/commentingFetcher'
import { getUserId } from '@sangre-fp/connectors/session'
import {
  getRadarPhenomena
} from '@sangre-fp/connectors/phenomena-api'
import {
  Container,
  PanelHeader,
  CommentLabel,
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
      
    return [phenonmena, group]
  }
  

  
  const {data: getDataFromConnectors} = useSWR( radarId ? [ 'getDataFromConnectors', radarId ] : null, (url, node_id) => multiFetchersRadars(node_id) )
  const {data: getAllCommentsByRadarId} = useSWR( !!getDataFromConnectors?.length && getDataFromConnectors[1] ? ['getAllCommentsByRadarId', JSON.stringify(getDataFromConnectors[1]) , radarId] : null, async(url, group, radarId) => {
    const res = await commentingApi.getAllComments( group, radarId)
    return res.data
  })

  const phenResults = React.useMemo( () => {
    if (getAllCommentsByRadarId?.length > 0) {
      // added new property if the phen has comment
      return !!getDataFromConnectors?.length && !!getDataFromConnectors[0].length > 0 && getDataFromConnectors[0].map(phe => {
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

            if(phe.cmt === undefined) phe['cmt'] = {}
            phe.cmt[`${cmt['section']}`] = cmt
          }
        })
        return phe
      })
    } else 
        return []
  }, [radarId, getAllCommentsByRadarId])

  // const { refreshInterval, mutate, cache, ...restConfig } = useSWRConfig()
    
  const [state, setState] = useState(INIT_STATE)
  const { showSummary, showComment } = state

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

  console.log('radarList...', radarList)
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

  const renderPhenomenonItem = (item) => {
    const { id, title, content, oppComments, thrComments, actComments, type, metaState, metaSector } = item

    const renderSubComments = (data, index) => {
      const { author, comment, updatedAt, voted } = data
      return (
        <MessageContainer key={index}>
          <MessageInfo>
            {author}
            <MessageInfoDate>{updatedAt}</MessageInfoDate>
            <MessageVotingIcon><span className={`material-icons ${voted ? 'voted' : 'not-voted'}`}>thumb_up</span></MessageVotingIcon>
          </MessageInfo>
          <MessageBody>{comment}</MessageBody>
        </MessageContainer>
      )
    }

    const getIcon = () => {
      // eslint-disable-next-line jsx-a11y/alt-text
      if (type === undefined) return <img className='icon-issue' src={iconUndefined} />
      // if (type.includes('watermark-fp')) return <span className={`icon-issue ${type}`}><img src={iconFp}/></span>

      return <span className={`icon-issue ${type}`} />
    }

    return (
      <PhenomenonItem key={id}>
        <ItemHeader onClick={() => handleClickItemHeader(item)}>
          <ItemHeaderTitle>
            {item?.content?.short_title || item?.content?.title}
          </ItemHeaderTitle>
          <PhenomenonMeta className='phenom-meta'>
            {metaSector && (
              <MetaSector>{metaSector}</MetaSector>
            )}
            <MetaState>{getIcon()}{metaState}</MetaState>
          </PhenomenonMeta>
          {!!showSummary && (
            <PhenomenonIngres className='phenom-meta'>
              <p>{content}</p>
            </PhenomenonIngres>
          )}
        </ItemHeader>
        {oppComments && oppComments.length > 0 && (
          <ItemContent>
            <MessageTopicContent>
              <MessageTopicHeader>Opportunities</MessageTopicHeader>
              {oppComments.map(renderSubComments)}
            </MessageTopicContent>
          </ItemContent>
        )}
        {thrComments && thrComments.length > 0 && (
          <ItemContent>
            <MessageTopicContent>
              <MessageTopicHeader>Threats</MessageTopicHeader>
              {thrComments.map(renderSubComments)}
            </MessageTopicContent>
          </ItemContent>
        )}
        {actComments && actComments.length > 0 && (
          <ItemContent>
            <MessageTopicContent>
              <MessageTopicHeader>Actions</MessageTopicHeader>
              {actComments.map(renderSubComments)}
            </MessageTopicContent>
          </ItemContent>
        )}
      </PhenomenonItem>
    )
  }

  return (
    <Container>
      <PanelHeader>
        <CommentLabel>Comments</CommentLabel>
        <div className="actions">
          <a className="btn btn-outline-secondary btn-sm" >
            <span className="af-custom-share"></span>Share
          </a>
        </div>
      </PanelHeader>
      <RadarFilter>
        <input type="checkbox" id="commented" name="vehicommentedcle1" value="commented" onChange={handleChangeCommented} />
        <label htmlFor="commented">Show only commented</label>

        <input type="checkbox" id="summary" name="summary" value="summary" onChange={handleChangeSummary} />
        <label htmlFor="summary">Show summaries</label>
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