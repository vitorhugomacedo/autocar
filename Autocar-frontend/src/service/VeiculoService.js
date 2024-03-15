import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class VeiculoService {
  getOptions = async () => {

    return await globals.$axios.get('Veiculo/options')
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  getAll = async (filter) => {

    return await globals.$axios.get(`Veiculo?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`Veiculo/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('Veiculo', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('Veiculo', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  delete = async (body) => {

    await globals.$axios.delete('Veiculo', { data: body } )
  }
}
