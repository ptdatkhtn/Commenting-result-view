import  axios from 'axios'
import { getSessionToken, getCsrfToken} from "@sangre-fp/connectors/session"

const baseUrl = process.env.REACT_APP_VOTING_BASE_URL_API
async function httpRequest(baseUrl, method, path, payload = null) {
  return axios({
      method,
      url: `${baseUrl}/${path}`,
      headers: {
          'X-CSRF-Token': getCsrfToken(),
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getSessionToken()}`
      },
      withCredentials: true,
      data: payload || null
  })
}

export const likeApi = {
    //ThumbUp 
    //get radar phenomenon comment vote for current user
    getLike: async (gid, rid, pid, cid) => {
        return await httpRequest(baseUrl, 'GET', `voting/${gid}/radar/${rid}/phenomenon/${pid}/comment/${cid}/user`)
    },

    //get all radar phenomenon comment votes
    getLikes: async (gid, rid, pid, cid) => {
        return await httpRequest(baseUrl, 'GET', `voting/${gid}/radar/${rid}/phenomenon/${pid}/comment/${cid}`)
    },

    //vote on radar phenomenon comment as current user
    addLike: async (gid, rid, pid, cid, payload) => {
        return await httpRequest(baseUrl, 'POST', `voting/${gid}/radar/${rid}/phenomenon/${pid}/comment/${cid}`, payload)
    },

    //get radar phenomenon comment vote by PhenId
    getLikesByPhenId: async (gid, rid, pid) => {
        return await httpRequest(baseUrl, 'GET', `voting/${gid}/radar/${rid}/phenomenon/${pid}/comment}`)
    },

}