import Vue from 'vue'
import App from './App.vue'
import Formulaire from './Formulaire.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes:Routes,
  mode:'history'
})

export const bus = new Vue();
export const busSuivre = new Vue();

if(document.getElementById("app")){
  new Vue({
    el: '#app',
    render: h => h(App),
    router: router
  })
}

if(document.getElementById("formulaire")){
  new Vue({
    el: '#formulaire',
    render: h => h(Formulaire)
  })
}
