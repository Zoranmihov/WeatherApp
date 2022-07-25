<template>
  <div @click="() => modal = false">
    <input
      type="text"
      autocomplete="off"
      v-model="state"
      placeholder="Search for location"
      @input="() => {
        filterLocations()
         this.$emit('change', state)
      }"
    />
  </div>
  <div id="results" v-if="filteredLocations && modal">
    <ul>
      <li
        v-for="filteredLocation in filteredLocations"
        @click="() => {
            setState(filteredLocation)
            this.$emit('change', state)
        }"
      >
        {{ filteredLocation.city }}, {{ filteredLocation.country }}
      </li>
    </ul>
  </div>
</template>

<script>
import { locations } from "../assets/locations";

export default {
  name: "SearchComponent",
  data: () => {
    return {
      state: "",
      modal: false,
      filteredLocations: [],
    };
  },
  methods: {
    filterLocations() {
      this.modal = true;
      this.filteredLocations = locations.filter((location) => {
        return (
          location.city.toLowerCase().includes(this.state.toLowerCase()) ||
          location.country.toLowerCase().includes(this.state.toLowerCase())
        );
      });
    },
    setState(location) {
      this.state = location.city + ", " + location.country;
      this.modal = false;
    },
  },
  emits: ["change"],
};
</script>

<style scoped>
template {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;
}
input {
    color: azure;
    width: 280px;
    padding: 2px 4px;
    font-size: 20px;
    border-radius: 5px;
    border: none;
    background-color: #1b2530;
    outline: none;
}
input:focus{
    background-color: #212d3a;
}
ul {
    list-style: none;
    margin-top: 1px;
}
li {
    font-size: 18px;
    width: 265px;
    text-align: center;
    background-color: #000000;
    padding: 4px;
    cursor: pointer;
}
li:hover {
    background-color: #272727;
}
#results{
overflow: auto;
max-height: 40vh;
}
</style>