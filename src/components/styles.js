import styled from 'styled-components'
import * as tokens from "@sangre-fp/css-framework/tokens/fp-design-tokens"

export const Container = styled.div`
  margin-bottom: 20px;
  font-family: ${tokens.FontFamilySansSerif}
`

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const CommentLabel = styled.h2`
  font-size: 22px;
  margin: 0 40px 24px 0;
`

export const RadarFilter = styled.div`
  margin-bottom: 20px;

`

export const PhenomenonListHeader = styled.div`
  font-size: 13px;
  margin-top: 5px;
  background-color: #dbdbdb;
  display: flex;
  font-style: italic;
  padding: 10px 0 15px 0;
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
  padding: 5px 0 10px;
  font-weight: 400;
  .icon-issue {
    margin: 0 5px 0 0;
    width: 12px;
    height: 12px;
    display: flex;
  }
  
  .icon-issue:before {
    display: inline-block;
    content: 'o';
    border-radius: 50%;
    line-height: 1;
    text-align: center;
    color: transparent;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 12px;
    height: 12px;
  }
`

export const MetaSector = styled.div`
  width: 45%;
  padding-left: 15px;
  font-size: 12px;
`

export const MetaState = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  padding-left: 15px;
  font-size: 12px;
`
export const ItemHeaderTitle = styled.h2`
  padding: 15px 15px 10px;
  margin: 0;
  font-size: 20px;
`

export const PhenomenonIngres = styled.div`
  padding: 0 15px 10px;
  font-size: 13px;
  > p {
    margin-bottom: 10px;
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
  font-size: 16px;
  padding: 15px 0 10px;
  line-height: 16px;
  margin: 0;
  font-weight: 700;
`
export const MessageContainer = styled.div`
  font-family: ${tokens.FontFamilySansSerif};
  padding: 0;
  margin: 0;
  border: none;
  padding-left: 30px;
`
export const MessageInfo = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
  align-items: center;
  font-weight: 700;
  font-size: 13px;
`
export const MessageVotingIcon = styled.div`
  margin-left: 10px;
  border-left: 1px solid #000;
  padding-left: 10px;
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
      font-size: 20px;
    }
    :hover span {
      color: black;
      opacity: 0.7;
    }
  }
`
export const MessageInfoDate = styled.span`
  color: #666;
  font-size: 13px;
  font-weight: 400;
  margin-left: 5px;
`
export const MessageBody = styled.p`
  color: #333;
  // padding-bottom: 10px;
  margin: 1px 0 10px 0;
  font-size: 13px;
  max-width: 70%;
`

export const EditButton = styled.img`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`