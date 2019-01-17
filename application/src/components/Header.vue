<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-success mb-3">
    <div class="container">
      <router-link class="navbar-brand" to="/">SmartFridge</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/menu">Меню</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Продукты</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/diets">Диеты</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/recipes">Рецепты</router-link>
        </li>
        <li class="nav-item" v-if=" !authenticated">
          <router-link class="nav-link" to="/login">Логин</router-link>
        </li>
        <li class="nav-item" v-if=" !authenticated">
          <router-link class="nav-link" to="/register">Регистрация</router-link>
        </li>
        <v-flex xs12 offset-md1 md1 v-if=" authenticated">
          <v-btn block color="red lighten-1 white--text" @click.native="submitSignout()">Sign out</v-btn>
        </v-flex>
      </ul>
    </div>
  </nav>
</template>

<script>
import Authentication from "@/components/pages/Authentication";
export default {
  data() {
    return {
      authenticated: Authentication.user.authenticated
    };
  },
  methods: {
    submitSignout() {
      Authentication.signout(this, "/login");
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/styles";
</style>
