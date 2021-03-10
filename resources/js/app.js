require('./bootstrap');

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'
import store from './store';

Vue.prototype.$eventBus = new Vue(); // Global event bus
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Components
Vue.component('main-view', 		require('./components/MainView.vue').default);
Vue.component('register-issue', require('./components/RegisterIssue.vue').default);
Vue.component('game-table', 	require('./components/GameTable.vue').default);
Vue.component('game-stats', 	require('./components/GameStats.vue').default);
Vue.component('public-chat', 	require('./components/PublicChat.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store
});
