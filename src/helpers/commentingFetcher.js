import  axios from 'axios'
import { getSessionToken, getCsrfToken} from "@sangre-fp/connectors/session"

const baseUrl = process.env.REACT_APP_COMMENTING_API_URL
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

export const commentingApi = {
    //get all votes from all phenomenon by radarId
    getAllComments: async (gid, radarId) => {
        return await httpRequest(baseUrl, 'GET', `commenting/${gid}/radar/${radarId}`)

    },

    //add hidden phenomennon of radar
    upsertComment: async (gid, radarId, pid, section, payload) => {
        return await httpRequest(baseUrl, 'POST', `commenting/${gid}/radar/${radarId}/phenomenon/${pid}/${section}`, payload)
    },

    //get rating by phenomenon id 
    getRatingByPhenomenonId: async (gid, radarId, pid) => {
        return await httpRequest(baseUrl, 'GET', `rating/${gid}/radar/${radarId}/phenomenon/${pid}/`)

    },

    //delete all votes from all phenomenon by radarId
    deleteAllRatings: async (gid, radarId) => {
        return await httpRequest(baseUrl, 'DELETE', `rating/${gid}/radar/${radarId}/phenomenon`)
    },

    //delete all votes from all phenomenon by radarId
    getAllHiddenRatings : async (gid, radarId) => {
        return await httpRequest(baseUrl, 'GET', `meta/rating/${gid}/radar/${radarId}/phenomenon/`)
    },
    //add hidden phenomennon of radar
    addHiddenPhenomenaRatings: async (gid, radarId, payload) => {
        return await httpRequest(baseUrl, 'POST', `meta/rating/${gid}/radar/${radarId}/phenomenon/`, payload)
    },

    //Rating
    //get avg radar phenomenon rating for current user
    getRatingsCurrentUser: async (gid, radarId, pid) => {
        return await httpRequest(baseUrl, 'GET', `rating/${gid}/radar/${radarId}/phenomenon/${pid}/user`)
    },

    getRatingsCurrentUserOnly1Api: async (gid, radarId) => {
        return await httpRequest(baseUrl, 'GET', `rating/${gid}/radar/${radarId}/user`)
      },

    getFlipAxisAfterSaved : async (gid, radarId) => {
        return await httpRequest(baseUrl, 'GET', `meta/rating/${gid}/radar/${radarId}/flipAxisAfterSaved/`)
    },
}