import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import iView from 'iview'
import routes from './routes'
import 'iview/dist/styles/iview.css'
import '../assets/css/base.styl'
import '../plugins'

Vue.use(VueRouter)
Vue.use(iView)

const router = new VueRouter({
	mode: 'history',
	routes
})

var app = new Vue({
	router,
	el: '#app',
	components: {
		App: App
	},
})