<template>
  <div class="wrapper">

    <header>
      <div class="container py-3 px-1 d-flex justify-content-between align-items-center">
        <h1>BOOLFLIX</h1>
        <SearchComponent 
        @filter-movies-films="setQuery"
        />
      </div>
    </header>

    <main>
      <div class="container py-3 px-1">
        <h3 v-if="store.moviesList.length === 0 && store.seriesList.length === 0">Cercare i film/serie tv</h3>
      </div>
    </main>

  </div>
</template>

<script>

  import axios from 'axios';
  import {store} from './data/store.js';
  import SearchComponent from './components/SearchComponent.vue';

  export default{
    name: 'App',
    components:{
      SearchComponent,
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
       * [setQuery]
       * Prende la nuova query dal componente SearchComponent attraverso $emit, richiama il set delle liste dei parametri e richiama il getMovies e getSeries 
       * @param {String} newQuery
       * @returns {Void}
       */
      setQuery(newQuery){
        console.log('App ok-' + newQuery);
        this.setParams(newQuery);
        console.group('get movies/series');
        this.getMovies();
        this.getSeries();
      },

      /**
       * [setParams]
       * Presa la nuova query setta i parametri delle liste di parametri
       * @param {String} newQuery
       * @returns {Void}
       */
      setParams(newQuery){
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
      },

      /**
       * [getMovies]
       * richiama l'API per ottenere la lista di oggetti (movies)
       * @returns {Void}
       */
      getMovies(){
        const moviesUrl = this.store.apiUrl + this.store.endPoint.movies;
        if(this.paramsMovies.query === ''){console.log("LA QUERY E' VUOTA" );return;}
        axios.get(moviesUrl, {params: this.paramsMovies}).then((res)=>{
        console.log(res.data.results);
      }).catch((error)=>{
        console.log(error);
      })
      },

      /**
       * [getSeries]
       * richiama l'API per ottenere la lista di oggetti (series)
       * @returns {Void}
       */
      getSeries(){
        const seriesUrl = this.store.apiUrl + this.store.endPoint.series;
        if(this.paramsSeries.query === ''){console.log("LA QUERY E' VUOTA" );return;}
        return axios.get(seriesUrl, {params: this.paramsSeries}).then((res)=>{
        console.log(res.data.results);
      });
      console.groupEnd();//DI get movies/series
      }

    },

    created(){
      
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
