<template>
  <v-container>
    <app-header></app-header>
    <h1>{{title}}</h1>
    <!-- <div class="create-product">
      <label for="create-product">Say Something...</label>
      <input type="text" id="create-product" v-model="text" placeholder="Создать продукт">
      <button v-on:click="createProduct">Создать</button>
    </div>-->
    <div class="products-container">
      <div
        class="product"
        v-for="(product, index) in products"
        v-bind:item="product"
        v-bind:index="index"
        v-bind:key="product._id"
      >
        <router-link :to="product._id" append>{{product.title}}</router-link>
      </div>
    </div>

    <v-snackbar bottom="bottom" :color="snackColor" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
</template>

<script>
import ProductsList from "@/components/pages/Products/ProductsList";

export default {
  data() {
    return {
      title: "",
      products: [],
      snackbar: false,
      message: "",
      snackColor: "red lighten-1"
    };
  },
  async created() {
    this.title = ProductsList.getTitle(this.$route.params.category);
    try {
      this.products = await ProductsList.getProducts(
        this.$route.params.category
      );
    } catch (err) {
      this.snackbar = true;
      this.message = err.message;
    }
  }
};
</script>
<style scoped>
</style>
