<template>
  <div id="app">
    <SearchForm/>
    <div v-show="shouldDisplayFilms">
      <ul v-for="film in films" :key="film.episode_id">
        <li>{{ film.title }} ({{ film.release_date }})</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue';

export default {
  name: 'app',
  components: {
    SearchForm,
  },
  data() {
    return {
      films: [],
    };
  },
  methods: {
    shouldDisplayFilms() {
      return this.films.length > 0;
    },

    handleDataFetched(event) {
      const { results: films } = event.detail.data;
      this.films = [];

      const firstFourCharsAsNumber = str => Number(str.slice(0, 4));

      films.sort((a, b) => firstFourCharsAsNumber(a.release_date)
        - firstFourCharsAsNumber(b.release_date));

      this.films = films;
    },
  },
  mounted() {
    document.addEventListener('dataFetched', this.handleDataFetched);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
