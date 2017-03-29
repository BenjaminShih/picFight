import layout from './layout.vue'
import error from './error.vue'
const routes = [
	{
		path: '/',
		component: layout,
	},
	// 匹配不到上述的任何路由，就返回一个页面提示用户页面不存在
	{
		path: '*',
		component: error,
	}
]

export default routes