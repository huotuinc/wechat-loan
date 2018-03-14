import request from '@/utils/request'

const fake = {
	actions: {
		getFakes() {
			return new Promise((resolve, reject) => {
				request({
					url: '/api/fake',
					method: 'get',
				})
					.then(res => {
						resolve(res)
					})
					.catch(err => {
						reject(err)
					})
			})
		}
	}
}

export default fake 