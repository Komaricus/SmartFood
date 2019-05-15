<template>
  <div>
    <v-container class="page-container">
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
        :items="diets"
        :search="search"
        :loading="loading"
        class="elevation-2"
        :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
        rows-per-page-text="Элементов на странице"
      >
        <v-progress-linear slot="progress" color="green" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <tr @click="redirect(props.item._id)">
            <td>{{ props.item.name }}</td>
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

    <app-footer></app-footer>
  </div>
</template>

<script>
import DietsList from "@/components/pages/Diets/DietsList";
import router from "@/router";

export default {
  data() {
    return {
      title: "",
      diets: [],
      snackbar: false,
      message: "",
      snackColor: "red lighten-1",
      search: "",
      headers: [
        {
          text: "Диета",
          align: "left",
          value: "title"
        }
      ],
      loading: true
    };
  },
  async created() {
    this.title = DietsList.TITLES[this.$route.params.category] || "Ошибка";
    try {
      this.diets = await DietsList.getDiets(this.$route.params.category);
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  },
  mounted() {},
  methods: {
    redirect(route) {
      router.push(this.$route.params.category + "/" + route);
    }
  }
};
</script>
<style scoped>
.page-container {
  min-height: 90vh;
}
</style>
