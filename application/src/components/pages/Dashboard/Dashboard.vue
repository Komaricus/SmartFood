<template>
  <v-container>
    <app-header></app-header>
    <v-toolbar dark color="cyan">
      <v-toolbar-title class="white--text">Привет, {{userData.name}}!</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-tabs centered color="cyan" slider-color="yellow" dark fixed-tabs>
      <v-tab href="#fridge">Холодильник</v-tab>

      <v-tab href="#supplement">Добавление</v-tab>

      <v-tab href="#diet">Диета</v-tab>

      <v-tab href="#list">Список покупок</v-tab>

      <v-tab-item value="fridge">
        <v-card flat>
          <fridge
            :user="userData"
            @deleteProduct="deleteProduct"
            @deleteDish="deleteDish"
            @messageChange="showMessage"
            @productChanged="changeProduct"
            @dishChanged="changeDish"
          ></fridge>
        </v-card>
      </v-tab-item>

      <v-tab-item value="supplement">
        <v-card flat>
          <supplement @messageChange="showMessage" @productAdded="addProduct" @dishAdded="addDish"></supplement>
        </v-card>
      </v-tab-item>

      <v-tab-item value="diet">
        <v-card flat>
          <!-- Описание и сведения по выбранной диете -->
          <!-- Если диета не выбрана - ссылка на страницу диет -->
        </v-card>
      </v-tab-item>

      <v-tab-item value="list">
        <v-card flat>
          <!-- Список покупок -->
          <!-- Возможность отследить наличие выбранных продуктов в холодильнике -->
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-snackbar bottom="bottom" :color="snackbarColor" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
</template>
<script>
import ProductsList from "@/components/pages/Products/ProductsList";
import Dashboard from "@/components/pages/Dashboard";
import { validationMixin } from "vuelidate";
import {
  required,
  numeric,
  minValue,
  maxValue
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    days: {
      required,
      numeric,
      minValue: minValue(1),
      maxValue: maxValue(2000)
    },
    amount: {
      required,
      numeric,
      minValue: minValue(1),
      maxValue: maxValue(100000)
    }
  },
  data() {
    return {
      snackbarColor: "",
      snackbar: false,
      message: "",
      userData: {}
    };
  },
  created() {
    this.userData.user_id = this.$cookie.get("user_id");
    this.userData.name = this.$cookie.get("name");

    // Load user products
    if (localStorage.getItem("products")) {
      this.$set(
        this.userData,
        "products",
        JSON.parse(localStorage.getItem("products"))
      );
    } else {
      Dashboard.getUserProducts(this, this.userData.user_id);
    }

    // Load user dishes
    if (localStorage.getItem("dishes")) {
      this.$set(
        this.userData,
        "dishes",
        JSON.parse(localStorage.getItem("dishes"))
      );
    } else {
      Dashboard.getUserDishes(this, this.userData.user_id);
    }
  },
  methods: {
    showMessage(message) {
      this.snackbarColor = message.snackbarColor;
      this.message = message.message;
      this.snackbar = message.snackbar;
    },
    addProduct(product) {
      this.snackbarColor = "green";

      this.userData.products.push(product);
      localStorage.setItem("products", JSON.stringify(this.userData.products));
      Dashboard.postUserProducts(this, this.userData);
    },
    addDish(dish) {
      this.snackbarColor = "green";

      this.userData.dishes.push(dish);
      localStorage.setItem("dishes", JSON.stringify(this.userData.dishes));
      Dashboard.postUserDishes(this, this.userData);
    },
    deleteProduct(product) {
      this.snackbarColor = "green";

      const index = this.userData.products.indexOf(product);
      this.userData.products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(this.userData.products));
      Dashboard.postUserProducts(this, this.userData, "Продукт удалён");
    },
    deleteDish(dish) {
      this.snackbarColor = "green";

      const index = this.userData.dishes.indexOf(dish);
      this.userData.dishes.splice(index, 1);
      localStorage.setItem("dishes", JSON.stringify(this.userData.dishes));
      Dashboard.postUserDishes(this, this.userData, "Блюдо удалено");
    },
    changeProduct(product) {
      this.snackbarColor = "green";

      const index = this.userData.products.indexOf(product);
      this.userData.products[index].amount = product.amount;
      localStorage.setItem("products", JSON.stringify(this.userData.products));
      Dashboard.postUserProducts(this, this.userData, "Изменения сохранены");
    },
    changeDish(dish) {
      this.snackbarColor = "green";

      const index = this.userData.dishes.indexOf(dish);
      this.userData.dishes[index].portions = dish.portions;
      localStorage.setItem("dishes", JSON.stringify(this.userData.dishes));
      Dashboard.postUserDishes(this, this.userData, "Изменения сохранены");
    }
  }
};
</script>
<style lang="scss">
@import "./../../../assets/styles";

.data-table {
  animation: bounceIn 1s forwards ease;
}
</style>