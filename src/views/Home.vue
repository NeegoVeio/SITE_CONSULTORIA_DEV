<template>
  <div class="home">
    <section class="hero">
      <h1>Consultoria Fitness Personalizada</h1>
      <p>
        Transforme seu treino e alcance seus objetivos com acompanhamento
        profissional.
      </p>
      <button @click="goToContato">Agende sua avaliação</button>
    </section>

    <section class="services">
      <h2>Para todos que querem evoluir na academia</h2>
      <p>
        Consultoria completa para homens e mulheres, com planos personalizados
        para cada objetivo.
      </p>

      <ul>
        <li>Treinos personalizados para força, emagrecimento e saúde</li>
        <li>Planos alimentares focados no seu estilo de vida</li>
        <li>Acompanhamento contínuo para garantir resultados</li>
        <li>
          <strong>Especial atenção para mulheres</strong>: programas dedicados
          para condicionamento, saúde hormonal e bem-estar feminino
        </li>
      </ul>
    </section>

    <section class="cta">
      <h2>Pronto para começar a transformação?</h2>
      <p>Entre em contato e descubra o plano ideal para você.</p>
      <button @click="goToContato">Fale com o Personal</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    goToContato() {
      this.$router.push("/contato");
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.hero {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  padding: 50px 20px;
  text-align: center;
  border-radius: 8px;
}

.hero button {
  margin-top: 25px;
  padding: 14px 30px;
  background-color: #ff4081;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hero button:hover {
  background-color: #e91e63;
}

.services {
  margin: 40px 0;
  text-align: center;
}

.services ul {
  list-style-type: none;
  padding: 0;
  max-width: 600px;
  margin: 20px auto 0;
}

.services li {
  background-color: rgb(212, 217, 223);
  margin: 10px 0;
  padding: 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
}

.services li strong {
  color: #ff4081;
}

.cta {
  background-color: #f9f9f9;
  padding: 35px 20px;
  text-align: center;
  border-radius: 8px;
}

.cta button {
  margin-top: 20px;
  padding: 14px 30px;
  background-color: #2575fc;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta button:hover {
  background-color: #1a52d8;
}
</style>
