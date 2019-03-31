<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-list expand>
            <v-list-group
              v-for="(item, key) in shoppingList"
              :key="key"
              v-model="item.active"
              no-action
            >
              <template slot="activator">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-tile
                :class=" subItem.color"
                v-for="subItem in item.items"
                :key="subItem.title"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>Сколько: {{ subItem.amount }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      colors: {
        Фрукты: "lime accent-3",
        Овощи: "light-green lighten-3",
        Мясо: "red lighten-3",
        Морепродукты: "light-blue lighten-3",
        "Молочные продукты": "cyan lighten-3",
        "Крупы и мучные изделия": "orange lighten-3",
        Птица: "purple lighten-3",
        "Специи и соусы": "teal lighten-3"
      }
    };
  },
  methods: {
    inFridge(item) {
      for (var i = 0; i < this.$props.user.products.length; i++) {
        if (this.$props.user.products[i]._id == item._id) {
          return true;
        }
      }
      return false;
    }
  },
  computed: {
    shoppingList() {
      var list = [];
      for (var i = 0; i < this.$props.user.list.length; i++) {
        if (this.$props.user.list[i].items.length > 0) {
          list.push(this.$props.user.list[i]);
        }
      }

      for (var i = 0; i < list.length; i++) {
        for (var item = 0; item < list[i].items.length; item++) {
          if (this.inFridge(list[i].items[item])) {
            list[i].items[item].color = "green lighten-1 elevation-1";
          } else {
            list[i].items[item].color = "red lighten-1 elevation-1";
          }
        }
      }
      return list;
    }
  }
};
</script>
<style scoped lang="scss">
@import "./../../../assets/styles";
</style>
