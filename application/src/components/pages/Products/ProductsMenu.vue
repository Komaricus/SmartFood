<template>
  <v-container>
    <app-header></app-header>
    <h1 class="page-title">Категории продуктов</h1>
    <router-link to="fruits" append>
      <div id="fruits" class="category">
        <h3 class="category-title">Фрукты</h3>
      </div>
    </router-link>
    <router-link to="vegetable" append>
      <div id="vegetables" class="category">
        <h3 class="category-title">Овощи</h3>
      </div>
    </router-link>
  </v-container>
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

#fruits {
  background-image: url("./../../../assets/images/fruits.jpg");
}

#vegetables {
  background-image: url("./../../../assets/images/vegetables.jpg");
}

a:hover {
  text-decoration: none !important;
}
</style>
