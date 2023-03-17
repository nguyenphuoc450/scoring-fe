const KEY_MATCHS = 'matchs'

export default {
	state: {
		matchs: JSON.parse(localStorage.getItem(KEY_MATCHS)) || []
	},
	getters: {
		getMatchs: (state) => {
			return state.matchs
		},
		getMatchById: (state) => (id) => {
			return state.matchs.find((match) => match.id === id)
		}
	},
	actions: {
		addNewMatch({ commit }, payload) {
			const object = {
				data: payload,
				type: 'add'
			}
			commit('setMatchs', object)
		},
		updateMatchById({ commit }, payload) {
			const object = {
				data: payload,
				type: 'update'
			}
			commit('setMatchs', object)
		},
		removeMatchById({ commit }, payload) {
			const object = {
				data: { id: payload },
				type: 'remove'
			}
			commit('setMatchs', object)
		}
	},
	mutations: {
		setMatchs(state, payload) {
			const { data, type } = payload
			let newMatchs = [...state.matchs]

			switch (type) {
				case 'add':
					newMatchs.push(data)
					break

				case 'update':
					newMatchs = newMatchs.map((match) => {
						if (match.id === data.id) {
							return data
						} else {
							return match
						}
					})
					break

				case 'remove':
					newMatchs = newMatchs.filter((match) => match.id !== data.id)
					break
			}
			state.matchs = newMatchs
			localStorage.setItem(KEY_MATCHS, JSON.stringify(newMatchs))
		}
	}
}
