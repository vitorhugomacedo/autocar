import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class ClienteService {
  getAll = async (filter) => {
    return await globals.$axios.get(`Cliente?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;
        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`Cliente/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('Cliente', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('Cliente', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }
}
