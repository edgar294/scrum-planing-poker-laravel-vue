import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
        user: {},
        titulo: 'titulo de muestra'

	},
	getters: {
		getUserId(state){
			return state.user.id
		}
	},
	mutations: {
        setUser: function (state, payload) {
            state.user = payload.user;
        }
    }
});