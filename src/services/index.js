import axios from 'axios'
import store from '../store'

const api = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-type': 'application/json'
	}
})
api.interceptors.request.use(
	(config) => {
		const token = store.getters.getUser?.token

		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token
		}
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

export default api
