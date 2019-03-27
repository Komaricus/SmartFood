<template>
  <v-container>
    <app-header></app-header>
    <h1 class="page-title">Личный кабинет</h1>
    <h2>Привет, {{userData.name}}!</h2>

    <v-flex xs12 sm4>
      <h3>Добавить продукт</h3>

      <v-menu transition="slide-y-transition" bottom>
        <v-btn slot="activator" color="green" outline>{{title}}</v-btn>
        <v-list>
          <v-list-tile v-for="(item, i) in items" :key="i" @click="clickMenu(item.category)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>

    <div v-if="categorySelected" class="data-table elevation-2">
      <v-card-title>
        <v-text-field
          color="green lighten-1"
          v-model="search"
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn flat icon color="red" @click="closeMenu()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
        rows-per-page-text="Элементов на странице"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td>
              <router-link
                :to="`/products-menu/${props.item.type}/${props.item._id}`"
              >{{ props.item.title }}</router-link>
            </td>
            <td class="text-xs-center">{{ props.item.cals }}</td>
            <td class="text-xs-center">
              <v-btn
                flat
                icon
                color="green"
                @click.stop="dialog = true; selectedProduct = props.item"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >По запросу "{{ search }}" ничего не найдено.</v-alert>
        <template
          slot="pageText"
          slot-scope="props"
        >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">Простите, данные не найдены</v-alert>
        </template>
      </v-data-table>
    </div>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Параметры продукта</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="amount"
                    label="Количество продукта"
                    hint="Указывается в граммах"
                    :error-messages="amountErrors"
                    color="green lighten-1"
                    required
                    @input="$v.amount.$touch()"
                    @blur="$v.amount.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="days"
                    label="Срок годности"
                    hint="Указывается в днях"
                    :error-messages="daysErrors"
                    color="green lighten-1"
                    required
                    @input="$v.days.$touch()"
                    @blur="$v.days.$touch()"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" flat @click="addProduct(selectedProduct);">Добавить</v-btn>
            <v-btn color="red darken-1" flat @click="$v.$reset(); dialog = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-toolbar dark color="green">
      <v-toolbar-title class="white--text">Ваш Холодильник</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-tabs centered color="green" dark icons-and-text>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab href="#tab-1">
        Продукты
        <v-icon>kitchen</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Блюда
        <v-icon>room_service</v-icon>
      </v-tab>

      <v-tab-item value="tab-1">
        <v-card flat>
          <v-data-table
            :headers="fridgeHeaders"
            :items="userData.products"
            class="elevation-2 data-table"
            :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
            rows-per-page-text="Элементов на странице"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  <router-link
                    :to="`/products-menu/${props.item.type}/${props.item._id}`"
                  >{{ props.item.title }}</router-link>
                </td>
                <td class="text-xs-center">{{ props.item.cals }}</td>
                <td class="text-xs-center">{{ props.item.prots }}</td>
                <td class="text-xs-center">{{ props.item.fats }}</td>
                <td class="text-xs-center">{{ props.item.carbs }}</td>
                <td class="text-xs-center">{{ props.item.days }}</td>
                <td class="text-xs-center">{{ props.item.amount }}</td>
              </tr>
            </template>

            <template
              slot="pageText"
              slot-scope="props"
            >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">Холодильник пуст</v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <v-tab-item value="tab-2">
        <v-card flat>2</v-card>
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
      title: "Категория",
      snackbar: false,
      message: "",
      categorySelected: false,
      userData: {},
      products: [],
      search: "",
      dialog: false,
      snackbarColor: "",
      days: "",
      amount: "",
      selectedProduct: {},
      headers: [
        {
          text: "Продукт (100г)",
          align: "left",
          value: "title"
        },
        { text: "Калории (кКал)", value: "cals" },
        { text: "Добавить", sortable: false }
      ],
      items: [
        { title: "Фрукты", category: "fruits" },
        { title: "Овощи", category: "vegetables" },
        { title: "Мясо", category: "meat" },
        { title: "Морепродукты", category: "seafood" },
        { title: "Молочные продукты", category: "dairy" },
        { title: "Крупы", category: "cereals" },
        { title: "Птица", category: "poultry" },
        { title: "Специи и соусы", category: "condiment" }
      ],
      fridgeHeaders: [
        {
          text: "Продукт (100г)",
          align: "left",
          value: "title"
        },
        { text: "Калории (кКал)", value: "cals" },
        { text: "Жиры (г)", value: "fats" },
        { text: "Белки (г)", value: "prots" },
        { text: "Углеводы (г)", value: "carbs" },
        { text: "Срок годности", value: "days" },
        { text: "Количество", value: "amount" }
      ]
    };
  },
  created() {
    this.userData.user_id = this.$cookie.get("user_id");
    this.userData.name = this.$cookie.get("name");

    this.$set(
      this.userData,
      "products",
      sessionStorage.getItem("products")
        ? JSON.parse(sessionStorage.getItem("products"))
        : Dashboard.getUserProducts(this, this.userData.user_id)
    );
  },
  methods: {
    closeMenu() {
      this.categorySelected = false;
      this.title = "Категория";
    },
    async clickMenu(category) {
      this.categorySelected = true;
      this.title = ProductsList.getTitle(category);
      if (!localStorage.getItem(category)) {
        this.products = await ProductsList.getProducts(category);
      } else {
        try {
          this.products = JSON.parse(localStorage.getItem(category));
        } catch (e) {
          localStorage.removeItem(category);
        }
      }
    },
    addProduct(product) {
      if (this.$v.$invalid) {
        this.snackbarColor = "red";
        this.snackbar = true;
        this.message = "Заполните обязательные поля";

        this.$v.$touch();
      } else {
        this.snackbarColor = "green";
        product = Object.assign(product, {
          days: this.days,
          amount: this.amount
        });
        this.userData.products.push(product);
        sessionStorage.setItem(
          "products",
          JSON.stringify(this.userData.products)
        );
        Dashboard.postUserProducts(this, this.userData);

        this.days = "";
        this.amount = "";
        this.dialog = false;
        this.$v.$reset();
      }
    }
  },
  computed: {
    daysErrors() {
      const errors = [];
      if (!this.$v.days.$dirty) return errors;
      !this.$v.days.required && errors.push("Введите количество дней");
      !this.$v.days.numeric && errors.push("Должно быть целым числом");
      !this.$v.days.minValue && errors.push("Минимальное значение: 1");
      !this.$v.days.maxValue && errors.push("Превышено максимальное значение");
      return errors;
    },
    amountErrors() {
      const errors = [];
      if (!this.$v.amount.$dirty) return errors;
      !this.$v.amount.required && errors.push("Введите количество в граммах");
      !this.$v.amount.numeric && errors.push("Должно быть целым числом");
      !this.$v.amount.minValue && errors.push("Минимальное значение: 1");
      !this.$v.amount.maxValue &&
        errors.push("Превышено максимальное значение");
      return errors;
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