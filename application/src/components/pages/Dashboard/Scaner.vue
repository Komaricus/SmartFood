<template>
  <v-container v-if="!hasScaner">
    <h1>Сканер</h1>
    <p>Для того, чтобы добавить сканер, введите 6-значный пароль:</p>
    <v-text-field
      style="float: left; width: 70%;"
      v-model="scanerName"
      :counter="6"
      :error-messages="scanerNameErrors"
      label="Пароль"
      required
      @input="$v.scanerName.$touch()"
      @blur="$v.scanerName.$touch()"
    ></v-text-field>
    <v-btn style="float: right;" color="primary" @click="connectButtonClicked()">Подключить</v-btn>
    <v-snackbar bottom="bottom" :color="snackbarColor" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
  <v-container v-else>
    <v-btn
      class="my-4"
      style="float: right; color: white;"
      color="red lighten-1"
      @click="disconnectButtonClicked()"
    >Отключить</v-btn>
    <h1 class="my-4">Сканер №{{scaner.name}}</h1>

    <v-data-table
      :headers="productsHeaders"
      :items="products"
      :loading="loading"
      class="elevation-2"
      :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
      rows-per-page-text="Элементов на странице"
    >
      <v-progress-linear v-slot:progress color="red" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props" v-if="!loading">
        <td>
          <v-autocomplete
            v-if="props.item._id < 0"
            v-model="props.item._id"
            :items="productsItems"
            item-text="title"
            item-value="_id"
            label="Выбор продукта"
            required
            @input="productChanged(props.item, props.item.sku)"
          ></v-autocomplete>
          <div v-else>
            <router-link
              :to="`/products-menu/${props.item.type}/${props.item._id}`"
            >{{ props.item.title }}</router-link>
          </div>
        </td>
        <td>{{ props.item.sku[0] }}</td>
        <td class="text-xs-right">
          <v-edit-dialog
            :return-value.sync="amount"
            large
            lazy
            @save="save(props.item)"
            @cancel="cancel"
            @close="close"
            @open="open(props.item)"
          >
            <v-icon size="16" class="mr-2">edit</v-icon>

            <div>{{ props.item.amount }}</div>

            <template slot="input">
              <div class="mt-3 title">Изменить</div>
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
        <td class="text-xs-center">
          <v-edit-dialog
            :return-value.sync="days"
            large
            lazy
            @save="saveDays(props.item)"
            @cancel="cancel"
            @close="close"
            @open="openDays(props.item)"
          >
            <v-icon size="16" class="mr-2">edit</v-icon>
            <div>{{ props.item.days }}</div>
            <template slot="input">
              <div class="mt-3 title">Изменить</div>
            </template>
            <template slot="input">
              <v-text-field
                v-model="days"
                label="Количество"
                single-line
                autofocus
                :error-messages="daysErrors"
                required
                @input="$v.days.$touch()"
                @blur="$v.days.$touch()"
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </td>
      </template>

      <template
        slot="pageText"
        slot-scope="props"
      >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
      <template slot="no-data" v-if="!loading">
        <v-alert :value="true" color="error" icon="warning">Продукты не добавлены</v-alert>
      </template>
    </v-data-table>

    <div class="text-xs-right my-3">
      <v-btn color="orange lighten-2" @click="refreshCodes()">Обновить</v-btn>
      <v-btn color="green lighten-2" @click="addAllToFridge()">Добавить всё</v-btn>
    </div>
    <v-snackbar bottom="bottom" :color="snackbarColor" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
</template>
<script>
import Axios from "axios";
import { BACK_END_URL } from "@/router";

