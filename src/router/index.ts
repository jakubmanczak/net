import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Homepage from '../views/Homepage.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Homepage',
		component: Homepage,
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
	},
	{
		path: '/blog',
		name: 'blog',
		component: () => import('../views/Blog.vue'),
	},
	{
		path: '/projects',
		name: 'Projects',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/Projects.vue'),
	},
	{
		path: '/config',
		name: 'Config',
		component: () => import('../views/Config.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
