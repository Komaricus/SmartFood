<template>
  <div>
    <v-container class="page-container">
      <app-header></app-header>
      <h1 class="page-title">Категории диет</h1>
      <router-link
        v-for="category in categories"
        :to="category.value"
        append
        :key="category.value"
      >
        <div :id="category.value" class="category">
          <h3 class="category-title">{{ category.name }}</h3>
        </div>
      </router-link>
    </v-container>
    <app-footer></app-footer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        categories: [
          {
            name: 'Медицинские',
            value: 'medicine',
          },
          {
            name: 'Очищающие организм',
            value: 'clean',
          },
          {
            name: 'Краткосрочные модные',
            value: 'short',
          },
        ]
      }
    }
  };
</script>
<style lang="scss">
  @import "./../../../assets/styles";

  .page-container {
    min-height: 90vh;
  }

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

  #medicine {
    background-image: url("./../../../assets/images/health.jpeg");
  }

  #short {
    background-image: url("./../../../assets/images/short.jpeg");
  }

  #clean {
    background-image: url("./../../../assets/images/clean.jpeg");
  }

  a:hover {
    text-decoration: none !important;
  }
</style>
