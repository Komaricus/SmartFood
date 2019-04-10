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
  <v-select
    v-model="type"
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

  <v-btn @click="submit">submit</v-btn>
  <v-btn @click="clear">clear</v-btn>
</form>
</template>

<script>
import Axios from 'axios'
import { BACK_END_URL } from '@/router'
import { validationMixin } from 'vuelidate'
import { required, maxLength, decimal, numeric } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(20) },
    type: { required },
    descr: {},
    image: {},
  },
  data() {
    return {
      title: '',
      descr: '',
      image: null,
      type: null,
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
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.createProduct()
    },
    clear() {
      this.$v.$reset();
      this.title = '';
      this.type = null;
      this.descr = '';
      this.image = null;
    },
  }
}
</script>

<style scoped>

</style>
