import axios from 'axios'

axios.install = (Vue) => {
	Vue.prototype.$axios = axios
}

export default axios