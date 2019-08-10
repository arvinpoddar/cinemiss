<template>
  <!--COMPONENT FOR MOVIE SEARCH RESULTS LIST -->
  <router-link :to="`/movie/${id}`">
    <div class="cardBody">
      <div class="poster">
        <img :src="correctPosterPath" />
      </div>
      <div class="movieInfo">
        <h1>{{title}}</h1>
        <b>
          <p>Released: {{year}}</p>
        </b>
        <p>{{trimmedSlug}}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "MovieCard",
  props: ["load"],
  data() {
    return {
      id: this.load.id,
      title: this.load.title,
      posterPath: this.load.poster_path,
      slug: this.load.overview,
      releaseDate: this.load.release_date
    };
  },
  computed: {
    trimmedSlug() {
      //Trims the movie overview if it's over 150 characters long
      if (this.slug.length > 150) {
        return this.slug.substring(0, 149) + "...";
      } else {
        return this.slug;
      }
    },
    correctPosterPath() {
      //Shows the default poster image if no path is provided
      if (this.posterPath) {
        return "https://image.tmdb.org/t/p/w185/" + this.posterPath;
      } else {
        return require("../assets/noPoster.png");
      }
    },
    year() {
      var parsedDate = new Date(this.releaseDate);
      return parsedDate.getFullYear();
    }
  }
};
</script>

<style scoped>
.cardBody {
  width: 100%;
  background-color: white;
  color: #262626;
  border-radius: 5px;
  box-shadow: 0 0 13px 0 rgba(47, 47, 47, 0.1);
  padding: 10px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;

  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
}

.cardBody:hover {
  border: 1px solid #35d3df;
}

a,
a:hover,
a:visited {
  text-decoration: none !important;
  color: inherit;
}

.poster img {
  width: 125px;
}

.movieInfo {
  padding: 10px;
  text-align: left;
  flex: 1;
}

.movieInfo h1,
.movieInfo p {
  font-size: auto;
}

.movieInfo h1 {
  line-height: 100%;
  margin-bottom: 10px;
}

@media screen and (max-width: 560px) {
  .cardBody {
    flex-direction: column;
  }

  .movieInfo {
    margin-top: 0px;
    padding-top: 0px;
  }

  .movieInfo h1 {
    font-size: 30px;
    margin-bottom: 2px;
  }

  .movieInfo p {
    font-size: 14px;
  }
}

@media screen and (max-width: 400px) {
  .movieInfo h1 {
    font-size: 25px;
    margin-bottom: 2px;
  }
}
</style>