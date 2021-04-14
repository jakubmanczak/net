import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

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
    redirect: () => {
      window.location.replace('https://steamcommunity.com/id/jakubmanczak');
      return '/steam-redirecting';
    },
  },
  {
    path: '/github',
    name: 'GitHub',
    alias: '/gh',
    redirect: () => {
      window.location.replace('https://github.com/jakubmanczak');
      return '/github-redirecting';
    },
  },
  {
    path: '/anilist',
    name: 'AniList',
    alias: '/al',
    redirect: () => {
      window.location.replace('https://anilist.co/user/j4mesen');
      return '/anilist-redirecting';
    },
  },
  {
    path: '/facebook',
    name: 'Facebook',
    alias: '/fb',
    redirect: () => {
      window.location.replace('https://facebook.com/manczakjakub');
      return '/facebook-redirecting';
    },
  },
  {
    path: '/messenger',
    name: 'Messenger',
    alias: ['/msg', '/m.me', '/mme'],
    redirect: () => {
      window.location.replace('https://m.me/manczakjakub');
      return '/messenger-redirecting';
    },
  },
  {
    path: '/youtube',
    name: 'YouTube',
    alias: '/yt',
    redirect: () => {
      window.location.replace(
        'https://youtube.com/channel/UCQs52rKosT0qrlEipD53yMQ'
      );
      return '/youtube-redirecting';
    },
  },
  {
    path: '/twitter',
    name: 'Twitter',
    redirect: () => {
      window.location.replace('https://twitter.com/j4kubmanczak');
      return '/twitter-redirecting';
    },
  },
  {
    path: '/reddit',
    name: 'Reddit',
    redirect: () => {
      window.location.replace('https://reddit.com/u/manczakjakub');
      return '/reddit-redirecting';
    },
  },
  {
    path: '/linkedin',
    name: 'LinkedIn',
    alias: ['/linked-in', '/ln'],
    redirect: () => {
      window.location.replace(
        'https://www.linkedin.com/in/jakub-ma%C5%84czak-302b00201/'
      );
      return '/linkedin-redirecting';
    },
  },
  {
    path: '/plan',
    name: 'Plan Lekcji',
    alias: ['/plan-lekcji', '/lesson-plan'],
    redirect: () => {
      window.location.replace(
        'https://www.zsk.poznan.pl/plany_lekcji/2021plany/technikum/plany/o17.html'
      );
      return '/lessonplan-redirecting';
    },
  },
  {
    path: '/umlaut',
    name: 'Umlaut',
    redirect: () => {
      window.location.replace(
        'https://github.com/jakubmanczak/umlaut/releases'
      );
      return '/umlaut-redirecting';
    },
  },
  {
    path: '/site-repo',
    name: 'Site Repository',
    redirect: () => {
      window.location.replace('https://github.com/jakubmanczak/net');
      return '/siterepo-redirecting';
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
