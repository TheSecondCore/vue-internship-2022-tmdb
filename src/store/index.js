import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
  },
  getters: {
    movies: (state) => state.movies,
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = {...movies};
    },
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
  },
  actions: {
    async searchMovies({ commit }, query) {
      const options = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          query,
          language: "ru",
        },
      };
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          options
        );
        commit("SET_MOVIES", response.data);
      } catch (e) {
        alert(e);
      }
    },
    async getMovies({commit}){
      const options = {
        params: {api_key: process.env.VUE_APP_API_KEY, language: "ru"}
      };
      try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular", options);
        commit("GET_MOVIES", response.data)
      } catch (e) {
        alert(e);
      }
    },
  },

  modules: {},
});
