<template>
  <div class="cardBody">
    <div class="poster">
      <img v-bind:src="`http://image.tmdb.org/t/p/w185/${posterPath}`" />
    </div>
    <div class="movieInfo">
      <h1>{{title}}</h1>
      <p>Released: {{releaseDate}}</p>
      <p>{{trimmedSlug}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: ["load"],
  data() {
    return {
      title: this.load.title,
      posterPath: this.load.poster_path,
      slug: this.load.overview,
      releaseDate: this.load.release_date
    };
  },
  computed: {
    trimmedSlug() {
      return this.slug.substring(0, 149) + "...";
    }
  }
};
</script>

<style scoped>
.cardBody {
  width: 100%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 13px 0 rgba(47, 47, 47, 0.1);
  padding: 10px;
  margin: 10px auto;
  display: flex;
  align-items: center;
}

.movieInfo {
  padding: 10px;
  text-align: left;
  flex: 1;
}
</style>