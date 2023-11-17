<template>
  <div class="wrapper">

    <header>
      <div class="container py-3 px-1 d-flex justify-content-between align-items-center">
        <h1>BOOLFLIX</h1>
        <SearchComponent 
        @filter-movies-films="setParams"
        />
      </div>
    </header>

    <main class="container-fluid overflow-y-auto py-3 px-1">
      <div class="container">
        <h3 v-if="store.moviesList.length === 0 && store.seriesList.length === 0">Cercare i film/serie tv</h3>
      </div>
      <!-- cards per i film -->
      <div class="container row mx-auto gy-2 debug mb-5 pb-5">
        <div class="col-2" v-for="movies in this.store.moviesList" :key="movies.id">
          <CardComponent
            :title="movies.title"
            :originalTitle="movies.original_title"
            :originalLinguage="movies.original_language"
            :voteAverage="movies.vote_average"
            :imgFrontPath="movies.poster_path"
          />
        </div>
        <!-- cards per le serie -->
        <div class="col-2" v-for="series in this.store.seriesList" :key="series.id">
          <CardComponent
            :title="series.name"
            :originalTitle="series.original_name"
            :originalLinguage="series.original_language"
            :voteAverage="series.vote_average"
            :img-front-path="series.poster_path"
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

  export default{
    name: 'App',
    components:{
      SearchComponent,
      CardComponent,
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
       */
      getMovies(){
        const moviesUrl = this.store.apiUrl + this.store.endPoint.movies;
        if(this.paramsMovies.query === ''){
          console.log("LA QUERY E' VUOTA" );
          return;
        }
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
          console.log("LA QUERY E' VUOTA" );
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
      }

    },

    created(){
      
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
