import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';
import Auctions from './Auctions.vue';
import Profile from './Profile.vue';
import CreateAuction from './createAuction'
import Settings from './Settings'
import MyAuctions from './MyAuctions'

import Popover  from 'vue-js-popover'



import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
// const NotFound = { template: '<p>Page not found</p>' }
import VueCookies from 'vue-cookies';
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'


// Datetime.setLocale('en');
Vue.use(Datetime);
Vue.use(VueCookies);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Popover)
Vue.http.options.emulateJson = true;



const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/auctions",
    name:"auctions",
    component: Auctions
  },
  {
    path: "/auctions/:search",
    name:"auctionsSearch",
    component: Auctions
  },
  {
    path:"/profile",
    name:"profile",
    component: Profile
  },
  {
    path:"/createAuction",
    name:"createAuction",
    component: CreateAuction
  },
  {
    path:"/settings",
    name:"settings",
    component: Settings
  },
  {
    path:"/myAuctions",
    name:"myAuction",
    component: MyAuctions
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  router: router,
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render: h => h(App)
});
