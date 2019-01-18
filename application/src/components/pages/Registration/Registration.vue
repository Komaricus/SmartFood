<template>
  <div>
    <div class="l-signup elevation-5">
      <v-form v-model="validSignUp">
        <h3 class="text-xs-center">Регистрация</h3>
        <v-text-field
          label="Имя пользователя"
          v-model="newUser.username"
          prepend-icon="account_box"
          :rules="rules"
          required
          color="green lighten-1"
          @keyup.enter="submitSignUp()"
        ></v-text-field>

        <v-text-field
          label="Пароль"
          v-model="newUser.password"
          prepend-icon="lock"
          :rules="rules"
          :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
          :type="signUpPasswordVisible ? 'text' : 'password'"
          color="green lighten-1"
          required
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
import Registration from "@/components/pages/Registration";
export default {
  data() {
    return {
      snackbar: false,
      validSignUp: false,
      signUpPasswordVisible: false,
      rules: [value => !!value || "Обязательное поле"],
      newUser: {
        username: "",
        password: ""
      },
      message: ""
    };
  },
  methods: {
    submitSignUp() {
      Registration.signup(this, this.newUser, "/");
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

  label,
  input,
  .icon {
    color: green !important;
  }

  .input-group__details {
    &:before {
      background-color: $border-color-input !important;
    }
  }
}
</style>