import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3040'

export const getTreeList = () => {
  return axios.get('/getTreeList')
}