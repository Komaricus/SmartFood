<template>
  <div>
    <div class="l-signup elevation-5">
      <v-form v-model="validSignUp">
        <h3 class="text-xs-center">Регистрация</h3>
        <v-text-field
          label="Имя пользователя"
          v-model="newUser.username"
          prepend-icon="account_box"
          :error-messages="usernameErrors"
          :counter="10"
          required
          color="green lighten-1"
          @input="$v.newUser.username.$touch()"
          @blur="$v.newUser.username.$touch()"
          @keyup.enter="submitSignUp()"
        ></v-text-field>

        <v-text-field
          label="Имя"
          v-model="newUser.name"
          :error-messages="nameErrors"
          prepend-icon="person"
          required
          color="green lighten-1"
          @input="$v.newUser.name.$touch()"
          @blur="$v.newUser.name.$touch()"
          @keyup.enter="submitSignUp()"
        ></v-text-field>

        <v-text-field
          label="Почта"
          v-model="newUser.email"
          :error-messages="emailErrors"
          prepend-icon="email"
          required
          color="green lighten-1"
          @input="$v.newUser.email.$touch()"
          @blur="$v.newUser.email.$touch()"
          @keyup.enter="submitSignUp()"
        ></v-text-field>

        <v-text-field
          label="Пароль"
          v-model="newUser.password"
          prepend-icon="lock"
          :error-messages="passwordErrors"
          :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
          @click:append="() => (signUpPasswordVisible = !signUpPasswordVisible)"
          :type="signUpPasswordVisible ? 'text' : 'password'"
          color="green lighten-1"
          required
          @input="$v.newUser.password.$touch()"
          @blur="$v.newUser.password.$touch()"
          @keyup.enter="submitSignUp()"
        ></v-text-field>

        <v-text-field
          label="Повторите пароль"
          v-model="newUser.password2"
          :error-messages="password2Errors"
          prepend-icon="done"
          :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
          @click:append="() => (signUpPasswordVisible = !signUpPasswordVisible)"
          :type="signUpPasswordVisible ? 'text' : 'password'"
          color="green lighten-1"
          required
          @input="$v.newUser.password2.$touch()"
          @blur="$v.newUser.password2.$touch()"
          @keyup.enter="submitSignUp()"
        ></v-text-field>

        <router-link to="/login">
          <v-btn block flat color="green lighten-1">Войти</v-btn>
        </router-link>
        <v-btn block color="green lighten-1" @click.native="submitSignUp()">Зарегистрироваться</v-btn>
      </v-form>
    </div>

    <v-snackbar bottom="bottom" color="red lighten-1" v-model="snackbar">{{ message }}</v-snackbar>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import Registration from "@/components/pages/Registration";
export default {
  mixins: [validationMixin],
  validations: {
    newUser: {
      username: { required, maxLength: maxLength(10), minLength: minLength(3) },
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password2: { required, sameAsPassword: sameAs("password") }
    }
  },
  data() {
    return {
      snackbar: false,
      validSignUp: false,
      signUpPasswordVisible: false,
      newUser: {
        username: "",
        password: "",
        name: "",
        email: "",
        password2: ""
      },
      message: ""
    };
  },
  methods: {
    submitSignUp() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        Registration.signup(this, this.newUser, "/");
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.newUser.username.$dirty) return errors;
      !this.$v.newUser.username.maxLength &&
        errors.push("Имя пользователя не может превышать 10 символов");
      !this.$v.newUser.username.required && errors.push("Обязательное поле");
      !this.$v.newUser.username.minLength &&
        errors.push("Имя пользователя должно содержать хотя бы 3 символа");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.newUser.name.$dirty) return errors;
      !this.$v.newUser.name.required && errors.push("Обязательное поле");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.newUser.email.$dirty) return errors;
      !this.$v.newUser.email.email && errors.push("E-mail некорректен");
      !this.$v.newUser.email.required && errors.push("Обязательное поле");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.newUser.password.$dirty) return errors;
      !this.$v.newUser.password.required && errors.push("Обязательное поле");
      !this.$v.newUser.password.minLength &&
        errors.push("Пароль должен содержать хотя бы 6 символов");
      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.newUser.password2.$dirty) return errors;
      !this.$v.newUser.password2.required && errors.push("Обязательное поле");
      !this.$v.newUser.password2.sameAsPassword &&
        errors.push("Пароли должны совпадать");
      return errors;
    }
  }
};
</script>

<style lang="scss">
@import "./../../../assets/styles";

.l-signup {
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