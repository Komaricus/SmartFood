<template>
  <v-container>
    <app-header></app-header>
    <v-toolbar dark color="cyan">
      <v-toolbar-title class="white--text">Привет, {{userData.name}}!</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-tabs centered color="cyan" slider-color="yellow" dark fixed-tabs show-arrows>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab href="#fridge">Холодильник</v-tab>

      <v-tab href="#supplement">Добавление</v-tab>

      <v-tab href="#diet">Диета</v-tab>

      <v-tab href="#shopping-list">Список покупок</v-tab>

      <v-tab href="#creation">Создание</v-tab>

      <v-tab href="#menu">Мое меню</v-tab>

      <v-tab href="#scaner">Сканер</v-tab>

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
          <supplement
            @messageChange="showMessage"
            @productAdded="addProduct"
            @dishAdded="addDish"
            @itemAddedToList="updateShoppingList"
          ></supplement>
        </v-card>
      </v-tab-item>

      <v-tab-item value="diet">
        <v-card flat>
          <!-- Описание и сведения по выбранной диете -->
          <!-- Если диета не выбрана - ссылка на страницу диет -->
          <diet></diet>
        </v-card>
      </v-tab-item>

      <v-tab-item value="shopping-list">
        <v-card flat>
          <!-- Список покупок -->
          <!-- Возможность отследить наличие выбранных продуктов в холодильнике -->
          <shopping-list
            :user="userData"
            @listChanged="saveList"
            @productAdded="addProduct"
            @messageChange="showMessage"
          ></shopping-list>
        </v-card>
      </v-tab-item>
      <v-tab-item value="creation">
        <v-card flat>
          <!-- Создание продуктов и рецептов -->
          <creation @messageChange="showMessage"></creation>
        </v-card>
      </v-tab-item>

      <v-tab-item value="menu">
        <day-menu
          :user="userData"
          @menuAdded="addMenu"
          @menuDeleted="deleteMenu"
          @dishAdded="addDish"
        ></day-menu>
      </v-tab-item>

      <v-tab-item value="scaner">
        <scaner @productAdded="addProduct"></scaner>
      </v-tab-item>
    </v-tabs>

    <v-snackbar bottom="bottom" :color="snackbarColor" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
</template>
<script>
import ProductsList from "@/components/pages/Products/ProductsList";
import DietsList from "@/components/pages/Diets/DietsList";
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

    // Load user diet
    Dashboard.getUserDiet(this, this.userData.user_id);

    // Load user menu
    if (localStorage.getItem("menu")) {
      this.$set(
        this.userData,
        "menu",
        JSON.parse(localStorage.getItem("menu"))
      );
    } else {
      Dashboard.getUserMenu(this, this.userData.user_id);
    }
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

    // Load user shopping list
    if (localStorage.getItem("list")) {
      this.$set(
        this.userData,
        "list",
        JSON.parse(localStorage.getItem("list"))
      );
    } else {
      Dashboard.getUserShoppingList(this, this.userData.user_id);
    }
  },
  methods: {
    showMessage(message) {
      this.snackbarColor = message.snackbarColor;
      this.message = message.message;
      this.snackbar = message.snackbar;
    },
    saveList(list) {
      this.snackbarColor = "green";
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < this.userData.list.length; j++) {
          if (list[i].title == this.userData.list[j].title) {
            this.userData.list[j].items = list[i].items;
            break;
          }
        }
      }

      localStorage.setItem("list", JSON.stringify(this.userData.list));
      Dashboard.postUserShoppingList(this, this.userData);
    },
    updateShoppingList(item, type) {
      // Search for existing item in shopping list

      var index = -1;
      for (var i = 0; i < this.userData.list[type].items.length; i++) {
        if (this.userData.list[type].items[i]._id == item._id) {
          index = i;
          break;
        }
      }

      // Message about existing item or adding item to shopping list
      if (index != -1) {
        this.snackbarColor = "orange";
        this.message = "Уже добавлено в список покупок";
      } else {
        this.snackbarColor = "green";
        this.userData.list[type].items.push(item);
        localStorage.setItem("list", JSON.stringify(this.userData.list));
        Dashboard.postUserShoppingList(this, this.userData);
      }

      this.snackbar = true;
    },
    addProduct(product) {
      // Search for existing product with same exdate
      var index = -1;
      for (var i = 0; i < this.userData.products.length; i++) {
        if (
          this.userData.products[i]._id == product._id &&
          this.userData.products[i].days == product.days
        ) {
          index = i;
          break;
        }
      }

      // Summing amount for existing product or adding new product
      if (index != -1) {
        this.userData.products[index].amount =
          +this.userData.products[index].amount + +product.amount;
      } else {
        this.userData.products.push(product);
      }

      // Update user products in local storage and DB
      this.snackbarColor = "green";
      localStorage.setItem("products", JSON.stringify(this.userData.products));
      Dashboard.postUserProducts(this, this.userData);
    },
    addMenu(menu) {
      this.userData.menu = menu;

      // Update user menu in local storage and DB
      this.snackbarColor = "green";
      localStorage.setItem("menu", JSON.stringify(this.userData.menu));
      Dashboard.postUserMenu(this, this.userData);
    },
    deleteMenu(menu) {
      this.userData.menu = menu;

      // Update user menu in local storage and DB
      this.snackbarColor = "red";
      localStorage.setItem("menu", JSON.stringify(this.userData.menu));
      Dashboard.postUserMenu(this, this.userData, "Меню удалено");
    },
    addDish(dish) {
      // Search for existing dish with same exdate
      var index = -1;
      for (var i = 0; i < this.userData.dishes.length; i++) {
        if (
          this.userData.dishes[i]._id == dish._id &&
          this.userData.dishes[i].days == dish.days
        ) {
          index = i;
          break;
        }
      }

      // Summing portions for existing dish or adding new dish
      if (index != -1) {
        this.userData.dishes[index].portions =
          +this.userData.dishes[index].portions + +dish.portions;
      } else {
        this.userData.dishes.push(dish);
      }

      // Update user dishes in local storage and DB
      this.snackbarColor = "green";
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
