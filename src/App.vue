<template>
  <v-app>
    <app-Navbar />

    <v-main>
      <router-view />
    </v-main>

    <app-footer />
  </v-app>
</template>

<script>
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>
