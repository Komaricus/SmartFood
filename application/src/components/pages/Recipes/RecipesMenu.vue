<template>
  <div>
    <v-container>
      <app-header></app-header>
      <h1 class="page-title">Категории блюд</h1>
      <router-link to="salads" append>
        <div id="salads" class="category">
          <h3 class="category-title">Салаты</h3>
        </div>
      </router-link>
      <router-link to="second-dishes" append>
        <div id="second-dishes" class="category">
          <h3 class="category-title">Вторые блюда</h3>
        </div>
      </router-link>
      <router-link to="starters" append>
        <div id="starters" class="category">
          <h3 class="category-title">Закуски</h3>
        </div>
      </router-link>
      <router-link to="soups" append>
        <div id="soups" class="category">
          <h3 class="category-title">Супы</h3>
        </div>
      </router-link>
      <router-link to="bakery" append>
        <div id="bakery" class="category">
          <h3 class="category-title">Выпечка</h3>
        </div>
      </router-link>
      <router-link to="drinks" append>
        <div id="drinks" class="category">
          <h3 class="category-title">Напитки</h3>
        </div>
      </router-link>
      <router-link to="deserts" append>
        <div id="deserts" class="category">
          <h3 class="category-title">Десерты</h3>
        </div>
      </router-link>
      <router-link to="others" append>
        <div id="others" class="category">
          <h3 class="category-title">Другие рецепты</h3>
        </div>
      </router-link>
    </v-container>

    <app-footer></app-footer>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
@import "./../../../assets/styles";

.category {
  height: 100px;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  padding: 1rem;
  text-decoration: none;
  background-position: center;
  background-size: cover;
}

.category-title {
  color: #fff;
  text-shadow: 1px 1px #000, 1px -1px #000, -1px 1px #000, -1px -1px #000,
    3px 3px 6px rgba(0, 0, 0, 0.5);
}

#salads {
  background-image: url("./../../../assets/images/salads.jpg");
}

#second-dishes {
  background-image: url("./../../../assets/images/seconds.jpg");
}

#starters {
  background-image: url("./../../../assets/images/starters.jpg");
}

#soups {
  background-image: url("./../../../assets/images/soups.jpg");
}

#bakery {
  background-image: url("./../../../assets/images/bakery.jpg");
}

#drinks {
  background-image: url("./../../../assets/images/drinks.jpg");
}

#deserts {
  background-image: url("./../../../assets/images/deserts.jpg");
}

#others {
  background-image: url("./../../../assets/images/others.jpg");
}

a:hover {
  text-decoration: none !important;
}
</style>