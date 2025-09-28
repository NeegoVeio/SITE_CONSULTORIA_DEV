<template>
  <div class="carrinho-page">
    <h1>Resumo do Pedido</h1>

    <form @submit.prevent="enviar" novalidate>
      <div class="form-group" :class="{ erro: erros.nome }">
        <label for="nome">Nome completo:</label>
        <input
          id="nome"
          v-model.trim="nome"
          required
          placeholder="Digite seu nome completo"
          @blur="validarNome"
          aria-describedby="erro-nome"
          :aria-invalid="!!erros.nome"
        />
        <small v-if="erros.nome" id="erro-nome" class="msg-erro">{{
          erros.nome
        }}</small>
      </div>

      <div class="form-group" :class="{ erro: erros.email }">
        <label for="email">E-mail:</label>
        <input
          id="email"
          v-model.trim="email"
          type="email"
          required
          placeholder="Digite seu e-mail"
          @blur="validarEmail"
          aria-describedby="erro-email"
          :aria-invalid="!!erros.email"
        />
        <small v-if="erros.email" id="erro-email" class="msg-erro">{{
          erros.email
        }}</small>
      </div>

      <div class="form-group" :class="{ erro: erros.telefone }">
        <label for="telefone">Telefone:</label>
        <input
          id="telefone"
          v-model.trim="telefone"
          type="tel"
          required
          placeholder="Digite seu telefone (somente números)"
          @blur="validarTelefone"
          aria-describedby="erro-telefone"
          :aria-invalid="!!erros.telefone"
        />
        <small v-if="erros.telefone" id="erro-telefone" class="msg-erro">{{
          erros.telefone
        }}</small>
      </div>

      <ul v-if="carrinho.length" class="carrinho-lista">
        <li v-for="item in carrinho" :key="item.servico.id">
          <div class="titulo">{{ item.servico.titulo }}</div>
          <div>Qtd: {{ item.quantidade }}</div>
          <div>
            Subtotal: R$ {{ subtotalItem(item).toFixed(2).replace(".", ",") }}
          </div>
        </li>
      </ul>

      <div v-if="carrinho.length" class="resumo">
        <p>Subtotal: R$ {{ subtotalCarrinho.toFixed(2).replace(".", ",") }}</p>
        <p v-if="cupomValido" class="desconto">
          Desconto (JP15): -R$ {{ descontoValor.toFixed(2).replace(".", ",") }}
        </p>
        <p class="total">
          Total: R$ {{ totalFinal.toFixed(2).replace(".", ",") }}
        </p>

        <div class="acoes">
          <button type="submit" :disabled="enviando || !formValido">
            {{ enviando ? "Enviando..." : "Finalizar Pedido" }}
          </button>
          <button type="button" @click="gerarPDF" :disabled="!carrinho.length">
            Gerar PDF
          </button>
        </div>
      </div>

      <p v-else>Seu carrinho está vazio.</p>
    </form>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import logo from "@/assets/logo2.png";

