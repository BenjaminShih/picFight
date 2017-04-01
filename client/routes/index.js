import layout from '../views/layout.vue'
import error from '../views/error.vue'
import sign from '../views/sign.vue'
const routes = [
	{
		path: '/',
		component: layout,
	},
	{
		path: '/sign',
		component: sign,
	},
	// 匹配不到上述的任何路由，就返回一个页面提示用户页面不存在
	{
		path: '*',
		component: error,
	}
]

export default routes