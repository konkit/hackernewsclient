import Vue from 'vue'
import Router from 'vue-router'
import ShowPage from "./components/ShowPage";
import MainList from "./components/MainList";

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: MainList },
    { path: '/showPage/:id', component: ShowPage }
  ]
})
