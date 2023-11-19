<template>
  <!-- ENTER PAGE -->
  <div v-if="showEnterPage" class="wrapper enter-page ">
    <figure class="img-title"><img src="./assets/images/Netflix_2015_logo.png" alt="logo netflix" ></figure>
    <button class="d-block mx-auto btn border px-5 py-2 my-btn" @click="enterInPage">ENTRA</button>
  </div>
  <!-- loading page -->
  <div class="wrapper loading-page" v-else-if="showLoadingPage">
    <div class="loading-icon"><i class="inline-block fa-solid fa-spinner fa-spin-pulse"></i></div>
  </div>

  <!-- HOME -->
  <div class="wrapper" v-else>

    <header>
      <div class="container-md py-3 px-1 d-flex justify-content-between align-items-center wrap">
        <h1 @click="toHome" >BOOLFLIX</h1>
        <GenreSelect/>
        <SearchComponent 
        @filter-movies-films="setParams"
        />
      </div>
    </header>

    <main class="container-fluid p-0 overflow-y-auto">

      <!-- main prima di cercare -->
      <HomeComponent v-if="store.moviesList.length === 0 && store.seriesList.length === 0"/>
      
      <!-- messaggio di errore -->
      <div class="container">
        <div v-if="store.error != ''" class="alert alert-danger">{{store.error}}</div>
      </div>
      <!-- cards per i film -->
      <div class=" row mx-auto gy-2 mb-5 pb-5 ">
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 col-xxl-2" v-for="movie in this.store.moviesList" :key="movie.id" v-show="movie.genre_ids.includes(store.currentGenreId) || store.currentGenreId === ''">
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
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 col-xxl-2" v-for="serie in this.store.seriesList" :key="serie.id" v-show="serie.genre_ids.includes(store.currentGenreId) || store.currentGenreId === ''">
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
  import HomeComponent from './components/HomeComponent.vue';

  export default{
    name: 'App',
    components:{
      SearchComponent,
      CardComponent,
      GenreSelect,
      HomeComponent,
    },

    data(){
      return {
        store,
        paramsMovies:{},
        paramsSeries:{},
        showEnterPage:true,
        showImgTitle:false,
        showLoadingPage:false,
      }
    },

    methods:{
      /**
       * [enterInPage]
       * esegue lo switch tra la enter page e la loading page, e richiama le API utilizzate a caricamento della home
       * @returns {Void}
       */
      enterInPage(){
        this.showEnterPage= false;
        this.showLoadingPage= true;
        this.getGenre();
        this.getTreding();
      },

      /**
       * [getGenre]
       * riempie l'array (genreList [in store]) e fa entrare nella home
       * @returns {Void}
       */
      getGenre(){
        const genreApi = this.store.apiUrl + this.store.endPoint.genre;
        const params = {
          api_key:this.store.api_key,
        }
        axios.get(genreApi, {params}).then((res)=>{
          this.store.genreList = res.data.genres;
          // console.log(this.store.genreList);
        }).catch((error)=>{
          console.log(error);
        }).finally(()=>{
        })
      },

      getTreding(){
        const tredingUrl = this.store.apiUrl + this.store.endPoint.treding;
        const params={
          api_key:this.store.api_key,
        }
        axios.get(tredingUrl, {params}).then((res)=>{
          this.store.tredingList = res.data.results;
          this.store.currentMustTreding = this.store.tredingList[1]
          console.log(this.store.tredingList);
        }).catch((error)=>{
          console.log(error);
        }).finally(()=>{
          this.showLoadingPage = false;
        })
      },

      toHome(){
        this.store.moviesList = [];
        this.store.seriesList = [];
        this.store.error = '';
      },

      /**
       * [addCredits]
       * preso il cast da (CardSection) lo inserisce nei movies, [lavora con getCredits]
       * @param {Array} cast 
       * @param {Object} movies 
       * @return {Void}
       */
      addCredits(cast,serieMovie){
        // console.log(cast);
        serieMovie.cast = cast;
        // console.log(serieMovie);
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
      
    },
    created(){
    }
  }
</script>

<style lang="scss" scoped>
// animazione di comparsa
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
//elementi con animazione di comparsa
.enter-page{
  .img-title {
    animation: fadeIn 2s linear;
  }
  .my-btn{
    animation: fadeIn 4s ease-in;
  }
} 
.loading-page{
  animation: fadeIn 1s linear;
}


</style>
