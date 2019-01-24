<template>
  <div>
    <div class="l-auth elevation-5">
      <v-form v-model="validLogin">
        <h3 class="text-xs-center">Авторизация</h3>
        <v-text-field
          label="Пользователь"
          v-model="credentials.username"
          prepend-icon="account_box"
          :error-messages="usernameErrors"
          required
          color="green lighten-1"
          @input="$v.credentials.username.$touch()"
          @blur="$v.credentials.username.$touch()"
          @keyup.enter="submitAuthentication()"
        ></v-text-field>

        <v-text-field
          label="Пароль"
          v-model="credentials.password"
          prepend-icon="lock"
          :error-messages="passwordErrors"
          :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
          :type="loginPasswordVisible ? 'text' : 'password'"
          color="green lighten-1"
          required
          @input="$v.credentials.password.$touch()"
          @blur="$v.credentials.password.$touch()"
          @keyup.enter="submitAuthentication()"
        ></v-text-field>

        <router-link to="/registration">
          <v-btn block flat color="green lighten-1">Создать аккаунт</v-btn>
        </router-link>
        <v-btn block color="green lighten-1" @click.native="submitAuthentication()">Войти</v-btn>
      </v-form>
    </div>

    <v-snackbar bottom="bottom" color="red lighten-1" v-model="snackbar">{{ message }}</v-snackbar>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Authentication from "@/components/pages/Authentication";
export default {
  mixins: [validationMixin],
  validations: {
    credentials: {
      username: { required },
      password: { required }
    }
  },
  data() {
    return {
      snackbar: false,
      validLogin: false,
      loginPasswordVisible: false,
      credentials: {
        username: "",
        password: ""
      },
      message: ""
    };
  },
  methods: {
    submitAuthentication() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        Authentication.authenticate(this, this.credentials, "/");
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.credentials.username.$dirty) return errors;
      !this.$v.credentials.username.required &&
        errors.push("Введите имя пользователя");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.credentials.password.$dirty) return errors;
      !this.$v.credentials.password.required && errors.push("Введите пароль");
      return errors;
    }
  }
};
</script>

<style lang="scss">
@import "./../../../assets/styles";

.l-auth {
  background-color: $background-color;
  padding: 15px;
  margin: 45px auto;
  min-width: 272px;
  max-width: 320px;
  animation: bounceIn 1s forwards ease;

  a {
    text-decoration: none;
  }

  .input-group__details {
    &:before {
      background-color: $border-color-input !important;
    }
  }
}
</style>
