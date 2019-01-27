<template>
  <div>
    <div id="back">
      <v-btn color="orange lighten-1 white--text" to="/" class="nav-button">На главную</v-btn>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
#back {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url("../../assets/images/404.png");
}

.nav-button {
  margin: auto;
  left: 0;
  right: 0;
  top: 200px;
}
</style>