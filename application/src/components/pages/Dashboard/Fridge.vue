<template>
  <v-tabs centered color="indigo darken-2" dark icons-and-text>
    <v-tabs-slider color="red"></v-tabs-slider>

    <v-tab href="#products">
      Продукты
      <v-icon>kitchen</v-icon>
    </v-tab>

    <v-tab href="#dishes">
      Блюда
      <v-icon>room_service</v-icon>
    </v-tab>

    <v-tab-item value="products">
      <v-card flat>
        <v-data-table
          :headers="productsHeaders"
          :items="user.products"
          class="elevation-2 data-table"
          :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
          rows-per-page-text="Элементов на странице"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <router-link
                  :to="`/products-menu/${props.item.type}/${props.item._id}`"
                >{{ props.item.title }}</router-link>
              </td>
              <td class="text-xs-center">{{ props.item.cals }}</td>
              <td class="text-xs-center">{{ props.item.prots }}</td>
              <td class="text-xs-center">{{ props.item.fats }}</td>
              <td class="text-xs-center">{{ props.item.carbs }}</td>
              <td class="text-xs-center">{{ props.item.days }}</td>
              <td class="text-xs-center">{{ props.item.amount }}</td>
            </tr>
          </template>

          <template
            slot="pageText"
            slot-scope="props"
          >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">Продукты не добавлены</v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-tab-item>

    <v-tab-item value="dishes">
      <v-card flat>
        <v-data-table
          :headers="dishesHeaders"
          :items="user.dishes"
          class="elevation-2 data-table"
          :rows-per-page-items="[10,25,{'text':'Все','value':-1}]"
          rows-per-page-text="Элементов на странице"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <router-link
                  :to="`/recipes/${props.item.type[0]}/${props.item._id}`"
                >{{ props.item.title }}</router-link>
              </td>
              <td class="text-xs-center">{{ props.item.portions }}</td>
              <td class="text-xs-center">{{ props.item.days }}</td>
            </tr>
          </template>

          <template
            slot="pageText"
            slot-scope="props"
          >{{ props.pageStart }} - {{ props.pageStop }} из {{ props.itemsLength }}</template>
          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">Блюда не добавлены</v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      productsHeaders: [
        {
          text: "Продукт (100г)",
          align: "left",
          value: "title"
        },
        { text: "Калории (кКал)", value: "cals" },
        { text: "Жиры (г)", value: "fats" },
        { text: "Белки (г)", value: "prots" },
        { text: "Углеводы (г)", value: "carbs" },
        { text: "Срок годности", value: "days" },
        { text: "Количество (г)", value: "amount" }
      ],
      dishesHeaders: [
        { text: "Блюдо", value: "title" },
        { text: "Порции", value: "portions" },
        { text: "Срок годности", value: "days" }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "./../../../assets/styles";
</style>