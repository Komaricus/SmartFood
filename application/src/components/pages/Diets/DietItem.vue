<template>
  <div>
    <div
      v-if="(this.$route.params.id == this.$cookie.get('user_id')) && (this.$cookie.get('diet') == '')"
    >
      <v-container>
        <h3>Диета ещё не выбрана.</h3>
        <p style="padding-top: 10px;">
          <router-link to="/diets" style="color: green; ">Перейти к диетам</router-link>
        </p>
      </v-container>
    </div>
    <v-container
      v-if="(this.$route.params.id == this.$cookie.get('user_id') && (this.$cookie.get('diet') != '')) || this.$route.params.id != this.$cookie.get('user_id')"
    >
      <app-header v-if="this.$route.params.id != this.$cookie.get('user_id')"/>
      <h1>{{title}}</h1>
      <v-btn
        color="success"
        @click="updateUserDiet"
        v-if="this.$route.params.id != this.$cookie.get('user_id')"
      >Выбрать диету</v-btn>
      <v-btn
        color="orange"
        @click="deleteUserDiet"
        v-if="this.$route.params.id == this.$cookie.get('user_id') && (this.$cookie.get('diet') != '')"
      >Удалить диету</v-btn>

      <v-layout column>
        <v-tabs slider-color="green">
          <v-tab v-for="n in dietInfo" :key="n.name" v-if=" n.data ">{{ n.name }}</v-tab>
          <v-tab-item v-for="n in dietInfo" :key="n.name">
            <v-card v-if=" n.data ">
              <v-card-title primary-title>
                <div v-html="n.data" style="text-align: justify;"></div>
              </v-card-title>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-layout>
    </v-container>
    <v-snackbar bottom="bottom" color="green" v-model="snackbar">{{ message }}</v-snackbar>
  </div>
</template>

<script>
import DietsList from "@/components/pages/Diets/DietsList";
import Dashboard from "@/components/pages/Dashboard";

export default {
  name: "DietItem",
  data() {
    return {
      title: "",
      snackbar: false,
      message: "",
      dietInfo: [
        { name: "Описание", data: "" },
        { name: "Правила", data: "" },
        { name: "Рекомендовано", data: "" },
        { name: "Запрещено", data: "" },
        { name: "Примерное меню", data: "" }
      ]
    };
  },
  async created() {
    try {
      var id = "";
      if (this.$route.params.id == this.$cookie.get("user_id")) {
        id = this.$cookie.get("diet");
      } else {
        id = this.$route.params.id;
      }
      const diet = await DietsList.getDietById(id);

      this.title = diet.name;
      this.dietInfo[0].data = diet.description;
      this.dietInfo[1].data = diet.rules;
      this.dietInfo[2].data = diet.recommended;
      this.dietInfo[3].data = diet.prohibited;
      this.dietInfo[4].data = diet.menu;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    updateUserDiet() {
      var userData = {};
      userData.user_id = this.$cookie.get("user_id");
      userData.name = this.$cookie.get("name");
      userData.diet = this.$route.params.id;

      this.$cookie.set("diet", this.$route.params.id, "1D");

      Dashboard.postUserDiet(this, userData, "Диета выбрана");
    },
    deleteUserDiet() {
      var userData = {};
      userData.user_id = this.$cookie.get("user_id");
      userData.name = this.$cookie.get("name");
      userData.diet = "";

      this.$cookie.set("diet", "", "1D");

      Dashboard.postUserDiet(this, userData, "Диета удалена");
    }
  }
};
</script>

<style scoped>
</style>
