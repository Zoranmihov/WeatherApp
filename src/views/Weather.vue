<script>
import SearchComponent from "../components/SearchComponent.vue";
export default {
  components: {
    SearchComponent,
  },
  data: () => {
    return {
      location: "",
      apiKey: "ec72b7fcbc476be805ccb23d5e6d5493",
      weatherInfo: {},
      reload_key: 0,
      imgSrc: "../assets/weatherIcons/",
    };
  },
  methods: {
    getInfo(event) {
      this.location = event;
    },
    currentDate() {
      const today = new Date();
      const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const time = today.getHours() + ":" + today.getMinutes();
      const timestamp = date + " " + time;
      return timestamp;
    },
    searchWeather() {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&units=metric&appid=${this.apiKey}`
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          this.weatherInfo = result;
        })
        .catch((err) => {
          console.log(err);
        });
      this.reload_key++;
    },
  },
  emits: ["change"],
};
</script>

<template>
  <div class="weather">
    <div id="search-container">
      <h1>Weather</h1>
      <button @click="searchWeather" id="search-btn">Search</button>
      <SearchComponent :key="reload_key" @change="getInfo" />
    </div>
    <div id="weather-box" v-if="typeof weatherInfo.main != 'undefined'">
      <div id="info-container">
        <p id="info-location" class="info">
          {{ weatherInfo.name }}, {{ weatherInfo.sys.country }}
        </p>
        <p id="info-date" class="info">{{ currentDate() }}</p>
        <p class="info">{{ Math.round(weatherInfo.main.temp) }}</p>
        <div class="icon" v-if="weatherInfo.weather[0].main == 'Clear'">
          <img src="../assets/weatherIcons/clear.png" alt="weather icon" />
        </div>
        <div class="icon" v-if="weatherInfo.weather[0].main == 'Thunderstorm'">
          <img
            src="../assets/weatherIcons/thunderstorm.png"
            alt="weather icon"
          />
        </div>
        <div class="icon" v-if="weatherInfo.weather[0].main == 'Drizzle'">
          <img src="../assets/weatherIcons/drizzle.png" alt="weather icon" />
        </div>
        <div class="icon" v-if="weatherInfo.weather[0].main == 'Rain'">
          <img src="../assets/weatherIcons/rain.png" alt="weather icon" />
        </div>
        <div class="icon" v-if="weatherInfo.weather[0].main == 'Snow'">
          <img src="../assets/weatherIcons/snow.png" alt="weather icon" />
        </div>
        <div class="icon" v-if="weatherInfo.weather[0].main == 'Clouds'">
          <img src="../assets/weatherIcons/clouds.png" alt="weather icon" />
        </div>
        <div
          class="icon"
          v-if="
            weatherInfo.weather[0].id > 700 && weatherInfo.weather[0].id < 782
          "
        >
          <img src="../assets/weatherIcons/warning.png" alt="weather icon" />
        </div>
        <p class="info">{{ weatherInfo.weather[0].main }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather {
  min-height: 100vh;
  background-color: #000000;
  background-image: linear-gradient(147deg, #000000 0%, #2c3e50 74%);
}

#search-container {
  color: azure;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#search-btn {
  color: azure;
  width: 280px;
  padding: 2px 4px;
  margin: 8px 0;
  font-size: 20px;
  border-radius: 5px;
  background-color: #222f3c;
  outline: none;
  border: none;
}

#search-btn:hover {
  background-color: #212d3a;
}

#weather-box {
  color: azure;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}

#info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  text-align: center;
  background-color: #33485d;
  border-radius: 4px;
  height: 280px;
}

.icon {
  margin: 4px 0px;
}

img {
  max-width: 80px;
  max-height: 60px;

}

.info {
  margin: 6px 0px;
  font-size: 24px;
}

#info-location {
  font-size: 28px;
}
#info-date {
  font-size: 26px;
}
h1 {
  margin: 8px 0px;
}
</style>
