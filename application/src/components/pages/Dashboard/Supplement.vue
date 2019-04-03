<template>
  <v-tabs centered color="light-blue darken-2" dark icons-and-text>
    <v-tabs-slider color="purple accent-2"></v-tabs-slider>

    <v-tab href="#products">
      Продукты
      <v-icon>kitchen</v-icon>
    </v-tab>

    <v-tab href="#dishes">
      Блюда
      <v-icon>room_service</v-icon>
    </v-tab>

    <v-tab-item value="products">
      <v-card flat>
        <v-card-title>
          <v-toolbar-title class="mr-5">Добавление продуктов</v-toolbar-title>
          <v-menu transition="slide-y-transition" bottom>
            <v-btn slot="activator" color="green" outline>{{titleProducts}}</v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, i) in productsItems"
                :key="i"
                @click="clickProductsMenu(item.category)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-text-field
            color="green lighten-1"
            v-model="productsSearch"
            append-icon="search"
            label="Поиск"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="productsHeaders"
          :items="products"
          :search="productsSearch"
          :loading="loadProducts"
          :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
          rows-per-page-text="Элементов на странице"
        >
          <v-progress-linear v-slot:progress color="red" indeterminate></v-progress-linear>
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
                  @click.stop="dialog = true; type = true; selectedProduct = props.item; if (selectedProduct.exDate) days = selectedProduct.exDate;"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-center">
                <v-edit-dialog
                  :return-value.sync="amount"
                  large
                  lazy
                  @save="addToShoppingListButtonClicked(props.item)"
                  @cancel="cancel"
                  @close="close"
                >
                  <v-btn flat icon>
                    <v-icon color="orange">check_circle_outline</v-icon>
                  </v-btn>
                  <template slot="input">
                    <div class="mt-3 title">Сколько (в гр)?</div>
                  </template>
                  <template slot="input">
                    <v-text-field
                      v-model="amount"
                      label="Количество"
                      single-line
                      autofocus
                      :error-messages="amountErrors"
                      required
                      @input="$v.amount.$touch()"
                      @blur="$v.amount.$touch()"
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
            </tr>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >По запросу "{{ productsSearch }}" ничего не найдено.</v-alert>
          <template
            slot="pageText"
            slot-scope="props"
          >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
          <template v-if="productsCategorySelected" slot="no-data">
            <v-alert :value="true" color="error" icon="warning">Простите, данные не найдены</v-alert>
          </template>
          <template v-if="!productsCategorySelected" slot="no-data">
            <v-alert :value="true" color="warning" icon="warning">Выберите категорию продукта</v-alert>
          </template>
        </v-data-table>

        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">Параметры</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 v-if="type">
                      <v-text-field
                        id="amount"
                        v-model="amount"
                        label="Количество продукта"
                        hint="Указывается в граммах"
                        :error-messages="amountErrors"
                        color="green lighten-1"
                        required
                        @keyup.enter="addButtonClicked()"
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
                        @keyup.enter="addButtonClicked()"
                        @input="$v.days.$touch()"
                        @blur="$v.days.$touch()"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" flat @click="addButtonClicked()">Добавить</v-btn>
                <v-btn color="red darken-1" flat @click="resetDialog()">Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-card>
    </v-tab-item>

    <v-tab-item value="dishes">
      <v-card flat>
        <v-card-title>
          <v-toolbar-title class="mr-5">Добавление блюд</v-toolbar-title>
          <v-menu transition="slide-y-transition" bottom>
            <v-btn slot="activator" color="green" outline>{{titleDishes}}</v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, i) in dishesItems"
                :key="i"
                @click="clickDishesMenu(item.category)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-text-field
            color="green lighten-1"
            v-model="dishesSearch"
            append-icon="search"
            label="Поиск"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="dishesHeaders"
          :items="dishes"
          :search="dishesSearch"
          :loading="loadDishes"
          :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
          rows-per-page-text="Элементов на странице"
        >
          <v-progress-linear v-slot:progress color="red" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <router-link
                  :to="`/recipes/${props.item.type[0]}/${props.item._id}`"
                >{{ props.item.title }}</router-link>
              </td>
              <td class="text-xs-center">{{ props.item.portions }}</td>
              <td class="text-xs-center">
                <v-btn
                  flat
                  icon
                  color="green"
                  @click.stop="dialog = true; type = false; amount = 1; selectedDish = props.item"
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
          >По запросу "{{ dishesSearch }}" ничего не найдено.</v-alert>
          <template
            slot="pageText"
            slot-scope="props"
          >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
          <template v-if="dishesCategorySelected" slot="no-data">
            <v-alert :value="true" color="error" icon="warning">Простите, данные не найдены</v-alert>
          </template>
          <template v-if="!dishesCategorySelected" slot="no-data">
            <v-alert :value="true" color="warning" icon="warning">Выберите категорию блюд</v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>
