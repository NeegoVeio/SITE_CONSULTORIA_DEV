<template>
  <div class="sobre">
    <h1>Sobre o Personal</h1>

    <section class="bio">
      <p>
        Olá! Meu nome é <strong>João Paulo </strong> e sou personal trainer
        apaixonado por ajudar pessoas a transformarem suas vidas através da
        atividade física.
      </p>
      <p>
        Tenho anos de experiência acompanhando alunos de todos os gêneros,
        criando planos personalizados que respeitam os limites e potencial de
        cada um.
      </p>
    </section>

    <section class="mission">
      <h2>Minha Missão</h2>
      <p>
        Minha missão é oferecer um serviço de consultoria fitness de alta
        qualidade, focado em resultados reais e sustentáveis, com atenção
        especial às necessidades específicas das mulheres, para que se sintam
        seguras, motivadas e empoderadas em sua jornada.
      </p>
    </section>

    <section class="diferenciais">
      <h2>Diferenciais</h2>
      <ul>
        <li>Planos personalizados para todos os níveis e objetivos</li>
        <li>Acompanhamento próximo e suporte constante</li>
        <li>
          Experiência com treinamentos femininos, focando saúde hormonal,
          postura e bem-estar
        </li>
        <li>Flexibilidade para adaptar treinos ao seu dia a dia</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "SobrePage",
  methods: {
    goToContato() {},
  },
};
</script>

<style scoped>
.sobre {
  max-width: 700px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1,
h2 {
  color: #2575fc;
  margin-bottom: 16px;
}

.bio p,
.mission p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 18px;
}

.diferenciais ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 30px;
}

.diferenciais li {
  font-size: 17px;
  margin-bottom: 12px;
}

.cta p {
  font-size: 18px;
  text-align: center;
}

.cta button {
  background-color: #ff4081;
  border: none;
  color: white;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.cta button:hover {
  background-color: #e91e63;
}
</style>
