<template>
  <!-- Page Content -->
  <div class="container container-body mt-4">
    <div class="row my-4 mx-0 details">
      <div class="col-12 mb-2">
        <h1 class="title-tenant h2">
          Detalhes do Pedido <strong> {{ identify }}</strong>
        </h1>
      </div>
      <div class="col-sm-6">
        <ul class="p-0">
          <li><b>Número:</b> {{ identify }}</li>
          <li><b>Total:</b> R$ {{ order.total }}</li>
          <li><b>Data:</b> {{ order.date }}</li>
          <li>
            <b>Status:</b>
            <span class="badge bg-success text-light p-2">{{
              order.status
            }}</span>
          </li>
        </ul>
      </div>
      <div class="col-sm-6">
        <ul class="p-0">
          <li v-if="order.table.identify">
            <span>Mesa</span>
            <ul class="p-0">
              <li><b>Identificador:</b> {{ order.table.identify }}</li>
              <li><b>Descrição:</b> {{ order.table.description }}</li>
            </ul>
          </li>
          <li v-if="order.client.name">
            <span>Cliente</span>
            <ul class="p-0">
              <li><b>Nome:</b> {{ order.client.name }}</li>
              <li><b>E-mail:</b> {{ order.client.email }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- details order -->

    <hr />

    <div class="row my-4">
      <div class="col-12">
        <h4>Produtos</h4>
      </div>

      <div
        class="col-12 col-md-6 col-lg-4 my-1"
        v-for="(product, index) in order.products"
        :key="index"
      >
        <div class="details-card">
          <a href="#"
            ><img
              class="card-img-top"
              :src="product.image"
              :alt="product.title"
          /></a>
          <div class="details-card-body">
            <h5>{{ product.title }}</h5>
            <p>
              <b>R$: {{ product.price }}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- products order -->

    <hr />

    <button
      @click.prevent="openModalEvaluation()"
      class="btn btn-sm btn-success"
      v-if="
        me.name != '' &&
          me.name === order.client.name &&
          order.evaluations.length === 0
      "
    >
      Avaliar pedido
    </button>

    <modal name="evaluation-order" :heigth="350">
      <div class="px-md-5 my-4">
        <h4>Avaliar o pedido {{ identify }}</h4>
        <strong>Nota: </strong>
        <vue-stars
          name="demo"
          :active-color="'#ffdd00'"
          :inactive-color="'#999999'"
          :shadow-color="'#ffff00'"
          :hover-color="'#dddd00'"
          :max="5"
          :readonly="false"
          :char="'★'"
          :inactive-char="''"
          :class="''"
          v-model="evaluation.stars"
        />
        <textarea
          class="form-control my-4"
          name="comment"
          id=""
          cols="30"
          rows="3"
          placeholder="Comentario (opicional)"
          v-model="evaluation.comment"
        ></textarea>
        <div class="text-center my-4">
          <button
            class="btn btn-sm btn-info"
            @click.prevent="sendEvaluation()"
            :disabled="loadSemdEvaluation"
          >
            <span v-if="loadSemdEvaluation">Enviando...</span>
            <span v-else>Avaliar</span>
          </button>
        </div>
      </div>
    </modal>

    <div class="evaluations-order col-12" v-if="order.evaluations.length">
      <div v-for="(evaluation, index) in order.evaluations" :key="index">
        <p><strong>Nome: </strong> {{ evaluation.client.name }}</p>
        <p><strong>Comentário: </strong> {{ evaluation.client.comment }}</p>
        <p>
          <strong>Nota: </strong>
          <vue-stars
            name="evaluation-user"
            :active-color="'#ffdd00'"
            :inactive-color="'#999999'"
            :shadow-color="'#ffff00'"
            :hover-color="'#dddd00'"
            :max="5"
            :readonly="true"
            :char="'★'"
            :inactive-char="''"
            :class="''"
            :value="evaluation.stars"
          />
        </p>
      </div>
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["identify"],
  data() {
    return {
      order: {
        identify: "",
        date: "",
        status: "",
        total: "",
        table: {
          identify: "",
          description: "",
        },
        client: {
          name: "",
          email: "",
        },
        company: {
          name: "",
          image: "",
        },
        products: [],
        evaluations: [],
      },
      evaluation: {
        stars: 1,
        comment: "",
      },
      loadSemdEvaluation: false,
    };
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.me,
    }),
  },
  methods: {
    ...mapActions(["get_order", "evaluationOrders"]),
    openModalEvaluation() {
      return this.$modal.show("evaluation-order");
    },
    closeModalEvaluation() {
      return this.$modal.hide("evaluation-order");
    },

    sendEvaluation() {
      this.loadSemdEvaluation = true;

      const params = {
        identify: this.identify,
        ...this.evaluation,
      };

      this.evaluationOrders(params)
        .then((res) => {
          this.$vToastify.success(
            "Avaliação enviada com sucesso",
            "Obrigado :)"
          );
          this.order.evaluations.push(res.data.data);
          this.closeModalEvaluation();
        })
        .catch((err) => {
          this.$vToastify.error("Falha ao enviar a avaliação :(", "Erro");
        })
        .finally(() => {
          this.loadSemdEvaluation = false;
        });
    },
  },
  created() {
    this.get_order(this.identify)
      .then((res) => {
        this.order = Object.assign(this.order, res.data.data);
      })
      .catch((err) => {
        this.$vToastify.error("Falha ao carregar o detalhe do pedido", "Erro");
        this.$router.push({ name: "home" });
      });
  },
};
</script>