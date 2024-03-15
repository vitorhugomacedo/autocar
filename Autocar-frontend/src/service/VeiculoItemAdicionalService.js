import { globals } from '../main.js'

export default class VeiculoItemAdicionalService {
  get = async (idVeiculo) => {

    return await globals.$axios.get(`VeiculoItemAdicional/${idVeiculo}`)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }

  save = async (body) => {

    return await globals.$axios.post('VeiculoItemAdicional', body)
      .then(res => {
        const response = res.data;
        const data = response.data;

        return data
      })
  }
}
