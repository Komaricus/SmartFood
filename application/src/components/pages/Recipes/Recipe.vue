<template>
  <v-container>
    <app-header></app-header>
    <h1 class="page-title">{{ recipe.title }}</h1>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 order-md1 order-sm2 order-xs2>
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
      <v-flex xs12 sm12 md12 order-md3 order-sm4 order-xs3>
        <v-card light tile flat class="card ma-1 elevation-2">
          <v-data-table
            :headers="headers"
            :items="recipe.ingredients"
            hide-actions
            :loading="loading"
          >
            <v-progress-linear slot="progress" color="green" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr @click="redirect(props.item.product.type, props.item.id)">
                <td>{{ props.item.product.title }}</td>
                <td class="text-xs-right">{{ props.item.weight }}</td>
                <td
                  class="text-xs-center"
                >{{ Math.ceil(props.item.product.cals * props.item.weight / 100 *100)/100}}</td>
                <td
                  class="text-xs-center"
                >{{ Math.ceil(props.item.product.prots * props.item.weight / 100 *100)/100}}</td>
                <td
                  class="text-xs-center"
                >{{ Math.ceil(props.item.product.fats * props.item.weight / 100 *100)/100}}</td>
                <td
                  class="text-xs-center"
                >{{ Math.ceil(props.item.product.carbs * props.item.weight / 100 *100)/100}}</td>
              </tr>
            </template>
            <template slot="footer">
              <tr>
                <td>
                  <strong>Итого</strong>
                </td>
                <td class="text-xs-right">{{ total.weight }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.cals)/100 }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.prots)/100 }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.fats)/100 }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.carbs)/100 }}</td>
              </tr>
              <tr>
                <td>
                  <strong>На 100 грамм</strong>
                </td>
                <td class="text-xs-right">100</td>
                <td class="text-xs-center">{{ Math.ceil(total.cals / (total.weight/100) *100)/100 }}</td>
                <td
                  class="text-xs-center"
                >{{ Math.ceil(total.prots / (total.weight/100) *100)/100 }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.fats / (total.weight/100) *100)/100 }}</td>
                <td
                  class="text-xs-center"
                >{{ Math.ceil(total.carbs / (total.weight/100) *100)/100 }}</td>
              </tr>
              <tr>
                <td>
                  <strong>На 1 порцию</strong>
                </td>
                <td class="text-xs-right">{{ Math.ceil(total.weight / recipe.portions) }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.cals / recipe.portions*100)/100 }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.prots / recipe.portions*100)/100 }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.fats / recipe.portions*100)/100 }}</td>
                <td class="text-xs-center">{{ Math.ceil(total.carbs / recipe.portions*100)/100 }}</td>
              </tr>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">Простите, данные не найдены</v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6 order-md2 order-sm1 order-xs1 v-if="recipe.img">
        <v-img :src="`/static/img/${$route.params.id}.jpg`" class="recipe-image ma-1 elevation-2"></v-img>
      </v-flex>
      <v-flex xs12 sm6 md12 order-md5 order-sm3 order-xs5 v-if="recipe.descr">
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
import router from "@/router";

const SmartFridgeAPI = "https://smart-food-app.herokuapp.com";

export default {
  data() {
    return {
      image: "",
      recipe: {},
      categories: [],
      meals: [],
      headers: [
        {
          text: "Продукт",
          align: "left",
          value: "title",
          sortable: false
        },
        {
          text: "Вес (г)",
          align: "right",
          value: "weight",
          sortable: false
        },
        {
          text: "Калории (кКал)",
          value: "product.cals",
          align: "center",
          sortable: false
        },
        {
          text: "Белки (г)",
          value: "product.prots",
          align: "center",
          sortable: false
        },
        {
          text: "Жиры (г)",
          value: "product.fats",
          align: "center",
          sortable: false
        },
        {
          text: "Углеводы (г)",
          value: "product.carbs",
          align: "center",
          sortable: false
        }
      ],
      loading: true,
      total: {
        weight: 0,
        cals: 0,
        prots: 0,
        fats: 0,
        carbs: 0
      }
    };
  },
  async beforeCreate() {
    if (!localStorage.getItem(this.$route.params.id)) {
      let vm = this;
      await Axios.get(`${SmartFridgeAPI}/recipe/${vm.$route.params.id}`)
        .then(function(response) {
          vm.recipe = response.data[0];
          vm.getCategories();
          vm.getMeals();
          const parsed = JSON.stringify(vm.recipe);
          localStorage.setItem(vm.$route.params.id, parsed);
        })
        .catch(function(error) {
          console.log(error);
        });

      await vm.recipe.ingredients.forEach((item, index, array) => {
        Axios.get(`${SmartFridgeAPI}/product/${item.id}`)
          .then(function(response) {
            vm.$set(item, "product", response.data[0]);
            const parsed = JSON.stringify(vm.recipe);
            localStorage.setItem(vm.$route.params.id, parsed);
            vm.countTotal(item);
          })
          .catch(function(error) {
            console.log(error);
          });
      });

      vm.loading = false;
    }
  },
  methods: {
    countTotal(item) {
      let vm = this;
      vm.total.weight += parseFloat(item.weight);
      vm.total.cals +=
        Math.ceil(((parseFloat(item.product.cals) * item.weight) / 100) * 100) /
        100;
      vm.total.prots +=
        Math.ceil(
          ((parseFloat(item.product.prots) * item.weight) / 100) * 100
        ) / 100;
      vm.total.fats +=
        Math.ceil(((parseFloat(item.product.fats) * item.weight) / 100) * 100) /
        100;
      vm.total.carbs +=
        Math.ceil(
          ((parseFloat(item.product.carbs) * item.weight) / 100) * 100
        ) / 100;
    },
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
    },
    redirect(type, id) {
      router.push("../../products-menu/" + type + "/" + id);
    }
  },
  mounted() {
    if (localStorage.getItem(this.$route.params.id)) {
      try {
        this.recipe = JSON.parse(localStorage.getItem(this.$route.params.id));
        this.getCategories();
        this.getMeals();

        let vm = this;
        this.recipe.ingredients.forEach((item, index, array) => {
          vm.countTotal(item);
        });

        this.loading = false;
      } catch (e) {
        console.log(e);
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
