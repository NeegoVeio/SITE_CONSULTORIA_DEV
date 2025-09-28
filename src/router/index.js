import Vue from "vue";
import Router from "vue-router";

import Home from "../views/Home.vue";
import Sobre from "../views/Sobre.vue";
import Servicos from "../views/Servicos.vue";
import Depoimentos from "../views/Depoimentos.vue";
import Contato from "../views/Contato.vue";
import Carrinho from "../views/Carrinho.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/sobre", name: "Sobre", component: Sobre },
    { path: "/servicos", name: "Servicos", component: Servicos },
    { path: "/depoimentos", name: "Depoimentos", component: Depoimentos },
    { path: "/contato", name: "Contato", component: Contato },
    { path: "/carrinho", component: Carrinho },
  ],
});
