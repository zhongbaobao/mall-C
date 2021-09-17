import Axios from 'axios';
import baseURL, {
    URLs
} from './URLS';

const appkey = 'zhongbao_1628656348457';
const request = Axios.create({
    baseURL,
    params: {
        appkey
    }
})
request.interceptors.response.use((value) => value.data)

const getSideList = (type) => request.get(
    URLs.getSideBar, {
        params: {
            type
        }
    }
)

const getGoodList = (type, page, size, sort = 'all') => request.get(
    URLs.getGoodList, {
        params: {
            type,
            page,
            size,
            sort
        }
    }
)

const likeSearch = (value) => request.get(
    URLs.lickSearch, {
        params: {
            likeValue: value
        }
    }
)

const search = (type, page, size) => request.get(
    URLs.search, {
        params: {
            type,
            page,
            size
        }
    }
)

const getGoodsByIds = (value) => request.get(
    URLs.getGoodsByIds,{
        params:{
            value
        }
    }
)

export default {
    getSideList,
    getGoodList,
    likeSearch,
    search,
    getGoodsByIds
}