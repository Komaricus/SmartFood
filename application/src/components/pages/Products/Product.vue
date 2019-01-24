<template>
  <v-container>
    <app-header></app-header>
    <h1 class="page-title">{{ product.title }}</h1>
    <v-layout row>
      <v-flex xs12 md12></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 order-md1 order-sm2 order-xs2>
        <v-card light tile flat class="card ma-1 elevation-2">
          <v-card-text>
            <div v-if="product.exDate">
              <h3>Срок годности</h3>
              <p>{{product.exDate}} дн.</p>
            </div>
            <h3>Состав на 100 г продукта</h3>
            <tbody>
              <tr>
                <td>Калорийность</td>
                <td class="text-xs-right">{{product.cals}} кКал</td>
              </tr>
              <tr>
                <td>Белки</td>
                <td class="text-xs-right">{{product.prots}} г</td>
              </tr>
              <tr>
                <td>Жиры</td>
                <td class="text-xs-right">{{product.fats}} г</td>
              </tr>
              <tr>
                <td>Углеводы</td>
                <td class="text-xs-right">{{product.carbs}} г</td>
              </tr>
            </tbody>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6 order-md2 order-sm1 order-xs1 v-if="product.img">
        <v-img :src="`/static/img/${$route.params.id}.jpg`" class="product-image ma-1 elevation-2"></v-img>
      </v-flex>
      <v-flex xs12 sm12 md12 order-md3 order-sm3 order-xs3 v-if="product.descr">
        <v-card tile flat class="ma-1 pa-3 elevation-2">
          <p class="product-description">{{ product.descr }}</p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Axios from "axios";

const SmartFridgeAPI = "https://smart-food-app.herokuapp.com";

export default {
  data() {
    return {
      image: "",
      product: {}
    };
  },
  async created() {
    let vm = this;
    await Axios.get(`${SmartFridgeAPI}/products/${vm.$route.params.id}`)
      .then(function(response) {
        vm.product = response.data[0];
        const parsed = JSON.stringify(vm.product);
        localStorage.setItem(vm.$route.params.id, parsed);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted() {
    if (localStorage.getItem(this.$route.params.id)) {
      try {
        this.product = JSON.parse(localStorage.getItem(this.$route.params.id));
      } catch (e) {
        localStorage.removeItem(this.$route.params.id);
      }
    }
  }
};
</script>
<style scoped>
.product-image {
  max-height: 500px;
}

td {
  width: 50%;
}
</style>
