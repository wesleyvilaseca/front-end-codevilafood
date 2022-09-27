<template>
  <div>
    <div class="cart-price text-red mb-5">
      Preço Total: <b>R$ {{ totalCart }}</b>
    </div>
    <a href="" class="cart-finalizar" @click.prevent="openModalCheckout()"
      >Finalizar</a
    >

    <modal name="checkout-order" :heigth="350">
      <div class="px-md-5 my-4" v-if="loading">
        <p>Gerando o pedido... (aguarde!)</p>
      </div>
      <div class="px-md-5 my-4" v-else>
        <div class="col-12" v-if="me.name !== ''">
          <p><strong>Total de produtos: </strong>{{ products.length }}</p>
          <p><strong>Preço total: </strong> R$ {{ totalCart }}</p>

          <div class="form-group">
            <textarea
              class="form-control my-4"
              name="comment"
              id=""
              cols="30"
              rows="3"
              placeholder="Comentario (opicional)"
              v-model="comment"
            ></textarea>
          </div>

          <div class="text-center my-4">
            <button class="btn btn-sm btn-info" @click.prevent="createOrder()">
              Fazer pedido
            </button>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-6">
            <p><strong>Total de produtos: </strong>{{ products.length }}</p>
            <p><strong>Preço total: </strong> R$ {{ totalCart }}</p>

            <div class="form-group">
              <textarea
                class="form-control my-4"
                name="comment"
                id=""
                cols="30"
                rows="3"
                placeholder="Comentario (opicional)"
                v-model="comment"
              ></textarea>
            </div>

            <div class="text-center my-4">
              <button
                class="btn btn-sm btn-info"
                @click.prevent="createOrder()"
              >
                Fazer pedido de forma anônima
              </button>
            </div>
          </div>
          <div class="col-6">
            <router-link
              :to="{ name: 'login' }"
              class="btn btn-default btn-full"
              >Fazer login</router-link
            >
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      comment: "",
      loading: false,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.cart.products.data,
      me: (state) => state.auth.me,
      company: (state) => state.companies.companySelected,
    }),

    totalCart() {
      let total = 0;

      this.products.map((itemCart, index) => {
        total += itemCart.qty * itemCart.product.price;
      });
      return total;
    },
  },
  methods: {
    ...mapActions(["create_order", "create_order_auth"]),

    createOrder() {
      this.loading = true;
      const action = this.me.name === "" ? "create_order" : "create_order_auth";

      let params = {
        token_company: this.company.uuid,
        comment: this.comment,
        products: [...this.products],
      };

      this.$store
        .dispatch(action, params)
        .then((res) => {
          this.$vToastify.success("Pedido realizado com sucesso", "Parabéns");
          this.$router.push({
            name: "detail.order",
            params: { identify: res.identify },
          });
        })
        .catch((res) => {
          this.$vToastify.error(
            "Falha ao realizar o pedido, tente mais tarde :(",
            "Erro"
          );
        })
        .finally((res) => {
          this.loading = false;
        });
    },

    openModalCheckout() {
      return this.$modal.show("checkout-order");
    },
    closeModalCheckout() {
      return this.$modal.hide("checkout-order");
    },
  },
};
</script>