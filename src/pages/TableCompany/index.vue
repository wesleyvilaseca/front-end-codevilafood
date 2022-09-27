<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["token_company", "token_table"],
  created() {
    this.getCompanyByUuid(this.token_company)
      .then((res) => {
        let params = {
          table: this.token_table,
          token_company: this.token_company,
        };

        this.getTableFromCompany(params);
        this.$vToastify.success("ok", "Erro");
      })
      .catch((res) => {
        this.$vToastify.error("Falha ao carregar a mesa", "Erro");
      })
      .finally(() => this.$router.push({ name: "home" }));
  },
  methods: {
    ...mapActions(["getTableFromCompany", "getCompanyByUuid"]),
  },
};
</script>