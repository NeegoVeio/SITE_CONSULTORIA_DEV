<template>
  <div class="contato">
    <h1>ENTRE EM CONTATO</h1>
    <form @submit.prevent="enviarWhatsApp" novalidate>
      <!-- Nome -->
      <input
        type="text"
        v-model="nome"
        @blur="validarNome"
        :placeholder="erros.nome || 'Digite seu nome completo'"
        :class="{ erro: erros.nome }"
        required
      />

      <!-- Email -->
      <input
        type="email"
        v-model="email"
        @blur="validarEmailCampo"
        :placeholder="erros.email || 'Digite seu e-mail'"
        :class="{ erro: erros.email }"
        required
      />

      <!-- Mensagem -->
      <textarea
        v-model="mensagem"
        @blur="validarMensagem"
        :placeholder="erros.mensagem || 'Escreva sua mensagem'"
        :class="{ erro: erros.mensagem }"
        required
      ></textarea>

      <button type="submit">Enviar via WhatsApp</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContatoPage",
  data() {
    return {
      nome: "",
      email: "",
      mensagem: "",
      whatsappNumber: process.env.VUE_APP_WHATSAPP_NUMBER || "55987654321",
      erros: {
        nome: "",
        email: "",
        mensagem: "",
      },
    };
  },
  methods: {
    validarNome() {
      if (!this.nome.trim()) {
        this.erros.nome = "⚠ Nome é obrigatório";
        return false;
      }
      if (this.nome.trim().split(" ").length < 2) {
        this.erros.nome = "⚠ Insira nome e sobrenome";
        return false;
      }
      this.erros.nome = "";
      return true;
    },
    validarEmailCampo() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.trim()) {
        this.erros.email = "⚠ E-mail é obrigatório";
        return false;
      }
      if (!re.test(this.email)) {
        this.erros.email = "⚠ E-mail inválido";
        return false;
      }
      this.erros.email = "";
      return true;
    },
    validarMensagem() {
      if (!this.mensagem.trim()) {
        this.erros.mensagem = "⚠ Mensagem é obrigatória";
        return false;
      }
      this.erros.mensagem = "";
      return true;
    },
    enviarWhatsApp() {
      const nomeValido = this.validarNome();
      const emailValido = this.validarEmailCampo();
      const mensagemValida = this.validarMensagem();

      if (nomeValido && emailValido && mensagemValida) {
        const texto = `Olá! Meu nome é ${this.nome}.\nEmail: ${this.email}\nMensagem: ${this.mensagem}`;
        const message = encodeURIComponent(texto);
        const url = `https://wa.me/${this.whatsappNumber}?text=${message}`;
        window.open(url, "_blank");
      }
    },
  },
};
</script>

<style scoped>
.contato {
  max-width: 100%;
  padding: 20px;
  margin: auto;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2575fc;
  font-size: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
  margin: auto;
}

input,
textarea {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input.erro,
textarea.erro {
  border-color: red;
  color: red;
}

input::placeholder,
textarea::placeholder {
  color: #888;
}

input.erro::placeholder,
textarea.erro::placeholder {
  color: red;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

button {
  background-color: #2575fc;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1a54d9;
}

/* RESPONSIVO */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  input,
  textarea {
    font-size: 0.95rem;
  }

  button {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  form {
    padding: 0 10px;
  }

  input,
  textarea {
    padding: 12px;
  }
}
</style>
