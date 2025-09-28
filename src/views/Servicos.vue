<template>
  <div class="servicos-page">
    <h1>Nossos Serviços</h1>

    <div class="cupom-container">
      <label for="cupom">Tem cupom de desconto?</label>
      <input
        id="cupom"
        v-model="cupomInput"
        placeholder="Digite seu cupom"
        @input="validarCupom"
      />
      <small v-if="cupomValido" class="valid-cupom">
        Cupom aplicado! {{ descontoPercentual }}% de desconto.
      </small>
      <small v-else-if="cupomInput" class="invalid-cupom">
        Cupom inválido ou inativo.
      </small>
    </div>

    <div class="cards-container">
      <div
        v-for="servico in servicos"
        :key="servico.id"
        class="card"
        :class="{ inativo: !servico.ativo }"
        @touchstart="toggleTouch($event)"
        @touchend="toggleTouch($event)"
      >
        <h2>{{ servico.titulo }}</h2>
        <p>{{ servico.descricao }}</p>

        <div class="precos">
          <span class="preco-original" v-if="cupomValido && servico.ativo">
            R$ {{ servico.preco.toFixed(2).replace('.', ',') }}
          </span>
          <span class="preco-final">
            R$
            {{ precoComDesconto(servico.preco).toFixed(2).replace('.', ',') }}
          </span>
        </div>

        <div v-if="servico.ativo">
          <button @click="adicionarAoCarrinho(servico)">
            Adicionar ao carrinho
          </button>
        </div>
        <div v-else class="esgotado-msg">
          Esgotado
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicosPage",
  data() {
    return {
      servicos: [
        {
          id: 1,
          titulo: "Consultoria Personalizada",
          descricao: "Planos de treino sob medida...",
          preco: 299.9,
          ativo: true,
        },
        {
          id: 2,
          titulo: "Treinamento para Mulheres",
          descricao: "Foco especial em saúde hormonal...",
          preco: 249.9,
          ativo: true,
        },
        {
          id: 3,
          titulo: "Acompanhamento Online",
          descricao: "Treinos e orientações remotamente...",
          preco: 199.9,
          ativo: false,
        },
        {
          id: 4,
          titulo: "Avaliação Física Completa",
          descricao: "Avaliação detalhada para entender seu corpo...",
          preco: 149.9,
          ativo: true,
        },
      ],
      cupomInput: "",
      cupomValido: false,
      descontoPercentual: 0,
      cuponsDisponiveis: [],
    };
  },
  mounted() {
    this.carregarCupons();
  },
  methods: {
    toggleTouch(event) {
      event.currentTarget.classList.toggle("touch-active");
    },
    precoComDesconto(preco) {
      return this.cupomValido
        ? preco * (1 - this.descontoPercentual / 100)
        : preco;
    },
    async carregarCupons() {
      try {
        const response = await fetch("/cupons.json");
        const data = await response.json();
        this.cuponsDisponiveis = data;
      } catch (error) {
        console.error("Erro ao carregar cupons:", error);
      }
    },
    validarCupom() {
      const cupomDigitado = this.cupomInput.trim().toUpperCase();
      const cupomEncontrado = this.cuponsDisponiveis.find(
        (c) => c.codigo === cupomDigitado && c.ativo
      );

      if (cupomEncontrado) {
        this.cupomValido = true;
        this.descontoPercentual = cupomEncontrado.desconto;
      } else {
        this.cupomValido = false;
        this.descontoPercentual = 0;
      }
    },
    adicionarAoCarrinho(servico) {
      if (!servico.ativo) return;

      let carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
      const itemExistente = carrinho.find((i) => i.servico.id === servico.id);
      itemExistente
        ? itemExistente.quantidade++
        : carrinho.push({ servico, quantidade: 1 });

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      localStorage.setItem("cupomValido", JSON.stringify(this.cupomValido));
      localStorage.setItem(
        "descontoPercentual",
        JSON.stringify(this.descontoPercentual)
      );

      this.$router.push("/carrinho");
    },
  },
};
</script>

<style scoped>
.servicos-page {
  max-width: 900px;
  margin: 40px auto 60px;
  padding: 0 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}
h1 {
  color: #2575fc;
  margin-bottom: 30px;
  text-align: center;
}
/* Cupom */
.cupom-container {
  max-width: 300px;
  margin: 0 auto 30px;
  text-align: center;
}
.cupom-container label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #2575fc;
}
.cupom-container input {
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 2px solid #2575fc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}
.cupom-container input:focus {
  border-color: #1a54d9;
}
.valid-cupom {
  color: green;
  font-weight: 600;
  margin-top: 6px;
  display: block;
}
.invalid-cupom {
  color: red;
  font-weight: 600;
  margin-top: 6px;
  display: block;
}
/* Cards */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 3px 6px #1a54d9;
  padding: 25px 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card:hover,
.card.touch-active {
  transform: scale(1.05);
  box-shadow: 0 10px 20px #1a54d9;
}
.card h2 {
  color: #2575fc;
  margin-bottom: 15px;
}
.card p {
  font-size: 16px;
  line-height: 1.5;
  flex-grow: 1;
}
.precos {
  margin-top: 15px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  gap: 12px;
  align-items: center;
}
.preco-original {
  color: #999;
  text-decoration: line-through;
  font-weight: 600;
}
.preco-final {
  color: #2575fc;
}
button {
  margin-top: 20px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #1a54d9;
}
/* Esgotado */
.esgotado-msg {
  margin-top: 20px;
  color: #e74c3c;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}
.card.inativo {
  opacity: 0.7;
  pointer-events: none;
}
/* Responsivo */
@media (max-width: 900px) {
  .cards-container {
    max-width: 100%;
  }
}
</style>
