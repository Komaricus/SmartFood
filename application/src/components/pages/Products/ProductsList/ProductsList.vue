<template>
  <v-container>
    <app-header></app-header>
    <h1>Products List</h1>
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
        <router-link :to="'/products-menu/fruits-list/' + product.name">{{product.name}}</router-link>
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
      products: [{ name: 1 }],
      snackbar: false,
      message: "",
      snackColor: "red lighten-1"
    };
  },
  async created() {
    try {
      this.products = await ProductsList.getProducts();
    } catch (err) {
      this.snackbar = true;
      this.message = err.message;
    }
  }
};
</script>
<style scoped>
</style>
