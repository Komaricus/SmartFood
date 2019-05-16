<template>
  <div v-if="!haveMenu">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Настройка шаблона</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">Выбор блюд</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Завершение</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <h3 class="headline">Настройка шаблона</h3>
          <p
            class="mt-3"
          >Сперва настроим шаблон для вашего персонального меню. Выберите приемы пищи и типы блюд, которые вы желаете включить в меню.</p>
          <v-checkbox class="mt-0" v-model="breakfast" label="Завтрак" color="green"></v-checkbox>
          <v-checkbox class="mt-0" v-model="lunch" label="Обед" color="green"></v-checkbox>

          <div class="ml-4" v-if="lunch">
            <v-checkbox class="mt-0" v-model="lunchFirstDish" label="Первое блюдо"></v-checkbox>
            <v-checkbox class="mt-0" v-model="lunchSecondDish" label="Второе блюдо"></v-checkbox>
            <v-checkbox class="mt-0" v-model="lunchThirdDish" label="Третье блюдо"></v-checkbox>
          </div>

          <v-checkbox class="mt-0" v-model="dinner" label="Ужин" color="green"></v-checkbox>

          <div class="text-xs-right">
            <v-btn flat color="primary" @click="toDishChoose()">Далее</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <h3 class="headline">Выбор блюд</h3>
          <p class="mt-3">Выберите по одному блюду из предложенных на каждый прием пищи.</p>

          <h3 class="mt-3" v-if="breakfast">Завтрак</h3>
          <v-progress-linear v-if="breakfast && breakfastLoading" :indeterminate="true"></v-progress-linear>
          <v-card v-if="breakfast && !breakfastLoading">
            <v-list two-line>
              <template v-for="item in breakfastItems">
                <v-list-tile :key="item.title" avatar>
                  <v-list-tile-avatar>
                    <img :src="item.img">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>
                      <router-link :to="`/recipes/${item.type[0]}/${item._id}`">{{item.title}}</router-link>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>{{getTypesTitles(item.type)}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn
                      icon
                      ripple
                      @click="(breakfastSelected._id == item._id) ? '' : breakfastSelected = item"
                    >
                      <v-icon
                        v-if="breakfastSelected._id != item._id"
                        color="grey lighten-1"
                      >check_box_outline_blank</v-icon>
                      <v-icon v-else color="green lighten-1">check_box</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>

          <h3 class="mt-3" v-if="lunch">Обед</h3>
          <v-progress-linear v-if="lunch && lunchLoading" :indeterminate="true"></v-progress-linear>
          <v-card v-if="lunch && !lunchLoading">
            <v-list two-line>
              <template v-for="item in lunchItems">
                <v-list-tile :key="item.title" avatar>
                  <v-list-tile-avatar>
                    <img :src="item.img">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <router-link :to="`/recipes/${item.type[0]}/${item._id}`">{{item.title}}</router-link>
                    <v-list-tile-sub-title>{{getTypesTitles(item.type)}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn
                      icon
                      ripple
                      @click="(lunchSelected._id == item._id) ? '' : lunchSelected = item"
                    >
                      <v-icon
                        v-if="lunchSelected._id != item._id"
                        color="grey lighten-1"
                      >check_box_outline_blank</v-icon>
                      <v-icon v-else color="green lighten-1">check_box</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>

          <h3 class="mt-3" v-if="dinner">Ужин</h3>
          <v-progress-linear v-if="dinner && dinnerLoading" :indeterminate="true"></v-progress-linear>
          <v-card v-if="dinner && !dinnerLoading">
            <v-list two-line>
              <template v-for="item in dinnerItems">
                <v-list-tile :key="item.title" avatar>
                  <v-list-tile-avatar>
                    <img :src="item.img">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <router-link :to="`/recipes/${item.type[0]}/${item._id}`">{{item.title}}</router-link>
                    <v-list-tile-sub-title>{{getTypesTitles(item.type)}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn
                      icon
                      ripple
                      @click="(dinnerSelected._id == item._id) ? '' : dinnerSelected = item"
                    >
                      <v-icon
                        v-if="dinnerSelected._id != item._id"
                        color="grey lighten-1"
                      >check_box_outline_blank</v-icon>
                      <v-icon v-else color="green lighten-1">check_box</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>

          <div class="text-xs-right">
            <v-btn flat color="orange" @click="e1 = 1">Назад</v-btn>
            <v-btn flat color="primary" @click="toFinal()">Далее</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <h3 class="headline">Готово</h3>
          <p class="mt-3">Ваше меню на сегодня создано:</p>
          <v-list two-line>
            <template v-for="(item, index) in menuItems">
              <v-subheader :key="item.id">{{meals[index]}}</v-subheader>
              <v-list-tile :key="item.title" avatar>
                <v-list-tile-avatar>
                  <img :src="item.img">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <router-link :to="`/recipes/${item.type[0]}/${item._id}`">{{item.title}}</router-link>
                  <v-list-tile-sub-title>{{getTypesTitles(item.type)}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
          <p
            class="mt-3"
          >Теперь на этой вкладке вы можете отмечать прогресс своего меню, продукты будут удалятся из холодильника автоматически.</p>
          <p>Новое меню можно будет сгенерировать завтра.</p>
          <div class="text-xs-right">
            <v-btn flat color="green" @click="haveMenu = true;">Завершить</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-snackbar bottom="bottom" :color="snackbarColor" v-model="snackbar">{{ message }}</v-snackbar>
  </div>
  <div v-else>
    <v-card>
      <h3 class="headline pa-3">Меню на сегодня</h3>
      <v-list two-line>
        <template v-for="(item, index) in menuItems">
          <v-subheader :key="item.id">{{meals[index]}}</v-subheader>
          <v-list-tile :key="item.title" avatar>
            <v-list-tile-avatar>
              <img :src="item.img">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <router-link :to="`/recipes/${item.type[0]}/${item._id}`">{{item.title}}</router-link>
              <v-list-tile-sub-title>{{getTypesTitles(item.type)}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple @click="item.checked = true; reloadMenu()" v-if="!item.checked">
                <v-icon color="grey lighten-1">check_box_outline_blank</v-icon>
              </v-btn>
              <v-icon v-if="item.checked" color="green lighten-1">check_box</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <div class="text-xs-right">
        <v-btn flat class="ma-3" color="red" @click="deleteUserMenu()">Удалить</v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import RecipesList from "@/components/pages/Recipes/RecipesList";
import Dashboard from "@/components/pages/Dashboard";

export default {
  props: ["user"],
  data() {
    return {
      e1: 0,
      breakfast: false,
      breakfastLoading: true,
      breakfastItems: [],
      breakfastSelected: "",

      lunch: false,
      lunchFirstDish: true,
      lunchSecondDish: false,
      lunchThirdDish: false,
      lunchLoading: true,
      lunchItems: [],
      lunchSelected: "",

      dinner: false,
      dinnerLoading: true,
      dinnerItems: [],
      dinnerSelected: "",

      menuItems: [],
      snackbar: false,
      message: "",
      snackbarColor: "green",
      meals: ["Завтрак", "Обед", "Ужин"],
      haveMenu: false,
      menuDate: {}
    };
  },
  created() {
    if (this.$props.user.menu.length > 0) {
      this.menuDate = new Date(this.$props.user.menu[0].date);
      this.menuDate.setUTCHours(23, 59, 59, 999);

      var currentDate = new Date();
      currentDate.setUTCHours(currentDate.getHours());

      if (this.menuDate < currentDate) {
        this.haveMenu = false;
        this.$emit("menuDeleted", []);
        this.refreshMenuCreation();
      } else {
        this.menuItems = this.$props.user.menu;
        this.haveMenu = true;
      }
    }
  },
  methods: {
    toDishChoose() {
      if (
        this.breakfast ||
        this.dinner ||
        (this.lunch &&
          (this.lunchFirstDish || this.lunchSecondDish || this.lunchThirdDish))
      ) {
        this.e1 = 2;
        this.loadRecipes();
        this.snackbar = false;
      } else {
        this.snackbarColor = "orange";
        this.message = "Выберите прием пищи";
        this.snackbar = true;
      }
    },
    toFinal() {
      if (
        (this.breakfastSelected || !this.breakfast) &&
        (this.lunchSelected || !this.lunch) &&
        (this.dinnerSelected || !this.dinner)
      ) {
        if (this.breakfast) {
          this.$set(this.breakfastSelected, "checked", false);
          this.menuItems.push(this.breakfastSelected);
        }
        if (this.lunch) {
          this.$set(this.lunchSelected, "checked", false);
          this.menuItems.push(this.lunchSelected);
        }
        if (this.dinner) {
          this.$set(this.dinnerSelected, "checked", false);
          this.menuItems.push(this.dinnerSelected);
        }

        this.snackbar = false;

        var currentDate = new Date();
        this.menuItems[0].date = currentDate;

        this.$emit("menuAdded", this.menuItems);
        this.e1 = 3;
      } else {
        this.snackbarColor = "orange";
        this.message = "Выберите блюда";
        this.snackbar = true;
      }
    },
    deleteUserMenu() {
      this.$emit("menuDeleted", []);
      this.refreshMenuCreation();
    },
    reloadMenu() {
      this.$emit("menuAdded", this.menuItems);
    },
    async loadRecipes() {
      if (this.breakfast) {
        try {
          this.breakfastItems = await RecipesList.getRecipesByMeal("breakfast");
          this.breakfastLoading = false;
        } catch (err) {
          this.snackbar = true;
          this.message = err.message;
        }
      }

      this.lunchItems = [];
      this.lunchLoading = true;
      if (
        this.lunch &&
        (this.lunchFirstDish || this.lunchSecondDish || this.lunchThirdDish)
      ) {
        try {
          if (this.lunchFirstDish) {
            this.lunchItems = this.lunchItems.concat(
              await RecipesList.getRecipes("soups")
            );
          }
          if (this.lunchSecondDish) {
            this.lunchItems = this.lunchItems.concat(
              await RecipesList.getRecipes("second-dishes")
            );
          }
          if (this.lunchThirdDish) {
            var allLunchRecipes = await RecipesList.getRecipesByMeal("lunch");
            for (let index = 0; index < allLunchRecipes.length; index++) {
              if (
                allLunchRecipes[index].type.indexOf("soups") == -1 &&
                allLunchRecipes[index].type.indexOf("second-dishes") == -1
              )
                this.lunchItems.push(allLunchRecipes[index]);
            }
          }

          this.lunchLoading = false;
        } catch (err) {
          this.snackbar = true;
          this.message = err.message;
        }
      }

      if (this.dinner) {
        try {
          this.dinnerItems = await RecipesList.getRecipesByMeal("dinner");
          this.dinnerLoading = false;
        } catch (err) {
          this.snackbar = true;
          this.message = err.message;
        }
      }
    },
    getTypesTitles(type) {
      var titlesString = "";
      for (let index = 0; index < type.length; index++) {
        titlesString += RecipesList.getTitle(type[index]);
        if (index != type.length - 1) {
          titlesString += ", ";
        }
      }

      return titlesString;
    },
    refreshMenuCreation() {
      this.e1 = 0;
      this.breakfast = false;
      this.breakfastLoading = true;
      this.breakfastItems = [];
      this.breakfastSelected = "";

      this.lunch = false;
      this.lunchFirstDish = true;
      this.lunchSecondDish = false;
      this.lunchThirdDish = false;
      this.lunchLoading = true;
      this.lunchItems = [];
      this.lunchSelected = "";

      this.dinner = false;
      this.dinnerLoading = true;
      this.dinnerItems = [];
      this.dinnerSelected = "";

      this.menuItems = [];
      this.haveMenu = false;
    }
  }
};
</script>
<style scoped>
a {
  color: green;
}

a:hover {
  color: orange;
}
</style>
