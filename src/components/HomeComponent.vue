
<template>
    <div class="hero" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w342' + store.currentMustTreding.backdrop_path + ')' }">
        <!-- se è un film -->
        <div v-if="store.currentMustTreding.title" class="hero-content">

            <div class="logo-container d-inline-block rounded-5">
                <figure class="logo d-inline-block me-2"><img src="../assets/images/Netflix_Mini_Logo.png" alt="logo Netflix"></figure>
                <span class=" my-text-secondary">FILM</span>
            </div>
            
            <div >
                <h1 class="titleHero">
                {{ store.currentMustTreding.title.toUpperCase() }}
                <div class="horizontal-border"></div>
                </h1>
            </div>

            <p class="mt-3 p-3 rounded-5" v-if="!showMoreInfo">{{store.currentMustTreding.overview}}</p>
            <p class="mt-3 p-3 rounded-5" v-else>
                original title: {{store.currentMustTreding.original_title}} <br>
                original language: {{store.currentMustTreding.original_language}} <br>
                <span v-for="n in 5">
                    <i v-if="n <= store.stars_calc(store.currentMustTreding.vote_average)" class="fa-solid fa-star fa-xs"></i>
                    <i v-else class="fa-regular fa-star fa-xs"></i>
                </span>
                <img class="flag" :src="store.currentFlagCalc(store.currentMustTreding.original_language)" :alt="'bandiera' + store.currentMustTreding.original_language"> <br>
            </p>

            <div>
                <button class="my-btn play-btn">PLAY</button>
                <button class="my-btn info-btn" @click="ToggleShowMoreInfo">INFO</button>
            </div>

        </div>
        <!-- se è una serie -->
        <div v-else class="hero-content">

            <div class="logo-container d-inline-block rounded-5">
                <figure class="logo d-inline-block me-2"><img src="../assets/images/Netflix_Mini_Logo.png" alt="logo Netflix"></figure>
                <span class=" my-text-secondary">SERIE</span>
            </div>
            
            <div >
                <h1 class="titleHero">
                {{ store.currentMustTreding.name.toUpperCase() }}
                <div class="horizontal-border"></div>
                </h1>
            </div>

            <p class="mt-3 p-3 rounded-5" v-if="!showMoreInfo">{{store.currentMustTreding.overview}}</p>
            <p class="mt-3 p-3 rounded-5" v-else>
                original title: {{store.currentMustTreding.original_name}} <br>
                original language: {{store.currentMustTreding.original_language}} <br>
                <span v-for="n in 5">
                    <i v-if="n <= store.stars_calc(store.currentMustTreding.vote_average)" class="fa-solid fa-star fa-xs"></i>
                    <i v-else class="fa-regular fa-star fa-xs"></i>
                </span>
                <img class="flag" :src="store.currentFlagCalc(store.currentMustTreding.original_language)" :alt="'bandiera' + store.currentMustTreding.original_language"> <br>
            </p>

            <div>
                <button class="my-btn play-btn">PLAY</button>
                <button class="my-btn info-btn" @click="ToggleShowMoreInfo">INFO</button>
            </div>
            
        </div>
    </div>

    <h4 class="pt-4 container">FILM E SERIE TV PIU' POPOLARI: </h4>
    <CarouselComponent/>
    
</template>

<script>
import {store} from '../data/store';
import CarouselComponent from './main/CarouselComponent.vue';
export default{
    name: 'HomeComponent',
    components:{
        CarouselComponent,
    },
    data(){
        return{
            store,
            showMoreInfo:false,
        }
    },
    methods:{
        ToggleShowMoreInfo(){
            this.showMoreInfo= !this.showMoreInfo;
        }
    },
}
</script>

<style lang="scss" scoped>
    
</style>
