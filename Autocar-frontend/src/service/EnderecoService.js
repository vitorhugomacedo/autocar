import { globals } from '../main.js'

export default class EnderecoService {
  buscaCEP = async (cep) => {

    return await globals.$axios.get(`https://viacep.com.br/ws/${cep}/json`)
      .then(res => {
        const response = res.data;

        return response;
      })
      .catch(err => {
        console.log(err.response.data.Message)
      })
  }
}
