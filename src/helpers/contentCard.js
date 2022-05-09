import {
    PUBLIC_URL
} from '../env'


export const getPhenomenonUrl = (radarId = false, phenomenon, hideEdit = false) => {
    const { group, id } = phenomenon
    const hasGroup = phenomenon.hasOwnProperty('group')
    const groupUrl = hasGroup ? `group=${group}` : ''

    if (!radarId) {
        return `${PUBLIC_URL}/fp-phenomena/${id}${groupUrl.length ? `/?${groupUrl}` : ''}`
    }

    // eslint-disable-next-line
    return `${PUBLIC_URL}/node/${radarId}?issue=${id}&map_id=${radarId}&source_position=right&source_page=radar-view${groupUrl.length ? `&${groupUrl}` : ''}${hideEdit ? '&hideEdit=true' : ''}`
}
