<template>
  <div class="wrapper">

    <header>
      <div class="container py-3 px-1 d-flex justify-content-between align-items-center">
        <h1>BOOLFLIX</h1>
        <GenreSelect/>
        <SearchComponent 
        @filter-movies-films="setParams"
        />
      </div>
    </header>

    <main class="container-fluid overflow-y-auto py-3 px-1">
      <!-- prima di cercare -->
      <div class="container">
        <h3 v-if="store.moviesList.length === 0 && store.seriesList.length === 0">Cercare i film/serie tv</h3>
      </div>
      <!-- messaggio di errore -->
      <div class="container">
        <div v-if="store.error != ''" class="alert alert-danger">{{store.error}}</div>
      </div>
      <!-- cards per i film -->
      <div class="container row mx-auto gy-2 mb-5 pb-5">
        <div class="col-3" v-for="movie in this.store.moviesList" :key="movie.id" v-show="movie.genre_ids.includes(store.currentGenreId) || store.currentGenreId === ''">
            <CardComponent
            :isFilm="true"
            :title="movie.title"
            :originalTitle="movie.original_title"
            :originalLinguage="movie.original_language"
            :voteAverage="movie.vote_average"
            :imgFrontPath="movie.poster_path"
            :id="movie.id"
            :cast="movie.cast"
            @cast-ready="addCredits($event,movie)"
            />
        </div>
        <!-- cards per le serie -->
        <div class="col-3" v-for="serie in this.store.seriesList" :key="serie.id" v-show="serie.genre_ids.includes(store.currentGenreId) || store.currentGenreId === ''">
            <CardComponent
              :isFilm="false"
              :title="serie.name"
              :originalTitle="serie.original_name"
              :originalLinguage="serie.original_language"
              :voteAverage="serie.vote_average"
              :img-front-path="serie.poster_path"
              :id="serie.id"
              :cast="serie.cast"
              @cast-ready="addCredits($event,serie)"
            />
        </div>
      </div>

    </main>

  </div>
</template>

<script>

  import axios from 'axios';
  import {store} from './data/store.js';
  import SearchComponent from './components/SearchComponent.vue';
  import CardComponent from './components/CardComponent.vue';
  import GenreSelect from './components/GenreSelect.vue';

  export default{
    name: 'App',
    components:{
      SearchComponent,
      CardComponent,
      GenreSelect,
    },

    data(){
      return {
        store,
        paramsMovies:{},
        paramsSeries:{},
      }
    },

    methods:{

      /**
       * [addCredits]
       * preso il cast da (CardSection) lo inserisce nei movies, [lavora con getCredits]
       * @param {Array} cast 
       * @param {Object} movies 
       * @return {Void}
       */
      addCredits(cast,serieMovie){
        console.log(cast);
        serieMovie.cast = cast;
        console.log(serieMovie);
      },

      /**
       * [setParams]
       * Presa la nuova query setta i parametri delle liste di parametri e richiama le funzioni chiamati delle API
       * @param {String} newQuery
       * @returns {Void}
       */
      setParams(newQuery){
        console.log('App ok-' + newQuery);
        //setta i parametri
        this.paramsMovies={
          api_key:this.store.api_key,
          num:20,
          offset:0,
          query:newQuery,
        }
        this.paramsSeries={
          api_key:this.store.api_key,
          num:20,
          offset:0,
          query:newQuery,
        }
        console.log('films query= '+ this.paramsMovies.query + " --- "+ 'series query= '+ this.paramsSeries.query);
        console.groupEnd();//DI Passaggio new query
        //richiama le funzioni delle API
        console.group('get movies/series');
        this.getMovies();
        this.getSeries();
      },

      /**
       * [getMovies]
       * richiama l'API per ottenere la lista di oggetti (movies)
       * @returns {Void}
       * !!!!!!!TROPPO RIDONDANTE!!!!!!!!!!
       */
      getMovies(){
        const moviesUrl = this.store.apiUrl + this.store.endPoint.movies;
        if(this.paramsMovies.query === ''){
          this.store.error='Inserire caratteri validi';
          return;
        }
        this.store.error='';
        axios.get(moviesUrl, {params: this.paramsMovies}).then((res)=>{
          this.store.moviesList=res.data.results;
          console.log(this.store.moviesList);
        }).catch((error)=>{
          console.log(error);
        });
      },

      /**
       * [getSeries]
       * richiama l'API per ottenere la lista di oggetti (series)
       * @returns {Void}
       */
      getSeries(){
        const seriesUrl = this.store.apiUrl + this.store.endPoint.series;
        if(this.paramsSeries.query === ''){
          return;
        }
        axios.get(seriesUrl, {params: this.paramsSeries}).then((res)=>{          
          this.store.seriesList=res.data.results;
          console.log(this.store.seriesList);
        }).finally(()=>{
          setTimeout(()=>{
            console.groupEnd();//DI get movies/series
          },300);
        });
      },
      
      getGenre(){
        const genreApi = this.store.apiUrl + this.store.endPoint.genre;
        const params = {
          api_key:this.store.api_key,
        }
        axios.get(genreApi, {params}).then((res)=>{
          this.store.genreList = res.data.genres;
          console.log(this.store.genreList);
        })
      },

    },
    created(){
      this.getGenre();
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
