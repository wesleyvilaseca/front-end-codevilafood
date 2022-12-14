<template>
  <div>
    <!-- About Tenant and Categories -->
    <h1 class="my-4 title-tenant text-center">{{ company.name }}</h1>

    <div>
      <a href="#" class="btn btn-sm btn-warning" @click.prevent="remove()"> << Voltar</a>
    </div>

    <div class="row">
      <div class="list-categories">
        <a
          href="#"
          @click.prevent="filterByCategory(category)"
          v-for="(category, index) in categories.data"
          :key="index"
          :class="['list-categories__item', categoryInFilter(category)]"
          ><div class="icon"><i :class="category.icon"></i></div>
          <span> {{ category.name }}</span>
        </a>
      </div>
    </div>
    <!-- Cards Produtos -->
    <div class="row my-4">
      <div v-if="products.data.length === 0">Nenhum produto</div>

      <div
        class="col-lg-4 col-md-6 mb-4"
        v-for="(product, index) in products.data"
        :key="index"
      >
        <div
          :class="['card--flat', 'h-100', { disabled: productInCart(product) }]"
        >
          <a href="#">
            <div class="card-image">
              <img class="card-img-top" :src="product.image" alt="" />
            </div>
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">{{ product.name }}</a>
            </h4>
            <h5>R$ {{ product.price | formatPrice}}</h5>
            <p class="card-text">{{ product.description }}</p>
          </div>

          <div
            v-if="productInCart(product)"
            :class="['card-footer', 'card-footer-custom']"
            style="color: #fff"
          >
            <span>
              <i class="fas fa-cart-plus"></i>
            </span>
          </div>
          <div
            v-else
            :class="['card-footer', 'card-footer-custom']"
            style="color: #fff"
            @click.prevent="addProductCart(product)"
          >
            <span>
              <i class="fas fa-cart-plus"></i>
            </span>
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

  data() {
    return {
      filters: {
        category: "",
      },
    };
  },

  methods: {
    ...mapActions([
      "getCompanyByFlag",
      "getCategoryByCompany",
      "getProductsByCompany",
    ]),
    ...mapMutations({
      setCompany: "SET_COMPANY",
      addProductCart: "ADD_PRODUCT_CART",
      removeCompany: "REMOVE_COMPANY_SELECTED",
    }),

    loadProducts() {
      const params = {
        uuid: this.company.uuid,
      };

      if (this.filters.category) params.categories = [this.filters.category];

      this.getProductsByCompany(params).catch((res) =>
        this.$vToastify.error("Falha ao carregar os produtos", "Erro")
      );
    },

    loadCategories() {
      this.getCategoryByCompany(this.company.uuid).catch((res) =>
        this.$vToastify.error("Falha ao carregar as categorias", "Erro")
      );
    },

    filterByCategory(category) {
      if (category.id === this.filters.category) {
        this.filters.category = "";
      } else {
        this.filters.category = category.id;
      }

      this.loadProducts();
    },

    categoryInFilter(category) {
      return category.id == this.filters.category ? "active-category" : "";
    },

    productInCart(product) {
      var inCart = false;
      this.productsCart.map((productCart, index) => {
        if (productCart.identify === product.identify) inCart = true;
      });
      return inCart;
    },

    remove() {
      this.removeCompany();
      this.$router.push({ name: "home" });
    },
  },

  created() {
    if (this.company.name === "") {
      this.getCompanyByFlag(this.companyFlag)
        .then(() => {
          this.loadCategories();
          this.loadProducts();
        })
        .catch((error) => {
          if (error.response.status == 404) {
            return this.$router.push({ name: "home" });
          }
        });
      return;
    }

    this.loadCategories();
    this.loadProducts();
  },

  computed: {
    ...mapState({
      company: (state) => state.companies.companySelected,
      categories: (state) => state.companies.categoriesCompanySelected,
      products: (state) => state.companies.productsCompanySelected,
      productsCart: (state) => state.cart.products.data,
    }),
  },
};
</script>
