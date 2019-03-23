<template>
  <v-container>
    <app-header></app-header>
    <v-layout class="page-layout" column justify-center align-center>
      <h1 class="page-title">{{ product.title }}</h1>
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
      <v-btn @click="addProduct">
        Добавить в холодильник
      </v-btn>
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
    if (!localStorage.getItem(this.$route.params.id)) {
      await Axios.get(`${SmartFridgeAPI}/product/${vm.$route.params.id}`)
        .then(function(response) {
          vm.product = response.data[0];
          const parsed = JSON.stringify(vm.product);
          localStorage.setItem(vm.$route.params.id, parsed);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    if (localStorage.getItem(this.$route.params.id)) {
      try {
        this.product = JSON.parse(localStorage.getItem(this.$route.params.id));
      } catch (e) {
        localStorage.removeItem(this.$route.params.id);
      }
    }
  },
  methods: {
    addProduct() {
      const products = JSON.parse(this.$cookie.get("products"));
      products.push(this.product);
      this.$cookie.set("products", JSON.stringify(products));
    }
  }
};
</script>
<style scoped>
  .page-title {
    text-align: center;
  }

  .page-layout {
    min-height: 100%;
  }

  td {
    width: 50%;
  }
</style>
