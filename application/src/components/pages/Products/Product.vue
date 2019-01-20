<template>
  <v-container>
    <app-header></app-header>
    <h1>{{ product.title }}</h1>
    {{ product.descr }}
  </v-container>
</template>
<script>
import Axios from "axios";

const SmartFridgeAPI = "https://smart-food-app.herokuapp.com";

export default {
  data() {
    return {
      product: {}
    };
  },
  async created() {
    let vm = this;
    await Axios.get(`${SmartFridgeAPI}/products/${vm.$route.params.id}`)
      .then(function(response) {
        vm.product = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style scoped>
</style>
