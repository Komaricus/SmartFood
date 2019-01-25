<template>
  <v-container>
    <app-header></app-header>
    <h1 class="page-title">{{ recipe.title }}</h1>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 order-md1 order-sm2 order-xs2>
        <v-card light tile flat class="card ma-1 elevation-2">
          <v-card-text>
            <h3>Категории блюд</h3>
            <div class="categories-container">
              <div v-for="category in categories" v-bind:key="category.id">
                <router-link :to="'/recipes/' + category.type">{{category.name}}</router-link>
              </div>
            </div>
            <h3>Приемы пищи</h3>
            <div class="categories-container">
              <div v-for="item in meals" v-bind:key="item.id">
                <div>{{item.name}}</div>
              </div>
            </div>
            <h3>Количество порций</h3>
            <p>{{ recipe.portions }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 order-md3 order-sm3 order-xs3>
        <v-card light tile flat class="card ma-1 elevation-2">
          <v-card-text>
            <div v-for="ingredient in recipe.ingredients" v-bind:key="ingredient.id">
              <router-link :to="'/products/' + ingredient.id">{{ingredient.title}}</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6 order-md2 order-sm1 order-xs1 v-if="recipe.img">
        <v-img :src="`/static/img/${$route.params.id}.jpg`" class="recipe-image ma-1 elevation-2"></v-img>
      </v-flex>
      <v-flex xs12 sm12 md12 order-md5 order-sm5 order-xs5 v-if="recipe.descr">
        <v-card tile flat class="ma-1 pa-3 elevation-2">
          <h3 class="mb-3">Описание</h3>
          <p class="recipe-description">{{ recipe.descr }}</p>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 order-md4 order-sm5 order-xs5 v-if="recipe.method">
        <v-card tile flat class="ma-1 pa-3 elevation-2">
          <h3 class="mb-3">Способ приготовления блюда {{ recipe.title }}</h3>
          <p class="recipe-method" v-html="recipe.method"></p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Axios from "axios";
import RecipesList from "@/components/pages/Recipes/RecipesList";

const SmartFridgeAPI = "https://smart-food-app.herokuapp.com";

export default {
  data() {
    return {
      image: "",
      recipe: {},
      categories: [],
      meals: []
    };
  },
  async created() {
    if (!localStorage.getItem(this.$route.params.id)) {
      let vm = this;
      await Axios.get(`${SmartFridgeAPI}/recipe/${vm.$route.params.id}`)
        .then(function(response) {
          vm.recipe = response.data[0];
          const parsed = JSON.stringify(vm.recipe);
          localStorage.setItem(vm.$route.params.id, parsed);
          vm.getCategories();
          vm.getMeals();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  methods: {
    getCategories() {
      this.recipe.type.forEach((item, index, array) => {
        this.categories.push({
          id: index,
          type: item,
          name: RecipesList.getTitle(item)
        });
      });
    },
    getMeals() {
      this.recipe.meal.forEach((item, index, array) => {
        this.meals.push({
          id: index + 10,
          name: this.getMealTitle(item)
        });
      });
    },
    getMealTitle(title) {
      switch (title) {
        case "breakfast":
          return "Завтрак";
          break;
        case "lunch":
          return "Обед";
          break;
        case "dinner":
          return "Ужин";
          break;
        default:
          return "Error";
          break;
      }
    }
  },
  mounted() {
    if (localStorage.getItem(this.$route.params.id)) {
      try {
        this.recipe = JSON.parse(localStorage.getItem(this.$route.params.id));
        this.getCategories();
        this.getMeals();
      } catch (e) {
        localStorage.removeItem(this.$route.params.id);
      }
    }
  }
};
</script>
<style scoped>
.recipe-image {
  max-height: 500px;
}

td {
  width: 50%;
}

.categories-container {
  margin-bottom: 2rem;
}

a {
  color: green;
}

a:hover {
  color: orange;
}
</style>
