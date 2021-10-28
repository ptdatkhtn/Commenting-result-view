import styled from 'styled-components'
import * as tokens from "@sangre-fp/css-framework/tokens/fp-design-tokens"

export const Container = styled.div`
  margin-bottom: 2rem;
  font-family: ${tokens.FontFamilySansSerif}
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
  margin-bottom: 2rem;

`

export const PhenomenonListHeader = styled.div`
  font-size: 1.3rem;
  margin-top: 0.5rem;
  background-color: #dbdbdb;
  display: flex;
  font-style: italic;
  padding: 1rem 0 1.5rem 0;
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
  font-weight: 400;
  .icon-issue {
    margin: 0 .5rem 0 0;
    width: 1.2rem;
    height: 1.2rem;
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
  font-family: ${tokens.FontFamilySansSerif};
  padding: 0;
  margin: 0;
  border: none;
  padding-left: 2rem;
`
export const MessageInfo = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
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
  font-size: 1.4rem;
  font-weight: 450;
  margin-left: .5rem;
`
export const MessageBody = styled.p`
  color: #333;
  // padding-bottom: 1rem;
  margin: 0.1rem 0 1rem 0;
  font-size: 1.3rem;
`

export const EditButton = styled.img`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`