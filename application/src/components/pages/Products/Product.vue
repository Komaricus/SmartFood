<template>
  <v-container>
    <app-header></app-header>
    <v-layout class="page-layout" column justify-center align-center>
      <h1 class="page-title">{{ product.title }}</h1>
      <v-card light tile flat class="card ma-1 elevation-2">
        <v-card-text>
          <div v-if="product.exDate">
            <h3>Срок годности</h3>
            <p>{{product.exDate}} дн.</p>
          </div>
          <h3>Состав на 100 г продукта</h3>
          <tbody>
            <tr>
              <td>Калорийность</td>
              <td class="text-xs-right">{{product.cals}} кКал</td>
            </tr>
            <tr>
              <td>Белки</td>
              <td class="text-xs-right">{{product.prots}} г</td>
            </tr>
            <tr>
              <td>Жиры</td>
              <td class="text-xs-right">{{product.fats}} г</td>
            </tr>
            <tr>
              <td>Углеводы</td>
              <td class="text-xs-right">{{product.carbs}} г</td>
            </tr>
          </tbody>
        </v-card-text>
      </v-card>
      <v-btn
        v-if="authenticated"
        @click="dialog = true;"
        color="yellow lighten-1"
      >Добавить в холодильник</v-btn>
    </v-layout>

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

            <v-btn color="blue darken-1" flat @click="addProduct();">Добавить</v-btn>
            <v-btn color="red darken-1" flat @click="resetDialog();">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-snackbar bottom="bottom" :color="snackbarColor" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
</template>
<script>
import Axios from "axios";
import { BACK_END_URL } from '@/router';
import Authentication from "@/components/pages/Authentication";
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
      authenticated: Authentication.user.authenticated,
      image: "",
      snackbar: false,
      message: "",
      product: {},
      dialog: false,
      snackbarColor: "",
      days: "",
      amount: ""
    };
  },
  async created() {
    let vm = this;
    if (!localStorage.getItem(this.$route.params.id)) {
      await Axios.get(`${BACK_END_URL}/product/${vm.$route.params.id}`)
        .then(function(response) {
          vm.product = response.data[0];
          const parsed = JSON.stringify(vm.product);
          localStorage.setItem(vm.$route.params.id, parsed);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    if (localStorage.getItem(this.$route.params.id)) {
      try {
        this.product = JSON.parse(localStorage.getItem(this.$route.params.id));
      } catch (e) {
        localStorage.removeItem(this.$route.params.id);
      }
    }
  },
  methods: {
    addProduct() {
      if (this.$v.$invalid) {
        this.snackbarColor = "red";
        this.snackbar = true;
        this.message = "Заполните обязательные поля";

        this.$v.$touch();
      } else {
        this.snackbarColor = "green";

        var newProduct = {};

        for (var key in this.product) {
          newProduct[key] = this.product[key];
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
        var userData = {};
        userData.user_id = this.$cookie.get("user_id");
        userData.name = this.$cookie.get("name");
        userData.products = JSON.parse(localStorage.getItem("products"));
        userData.products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(userData.products));
        Dashboard.postUserProducts(this, userData);

        this.resetDialog();
      }
    },
    resetDialog() {
      this.days = "";
      this.amount = "";
      this.dialog = false;
      this.$v.$reset();
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
<style scoped>
.page-title {
  text-align: center;
}

.page-layout {
  min-height: 100%;
}

td {
  width: 50%;
}

#fridge-link {
  color: white;
  text-decoration: underline;
}

#fridge-link:hover {
  color: orange;
}
</style>
