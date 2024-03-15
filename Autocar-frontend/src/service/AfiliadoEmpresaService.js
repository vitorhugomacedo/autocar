import { globals } from '../main.js'

export default class AfiliadoEmpresaService {
  getAll = async () => {

    return await globals.$axios.get('AfiliadoEmpresa')
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  get = async (id) => {

    return await globals.$axios.get(`AfiliadoEmpresa/${id}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  create = async (body) => {

    return await globals.$axios.post('AfiliadoEmpresa', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  update = async (body) => {

    return await globals.$axios.put('AfiliadoEmpresa', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }
}
