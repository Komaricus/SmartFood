<template>
  <div>
    <app-header></app-header>
    <h1 class="ma-5 text-xs-center">Умное питание - здоровая жизнь!</h1>
    <v-carousel hide-delimiters class="mt-5">
      <v-carousel-item v-for="(item,i) in items" :key="i">
        <div :id="item.id" class="carousel-item-card">
          <h1 class="white--text pl-5 pt-5">{{item.title}}</h1>

          <v-btn color="orange" class="mt-auto ml-auto mr-5 mb-5" :to="item.link">Подробнее</v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>

    <v-snackbar bottom="bottom" :color="snackColor" v-model="snackbar">{{ message }}</v-snackbar>

    <app-footer></app-footer>
  </div>
</template>



<script>
export default {
  name: "MainComponent",
  data() {
    return {
      snackbar: false,
      message: "",
      snackColor: "red lighten-1",
      items: [
        {
          title: "Меню",
          id: "menu-card",
          link: "/menu"
        },
        {
          title: "Продукты",
          id: "products-card",
          link: "/products-menu"
        },
        {
          title: "Диеты",
          id: "diets-card",
          link: "/diets"
        },
        {
          title: "Рецепты",
          id: "recipes-card",
          link: "/recipes"
        }
      ]
    };
  }
};
</script>

<style scoped>
.carousel-item-card {
  display: flex;
  height: 100%;
  width: 100%;
  background-size: cover;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3) inset;
}

#menu-card {
  background-image: url("../../assets/images/menu-card.jpg");
}

#products-card {
  background-image: url("../../assets/images/Products.jpg");
}

#diets-card {
  background-image: url("../../assets/images/Diets.jpg");
}

#recipes-card {
  background-image: url("../../assets/images/Recipes.jpg");
}

a {
  text-decoration: none;
}

footer {
  margin-top: 200px !important;
}
</style>
