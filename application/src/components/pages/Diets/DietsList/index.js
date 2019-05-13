import Axios from 'axios'
import {
  BACK_END_URL
} from '@/router'

export default class DietsList {
  static TITLES = {
    medicine: 'Медицинские диеты',
    clean: 'Очищающие организм программы',
    short: 'Краткосрочные модные диеты',
  }

  static async getDiets(category) {
    const {
      data
    } = await Axios.get(`${BACK_END_URL}/diets/${category}`);
    return data.map(diet => ({
      ...diet
    }))
  }

  static async getDietById(id) {
    const {
      data
    } = await Axios.get(`${BACK_END_URL}/diet/${id}`);
    return {
      ...data[0]
    };
  }
}
