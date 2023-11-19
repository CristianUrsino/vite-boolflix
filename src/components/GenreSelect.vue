<template>
    <select class="rounded" v-model="currentGenre" @change.value="setCurrentGenre">
        <option value="" selected>Scegli il genere</option>
        <option v-for="genre in store.genreList" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
    </select>
</template>

<script>
import {store} from '../data/store';
export default{
    name:'GenreSelect',
    data(){
        return{
            store,
            currentGenre:'',
        }
    },
    methods:{
        setCurrentGenre(){
            this.store.currentGenreId= this.currentGenre;
            console.log(this.store.currentGenreId);
        },
    }
}
</script>

<style lang="scss" scoped>
    
</style>
