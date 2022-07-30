<template>
  <div @click="() => (modal = false)">
    <input
      type="text"
      autocomplete="off"
      placeholder="Search for location"
      @input="debounceSearch"
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
export default {
  name: "SearchComponent",
  data: () => {
    return {
      state: "",
      modal: false,
      filteredLocations: [],
      options: {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9bb155c274msh7bf4678dd0f4e85p1e10fbjsn662a2c766756",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      },
    };
  },
  methods: {
    debounceSearch(event) {
      this.state = null;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.state = event.target.value;
        this.modal = true;
        fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${this.state}`,
          this.options
        )
          .then((response) => response.json())
          .then((response) => {
            response.data.forEach((location) => {
              let info = `${location.city}, ${location.country}`;
              this.filteredLocations.push({city: location.city, country: location.country});
            });
            console.log(this.filteredLocations);
          })
          .catch((err) => console.error(err));

        this.$emit("change", this.state);
      }, 800);
    },

    filterLocations() {},
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
input:focus {
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
#results {
  overflow: auto;
  max-height: 40vh;
}
</style>
