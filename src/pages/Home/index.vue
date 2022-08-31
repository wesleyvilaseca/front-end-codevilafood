<template>
  <div class="row">
    <div class="col-lg-12">
      <h1 class="my-4 title-tenant">Restaurantes</h1>

      <div class="row my-4">
        <div
          class="col-lg-4 col-md-4 col-6 mb-4"
          v-for="(company, index) in companies.data"
          :key="index"
        >
          <div class="restaurant-card">
            <router-link class="logo" :to="{ name: 'products' }">
              <img
                v-if="company.logo"
                class="card-img-top"
                :src="company.logo"
                :alt="company.name"
              />

              <img
                v-else
                class="card-img-top"
                src="@/assets/imgs/vue-food.png"
                :alt="company.name"
              />
            </router-link>
            <div class="restaurant-card-body">
              <h3>
                <a href="vitrine-tenant.html">{{ company.name }}</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.col-lg-9 -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  mounted() {
    this.getCompanies().catch((res) => {
      this.$vToastify.error("Falha ao carregar empresas");
    });
  },

  computed: {
    ...mapState({
      companies: (state) => state.companies.items,
    }),
  },

  methods: {
    ...mapActions(["getCompanies"]),
  },
};
</script>
