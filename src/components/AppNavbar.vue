<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        <router-link to="/">CONSULTORIAS JP</router-link>
      </div>

      <!-- Botão Hamburguer -->
      <button class="hamburger" @click="menuOpen = !menuOpen">
        <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>

      <!-- Links de navegação -->
      <ul :class="['nav-links', { open: menuOpen }]">
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/sobre" @click="closeMenu">Sobre</router-link></li>
        <li>
          <router-link to="/servicos" @click="closeMenu">Serviços</router-link>
        </li>
        <li>
          <router-link to="/depoimentos" @click="closeMenu"
            >Depoimentos</router-link
          >
        </li>
        <li>
          <router-link to="/contato" @click="closeMenu">Contato</router-link>
        </li>
        <li>
          <router-link to="/carrinho" @click="closeMenu">Carrinho</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    closeMenu() {
      this.menuOpen = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  background: #1a53d99d; /* fundo fosco */
  backdrop-filter: blur(8px); /* efeito blur */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #1a54d9;
  padding: 14px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo a {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #5e88eb;
}

/* Mobile */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #222;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    gap: 16px;
    display: none;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links li {
    width: 100%;
    text-align: center;
  }
}
</style>
