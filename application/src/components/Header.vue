<template>
  <v-container>
    <v-toolbar app dark color="green" class="hidden-sm-and-down">
      <v-toolbar-title>
        <router-link to="/">SmartFridge</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-for="item in nav"
          :key="item.icon"
          :to="item.link"
          :title="item.title"
          flat
        >{{ item.text }}</v-btn>
        <v-btn
          v-if=" authenticated"
          block
          color="red lighten-1 white--text"
          class="nav-button"
          @click.native="submitSignout()"
        >Выйти</v-btn>

        <v-btn
          block
          color="orange lighten-1 white--text"
          v-if=" !authenticated "
          to="/login"
          class="nav-button"
        >Логин</v-btn>

        <v-btn
          block
          color="blue lighten-1 white--text"
          v-if=" !authenticated"
          to="/registration"
          class="nav-button m-2"
        >Регистрация</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-toolbar app dark color="green" class="hidden-md-and-up">
      <v-toolbar-title>
        <router-link to="/">SmartFridge</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar-side-icon dark slot="activator"></v-toolbar-side-icon>
        <v-card>
          <v-toolbar flat color="green">
            <v-toolbar-title>
              <router-link to="/" @click.native="dialog = false">SmartFridge</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="dialog = false">
              <v-icon color="white">close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list>
            <v-list-tile
              v-for="(item, index) in nav"
              :key="index"
              :to="item.link"
              @click.native="dialog = false"
            >
              <v-list-tile-content>
                <v-list-tile-title :title="item.title">{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-layout class="fab-container">
              <v-btn
                v-if=" authenticated"
                block
                color="red lighten-1 white--text"
                class="nav-button"
                @click.native="submitSignout()"
              >Выйти</v-btn>

              <v-btn
                block
                color="orange lighten-1 white--text"
                v-if=" !authenticated "
                to="/login"
                class="nav-button"
              >Логин</v-btn>

              <v-btn
                block
                color="blue lighten-1 white--text"
                v-if=" !authenticated"
                to="/registration"
                class="nav-button m-2"
              >Регистрация</v-btn>
            </v-layout>
          </v-list>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </v-container>
</template>

<script>
import Authentication from "@/components/pages/Authentication";
export default {
  data() {
    return {
      authenticated: Authentication.user.authenticated,
      dialog: false,
      nav: [
        {
          text: "Меню",
          title: "Меню",
          active: false,
          link: "/menu"
        },
        {
          text: "Продукты",
          title: "Продукты",
          active: false,
          link: "/products-menu"
        },
        {
          text: "Диеты",
          title: "Диеты",
          active: false,
          link: "/diets"
        },
        {
          text: "Рецепты",
          title: "Рецепты",
          active: false,
          link: "/recipes"
        }
      ]
    };
  },
  methods: {
    submitSignout() {
      Authentication.signout(this);
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/styles";
.v-toolbar__title a {
  color: white;
  text-decoration: none;
}
.v-toolbar__title a:hover {
  color: white;
  text-decoration: none;
}

.v-toolbar__items a:hover {
  color: white;
  text-decoration: none;
}

.v-list a:hover {
  color: green;
  text-decoration: none;
}

.nav-button {
  height: 36px !important;
}

.fab-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 36px;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
}
</style>
