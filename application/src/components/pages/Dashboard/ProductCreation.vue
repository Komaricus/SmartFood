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
    <v-select
      v-model="type"
      :items="items"
      item-text="name"
      item-value="id"
      :error-messages="typeErrors"
      label="Категория продукта"
      required
      @change="$v.type.$touch()"
      @blur="$v.type.$touch()"
    ></v-select>
    <v-text-field
      v-model="cals"
      :error-messages="calsDateErrors"
      label="Количество каллорий"
      required
      @input="$v.cals.$touch()"
      @blur="$v.cals.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="prots"
      :error-messages="protsDateErrors"
      label="Количество белков на 100 грамм"
      required
      @input="$v.prots.$touch()"
      @blur="$v.prots.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="fats"
      :error-messages="fatsDateErrors"
      label="Количество жиров на 100 грамм"
      required
      @input="$v.fats.$touch()"
      @blur="$v.fats.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="carbs"
      :error-messages="carbsDateErrors"
      label="Количество углеводов на 100 грамм"
      required
      @input="$v.carbs.$touch()"
      @blur="$v.carbs.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="exDate"
      :error-messages="exDateDateErrors"
      label="Срок годности"
      @input="$v.exDate.$touch()"
      @blur="$v.exDate.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="descr"
      label="Описание"
      @input="$v.descr.$touch()"
      @blur="$v.descr.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="image"
      type="file"
      label="Изображение"
      @input="$v.image.$touch()"
      @blur="$v.image.$touch()"
    ></v-text-field>

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
      cals: { required, decimal },
      prots: { required, decimal },
      fats: { required, decimal },
      carbs: { required, decimal },
      exDate: { numeric },
      descr: {},
      image: {},
    },

    data: () => ({
      title: '',
      type: null,
      items: [
        {
          id: 'fruits',
          name: 'Фрукты'
        },
        {
          id: 'vegetables',
          name: 'Овощи'
        },
        {
          id: 'meat',
          name: 'Мясо'
        },
        {
          id: 'seafood',
          name: 'Морепродукты'
        },
        {
          id: 'dairy',
          name: 'Молочные продукты'
        },
        {
          id: 'cereals',
          name: 'Крупы и мучные изделия'
        },
        {
          id: 'poultry',
          name: 'Птица'
        },
        {
          id: 'condiment',
          name: 'Специи и соусы'
        },
      ],
      cals: '',
      prots: '',
      fats: '',
      carbs: '',
      exDate: '',
      descr: '',
      image: null,
    }),

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
      calsDateErrors () {
        const errors = []
        if (!this.$v.cals.$dirty) return errors
        !this.$v.cals.required && errors.push('Введите каллории')
        !this.$v.cals.decimal && errors.push('Должно быть числом')
        return errors
      },
      protsDateErrors () {
        const errors = []
        if (!this.$v.prots.$dirty) return errors
        !this.$v.prots.required && errors.push('Введите белки')
        !this.$v.prots.decimal && errors.push('Должно быть числом')
        return errors
      },
      fatsDateErrors () {
        const errors = []
        if (!this.$v.fats.$dirty) return errors
        !this.$v.fats.required && errors.push('Введите жиры')
        !this.$v.fats.decimal && errors.push('Должно быть числом')
        return errors
      },
      carbsDateErrors () {
        const errors = []
        if (!this.$v.carbs.$dirty) return errors
        !this.$v.carbs.required && errors.push('Введите углеводы')
        !this.$v.carbs.decimal && errors.push('Должно быть числом')
        return errors
      },
      exDateDateErrors () {
        const errors = []
        if (!this.$v.carbs.$dirty) return errors
        !this.$v.carbs.numeric && errors.push('Должно быть целым числом')
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
        this.cals = '';
        this.prots = '';
        this.fats = '';
        this.carbs = '';
        this.exDate = '';
        this.descr = '';
        this.image = null;
        this.type = null;
      },
      async createProduct() {
        const {
          title,
          type,
          cals,
          prots,
          fats,
          carbs,
          image,
          descr,
          exDate,
        } = this.$data

        let res;
        try {
          const { data } = await Axios.post(`${BACK_END_URL}/api/v1/products`, {
            title,
            type,
            cals,
            prots,
            fats,
            carbs,
            image,
            descr,
            exDate,
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
