import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Redirecting from '../views/Redirecting.vue';
import NotFound from '../views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/steam',
		name: 'Steam',
		component: Redirecting,
		redirect: () => {
			window.location.replace('https://steamcommunity.com/id/jakubmanczak');
			return '/steam';
		},
	},
	{
		path: '/github',
		name: 'GitHub',
		alias: '/gh',
		component: Redirecting,
		redirect: () => {
			window.location.replace('https://github.com/jakubmanczak');
			return '/github';
		},
	},
	{
		path: '/anilist',
		name: 'AniList',
		alias: '/al',
		component: Redirecting,
		redirect: () => {
			window.location.replace('https://anilist.co/user/j4mesen');
			return '/anilist';
		},
	},
	{
		path: '/facebook',
		name: 'Facebook',
		alias: '/fb',
		component: Redirecting,
		redirect: () => {
			window.location.replace('https://facebook.com/manczakjakub');
			return '/facebook';
		},
	},
	{
		path: '/messenger',
		name: 'Messenger',
		alias: ['/msg', '/m.me', '/mme'],
		component: Redirecting,
		redirect: () => {
			window.location.replace('https://m.me/manczakjakub');
			return '/messenger';
		},
	},
	{
		path: '/youtube',
		name: 'YouTube',
		alias: '/yt',
		component: Redirecting,
		redirect: () => {
			window.location.replace(
				'https://youtube.com/channel/UCQs52rKosT0qrlEipD53yMQ'
			);
			return '/youtube';
		},
	},
	{
		path: '/twitter',
		name: 'Twitter',
		component: Redirecting,
		redirect: () => {
			window.location.replace('https://twitter.com/j4kubmanczak');
			return '/twitter';
		},
	},
	{
		path: '/reddit',
		name: 'Reddit',
		component: Redirecting,
		redirect: () => {
			window.location.replace('https://reddit.com/u/manczakjakub');
			return '/reddit';
		},
	},
	{
		path: '/linkedin',
		name: 'LinkedIn',
		alias: ['/linked-in', '/ln'],
		component: Redirecting,
		redirect: () => {
			window.location.replace(
				'https://www.linkedin.com/in/jakub-ma%C5%84czak-302b00201/'
			);
			return '/linkedin';
		},
	},
	{
		path: '/plan',
		name: 'Plan Lekcji',
		alias: ['/plan-lekcji', '/lesson-plan'],
		component: Redirecting,
		redirect: () => {
			window.location.replace(
				'https://www.zsk.poznan.pl/plany_lekcji/2021plany/technikum/plany/o17.html'
			);
			return '/plan';
		},
	},
	{
		path: '/umlaut',
		name: 'Umlaut',
		component: Redirecting,
		redirect: () => {
			window.location.replace(
				'https://github.com/jakubmanczak/umlaut/releases'
			);
			return '/umlaut';
		},
	},
	{
		path: '/site-repo',
		name: 'Site Repository',
		component: Redirecting,
		redirect: () => {
			window.location.replace('https://github.com/jakubmanczak/net');
			return '/site-repo';
		},
	},
	{
		path: '/cscfg',
		name: 'CS:GO Config',
		component: Redirecting,
		redirect: () => {
			window.location.replace(
				'https://gist.github.com/jakubmanczak/65e01ffb68166aba28f8abfcb879565c'
			);
			return '/cscfg';
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404: Page Not Found',
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
