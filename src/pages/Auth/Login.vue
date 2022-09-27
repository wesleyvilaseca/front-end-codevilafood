<template>
  <!-- login -->
  <div class="d-flex justify-content-center h-100 my-5">
    <div class="user_card">
      <div class="d-flex justify-content-center">
        <div class="brand_logo_container">
          <img src="@/assets/imgs/vue-food.png" class="brand_logo" alt="Logo" />
        </div>
      </div>
      <div class="d-flex justify-content-center form_container">
        <form>
          <div class="text-danger" v-if="errors.email != ''">
            {{ errors.email[0] || "" }}
          </div>
          <div class="input-group">
            <div class="input-group-append">
              <span class="input-group-text"
                ><i class="fas fa-envelope"></i
              ></span>
            </div>
            <input
              type="email"
              v-model="formData.email"
              name="email"
              class="form-control input_user"
              value=""
              placeholder="E-mail"
            />
          </div>

          <div class="text-danger" v-if="errors.password != ''">
            {{ errors.password[0] || "" }}
          </div>
          <div class="input-group">
            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input
              type="password"
              name="password"
              v-model="formData.password"
              class="form-control input_pass"
              value=""
              placeholder="Senha"
            />
          </div>
          <div class="d-flex justify-content-center mt-3 login_container">
            <button
              type="button"
              name="button"
              class="btn login_btn"
              @click.prevent="auth()"
            >
              <span v-if="loading"> Carregando ...</span>
              <span v-else>Entrar</span>
            </button>
          </div>
        </form>
      </div>

      <div class="mt-4">
        <div class="d-flex justify-content-center links">
          Não tem uma conta?
          <router-link :to="{ name: 'register' }" class="ml-2">
            Cadastre-se!</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <!-- login-->
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        password: "",
      },

      errors: {
        email: "",
        password: "",
      },
    };
  },

  computed: {
    deviceName() {
      return (
        navigator.appCodeName +
        navigator.appName +
        navigator.platform +
        this.formData.email
      );
    },
  },

  methods: {
    ...mapActions(["login", "getMe"]),

    auth() {
      this.reset();
      this.loading = true;
      const params = {
        device_name: this.deviceName,
        ...this.formData,
      };

      this.login(params)
        .then((res) => {
          this.getMe();
          this.$vToastify.success("Login realizado com sucesso", "Success");
          this.$router.push({ name: "my.orders" });
        })
        .catch((error) => {
          const errorResponse = error.response;
          if (errorResponse.status === 422) {
            this.errors = Object.assign(this.errors, errorResponse.data.errors);
            this.$vToastify.error(
              "Dados inválidos, verifique novamente",
              "Erro"
            );

            return;
          }

          this.$vToastify.error("Falha na operação", "Erro");
          setTimeout(() => this.reset(), 4000);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    reset() {
      this.errors = { email: "", password: "" };
    },
  },
};
</script>

