<template>
  <div class="news">
    <div id="search-container">
      <h1>News</h1>
      <button @click="getNews()" id="search-btn">Search</button>
      <SearchComponent :key="reload_key" @change="getInput" />
    </div>
    <div id="articles-container" v-if="foundArticles">
      <div v-for="article in foundArticles">
        <div class="article-card">
          <p class="article-title">{{ article.title }}</p>
          <p class="article-descrption">
            {{ article.description.slice(0, 140) + "..." }}
          </p>
          <p v-if="article.author" class="article-author">
            By: {{ article.author }}
          </p>
          <a _blank :href="article.url" class="article-link"
            >Read full article</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponent from "../components/SearchComponent.vue";
export default {
  data: () => {
    return {
      apiKey: "29a7266f94004b0281c59699675af6e3",
      location: "",
      foundArticles: false,
      reload_key: 0,
    };
  },
  components: {
    SearchComponent,
  },
  methods: {
    getNews() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        (today.getDate() - 3);
      fetch(
        `https://newsapi.org/v2/everything?q=${this.location}&sortBy=popularity&from=${date}&apiKey=${this.apiKey}`
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result.articles.length > 10) {
            this.foundArticles = result.articles.splice(0, 10);
            console.log(this.foundArticles[0]);
          } else {
            this.foundArticles = result.articles;
            console.log(this.foundArticles[0]);
          }
          this.reload_key++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getInput(event) {
      this.location = event;
    },
  },

  emits: ["change"],
};
</script>

<style scoped>
.news {
  min-height: 100vh;
  background-color: #000000;
  background-image: linear-gradient(147deg, #000000 0%, #2c3e50 74%);
}

#articles-container {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.article-card {
  width: 600px;
  height: 280px;
  color: azure;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #33485d;
  margin: 8px;
  padding: 6px;
}
.article-card p {
  margin-top: 10px;
}

.article-title {
  text-align: center;
  font-size: 26px;
}
.article-descrption {
  font-size: 22px;
}
.article-author {
  font-size: 18px;
  text-align: end;
}
.article-link {
  font-size: 18px;
  color: azure;
  text-decoration: none;
  cursor: pointer;
  margin-top: 14px;
}
.article-link:hover {
  text-decoration: underline;
}

@media only screen and (max-device-width: 480px) {

  .article-card{
    width: 290;
    height: auto;
  }
  .article-title {
    font-size: 18px;
  }
  .article-descrption {
    font-size: 16px;
  }
  .article-author {
    font-size: 16px;
  }
  .article-link {
    font-size: 16px;
  }
}
</style>
