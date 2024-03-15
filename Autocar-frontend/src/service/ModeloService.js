import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class ModeloService {
  getOptions = async (filter) => {

    return await globals.$axios.get(`Modelo/options?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  getAll = async (filter) => {

    return await globals.$axios.get(`Modelo?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`Modelo/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('Modelo', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('Modelo', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  delete = async (body) => {

    await globals.$axios.delete('Modelo', { data: body } )
  }
}
