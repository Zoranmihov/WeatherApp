<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink class="links" id="home" to="/">Weather</RouterLink>
        <RouterLink class="links" id="news" to="/news">News</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}
.links{
  background-color: rgb(14, 14, 14);
  width: 100%;
  font-size: 24px;
  text-decoration: none;
  color: azure;
  transition: 0.3s;
}

.links:hover {
  background-color: rgb(43, 42, 42);
}

#home {
  padding-left: 6px;
  font-size: 24px;
}
#news {
  text-align: end;
  padding-right: 6px;
}



</style>
