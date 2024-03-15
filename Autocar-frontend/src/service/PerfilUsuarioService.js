import { globals } from '../main.js'
import UrlService from './UrlService.js'

export default class PerfilUsuarioService {
  getOptions = async () => {

    return await globals.$axios.get(`PerfilUsuario/options`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  getAll = async (filter) => {
    return await globals.$axios.get(`PerfilUsuario?${new UrlService().convertToQueryString(filter)}`)
      .then(res => {
        const response = res.data;
        const data = response.data;
        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`PerfilUsuario/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('PerfilUsuario', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('PerfilUsuario', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  delete = async (body) => {

    await globals.$axios.delete('PerfilUsuario', { data: body } )
  }
}
