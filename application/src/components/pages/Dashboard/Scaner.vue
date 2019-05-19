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
    <h1>Сканер №{{scaner.name}}</h1>
    <div v-for="(item, index) in scaner.barcodes" :key="index">{{item}}</div>
    <v-btn
      style="float: right; color: white;"
      color="red"
      @click="disconnectButtonClicked()"
    >Отключить</v-btn>
  </v-container>
</template>
<script>
import Axios from "axios";
import { BACK_END_URL } from "@/router";

import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    scanerName: { required, maxLength: maxLength(6), minLength: minLength(6) }
  },
  data() {
    return {
      scanerName: "",
      scaner: {},
      message: "",
      snackbarColor: "green",
      snackbar: false,
      hasScaner: false
    };
  },
  created() {
    if (this.$cookie.get("scaner")) {
      this.loadScaner(this, this.$cookie.get("scaner"));
      this.hasScaner = true;
    }
  },
  methods: {
    async loadScaner(context, name) {
      await Axios.get(`${BACK_END_URL}/scaner/${name}`).then(({ data }) => {
        if (data.length > 0) {
          context.$set(context, "scaner", data[0]);
          context.message = "Сканер подключен";
          context.snackbarColor = "green";
          context.snackbar = true;
          context.hasScaner = true;
          context.$cookie.set("scaner", name);
        } else {
          context.message = "Сканер не найден";
          context.snackbarColor = "red";
          context.snackbar = true;
        }
      });
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
    }
  }
};
</script>
<style scoped>
</style>

