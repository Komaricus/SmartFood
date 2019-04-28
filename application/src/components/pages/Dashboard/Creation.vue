<template>
  <div>
    <v-tabs centered color="teal " dark icons-and-text>
      <v-tabs-slider color="lime "></v-tabs-slider>

      <v-tab href="#product">
        Продукт
        <v-icon>kitchen</v-icon>
      </v-tab>

      <v-tab href="#recipe">
        Рецепт
        <v-icon>room_service</v-icon>
      </v-tab>

      <v-tab-item value="product">
        <v-card flat class="product-container">
          <v-card-title class="form-title" primary-title>
            <div>
              <h3 class="headline mb-0">Создать продукт</h3>
              <div>Здесь вы можете добавить свой продукт, которого нет на сайте, заполнив всю необходимую информацию.</div>
            </div>
          </v-card-title>
          <v-card class="form-card">
            <product-creation
              @messageChange="messageChange"
            ></product-creation>
          </v-card>
        </v-card>
      </v-tab-item>

      <v-tab-item value="recipe">
        <v-card flat class="product-container">
          <v-card-title class="form-title" primary-title>
            <div>
              <h3 class="headline mb-0">Создать рецепт</h3>
              <div>Здесь вы можете добавить свой рецепт, которого нет на сайте, заполнив всю необходимую информацию.</div>
            </div>
          </v-card-title>
          <v-card class="form-card">
            <recipe-creation
              @messageChange="messageChange"
            ></recipe-creation>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {
  methods: {
    messageChange(newMessage) {
      this.$emit("messageChange", newMessage);
    }
  }
};
</script>
<style scoped>
  .form-card {
    min-width: 50%;
    max-width: 90%;
    padding: 15px;
  }

  .form-title {
    align-self: flex-start;
    margin-bottom: 30px;
  }

  .product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
