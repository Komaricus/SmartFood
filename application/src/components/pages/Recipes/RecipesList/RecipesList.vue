<template>
  <div>
    <v-container>
      <app-header></app-header>
      <h1 class="page-title">{{title}}</h1>
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="recipes"
        :search="search"
        class="elevation-2"
        :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
        rows-per-page-text="Элементов на странице"
      >
        <template slot="items" slot-scope="props">
          <tr @click="redirect(props.item._id)">
            <td>{{ props.item.title }}</td>
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
      <v-snackbar bottom="bottom" :color="snackColor" v-model="snackbar">{{ message }}</v-snackbar>
    </v-container>

    <app-footer></app-footer>
  </div>
</template>

<script>
import RecipesList from "@/components/pages/Recipes/RecipesList";
import router from "@/router";

export default {
  data() {
    return {
      title: "",
      recipes: [],
      snackbar: false,
      message: "",
      snackColor: "red lighten-1",
      search: "",
      headers: [
        {
          text: "Рецепт",
          align: "left",
          value: "title"
        }
      ]
    };
  },
  async created() {
    this.title = RecipesList.getTitle(this.$route.params.category);
    if (!localStorage.getItem(this.$route.params.category)) {
      try {
        this.recipes = await RecipesList.getRecipes(
          this.$route.params.category
        );
        const parsed = JSON.stringify(this.recipes);
        localStorage.setItem(this.$route.params.category, parsed);
      } catch (err) {
        this.snackbar = true;
        this.message = err.message;
      }
    }
  },
  mounted() {
    if (localStorage.getItem(this.$route.params.category)) {
      try {
        this.recipes = JSON.parse(
          localStorage.getItem(this.$route.params.category)
        );
      } catch (e) {
        localStorage.removeItem(this.$route.params.category);
      }
    }
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
