<template>
  <div>
    <v-container class="page-container">
      <app-header />
      <v-layout column>
        <v-tabs fixed-tabs>
          <v-tab
            v-for="n in productTypes"
            :key="n.name"
          >
            {{ n.name }}
          </v-tab>
          <v-tab-item
            v-for="n in productTypes"
            :key="n.name"
          >
            <v-card>
              <v-list v-for="(item, key) in n.value" :key="key">
                <v-card>
                  <v-card-text v-if="item.breakfast" align="center">
                    <ul>
                      <li>
                        {{ item.breakfast }}
                      </li>
                      <li>
                        {{ item.lunch }}
                      </li>
                      <li>
                        {{ item.dinner }}
                      </li>
                    </ul>
                  </v-card-text>
                  <v-card-text v-else align="center">
                    {{ item }}
                  </v-card-text>
                </v-card>
              </v-list>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-layout>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import DietsList from "@/components/pages/Diets/DietsList";

export default {
    name: "DietItem",
    data() {
      return {
        productTypes: [
          {
            name: 'Рекомендованные',
            value: ['Rerr1', 'Rerr2', 'Rerr3', 'Rerr4', 'Rerr5'],
          },
          {
            name: 'Запрещенные',
            value: ['Perr1', 'Perr2', 'Perr3', 'Perr4', 'Perr5'],
          },
          {
            name: 'Меню',
            value: [
              {
                breakfast: 'breakfast1',
                lunch: 'lunch1',
                dinner: 'dinner1'
              },
              {
                breakfast: 'breakfast2',
                lunch: 'lunch2',
                dinner: 'dinner2'
              },
              {
                breakfast: 'breakfast3',
                lunch: 'lunch3',
                dinner: 'dinner3'
              },
              {
                breakfast: 'breakfast4',
                lunch: 'lunch4',
                dinner: 'dinner4'
              },
              {
                breakfast: 'breakfast5',
                lunch: 'lunch5',
                dinner: 'dinner5'
              },
              {
                breakfast: 'breakfast6',
                lunch: 'lunch6',
                dinner: 'dinner6'
              },
              {
                breakfast: 'breakfast7',
                lunch: 'lunch7',
                dinner: 'dinner7'
              },
            ],
          }
        ],
      }
    },
    async created() {
      try {
        const { recommended, prohibited, menu } = await DietsList.getDietById(this.$route.params.id);
        this.productTypes[0].value = recommended;
        this.productTypes[1].value = prohibited;
        this.productTypes[2].value = menu;
      } catch (err) {
        console.log(err)
      }
    }
}
</script>

<style scoped>
  .page-container {
    min-height: 90vh;
  }
  ul li {
    list-style: none;
  }
</style>
