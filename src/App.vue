<template>
</template>

<script>
  import axios from 'axios';
  import {store} from './data/store.js'
  export default{
    data(){
      return {
        store,
      }
    },
    created(){
      // const url = this.store.apiUrl + this.store.endPoint.movies + '?api_key=' + this.store.api_key + '&query=' + this.store.query;

      // axios.get(url).then((res)=>{
      //   console.log(res.data);
      // })
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
