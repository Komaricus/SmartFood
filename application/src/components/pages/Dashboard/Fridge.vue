<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="deleteDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Удалить?</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex
                  xs12
                >Вы действительно хотите удалить {{ this.selectedProduct.title || this.selectedDish.title }}?</v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red darken-1" flat @click="deleteButtonClicked()">Удалить</v-btn>
            <v-btn color="blue darken-1" flat @click="resetDeleteDialog()">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-tabs centered color="indigo darken-2" dark icons-and-text>
      <v-tabs-slider color="red"></v-tabs-slider>

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
          <v-data-table
            :headers="productsHeaders"
            :items="user.products"
            class="elevation-2"
            :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
            rows-per-page-text="Элементов на странице"
          >
            <template slot="items" slot-scope="props">
              <td>
                <router-link
                  :to="`/products-menu/${props.item.type}/${props.item._id}`"
                >{{ props.item.title }}</router-link>
              </td>
              <td class="text-xs-right">
                <v-edit-dialog
                  :return-value.sync="amount"
                  large
                  lazy
                  @save="save"
                  @cancel="cancel"
                  @close="close"
                  @open="open(props.item)"
                >
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
              <td class="text-xs-center">{{ props.item.days }}</td>

              <td class="justify-center layout px-0">
                <v-icon small @click="selectedProduct = props.item; deleteDialog = true;">delete</v-icon>
              </td>
            </template>

            <template
              slot="pageText"
              slot-scope="props"
            >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">Продукты не добавлены</v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <v-tab-item value="dishes">
        <v-card flat>
          <v-data-table
            :headers="dishesHeaders"
            :items="user.dishes"
            class="elevation-2"
            :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
            rows-per-page-text="Элементов на странице"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  <router-link
                    :to="`/recipes/${props.item.type[0]}/${props.item._id}`"
                  >{{ props.item.title }}</router-link>
                </td>
                <td class="text-xs-center">
                  <v-edit-dialog
                    :return-value.sync="amount"
                    large
                    lazy
                    @save="save"
                    @cancel="cancel"
                    @close="close"
                    @open="open(props.item)"
                  >
                    <div>{{ props.item.portions }}</div>
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
                <td class="text-xs-center">{{ props.item.days }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small @click="selectedDish = props.item; deleteDialog = true;">delete</v-icon>
                </td>
              </tr>
            </template>

            <template
              slot="pageText"
              slot-scope="props"
            >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
            <template slot="no-data">
              <v-alert :value="true" color="error" icon="warning">Блюда не добавлены</v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Истечение срока годности</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <div>У следующих продуктов и блюд скоро истечёт срок годности:</div>
                  <br>
                  <div v-for="(item, i) in outOfDate" :key="i">{{ item.title }} - {{ item.days }}</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" flat to="/menu">Меню</v-btn>
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
      outOfDate: [],
      amount: "",
      selectedProduct: {},
      selectedDish: {},
      deleteDialog: false,
      productsHeaders: [
        {
          text: "Продукт (100г)",
          align: "left",
          value: "title"
        },
        { text: "Количество (г)", value: "amount" },
        { text: "Срок годности", value: "days" },
        { text: "Удалить", sortable: false }
      ],
      dishesHeaders: [
        { text: "Блюдо", value: "title" },
        { text: "Порции", value: "portions" },
        { text: "Срок годности", value: "days" },
        { text: "Удалить", sortable: false }
      ]
    };
  },
  methods: {
    deleteButtonClicked() {
      this.selectedProduct.title
        ? this.$emit("deleteProduct", this.selectedProduct)
        : this.$emit("deleteDish", this.selectedDish);
      this.resetDeleteDialog();
    },
    resetDeleteDialog() {
      this.deleteDialog = false;
      this.selectedProduct = {};
      this.selectedDish = {};
    },
    open(target) {
      this.amount = target.amount || target.portions;
      if (target.amount) {
        this.selectedProduct = target;
      } else {
        this.selectedDish = target;
      }
    },
    save() {
      if (this.$v.$invalid) {
        var newMessage = {};
        newMessage.snackbarColor = "red";
        newMessage.message = "Ошибка в введенных данных";
        newMessage.snackbar = true;

        this.$emit("messageChange", newMessage);
        this.$v.$touch();
      } else if (
        this.selectedProduct.amount != this.amount &&
        this.selectedProduct.amount
      ) {
        this.selectedProduct.amount = this.amount;
        if (+this.selectedProduct.amount == 0) {
          this.$emit("deleteProduct", this.selectedProduct);
        } else {
          this.$emit("productChanged", this.selectedProduct);
        }
      } else if (
        this.selectedDish.portions != this.amount &&
        this.selectedDish.portions
      ) {
        this.selectedDish.portions = this.amount;
        if (+this.selectedDish.portions == 0) {
          this.$emit("deleteDish", this.selectedDish);
        } else {
          this.$emit("dishChanged", this.selectedDish);
        }
      }
    },
    cancel() {
      var newMessage = {};
      newMessage.snackbarColor = "warning";
      newMessage.message = "Отменено";
      newMessage.snackbar = true;

      this.$emit("messageChange", newMessage);
    },
    close() {
      this.$v.$reset();
      this.amount = "";
      this.selectedProduct = {};
      this.selectedDish = {};
    },
    resetDialog() {
      this.dialog = false;
      this.outOfDate = [];
    }
  },
  created() {
    if (!sessionStorage.getItem("outOfDate")) {
      var currentDate = new Date();

      for (var i = 0; i < this.$props.user.products.length; i++) {
        var dateParams = this.$props.user.products[i].days.split(".");

        var itemDate = new Date(
          +dateParams[2],
          +dateParams[1] - 1,
          +dateParams[0]
        );

        if ((itemDate - currentDate) / (1000 * 3600 * 24) <= 3) {
          this.outOfDate.push(this.$props.user.products[i]);
        }
      }

      for (var i = 0; i < this.$props.user.dishes.length; i++) {
        var dateParams = this.$props.user.dishes[i].days.split(".");

        var itemDate = new Date(
          +dateParams[2],
          +dateParams[1] - 1,
          +dateParams[0]
        );

        if ((itemDate - currentDate) / (1000 * 3600 * 24) <= 3) {
          this.outOfDate.push(this.$props.user.dishes[i]);
        }
      }

      if (this.outOfDate.length > 0) {
        this.dialog = true;
        sessionStorage.setItem("outOfDate", false);
      }
    }
  },
  computed: {
    amountErrors() {
      const errors = [];
      if (!this.$v.amount.$dirty) return errors;
      !this.$v.amount.required && errors.push("Заполните поле");
      !this.$v.amount.numeric && errors.push("Должно быть целым числом");
      !this.$v.amount.minValue && errors.push("Минимальное значение: 0");
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