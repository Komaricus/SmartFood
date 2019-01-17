<template>
  <div>
    <app-header></app-header>

    <!-- JUMBOTRON -->
    <div class="jumbotron text-center mb-3">
      <h1>Добро пожаловать!</h1>
      <p
        class="lead"
      >Веб-сервис &laquo;Умное питание&raquo; помогает с учетом продуктов и приготовлением блюд.</p>
      <hr>
      <p>Вы можете ознакомиться со всеми возможностями сайта в разделе &laquo;О сайте&raquo;</p>
      <router-link class="btn btn-warning" to="/about" role="button">Перейти</router-link>
    </div>

    <!-- MAIN CONTAINER -->
    <div id="main-container" class="container">
      <div id="menu-card" class="card mb-3">
        <div class="card-body d-flex flex-column">
          <h1 class="card-title m-2 text-warning">Меню</h1>
          <h5 class="card-subtitle m-2 text-white">Рецепты и генерация меню</h5>
          <router-link
            class="mt-auto ml-auto btn btn-block btn-outline-warning"
            to="/menu"
            style="max-width: 120px;"
          >Подробнее</router-link>
        </div>
      </div>

      <div id="products-card" class="card mb-3">
        <div class="card-body d-flex flex-column">
          <h1 class="card-title m-2 text-warning">Продукты</h1>
          <h5 class="card-subtitle m-2 text-white">Информация о продуктах</h5>
          <router-link
            class="mt-auto ml-auto btn btn-block btn-outline-warning"
            to="/products"
            style="max-width: 120px;"
          >Подробнее</router-link>
        </div>
      </div>

      <div id="diets-card" class="card mb-3">
        <div class="card-body d-flex flex-column">
          <h1 class="card-title m-2 text-warning">Диеты</h1>
          <h5 class="card-subtitle m-2 text-white">Выбор и ведение диеты</h5>
          <router-link
            class="mt-auto ml-auto btn btn-block btn-outline-warning"
            to="/diets"
            style="max-width: 120px;"
          >Подробнее</router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "MainComponent"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-container .card {
  height: 400px;
  background-size: cover;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3) inset;
  border: none;
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

footer {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
