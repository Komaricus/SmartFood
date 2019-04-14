<template>
<form>
  <v-text-field
    v-model="title"
    :error-messages="titleErrors"
    :counter="20"
    label="Название"
    required
    @input="$v.title.$touch()"
    @blur="$v.title.$touch()"
  ></v-text-field>
  <v-text-field
    v-model="image"
    type="file"
    label="Изображение"
    @input="$v.image.$touch()"
    @blur="$v.image.$touch()"
  ></v-text-field>
  <v-text-field
    v-model="descr"
    label="Описание"
    @input="$v.descr.$touch()"
    @blur="$v.descr.$touch()"
  ></v-text-field>
  <v-text-field
    v-model="method"
    :error-messages="methodErrors"
    label="Способ приготовления"
    required
    @input="$v.method.$touch()"
    @blur="$v.method.$touch()"
  ></v-text-field>
  <v-select
    v-model="type"
    :error-messages="typeErrors"
    :items="items"
    item-text="name"
    item-value="id"
    label="Категории продуктов"
    multiple
    chips
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
import { validationMixin } from 'vuelidate'
import { required, maxLength, numeric } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(20) },
    type: { required },
    meal: { required },
    portions: { required, numeric },
    descr: {},
    method: { required },
    image: {},
  },
  data() {
    return {
      title: '',
      descr: '',
      image: null,
      type: null,
      meal: null,
      portions: '',
      method: '',
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
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.maxLength && errors.push('Максимальная длина 20 символов')
      !this.$v.title.required && errors.push('Введите название')
      return errors
    },
    typeErrors () {
      const errors = []
      if (!this.$v.type.$dirty) return errors
      !this.$v.type.required && errors.push('Выберите категорию')
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
    }
  },
  methods: {
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
        image,
        portions,
        method,
      } = this.$data

      let res;
      try {
        const { data } = await Axios.post(`${BACK_END_URL}/api/v1/recipes`, {
          title,
          type,
          meal,
          descr,
          image,
          portions,
          method,
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
