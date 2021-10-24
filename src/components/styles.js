import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 2rem;
`

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6rem;
`

export const CommentLabel = styled.h2`
  font-size: 2.2rem;
  margin: 0 4rem 2.4rem 0;
`

export const RadarFilter = styled.div`

`

export const PhenomenonListHeader = styled.div`
  font-size: 1.3rem;
  margin-top: 0.5rem;
  background-color: #dbdbdb;
  display: flex;
  font-style: italic;
  padding: 1rem 0 1.5rem 1rem;
`

export const PhenomenonList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const PhenomenonItem = styled.li`
  margin: 1px 0 0;
`

export const PhenomenonMeta = styled.div`
  display: flex;
  padding: .5rem 0 1rem;
  .icon-issue {
    margin: 0 .5rem 0 0;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
  }
  .icon-issue.rising:before {
    background-color: #00ca8d;
  }
  .icon-issue.wildcard:before {
    background-color: #e95757;
  }
  .icon-issue.cooling:before, .icon-issue.weakening:before {
    background-color: #0098ff;
  }
  .icon-issue.weaksignal:before {
    background-color: #a8a8a8;
  }
  .icon-issue.summary:before {
    background-color: #a8a8a8;
  }
  .icon-issue.undefined:before {
    background-color: transparent;
    background-image: url(icon-phenomenon-undefined.svg);
    background-size: 12px 12px;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .icon-issue.watermark-fp:after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(watermark-fp-white.png);
    background-size: 1.2rem 1.2rem;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: .8;
  }
  .icon-issue:before {
    display: inline-block;
    content: 'o';
    border-radius: 50%;
    background-color: #aeeccb;
    line-height: 1;
    text-align: center;
    color: transparent;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 1.2rem;
    height: 1.2rem;
  }
`

export const MetaSector = styled.div`
  width: 45%;
  padding-left: 1.5rem;
  font-size: 1.3rem;
`

export const MetaState = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  padding-left: 1.5rem;
  font-size: 1.3rem;
`
export const ItemHeaderTitle = styled.h2`
  padding: 1.5rem 1.5rem 1rem;
  margin: 0;
  font-size: 2rem;
`

export const PhenomenonIngres = styled.div`
  padding: 0 1.5rem 1rem;
  font-size: 1.3rem;
  > p {
    margin-bottom: 1rem;
  }
`

export const ItemHeader = styled.div`
  background-color: #f3f3f3;
  cursor: pointer;
  :hover h2, :hover .phenom-meta {
    color: #006998;
  }
`

export const ItemContent = styled.div`
  &&{
    background-color: white;
    padding: 0 15px;
    border-bottom: 1px solid #f3f3f3;
  }
`

export const MessageTopicContent = styled.div`

`
export const MessageTopicHeader = styled.p`
  background-color: transparent;
  font-size: 1.6rem;
  padding: 1.5rem 0 1rem;
  line-height: 1.6rem;
  margin: 0;
  font-weight: 700;
`
export const MessageContainer = styled.div`
  padding: 0;
  margin: 0;
  border: none;
`
export const MessageInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-weight: 700;
  font-size: 1.3rem;
`
export const MessageVotingIcon = styled.div`
  margin-left: 1rem;
  border-left: 1px solid #000;
  padding-left: 1rem;
  height: 20px;
  display: inline-block;
  cursor: pointer;
  && {
    .voted {
      color: black;
      opacity: 0.7;
    }
    .not-voted {
      color: grey;
      opacity: 1;
    }
    .material-icons {
      pointer-events: all;
      font-size: 2rem;
    }
    :hover span {
      color: black;
      opacity: 0.7;
    }
  }
`
export const MessageInfoDate = styled.span`
  color: #666;
  font-weight: 400;
  margin-left: .5rem;
`
export const MessageBody = styled.p`
  color: #333;
  padding-bottom: 1rem;
  margin: .5rem 0 1rem 0;
  font-size: 1.3rem;
`
