<template>
  <div>
    <v-container>
      <app-header></app-header>
      <h1 class="page-title">Категории продуктов</h1>
      <router-link to="fruits" append>
        <div id="fruits" class="category">
          <h3 class="category-title">Фрукты</h3>
        </div>
      </router-link>
      <router-link to="vegetables" append>
        <div id="vegetables" class="category">
          <h3 class="category-title">Овощи</h3>
        </div>
      </router-link>
      <router-link to="meat" append>
        <div id="meat" class="category">
          <h3 class="category-title">Мясо</h3>
        </div>
      </router-link>
      <router-link to="seafood" append>
        <div id="seafood" class="category">
          <h3 class="category-title">Морепродукты</h3>
        </div>
      </router-link>
      <router-link to="dairy" append>
        <div id="dairy" class="category">
          <h3 class="category-title">Молочные продукты</h3>
        </div>
      </router-link>
      <router-link to="cereals" append>
        <div id="cereals" class="category">
          <h3 class="category-title">Крупы и мучные изделия</h3>
        </div>
      </router-link>
      <router-link to="poultry" append>
        <div id="poultry" class="category">
          <h3 class="category-title">Птица</h3>
        </div>
      </router-link>
      <router-link to="condiment" append>
        <div id="condiment" class="category">
          <h3 class="category-title">Специи и соусы</h3>
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

#fruits {
  background-image: url("./../../../assets/images/fruits.jpg");
}

#vegetables {
  background-image: url("./../../../assets/images/vegetables.jpg");
}

#meat {
  background-image: url("./../../../assets/images/meat.jpg");
}

#seafood {
  background-image: url("./../../../assets/images/seafood.jpg");
}

#dairy {
  background-image: url("./../../../assets/images/dairy.jpg");
}

#cereals {
  background-image: url("./../../../assets/images/cereals.jpg");
}

#poultry {
  background-image: url("./../../../assets/images/poultry.jpg");
}

#condiment {
  background-image: url("./../../../assets/images/condiment.jpg");
}

a:hover {
  text-decoration: none !important;
}
</style>
