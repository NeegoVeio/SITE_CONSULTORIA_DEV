<template>
  <v-container class="py-10 depoimentos-container">
    <h1 class="titulo">Depoimentos</h1>
    <v-row dense>
      <v-col
        cols="12"
        md="6"
        v-for="depoimento in depoimentos"
        :key="depoimento.id"
      >
        <v-card class="depoimento-card" elevation="6">
          <v-card-text>
            <div class="aspas">“</div>
            <blockquote class="texto-depoimento">
              {{ depoimento.texto }}
            </blockquote>
            <footer class="autor">— {{ depoimento.autor }}</footer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DepoimentosView",
  data() {
    return {
      depoimentos: [
        {
          id: 1,
          texto:
            "A consultoria mudou completamente a minha vida. Consegui alcançar meus objetivos com segurança e motivação!",
          autor: "João Silva",
        },
        {
          id: 2,
          texto:
            "O atendimento foi excelente! Profissional, respeitoso e com planos muito bem personalizados.",
          autor: "Maria Oliveira",
        },
        {
          id: 3,
          texto:
            "Me senti acolhido desde o início. Hoje treino com foco e resultados reais!",
          autor: "Carlos Pereira",
        },
      ],
    };
  },
};
</script>

<style scoped>
.depoimentos-container {
  max-width: 1100px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px 20px;
  color: #1a54d9;
}

.titulo {
  text-align: center;
  color: #2575fc;
  margin-bottom: 40px;
  font-size: 2.4rem;
  font-weight: bold;
}

.depoimento-card {
  background-color: #ffffff;
  color: #2575fc;
  border-radius: 15px;
  padding: 25px 20px;
  box-shadow: 0 3px 6px #1a54d9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}

.depoimento-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px #2575fc;
}

.aspas {
  font-size: 3rem;
  color: #2575fc;
  margin-bottom: -15px;
  margin-top: -10px;
  line-height: 1;
}

.texto-depoimento {
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.6;
  margin: 0;
  color: #000000;
}

.autor {
  margin-top: 20px;
  text-align: right;
  font-weight: bold;
  color: #2575fc;
}
.card:hover,
.card.touch-active {
  transform: scale(1.05);
  box-shadow: 0 10px 20px #1a54d9;
}

/* Responsivo */
@media (max-width: 600px) {
  .titulo {
    font-size: 1.8rem;
  }

  .texto-depoimento {
    font-size: 1rem;
  }

  .aspas {
    font-size: 2.5rem;
  }
}
</style>
