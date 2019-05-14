<template>
<form>
  <v-text-field
    v-model="title"
    :error-messages="titleErrors"
    :counter="50"
    label="Название"
    required
    @input="$v.title.$touch()"
    @blur="$v.title.$touch()"
  ></v-text-field>
  <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
					<v-text-field
            label="Изображение"
            @click='pickFile'
            v-model='imageName'
            append-icon='attach_file'
          ></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
  </v-flex>
  <v-textarea
    v-model="descr"
    label="Описание"
    @input="$v.descr.$touch()"
    @blur="$v.descr.$touch()"
  ></v-textarea>
  <v-textarea
    v-model="method"
    :error-messages="methodErrors"
    label="Способ приготовления"
    required
    @input="$v.method.$touch()"
    @blur="$v.method.$touch()"
  ></v-textarea>
  <v-autocomplete
    v-model="products"
    :error-messages="productsErrors"
    :items="productsItems"
    item-text="title"
    item-value="_id"
    label="Продукты"
    multiple
    persistent-hint
    required
    @change="autocompleteChange()"
    @blur="$v.products.$touch()"
  ></v-autocomplete>
  <v-text-field
    v-for="product in products"
    :key="product"
    v-model="weight[product]"
    :label="`${productsItems.find(item => item._id === product).title}(вес)`"
  ></v-text-field>
  <v-select
    v-model="type"
    :error-messages="typeErrors"
    :items="items"
    item-text="name"
    item-value="id"
    label="Категории рецептов"
    multiple
    chips
    deletable-chips
    persistent-hint
    required
    @change="$v.type.$touch()"
    @blur="$v.type.$touch()"
  ></v-select>
  <v-select
    v-model="meal"
    :error-messages="mealErrors"
    :items="meals"
    item-text="name"
    item-value="id"
    label="Приемы пищи"
    multiple
    chips
    deletable-chips
    persistent-hint
    required
    @change="$v.meal.$touch()"
    @blur="$v.meal.$touch()"
  ></v-select>
  <v-text-field
    v-model="portions"
    :error-messages="portionsErrors"
    label="Количество порций"
    @input="$v.portions.$touch()"
    @blur="$v.portions.$touch()"
  ></v-text-field>

  <v-btn @click="submit">Добавить</v-btn>
  <v-btn @click="clear">Очистить</v-btn>
</form>
</template>

<script>
import Axios from 'axios'
import { BACK_END_URL } from '@/router'
import Dashboard from "@/components/pages/Dashboard";
import { validationMixin } from 'vuelidate'
import { required, maxLength, numeric, decimal } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(50) },
    type: { required },
    products: { required },
    meal: { required },
    portions: { required, numeric },
    descr: {},
    method: { required },
    weight: { required, decimal }
  },
  data() {
    return {
      title: '',
      descr: '',
      imageFile: '',
      imageUrl: '',
      imageName: '',
      type: null,
      meal: null,
      portions: '',
      method: '',
      products: null,
      weight: {},
      productsItems: [
        {title: '111'},
        {title: '222'},
        {title: '333'},
      ],
      items: [
        {
          id: 'salads',
          name: 'Салаты'
        },
        {
          id: 'second-dishes',
          name: 'Вторые блюда'
        },
        {
          id: 'starters',
          name: 'Закуски'
        },
        {
          id: 'soups',
          name: 'Супы'
        },
        {
          id: 'bakery',
          name: 'Выпечка'
        },
        {
          id: 'drinks',
          name: 'Напитки'
        },
        {
          id: 'deserts',
          name: 'Десерты'
        },
        {
          id: 'others',
          name: 'Другие рецепты'
        },
      ],
      meals: [
        {
          id: 'breakfast',
          name: 'Завтрак'
        },
        {
          id: 'lunch',
          name: 'Обед'
        },
        {
          id: 'dinner',
          name: 'Ужин'
        },
      ]
    }
  },
  async created() {
    if (!localStorage.getItem('dashboard_products')) {
      try {
        this.productsItems = await Dashboard.getAllProducts();
        const parsed = JSON.stringify(this.productsItems);
        localStorage.setItem('dashboard_products', parsed);
      } catch (e) {
        
      }
    }
  },
  mounted() {
    if (localStorage.getItem('dashboard_products')) {
      try {
        this.productsItems = JSON.parse(
          localStorage.getItem('dashboard_products')
        );
      } catch (e) {
        localStorage.removeItem('dashboard_products');
      }
    }
  },
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.maxLength && errors.push('Максимальная длина 50 символов')
      !this.$v.title.required && errors.push('Введите название')
      return errors
    },
    typeErrors () {
      const errors = []
      if (!this.$v.type.$dirty) return errors
      !this.$v.type.required && errors.push('Выберите категорию')
      return errors
    },
    productsErrors() {
      const errors = []
      if (!this.$v.products.$dirty) return errors
      !this.$v.products.required && errors.push('Выберите продукты')
      return errors
    },
    mealErrors() {
      const errors = []
      if (!this.$v.meal.$dirty) return errors
      !this.$v.meal.required && errors.push('Выберите время приема пищи')
      return errors
    },
    methodErrors() {
      const errors = []
      if (!this.$v.method.$dirty) return errors
      !this.$v.method.required && errors.push('Введите способ приготовления')
      return errors
    },
    portionsErrors() {
      const errors = []
      if (!this.$v.portions.$dirty) return errors
      !this.$v.portions.numeric && errors.push('Введите целое число')
      !this.$v.portions.required && errors.push('Введите количество порций')
      return errors
    },
  },
  methods: {
    autocompleteChange() {
      this.$v.products.$touch()
    },
    pickFile () {
        this.$refs.image.click ()
    },
		onFilePicked (e) {
      const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          const formData = new FormData();
          formData.append(this.imageName, files[0])
          this.imageFile = formData
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
    submit() {
      this.$v.$touch();
      this.createRecipe();
    },
    clear() {
      this.$v.$reset();
      this.title = '';
      this.type = null;
      this.meal = null;
      this.descr = '';
      this.image = null;
      this.portions = '';
      this.method = '';
    },
    async createRecipe() {
      const {
        title,
        type,
        meal,
        descr,
        imageFile,
        portions,
        method,
        products,
        weight,
      } = this.$data
      
      let res;
      try {
        const { data } = await Axios.post(`${BACK_END_URL}/api/v1/recipes`, {
          title,
          type,
          meal,
          descr,
          img: imageFile,
          portions,
          method,
          ingredients: products.map(pr => ({id: pr, weight: weight[pr]})),
        })
        res = data
      } catch (e) {
        res = {
          message: 'Ошибка при отправке запроса',
          snackbarColor: 'red',
          snackbar: true
        }
      }

      this.$emit(
        "messageChange",
        {
          message: res.message,
          snackbarColor: res.success ? 'green' : 'red',
          snackbar: true
        }
      );
    }
  }
}
</script>

<style scoped>

</style>
