<template>
  <v-footer app padless color="primary" dark>
    <v-col class="text-center py-3">
      © {{ new Date().getFullYear() }} Consultoria Fitness. Todos os direitos
      reservados.
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
