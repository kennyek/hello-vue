<template>
  <div class="searchForm">
    <input @input="updateInput" type="text" />
    <button @click="fetchData">Submit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'searchForm',
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    updateInput(event) {
      this.inputValue = event.target.value;
    },
    async fetchData() {
      try {
        const { data } = await axios.get('https://swapi.co/api/films');

        if (this.inputValue.length > 0) {
          data.results = data.results.filter(film => film.title.toLowerCase()
            .includes(this.inputValue.toLowerCase()));
        }

        const customEvent = new CustomEvent('dataFetched', {
          detail: {
            data,
          },
        });

        document.dispatchEvent(customEvent);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>
