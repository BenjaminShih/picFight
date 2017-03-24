import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './app.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(VueResource)
Vue.use(iView)

var app = new Vue({
	el: '#app',
	components: {
		App: App
	},
})