<template>
    <div>
        <input class="text-black rounded me-3" type="text" placeholder="scrivi qui" v-model="newQuery" @keyup.enter="passNewQuery">
        <button class="text-black rounded px-2" @click="passNewQuery">INVIA</button>
    </div>
  </template>
  
  <script>
    import {store} from '../data/store.js'
    export default{
        name:'SearchComponent',
        data(){
            return{
                store,
                newQuery:'',
            }
        },
        methods:{
            passNewQuery(){
                console.group('passaggio newQuery');
                console.log('emit ok-'+this.newQuery);
                return this.$emit('filterMoviesFilms',this.newQuery);
            }
        }
    }
  </script>
  
  <style lang="scss" scoped>
    
  </style>
  