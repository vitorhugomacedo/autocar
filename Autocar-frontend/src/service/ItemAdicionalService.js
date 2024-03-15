import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class ItemAdicionalService {
  getOptions = async () => {

    return await globals.$axios.get('ItemAdicional/options')
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  getAll = async (filter) => {

    return await globals.$axios.get(`ItemAdicional?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`ItemAdicional/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('ItemAdicional', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('ItemAdicional', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  delete = async (body) => {

    await globals.$axios.delete('ItemAdicional', { data: body } )
  }
}
