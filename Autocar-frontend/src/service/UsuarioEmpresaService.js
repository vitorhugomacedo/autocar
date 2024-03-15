import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class UsuarioEmpresaService {
  getAll = async (filter) => {
    return await globals.$axios.get(`UsuarioEmpresa?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;
        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`UsuarioEmpresa/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('UsuarioEmpresa', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('UsuarioEmpresa', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }
}
