<template>
  <!--COMPONENT VIEW FOR SINGULAR MOVIE PAGE AND CALCULATIONS -->
  <div class="resultWrap">
    <div class="resultBox" v-if="!loading">
      <div class="movieDetails">
        <a :href="`https://www.themoviedb.org/movie/${this.$route.params.id}`" target="_blank">
          <div class="poster">
            <img :src="correctPosterPath" />
          </div>
          <h1>{{movieData.title}}</h1>
        </a>
        <p style="margin-top: 2px;" v-if="movieData.tagline">"{{movieData.tagline}}"</p>
        <div v-if="movieData.budget && movieData.runtime" style="margin: 15px auto 25px auto;">
          <h3>Budget: ${{movieData.budget.toLocaleString('en-US')}}</h3>
          <h3>Runtime: {{movieData.runtime.toLocaleString('en-US')}} minutes</h3>
          <h3>Cost per Minute: ${{costPerMinute}}</h3>
        </div>
        <div class="btn primary" @click="$router.push('/')">Search for another movie</div>
      </div>
      <div class="calculationDetails">
        <div v-if="movieData.budget && movieData.runtime">
          <h1 style="margin-bottom: 10px;">Calculations:</h1>
          <p>
            By blinking during
            <b>{{this.movieData.title}}</b>, you'll miss a total of:
          </p>
          <div style="margin: 15px auto">
            <h1 class="totalMissed">${{totalMissed}}</h1>
            <h3>Cost per Blink: ${{costPerBlink}}</h3>
          </div>
          <div class="blinkControls">
            <div>
              <p>Blinks per Minute:</p>
              <input type="number" v-model="blinksPerMinute" placeholder="Blinks per Minute" />
            </div>
            <div>
              <p>Blink Length (Sec):</p>
              <input type="number" v-model="blinkLength" placeholder="Blinks Length (Seconds)" />
            </div>
          </div>
        </div>
        <h2
          v-else
        >Looks like there's no budget data available for this movie. Try searching for another movie. 🙁</h2>
      </div>
    </div>
    <img src="../assets/loading.gif" alt="Loading" v-else style="max-width: 100px;" />
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "Movie",
  data() {
    return {
      loading: false,
      blinksPerMinute: 17,
      blinkLength: 0.25,
      movieData: {}
    };
  },
  methods: {
    //Get information about the movie based on the id passed via the path (url)
    getMovieInfo() {
      this.loading = true;
      //Make request using id param
      Axios.get(`${this.$root.apiBase}movie/${this.$route.params.id}`, {
        params: {
          //API key is called from the environment variable
          api_key: process.env.VUE_APP_TMDB_API_KEY
        }
      })
        .then(response => {
          this.loading = false;
          var movie = response.data;
          //Populate the movieData object with received API data
          this.movieData = {
            title: movie.title,
            budget: movie.budget,
            runtime: movie.runtime,
            tagline: movie.tagline,
            posterPath: movie.poster_path
          };
        })
        .catch(() => {
          this.loading = false;
          this.$noty.error("Oops, something went wrong!");
        });
    }
  },
  computed: {
    correctPosterPath() {
      //Shows the default poster image if no path is provided
      if (this.movieData.posterPath) {
        return "https://image.tmdb.org/t/p/w185/" + this.movieData.posterPath;
      } else {
        return require("../assets/noPoster.png");
      }
    },

    costPerMinute() {
      //Calculate the cost per minute of the movie assuming both runtime and budget are available
      if (this.movieData.budget && this.movieData.runtime) {
        return (this.movieData.budget / this.movieData.runtime).toLocaleString(
          "en-US",
          { minimumFractionDigits: 2 }
        );
      } else {
        return;
      }
    },

    totalMissed() {
      //Calculate the total amount of money missed from blinking
      var totalMissed =
        ((this.movieData.runtime * this.blinksPerMinute * this.blinkLength) /
          60) *
        (this.movieData.budget / this.movieData.runtime);

      return totalMissed.toLocaleString("en-US", { minimumFractionDigits: 2 });
    },

    costPerBlink() {
      //Calculate the cost per blink
      var costPerBlink =
        (this.blinkLength / 60) *
        (this.movieData.budget / this.movieData.runtime);
      return costPerBlink.toLocaleString("en-US", { minimumFractionDigits: 2 });
    }
  },
  //Get info about the movie when the page is first loaded
  mounted() {
    this.getMovieInfo();
  }
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.resultWrap {
  width: 100vw;
  min-height: 100vh;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.resultBox {
  width: 90%;
  flex: 0.75;
  color: #262626;
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0 13px 0 rgba(47, 47, 47, 0.1);

  display: flex;
  align-items: center;
}

.movieDetails {
  flex: 2;
  border-right: 1px solid #c5c5c5;
  padding: 20px;
  text-align: center;
}

.poster {
  margin-bottom: 10px;
}

.calculationDetails {
  flex: 3;
  padding: 20px;
}

.totalMissed {
  font-size: 45px;
}

.blinkControls {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}

.blinkControls div {
  margin: 5px;
}

.blinkControls input[type="number"] {
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

.blinkControls input[type="number"]:focus {
  background-color: #e4f5ef !important;
}

@media screen and (max-width: 900px) {
  .resultWrap {
    min-height: 0px;
    display: block;
  }

  .resultBox {
    width: 97%;
    flex-direction: column;
    margin: 0 auto;
    flex: none;
    padding: 10px;
  }

  .movieDetails {
    flex: none;
    width: 100%;
    border-right: 0px;
    border-bottom: 1px solid #c5c5c5;
  }

  .totalMissed {
    font-size: 35px;
  }

  .calculationDetails {
    flex: none;
    width: 100%;
  }
}

@media screen and (max-width: 500px) {
  .movieDetails,
  .calculationDetails {
    padding: 10px;
  }

  .movieDetails .poster img {
    width: 125px;
  }

  .movieDetails h1 {
    font-size: 25px;
  }

  .movieDetails h3 {
    font-size: 16px;
  }

  .movieDetails p {
    font-size: 14px;
  }

  .totalMissed {
    font-size: 30px;
  }
}
</style>