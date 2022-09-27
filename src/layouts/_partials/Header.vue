<template>
  <header>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-vuefood">
      <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
          <img
            src="@/assets/imgs/logo-vuefood.png"
            alt="VueFood"
            class="logo"
          />
        </router-link>
        <div>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item nav-cart">
              <router-link
                :to="{ name: 'cart' }"
                class="nav-link"
                style="color: #fff"
              >
                <i class="fas fa-shopping-cart"></i> ({{ productsCart.length }})
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                :to="{ name: 'my.orders' }"
                v-if="me.name"
                class="nav-link text-success mt-2 ms-5"
                >Olá {{ me.name }}
                <span @click.prevent="exit()" class="btn btn-sm btn-danger"
                  >Sair</span
                ></router-link
              >
              <router-link
                v-else
                :to="{ name: 'login' }"
                class="nav-link text-success mt-2 ms-5"
              >
                Login
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapActions(["logout"]),
    ...mapState({
      productsCart: (state) => state.cart.products.data,
      me: (state) => state.auth.me,
    }),
  },
  methods: {
    exit() {
      this.logout();
    },
  },
};
</script>