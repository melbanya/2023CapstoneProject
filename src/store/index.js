import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    // api호출시 데이터를 담을 배열들
    shelters: [],
    emergencyRooms: [],
    checklists: [],
    user: null,
  },
  getters: {
  },
  mutations: {
    // 데이터 상태변이
    SET_SHELTERS(state, shelters) {
      state.shelters = shelters;
    },
    SET_EMERGENCY_ROOMS(state, emergencyRooms) {
      state.emergencyRooms = emergencyRooms;
    },
    SET_CHECK_LISTS(state, checklists) {
      state.checklists = checklists;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    // 데이터 호출 action
    async fetchShelters({ commit }) {
      const response = await axios.get('http://openapi.seoul.go.kr:8088/4169556354616130393064556e4c47/json/TbEqkShelter/1/999/');
      commit('SET_SHELTERS', response.data.TbEqkShelter.row);
    },
    async fetchEmergencyRooms({ commit }) {
      const response = await axios.get('http://openapi.seoul.go.kr:8088/7a52466a776161303838536f68746c/json/TvEmgcHospitalInfo/1/67/');
      commit('SET_EMERGENCY_ROOMS', response.data.TvEmgcHospitalInfo.row);
    },
    async fetchCheckLists({ commit }) {
      const response = await axios.get('http://localhost:3001/user/checklists');
      commit('SET_CHECK_LISTS', response.data.checklists);
    },
    async register({ commit }, user) {
      try {
          const response = await axios.post('http://localhost:3001/user/register', {
              user_name: user.user_name,
              user_email: user.user_email,
              user_password: user.user_password
          });
          commit('SET_USER', response.data.user);
      } catch (error) {
          console.error('회원가입 요청 중 에러 발생:', error.response.data);
      }
  },
  },
  modules: {
  }
})
