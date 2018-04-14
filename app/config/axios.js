import axios from 'axios'
import SERVER_URL from './serverUrl'

const setupAxios = () => axios.defaults.baseURL = SERVER_URL + '/api/'

export default setupAxios