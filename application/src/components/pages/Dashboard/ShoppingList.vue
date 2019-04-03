<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-toolbar
            class="red white--text"
            v-if="shoppingList.length == 0"
          >Вы ещё ничего не добавили в список покупок.</v-toolbar>
          <v-list expand v-if="shoppingList.length != 0">
            <v-list-group v-for="(item, key) in shoppingList" :key="key" v-model="item.active">
              <template slot="activator">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-tile
                :class=" subItem.color"
                v-for="subItem in item.items"
                :key="subItem.title"
              >
                <v-list-tile-content>
                  <v-list-tile-title class="font-weight-medium">{{ subItem.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-edit-dialog
                      :return-value.sync="amount"
                      large
                      lazy
                      @save="save(item, subItem)"
                      @open="open(subItem)"
                      @cancel="cancel"
                      @close="close"
                    >
                      <div>Кол-во: {{ subItem.amount }} (г)</div>
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
                          @input="$v.amount.$touch()"
                          @blur="$v.amount.$touch()"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-layout>
                    <v-btn flat icon>
                      <v-icon color="green darken-1" @click="checked(subItem)">check</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat icon>
                      <v-icon color="red" @click="removeFromList(item, subItem)">close</v-icon>
                    </v-btn>
                  </v-layout>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Параметры</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
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

            <v-btn color="blue darken-1" flat @click="addButtonClicked(selectedProduct)">Добавить</v-btn>
            <v-btn color="red darken-1" flat @click="resetDialog()">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
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
      minValue: minValue(0),
      maxValue: maxValue(100000)
    }
  },
  props: ["user"],
  data() {
    return {
      dialog: false,
      amount: "",
      days: "",
      selectedProduct: {},
      colors: {
        Фрукты: "lime accent-3",
        Овощи: "light-green lighten-3",
        Мясо: "red lighten-3",
        Морепродукты: "light-blue lighten-3",
        "Молочные продукты": "cyan lighten-3",
        "Крупы и мучные изделия": "orange lighten-3",
        Птица: "purple lighten-3",
        "Специи и соусы": "teal lighten-3"
      }
    };
  },
  methods: {
    addButtonClicked(product) {
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
    resetDialog() {
      this.days = "";
      this.amount = "";
      this.dialog = false;
      this.$v.$reset();
    },
    checked(subItem) {
      this.dialog = true;
      this.selectedProduct = subItem;
      if (subItem.exDate) {
        this.days = subItem.exDate;
      }
      this.amount = subItem.amount;
    },
    removeFromList(item, subItem) {
      item.items.splice(item.items.indexOf(subItem), 1);
      if (this.shoppingList.length > 0) {
        this.$emit("listChanged", this.shoppingList);
      } else {
        var list = [];
        for (var key in this.colors) {
          list.push({ title: key, active: true, items: [] });
        }
        this.$emit("listChanged", list);
      }
    },
    inFridge(item) {
      for (var i = 0; i < this.$props.user.products.length; i++) {
        if (
          this.$props.user.products[i]._id == item._id &&
          +this.$props.user.products[i].amount >= +item.amount
        ) {
          return true;
        }
      }
      return false;
    },
    save(item, subItem) {
      if (this.$v.$invalid) {
        var newMessage = {};
        newMessage.snackbarColor = "red";
        newMessage.message = "Ошибка в введенных данных";
        newMessage.snackbar = true;

        this.$emit("messageChange", newMessage);
        this.$v.$touch();
      } else {
        if (+this.amount == 0) {
          this.removeFromList(item, subItem);
        } else {
          subItem.amount = this.amount;
          this.$emit("listChanged", this.shoppingList);
        }
      }
    },
    open(subItem) {
      this.amount = subItem.amount;
      this.days = 1;
    },
    close() {
      this.$v.$reset();
      this.amount = "";
      this.days = "";
      this.selectedProduct = {};
    },
    cancel() {
      var newMessage = {};
      newMessage.snackbarColor = "warning";
      newMessage.message = "Отменено";
      newMessage.snackbar = true;

      this.$emit("messageChange", newMessage);
    }
  },
  computed: {
    shoppingList() {
      var list = [];
      for (var i = 0; i < this.$props.user.list.length; i++) {
        if (this.$props.user.list[i].items.length > 0) {
          list.push(this.$props.user.list[i]);
        }
      }

      for (var i = 0; i < list.length; i++) {
        for (var item = 0; item < list[i].items.length; item++) {
          if (this.inFridge(list[i].items[item])) {
            list[i].items[item].color =
              "light-green lighten-2 elevation-1 color-change";
          } else {
            list[i].items[item].color =
              "amber lighten-2 elevation-1 color-change";
          }
        }
      }

      return list;
    },
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
      !this.$v.amount.minValue && errors.push("Минимальное значение: 0");
      !this.$v.amount.maxValue &&
        errors.push("Превышено максимальное значение");
      return errors;
    }
  }
};
</script>
<style scoped lang="scss">
@import "./../../../assets/styles";

.color-change {
  transition: all 0.3s ease-in-out;
}
</style>