import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  numeric,
  minValue,
  maxValue
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    scanerName: { required, maxLength: maxLength(6), minLength: minLength(6) },
    amount: {
      required,
      numeric,
      minValue: minValue(0),
      maxValue: maxValue(100000)
    },
    days: {
      required,
      numeric,
      minValue: minValue(0),
      maxValue: maxValue(100000)
    }
  },
  data() {
    return {
      scanerName: "",
      scaner: {},
      message: "",
      snackbarColor: "green",
      snackbar: false,
      hasScaner: false,
      products: [],
      productsHeaders: [
        {
          text: "Продукт",
          align: "left",
          value: "title"
        },
        { text: "Код (EAN-13)", value: "sku" },
        { text: "Количество (г)", value: "amount" },
        { text: "Срок годности (дни)", value: "days" }
      ],

      amount: "1",
      days: "1",
      productsItems: [],
      loading: true
    };
  },
  created() {
    if (this.$cookie.get("scaner")) {
      this.loadScaner(this, this.$cookie.get("scaner"));
      this.hasScaner = true;
    }
  },
  methods: {
    addAllToFridge() {
      var index = -1;

      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i]._id < 0) {
          index = i;
          break;
        }
      }

      if (index != -1) {
        this.snackbarColor = "red";
        this.snackbar = true;
        this.message = "Выберите не найденные продукты";
      } else {
        for (let i = 0; i < this.products.length; i++) {
          var newProduct = {};
          for (var key in this.products[i]) {
            newProduct[key] = this.products[i][key];
          }
          var currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + +newProduct.days);
          newProduct.days = `${
            currentDate.getDate() < 10
              ? "0" + currentDate.getDate()
              : currentDate.getDate()
          }.${
            currentDate.getMonth() < 10
              ? "0" + (currentDate.getMonth() + 1)
              : currentDate.getMonth()
          }.${currentDate.getFullYear()}`;

          this.$emit("productAdded", newProduct);
        }

        this.scanerName = "";
        this.scaner = {};
        this.products = [];
        this.productsItems = [];
        this.hasScaner = false;
        this.$cookie.delete("scaner");
        this.$v.$reset();
      }
    },
    open(target) {
      this.amount = target.amount;
    },
    openDays(target) {
      this.days = target.days;
    },
    save(target) {
      if (this.$v.$invalid) {
        var newMessage = {};
        this.snackbarColor = "red";
        this.message = "Ошибка в введенных данных";
        this.snackbar = true;

        this.$v.$touch();
      } else {
        target.amount = this.amount;
      }
    },
    async productChanged(item, sku) {
      item.title = "";

      this.products[
        this.products.findIndex(product => product.sku[0] == sku[0])
      ] = Object.assign(
        this.productsItems.find(product => product._id == item._id),
        { sku: item.sku, amount: item.amount, days: item.days }
      );

      var context = this;

      // Update sku in DB
      await Axios.post(`${BACK_END_URL}/product/sku/${item._id}`, {
        sku: item.sku[0]
      }).then(({ data }) => {
        context.snackbar = true;
        context.message = "Штрих-код добавлен продукту";
      });

      this.$v.$reset();
    },
    saveDays(target) {
      if (this.$v.$invalid) {
        var newMessage = {};
        this.snackbarColor = "red";
        this.message = "Ошибка в введенных данных";
        this.snackbar = true;

        this.$v.$touch();
      } else {
        target.days = this.days;
      }
    },
    cancel() {
      this.snackbarColor = "warning";
      this.message = "Отменено";
      this.snackbar = true;
    },
    close() {
      this.$v.$reset();
      this.amount = "1";
      this.days = "1";
    },
    async loadScaner(context, name) {
      this.loading = true;

      await Axios.get(`${BACK_END_URL}/scaner/${name}`).then(({ data }) => {
        if (data.length > 0) {
          context.$set(context, "scaner", data[0]);
          context.scanerName = data[0].name;
          context.message = "Сканер подключен";
          context.snackbarColor = "green";
          context.snackbar = true;
          context.hasScaner = true;
          context.$cookie.set("scaner", name);
          context.products = [];
        } else {
          context.hasScaner = false;
          context.$cookie.delete("scaner");
          context.message = "Сканер не найден";
          context.snackbarColor = "red";
          context.snackbar = true;
        }
      });

      await context.scaner.barcodes.forEach((item, index, array) => {
        Axios.get(`${BACK_END_URL}/product/sku/${item}`)
          .then(function(response) {
            if (response.data.length > 0) {
              context.products.push(
                Object.assign(response.data[0], { amount: 100, days: 1 })
              );
            } else {
              context.products.push({
                title: "Не найдено",
                _id: -index,
                sku: [item],
                amount: 100,
                days: 1
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });

      this.loading = false;
    },

    connectButtonClicked() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.loadScaner(this, this.scanerName);
      }
    },
    disconnectButtonClicked() {
      this.scaner = {};
      this.scanerName = "";
      this.$v.$reset();
      this.$cookie.delete("scaner");
      this.message = "Сканер отключен";
      this.snackbarColor = "green";
      this.snackbar = true;
      this.hasScaner = false;
    },
    refreshCodes() {
      this.loadScaner(this, this.scanerName);
    }
  },
  mounted() {
    if (localStorage.getItem("dashboard_products")) {
      try {
        this.productsItems = JSON.parse(
          localStorage.getItem("dashboard_products")
        );
      } catch (e) {
        localStorage.removeItem("dashboard_products");
      }
    }
  },
  computed: {
    scanerNameErrors() {
      const errors = [];
      if (!this.$v.scanerName.$dirty) return errors;
      !this.$v.scanerName.maxLength && errors.push("Длина 6 символов");
      !this.$v.scanerName.minLength && errors.push("Длина 6 символов");
      !this.$v.scanerName.required && errors.push("Введите пароль");
      return errors;
    },
    amountErrors() {
      const errors = [];
      if (!this.$v.amount.$dirty) return errors;
      !this.$v.amount.required && errors.push("Заполните поле");
      !this.$v.amount.numeric && errors.push("Должно быть целым числом");
      !this.$v.amount.minValue && errors.push("Минимальное значение: 0");
      !this.$v.amount.maxValue &&
        errors.push("Превышено максимальное значение");
      return errors;
    },
    daysErrors() {
      const errors = [];
      if (!this.$v.days.$dirty) return errors;
      !this.$v.days.required && errors.push("Заполните поле");
      !this.$v.days.numeric && errors.push("Должно быть целым числом");
      !this.$v.days.minValue && errors.push("Минимальное значение: 0");
      !this.$v.days.maxValue && errors.push("Превышено максимальное значение");
      return errors;
    }
  }
};
</script>
<style scoped>
</style>

