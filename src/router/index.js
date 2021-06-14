import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
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
		component: function() {
			return import(/* webpackChunkName: "about" */ '../views/About.vue');
		},
	},
	{
		path: '/blog',
		name: 'Blog',
		component: function() {
			return import('../views/Blog.vue');
		},
	},
	{
		path: '/projects',
		name: 'Projects',
		component: function() {
			return import('../views/Projects.vue');
		},
	},
	{
		path: '/config',
		name: 'Config',
		component: function() {
			return import('../views/Config.vue');
		},
	},
	{
		path: '/steam',
		name: 'Steam',
		redirect: () => {
			window.location.replace(`https://steamcommunity.com/id/jakubmanczak`);
			return '/steam';
		},
	},
	{
		path: '/github',
		alias: '/gh',
		name: 'GitHub',
		redirect: () => {
			window.location.replace(`https://github.com/jakubmanczak`);
			return '/github';
		},
	},
	{
		path: '/anilist',
		alias: '/al',
		name: 'AniList',
		redirect: () => {
			window.location.replace(`https://anilist.co/user/j4mesen`);
			return '/anilist';
		},
	},
	{
		path: '/osu',
		name: 'osu!',
		redirect: () => {
			window.location.replace(`https://osu.ppy.sh/users/11088770`);
			return '/osu';
		},
	},
	{
		path: '/facebook',
		alias: '/fb',
		name: 'Facebok',
		redirect: () => {
			window.location.replace(`https://facebook.com/manczakjakub`);
			return '/facebook';
		},
	},
	{
		path: '/messenger',
		alias: '/msg',
		name: 'Messenger',
		redirect: () => {
			window.location.replace(`https://m.me/manczakjakub`);
			return '/messenger';
		},
	},
	{
		path: '/youtube',
		alias: '/yt',
		name: 'YouTube',
		redirect: () => {
			window.location.replace(
				`https://youtube.com/channel/UCQs52rKosT0qrlEipD53yMQ`
			);
			return '/youtube';
		},
	},
	{
		path: '/twitter',
		name: 'Twitter',
		redirect: () => {
			window.location.replace(`https://twitter.com/j4kubmanczak`);
			return '/twitter';
		},
	},
	{
		path: '/reddit',
		name: 'Reddit',
		redirect: () => {
			window.location.replace(`https://reddit.com/u/manczakjakub`);
			return '/reddit';
		},
	},
	{
		path: '/linkedin',
		name: 'LinkedIn',
		redirect: () => {
			window.location.replace(
				`https://www.linkedin.com/in/jakub-ma%C5%84czak-302b00201/`
			);
			return '/linkedin';
		},
	},
	{
		path: '/plan',
		name: 'Plan Lekcji',
		redirect: () => {
			window.location.replace(
				`https://www.zsk.poznan.pl/plany_lekcji/2021plany/technikum/plany/o17.html`
			);
			return '/plan';
		},
	},
	{
		path: '/umlaut',
		name: 'Umlaut',
		redirect: () => {
			window.location.replace(
				`https://github.com/jakubmanczak/umlaut/releases`
			);
			return '/umlaut';
		},
	},
	{
		path: '/repo',
		name: 'Site Repository',
		redirect: () => {
			window.location.replace(`https://github.com/jakubmanczak/net`);
			return '/repo';
		},
	},
	{
		path: '/cscfg',
		name: 'CS:GO Config',
		redirect: () => {
			window.location.replace(
				`https://gist.github.com/jakubmanczak/65e01ffb68166aba28f8abfcb879565c`
			);
			return '/cscfg';
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
