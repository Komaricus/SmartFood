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
        <v-card flat>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Создать продукт</h3>
              <div>Здесь вы можете добавить свой продукт, которого нет на сайте, заполнив всю необходимую информацию.</div>
            </div>
          </v-card-title>
        </v-card>
      </v-tab-item>

      <v-tab-item value="recipe">
        <v-card flat>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Создать рецепт</h3>
              <div>Здесь вы можете добавить свой рецепт, которого нет на сайте, заполнив всю необходимую информацию.</div>
            </div>
          </v-card-title>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
</style>
