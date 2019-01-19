<template>
  <v-container>
    <app-header></app-header>
    <h1>Product Page</h1>
    {{ product.name }}
  </v-container>
</template>
<script>
import ProductsList from "@/components/pages/Products/ProductsList";

export default {
  data() {
    return {
      product: {}
    };
  },
  async created() {
    try {
      this.product = await ProductsList.getProduct();
    } catch (err) {
      this.snackbar = true;
      this.message = err.message;
    }
  }
};
</script>
<style scoped>
</style>
