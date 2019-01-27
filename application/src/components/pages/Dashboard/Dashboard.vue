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

    <div v-if="categorySelected">
      <v-card-title>
        <v-text-field
          color="green lighten-1"
          v-model="search"
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        class="elevation-2"
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
              <v-btn flat icon color="green" @click="addProduct(props.item)">
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
    <v-snackbar bottom="bottom" color="green" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
</template>
<script>
import ProductsList from "@/components/pages/Products/ProductsList";

export default {
  data() {
    return {
      title: "Категория",
      snackbar: false,
      message: "",
      categorySelected: false,
      userData: {},
      products: [],
      search: "",
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
      ]
    };
  },
  created() {
    this.userData.user_id = this.$cookie.get("user_id");
    this.userData.name = this.$cookie.get("name");
    this.userData.products = JSON.parse(this.$cookie.get("products"));
  },
  methods: {
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
      this.userData.products.push(product);
      this.$cookie.set("products", JSON.stringify(this.userData.products));
    }
  }
};
</script>
<style lang="scss">
@import "./../../../assets/styles";
</style>