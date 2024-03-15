import { globals } from '../main.js'

export default class PerfilUsuarioModuloService {

  getAll = async (id) => {

    return await globals.$axios.get(`PerfilUsuarioModulo/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  save = async (body) => {

    return await globals.$axios.post('PerfilUsuarioModulo', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }
}
