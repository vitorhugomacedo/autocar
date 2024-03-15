import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class TipoVeiculoService {
  getOptions = async () => {

    return await globals.$axios.get('TipoVeiculo/options')
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  getAll = async (filter) => {

    return await globals.$axios.get(`TipoVeiculo?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`TipoVeiculo/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {
    debugger;
    return await globals.$axios.post('TipoVeiculo', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('TipoVeiculo', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  delete = async (body) => {

    await globals.$axios.delete('TipoVeiculo', { data: body } )
  }
}
