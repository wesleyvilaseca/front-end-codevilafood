<template>
  <div>
    <div class="my-4">
      <h1 class="title-tenant">Meus Pedidos</h1>
    </div>

    <div class="my-orders my-4">
      <div class="my-table-header mb-4">
        <div class="text-center"><b>Nª Pedido</b></div>
        <div class="text-center"><b>Data</b></div>
        <div class="text-center"><b>Valor Total</b></div>
        <div class="text-center"><b>Detalhes</b></div>
      </div>

      <div
        class="my-table"
        v-for="(order, index) in myOrders.data"
        :key="index"
      >
        <div class="text-center">{{ order.identify }}</div>
        <div class="text-center">{{ order.date_br }}</div>
        <div class="text-center">R$: {{ order.total }}</div>
        <div class="text-center">
          <router-link
            class="btn btn-danger"
            :to="{ name: 'detail.order', params: { identify: order.identify } }"
            >Detalhes</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions(["getMyOrders"]),
  },

  computed: {
    ...mapState({
      myOrders: (state) => state.orders.myOrders,
      me: (state) => state.auth.me,
    }),
  },

  created() {
    if (this.me.name === "") return this.$router.push({ name: "home" });

    this.getMyOrders().catch((err) => {
      this.$vToastify.error("Falha ao buscar os pedidos", "Erro");
    });
  },
};
</script>
