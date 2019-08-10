<template>
  <div class="searchWrap">
    <div class="searchBox">
      <img src="../assets/logoColor.png" alt="Logo" />
      <h1 class="title">Cinemiss</h1>
      <h3 style="margin-bottom: 10px; font-weight: normal;">How much have you been missing?</h3>
      <form @submit.prevent="searchMovies" action="#">
        <div class="formWrap">
          <input type="text" v-model="search" placeholder="Movie Title" required />
          <button
            class="btn primary"
            type="submit"
            :disabled="loading"
          >{{loading ? "Searching" : "Search"}}</button>
        </div>
      </form>
      <a
        style="font-size: 14px;"
        data-micromodal-trigger="info"
      >Click here to learn more about Cinemiss.</a>
    </div>

    <!--SEARCH RESULTS STARTS HERE-->
    <div class="modal micromodal-slide" id="search" aria-hidden="true">
      <div class="modal__overlay" tabindex="-1" :data-micromodal-close="!loading">
        <div
          class="modal__container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-1-title"
        >
          <header class="modal__header">
            <h2 class="modal__title">Results for "{{search}}"</h2>
            <button class="modal__close" aria-label="Close modal" :data-micromodal-close="!loading"></button>
          </header>
          <main class="modal__content" style="text-align: center;">
            <img class="loadingGif" src="../assets/loading.gif" alt="Loading" v-if="loading" />
            <div v-else class="movieCardContainer">
              <MovieCard v-for="movie in searchResults" :key="movie.id" :load="movie"></MovieCard>
              <a
                :data-micromodal-close="!loading"
              >Didn't find what you were looking for? Try a more specific search.</a>
            </div>
          </main>
        </div>
      </div>
    </div>

    <!--INFO MODAL STARTS HERE-->
    <div class="modal micromodal-slide" id="info" aria-hidden="true">
      <div class="modal__overlay" tabindex="-1" data-micromodal-close>
        <div
          class="modal__container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-1-title"
          style="max-width: 500px;"
        >
          <header class="modal__header">
            <h2 class="modal__title">About Cinemiss</h2>
            <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>
          <main class="modal__content">
            <p>Movies are expensive. Really expensive. Cinemiss helps people see this by calculating the thousands (or millions) of dollars we miss just by blinking during the movie. Cinemiss is powered by the TMDB API, so it has data for nearly every movie. Try it out yourself, and let Cinemiss show you how much you're missing.</p>
            <a>Developed by Arvin Poddar.</a>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MicroModal from "micromodal";
import Axios from "axios";

import MovieCard from "./MovieCard";

export default {
  name: "Search",
  components: {
    MovieCard
  },
  data() {
    return {
      loading: false,
      search: "",
      searchResults: []
    };
  },
  methods: {
    searchMovies() {
      if (this.search) {
        MicroModal.show("search");
        this.loading = true;
        Axios.get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: "cfb45e079d971b3d8074a8d42036a70e",
            language: "en-US",
            query: this.search,
            include_adult: false
          }
        })
          .then(response => {
            this.loading = false;
            /*Only add released movies to the search results*/
            var results = response.data.results.filter(
              movie => movie.release_date
            );
            results.length > 10
              ? (this.searchResults = results.slice(0, 10))
              : (this.searchResults = results);
            console.log(this.searchResults);
          })
          .catch(() => {
            this.loading = false;
            this.$noty.error("Uh oh, something went wrong!");
          });
      } else {
        this.$noty.error("You need to search something!");
      }
    }
  },
  mounted() {
    MicroModal.init();
  }
};
</script>

<style scoped>
.searchWrap {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.searchBox {
  width: 50%;
  color: #262626;
  background-color: #ffffff;
  padding: 30px 40px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0 13px 0 rgba(47, 47, 47, 0.1);
}

.searchBox .title {
  font-size: 56px;
  line-height: 100%;
}

.searchBox img {
  width: 125px;
}

.searchBox input[type="text"] {
  width: 100%;
  border: 0px;
  outline: none;
  background-color: #f2f2f2 !important;
  font-size: 17px;
  line-height: 17px;
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 3px auto;
  border: 1px solid #c5c5c5;

  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}

.searchBox input[type="text"]:focus {
  background-color: #e4f5ef !important;
}

.formWrap {
  display: flex;
  align-items: center;
  margin: 10px auto;
}

@media screen and (max-width: 800px) {
  .searchBox {
    width: 80%;
  }

  .searchBox .title {
    font-size: 45px;
  }
}

@media screen and (max-width: 400px) {
  .searchBox {
    width: 90%;
  }

  .searchBox .title {
    font-size: 30px;
  }
}
</style>