<script>
import ProductsList from "@/components/pages/Products/ProductsList";
import RecipesList from "@/components/pages/Recipes/RecipesList";
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
      titleProducts: "Категория",
      titleDishes: "Категория",
      loadProducts: false,
      loadDishes: false,
      productsCategorySelected: false,
      dishesCategorySelected: false,
      products: [],
      dishes: [],
      productsSearch: "",
      dishesSearch: "",
      dialog: false,
      days: "",
      amount: "",
      selectedProduct: {},
      selectedDish: {},
      type: true,
      productsHeaders: [
        {
          text: "Продукт (100г)",
          align: "left",
          value: "title"
        },
        { text: "Калории (кКал)", align: "center", value: "cals" },
        { text: "В холодильник", align: "center", sortable: false },
        { text: "В список покупок", align: "center", sortable: false }
      ],
      dishesHeaders: [
        {
          text: "Блюдо",
          align: "left",
          value: "title"
        },
        { text: "Порции", align: "center", value: "portions" },
        { text: "В холодильник", align: "center", sortable: false }
      ],
      productsItems: [
        { title: "Фрукты", category: "fruits" },
        { title: "Овощи", category: "vegetables" },
        { title: "Мясо", category: "meat" },
        { title: "Морепродукты", category: "seafood" },
        { title: "Молочные продукты", category: "dairy" },
        { title: "Крупы", category: "cereals" },
        { title: "Птица", category: "poultry" },
        { title: "Специи и соусы", category: "condiment" }
      ],
      dishesItems: [
        { title: "Салаты", category: "salads" },
        { title: "Вторые блюда", category: "second-dishes" },
        { title: "Закуски", category: "starters" },
        { title: "Супы", category: "soups" },
        { title: "Выпечка", category: "bakery" },
        { title: "Напитки", category: "drinks" },
        { title: "Десерты", category: "deserts" },
        { title: "Другие рецепты", category: "others" }
      ],
      types: [
        "fruits",
        "vegetables",
        "meat",
        "seafood",
        "dairy",
        "cereals",
        "poultry",
        "condiment"
      ]
    };
  },
  methods: {
    close() {
      this.$v.$reset();
      this.amount = "";
    },
    cancel() {
      var newMessage = {};
      newMessage.snackbarColor = "warning";
      newMessage.message = "Отменено";
      newMessage.snackbar = true;

      this.$emit("messageChange", newMessage);
    },
    addToShoppingListButtonClicked(product) {
      if (this.amountErrors.length) {
        var newMessage = {};
        newMessage.snackbarColor = "red";
        newMessage.message = "Ошибка в введенных данных";
        newMessage.snackbar = true;

        this.$emit("messageChange", newMessage);
        this.$v.$touch();
      } else {
        var item = {};
        item._id = product._id;
        item.title = product.title;
        if (product.exDate) {
          item.exDate = product.exDate;
        }
        var type = this.types.indexOf(product.type);
        item.amount = this.amount;

        this.$emit("itemAddedToList", item, type);
      }
    },
    async clickProductsMenu(category) {
      this.productsSearch = "";
      this.loadProducts = true;
      this.productsCategorySelected = true;
      this.titleProducts = ProductsList.getTitle(category);
      if (!localStorage.getItem(category)) {
        this.products = await ProductsList.getProducts(category);
      } else {
        try {
          this.products = JSON.parse(localStorage.getItem(category));
        } catch (e) {
          localStorage.removeItem(category);
        }
      }
      this.loadProducts = false;
    },
    addProduct(product) {
      if (this.$v.$invalid) {
        var newMessage = {};
        newMessage.snackbarColor = "red";
        newMessage.snackbar = true;
        newMessage.message = "Заполните обязательные поля";

        this.$emit("messageChange", newMessage);
        this.$v.$touch();
      } else {
        var newProduct = {};

        for (var key in product) {
          newProduct[key] = product[key];
        }
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + +this.days);
        newProduct.days = `${
          currentDate.getDate() < 10
            ? "0" + currentDate.getDate()
            : currentDate.getDate()
        }.${
          currentDate.getMonth() < 10
            ? "0" + (currentDate.getMonth() + 1)
            : currentDate.getMonth()
        }.${currentDate.getFullYear()}`;
        newProduct.amount = this.amount;

        this.$emit("productAdded", newProduct);

        this.resetDialog();
        this.selectedProduct = {};
      }
    },
    async clickDishesMenu(category) {
      this.dishesSearch = "";
      this.loadDishes = true;
      this.dishesCategorySelected = true;
      this.titleDishes = RecipesList.getTitle(category);
      if (!localStorage.getItem(category)) {
        this.dishes = await RecipesList.getRecipes(category);
      } else {
        try {
          this.dishes = JSON.parse(localStorage.getItem(category));
        } catch (e) {
          localStorage.removeItem(category);
        }
      }
      this.loadDishes = false;
    },
    addDish(dish) {
      if (this.$v.$invalid) {
        var newMessage = {};
        newMessage.snackbarColor = "red";
        newMessage.snackbar = true;
        newMessage.message = "Заполните обязательные поля";

        this.$emit("messageChange", newMessage);
        this.$v.$touch();
      } else {
        var newDish = {};

        for (var key in dish) {
          newDish[key] = dish[key];
        }
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + +this.days);
        newDish.days = `${
          currentDate.getDate() < 10
            ? "0" + currentDate.getDate()
            : currentDate.getDate()
        }.${
          currentDate.getMonth() < 10
            ? "0" + (currentDate.getMonth() + 1)
            : currentDate.getMonth()
        }.${currentDate.getFullYear()}`;

        this.$emit("dishAdded", newDish);

        this.resetDialog();
        this.selectedDish = {};
      }
    },
    resetDialog() {
      this.days = "";
      this.amount = "";
      this.dialog = false;
      this.$v.$reset();
    },
    addButtonClicked() {
      if (this.type) {
        this.addProduct(this.selectedProduct);
      } else {
        this.addDish(this.selectedDish);
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
</style>