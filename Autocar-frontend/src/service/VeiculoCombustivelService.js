import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class VeiculoCombustivelService {
  getOptions = async (filter) => {

    return await globals.$axios.get(`VeiculoCombustivel/options?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  getAll = async (filter) => {

    return await globals.$axios.get(`VeiculoCombustivel?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`VeiculoCombustivel/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('VeiculoCombustivel', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('VeiculoCombustivel', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  delete = async (body) => {

    await globals.$axios.delete('VeiculoCombustivel', { data: body } )
  }
}
