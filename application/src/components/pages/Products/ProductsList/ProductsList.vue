<template>
  <div>
    <v-container>
      <app-header></app-header>
      <h1 class="page-title">{{title}}</h1>
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
        :loading="loading"
        class="elevation-2"
        :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
        rows-per-page-text="Элементов на странице"
      >
        <v-progress-linear slot="progress" color="green" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <tr @click="redirect(props.item._id)">
            <td>{{ props.item.title }}</td>
            <td class="text-xs-center">{{ props.item.cals }}</td>
            <td class="text-xs-center">{{ props.item.prots }}</td>
            <td class="text-xs-center">{{ props.item.fats }}</td>
            <td class="text-xs-center">{{ props.item.carbs }}</td>
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
          <v-alert :value="!loading" color="error" icon="warning">Простите, данные не найдены</v-alert>
        </template>
      </v-data-table>
      <v-snackbar bottom="bottom" :color="snackColor" v-model="snackbar">{{ message }}</v-snackbar>
    </v-container>
  </div>
</template>

<script>
import ProductsList from "@/components/pages/Products/ProductsList";
import router from "@/router";

export default {
  data() {
    return {
      title: "",
      products: [],
      snackbar: false,
      message: "",
      snackColor: "red lighten-1",
      search: "",
      headers: [
        {
          text: "Продукт (100г)",
          align: "left",
          value: "title"
        },
        { text: "Калории (кКал)", value: "cals" },
        { text: "Жиры (г)", value: "fats" },
        { text: "Белки (г)", value: "prots" },
        { text: "Углеводы (г)", value: "carbs" }
      ],
      loading: true
    };
  },
  async created() {
    this.title = ProductsList.getTitle(this.$route.params.category);

    try {
      this.products = await ProductsList.getProducts(
        this.$route.params.category
      );
      const parsed = JSON.stringify(this.products);
    } catch (err) {
      this.snackbar = true;
      this.message = err.message;
    }

    this.loading = false;
  },
  methods: {
    redirect(route) {
      router.push(this.$route.params.category + "/" + route);
    }
  }
};
</script>
<style scoped>
</style>
