import { globals } from '../main.js'

export default class LoginService {
  authenticate = async (email, password) => {

    await globals.$axios.post('auth/login', { login: email, senha: password })
      .then(res => {
        const response = res.data;
        const data = response.data;

        localStorage.setItem('auth', JSON.stringify(data))
      })
      .catch(err => {
        console.log(err.response.data.Message)
      })
  }
}
