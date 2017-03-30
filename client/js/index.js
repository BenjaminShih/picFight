import Vue from 'vue'
import App from './app.vue'
import 'iview/dist/styles/iview.css'
import '../assets/css/base.styl'
import '../plugins'
import router from '../plugins/vue-router'


var app = new Vue({
	router,
	el: '#app',
	components: {
		App: App
	},
})