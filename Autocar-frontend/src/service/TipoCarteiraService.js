import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class TipoCarteiraService {
  getOptions = async () => {

    return await globals.$axios.get('TipoCarteira/options')
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }
  
  getAll = async (filter) => {

    return await globals.$axios.get(`TipoCarteira?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`TipoCarteira/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('TipoCarteira', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('TipoCarteira', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  delete = async (body) => {

    await globals.$axios.delete('TipoCarteira', { data: body } )
  }
}
