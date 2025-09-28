<template>
  <v-app-bar app color="primary" dark>
    <!-- Logo normal -->
    <v-spacer />

    <!-- Menu desktop -->
    <div class="d-none d-sm-flex">
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/sobre">Sobre</v-btn>
      <v-btn text to="/servicos">Serviços</v-btn>
      <v-btn text to="/depoimentos">Depoimentos</v-btn>
      <v-btn text to="/contato">Contato</v-btn>
      <v-btn text to="/carrinho">Carrinho</v-btn>
    </div>

    <!-- Menu hambúrguer (mobile) -->
    <v-app-bar-nav-icon class="d-sm-none" @click.stop="drawer = !drawer" />

    <!-- Drawer responsivo -->
    <v-navigation-drawer v-model="drawer" temporary app class="d-sm-none">
      <v-list nav dense>
        <v-list-item @click="goTo('/')">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/sobre')">
          <v-list-item-title>Sobre</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/servicos')">
          <v-list-item-title>Serviços</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/depoimentos')">
          <v-list-item-title>Depoimentos</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/contato')">
          <v-list-item-title>Contato</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/carrinho')">
          <v-list-item-title>Carrinho</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    goTo(route) {
      this.drawer = false;
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.app-logo {
  height: 50px; /* tamanho padrão */
  width: auto;
  object-fit: contain;
}

@media (min-width: 960px) {
  .app-logo {
    height: 70px; /* maior em telas grandes */
  }
}
</style>
