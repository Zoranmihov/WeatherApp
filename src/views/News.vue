<template>
  <div class="news">
    <h1>News</h1>
    <button @click="searchWeather" id="search-btn">Search</button>
      <SearchComponent :key="reload_key" @change="getInfo" />
  </div>
</template>

<script>
import SearchComponent from "../components/SearchComponent.vue";
export default {
  components: {
    SearchComponent,
  },
  emits: ["change"],
}
</script>

<style scoped>
.news{
  min-height: 100vh;
  background-color: #000000;
  background-image: linear-gradient(147deg, #000000 0%, #2c3e50 74%);
}
</style>