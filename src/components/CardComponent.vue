<template>
    <div class="my-card " @mouseleave="showInfo = false" >
        <!-- parte avanti -->
        <div v-if="!showInfo" @mouseenter="getCredits">
            <img class="front-img" :src="'https://image.tmdb.org/t/p/w342' + imgFrontPath" :alt="originalTitle + 'immagine'">
        </div>
        <!-- parte dietro -->
        <div v-else >
            <div>{{title}}</div>
            <div>{{originalTitle}}</div>
            <!-- stelle -->
            <span v-for="n in 5">
                <i v-if="n <= store.stars_calc(voteAverage)" class="fa-solid fa-star fa-xs"></i>
                <i v-else class="fa-regular fa-star fa-xs"></i>
            </span>
            <!-- bandiere -->
            <img class="flag" :src="store.currentFlagCalc(originalLinguage)" :alt="'bandiera' + originalLinguage">
            <!-- cast -->
            <div v-for="actor in cast" :key="actor.id">{{ actor.name }}</div>
            
        </div>

    </div>
    
</template>

<script>
import axios from 'axios';
import {store} from '../data/store.js';
    export default{
        name:'CardComponent',
        props:{
            isFilm:Boolean,
            title:String,
            originalTitle:String,
            originalLinguage:String,
            voteAverage:Number,
            imgFrontPath:String,
            id: Number,
            cast:Array,
        },
        data(){
            return{
                store,
                currentFlag:'',
                showInfo:false,
            }
        },
        methods:{

            /**
             * [getCredits]
             * richiamando l'api riepie un array (cast) con i primi 5 attori del cast e li invia al componente padre, [lavora con addCredits]
             * @return {Void}
             */
            getCredits(){
                //per girare la card
                this.showInfo = true;
                //se cast esiste non richiamare l'api
                if(this.cast && this.cast.length > 0){
                    console.log('cast vuoto');
                    return;
                }
                //richiama l'api riempie con i primi 5 l'array cast
                let endPoint = '';
                if (this.isFilm) {
                    endPoint = this.store.endPoint.movieCast + this.id + '/credits';
                }else{
                    endPoint = this.store.endPoint.tvCast + this.id + '/aggregate_credits';
                }
                const params = {
                    api_key : this.store.api_key
                }
                const cast = [];
                axios.get(this.store.apiUrl + endPoint, {params}).then((res)=>{
                    for(let i=0; i < 5 ; i++){
                        if(res.data.cast[i]){
                            cast.push(res.data.cast[i]);
                        }
                    }
                }).catch((error)=>{
                    console.log(error);
                }).finally(()=>{
                    //invia cast al componente padre (ad App)
                    this.$emit('castReady', cast);
                })
            },
        },
        computed:{
            
        },
        created(){
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