export default {
  name: "CarrinhoPage",
  data() {
    return {
      carrinho: JSON.parse(localStorage.getItem("carrinho") || "[]"),
      descontoPercentual: 15,
      cupomValido: JSON.parse(localStorage.getItem("cupomValido") || "false"),
      whatsappNumber: process.env.VUE_APP_WHATSAPP_NUMBER || "55987654321", // Número vindo do .env
      nome: "",
      email: "",
      telefone: "",
      erros: {
        nome: null,
        email: null,
        telefone: null,
      },
      enviando: false,
    };
  },
  computed: {
    subtotalCarrinho() {
      return this.carrinho.reduce((acc, item) => {
        return (
          acc + this.precoComDesconto(item.servico.preco) * item.quantidade
        );
      }, 0);
    },
    descontoValor() {
      if (!this.cupomValido) return 0;
      return (this.subtotalCarrinho * this.descontoPercentual) / 100;
    },
    totalFinal() {
      return this.subtotalCarrinho - this.descontoValor;
    },
    formValido() {
      return (
        !this.erros.nome &&
        !this.erros.email &&
        !this.erros.telefone &&
        this.nome &&
        this.email &&
        this.telefone
      );
    },
  },
  methods: {
    precoComDesconto(preco) {
      return this.cupomValido
        ? preco * (1 - this.descontoPercentual / 100)
        : preco;
    },
    subtotalItem(item) {
      return this.precoComDesconto(item.servico.preco) * item.quantidade;
    },
    gerarPDF() {
      if (!this.carrinho.length) {
        alert("Seu carrinho está vazio.");
        return;
      }

      const doc = new jsPDF();

      const img = new Image();
      img.src = logo;
      img.onload = () => {
        doc.addImage(img, "PNG", 10, 10, 50, 20);
        doc.setFontSize(16);
        doc.text("Resumo do Pedido - Consultoria JP", 20, 40);
        doc.setFontSize(12);

        this.carrinho.forEach((item, i) => {
          doc.text(
            `${i + 1}. ${item.servico.titulo} - x${
              item.quantidade
            } - R$ ${this.subtotalItem(item).toFixed(2)}`,
            20,
            50 + i * 10
          );
        });

        doc.text(
          `Total: R$ ${this.totalFinal.toFixed(2)}`,
          20,
          60 + this.carrinho.length * 10
        );

        doc.save("resumo-pedido.pdf");
      };

      img.onerror = () => {
        alert("Erro ao carregar a imagem do logo para o PDF.");
      };
    },
    validarNome() {
      if (!this.nome) {
        this.erros.nome = "O nome é obrigatório.";
      } else if (this.nome.length < 3) {
        this.erros.nome = "O nome deve ter ao menos 3 caracteres.";
      } else {
        this.erros.nome = null;
      }
    },
    validarEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.erros.email = "O e-mail é obrigatório.";
      } else if (!regex.test(this.email)) {
        this.erros.email = "Digite um e-mail válido.";
      } else {
        this.erros.email = null;
      }
    },
    validarTelefone() {
      const regex = /^\d{10,15}$/; // aceita somente números, de 10 a 15 dígitos
      const tel = this.telefone.replace(/\D/g, ""); // remove tudo que não for número
      if (!this.telefone) {
        this.erros.telefone = "O telefone é obrigatório.";
      } else if (!regex.test(tel)) {
        this.erros.telefone =
          "Digite um telefone válido com DDD, somente números.";
      } else {
        this.erros.telefone = null;
      }
    },
    abrirWhatsApp(mensagem, numero) {
      // número sem espaços, somente dígitos e código do país (ex: 5511999999999)
      const telefoneFormatado = numero.replace(/\D/g, "");
      const url = `https://wa.me/${telefoneFormatado}?text=${encodeURIComponent(
        mensagem
      )}`;
      window.open(url, "_blank");
    },
    async enviar() {
      // Valida antes de enviar
      this.validarNome();
      this.validarEmail();
      this.validarTelefone();

      if (!this.formValido) {
        alert("Por favor, corrija os erros no formulário antes de enviar.");
        return;
      }

      if (!this.carrinho.length) {
        alert("Seu carrinho está vazio.");
        return;
      }

      const pedido = this.carrinho.map((item) => ({
        nome: item.servico.titulo,
        preco: this.subtotalItem(item),
        quantidade: item.quantidade,
      }));

      this.enviando = true;

      try {
        const res = await fetch("http://localhost:3000/api/enviar-pedido", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: this.nome,
            email: this.email,
            telefone: this.telefone,
            pedido,
            total: this.totalFinal,
          }),
        });

        const data = await res.json();
        if (data.status === "sucesso") {
          alert("Pedido enviado com sucesso! Verifique seu e-mail.");

          // Montar mensagem para WhatsApp
          const mensagem = `Olá ${
            this.nome
          }, obrigado pelo seu pedido!\nTotal: R$ ${this.totalFinal.toFixed(
            2
          )}\nEm breve entraremos em contato pelo telefone ${this.telefone}.`;

          // Abrir WhatsApp Web para o cliente usando o número do .env
          this.abrirWhatsApp(mensagem, this.whatsappNumber);

          // Limpar tudo
          this.carrinho = [];
          localStorage.removeItem("carrinho");
          localStorage.removeItem("cupomValido");
          this.nome = "";
          this.email = "";
          this.telefone = "";
        } else {
          alert("Erro ao enviar pedido: " + data.mensagem);
        }
      } catch (err) {
        console.error(err);
        alert("Erro ao enviar pedido, tente novamente.");
      } finally {
        this.enviando = false;
      }
    },
  },
};
</script>

<style scoped>
.carrinho-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #2575fc;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #2575fc;
  outline: none;
}

.form-group.erro input {
  border-color: #e91e63;
}

.msg-erro {
  color: #e91e63;
  font-size: 0.875rem;
  margin-top: 5px;
}

.carrinho-lista {
  margin: 20px 0;
  padding: 0;
  list-style: none;
}

.carrinho-lista li {
  background: #f4f8ff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
}

.titulo {
  font-weight: bold;
  color: #1a54d9;
}

.resumo {
  margin-top: 20px;
}

.desconto {
  color: #e91e63;
}

.total {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 10px;
}

.acoes {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  flex: 1;
  padding: 14px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}

button:disabled {
  background-color: #a0b4ff;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1a54d9;
}

@media (max-width: 600px) {
  .acoes {
    flex-direction: column;
  }
}
</style>
