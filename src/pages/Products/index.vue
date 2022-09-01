<template>
  <div>
    <!-- About Tenant and Categories -->
    <h1 class="my-4 title-tenant text-center">{{ company.name }}</h1>

    <div class="row">
      <div class="list-categories">
        <a
          href="#"
          class="list-categories__item active"
          v-for="(category, index) in categories.data"
          :key="index"
          ><div class="icon"><i :class="category.icon"></i></div>
          <span> {{ category.name }} </span>
        </a>
      </div>
    </div>
    <!-- Cards Produtos -->
    <div class="row my-4">
      <div
        class="col-lg-4 col-md-6 mb-4"
        v-for="(product, index) in products.data"
        :key="index"
      >
        <div class="card--flat h-100">
          <a href="#">
            <div class="card-image">
              <img class="card-img-top" :src="product.image" alt="" />
            </div>
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">{{ product.name }}</a>
            </h4>
            <h5>R$ {{ product.price }}</h5>
            <p class="card-text">{{ product.description }}</p>
          </div>
          <div class="card-footer card-footer-custom">
            <router-link :to="{ name: 'cart' }">
              Adicionar no Carrinho <i class="fas fa-cart-plus"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->
  </div>
</template>

<script>
import { state } from "@/store/default";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  props: ["companyFlag"],

  methods: {
    ...mapActions([
      "getCompanyByFlag",
      "getCategoryByCompany",
      "getProductsByCompany",
    ]),
    ...mapMutations({
      setCompany: "SET_COMPANY",
    }),
  },

  created() {
    if (this.company.name === "") {
      this.getCompanyByFlag(this.companyFlag)
        .then(() => {
          this.getCategoryByCompany(this.company.uuid).catch((res) =>
            this.$vToastify.error("Falha ao carregar as categorias", "Erro")
          );

          this.getProductsByCompany(this.company.uuid).catch((res) =>
            this.$vToastify.error("Falha ao carregar os produtos", "Erro")
          );
        })
        .catch((error) => {
          if (error.response.status == 404) {
            return this.$router.push({ name: "home" });
          }
        });
      return;
    }

    this.getCategoryByCompany(this.company.uuid).catch((res) =>
      this.$vToastify.error("Falha ao carregar as categorias", "Erro")
    );

    this.getProductsByCompany(this.company.uuid).catch((res) =>
      this.$vToastify.error("Falha ao carregar os produtos", "Erro")
    );
  },

  computed: {
    ...mapState({
      company: (state) => state.companies.companySelected,
      categories: (state) => state.companies.categoriesCompanySelected,
      products: (state) => state.companies.productsCompanySelected,
    }),
  },
};
</script>
