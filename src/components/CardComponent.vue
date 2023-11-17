<template>
    <div class="my-card " @mouseenter="getCredits()" @mouseleave="showInfo = false">
        <!-- parte avanti -->
        <div v-if="!showInfo">
            <img :src="'https://image.tmdb.org/t/p/w342' + imgFrontPath" :alt="originalTitle + 'immagine'">
        </div>
        <!-- parte dietro -->
        <div v-else >
            <div>{{title}}</div>
            <div>{{originalTitle}}</div>
            <div>{{originalLinguage}}</div>
            <span v-for="n in 5">
                <i v-if="n <= stars" class="fa-solid fa-star fa-xs"></i>
                <i v-else class="fa-regular fa-star fa-xs"></i>
            </span>
            <img class="flag" :src="currentFlagCalc" :alt="'bandiera' + originalLinguage">
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
            getCredits(){
                this.showInfo = true;
                if(this.cast && this.cast.length > 0){
                    console.log('cast vuoto');
                    return;
                }
                const endPoint = this.store.endPoint.movieCast + this.id + '/credits';
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
                    this.$emit('castReady', cast);
                })
            },
        },
        computed:{
            /**
             * [currentFlagCalcl]
             * Converte le iniziali delle lingue più comuni nel formato supportato dall'API (flagsapi), poi le confronta con quelle utilizzabili e se diverse le converte in 'inglesi' e ritorna l'url completo
             * @returns {String} url per richiamare l'epi (flagsapi)
             * !!!!!!!!!!!CREARE ARRAY PER LE INIZIALI CONOSCIUTE!!!!!!!!!!!!
             */
            currentFlagCalc() {
                let initials = this.originalLinguage.toUpperCase();
                switch (initials) {
                    case 'EN':
                        initials = 'GB';
                        break;
                    case 'JA':
                        initials = 'JP';
                        break;
                    case 'KO':
                        initials = 'KM';
                        break;
                }
                if (!['GB', 'JP', 'KM', 'IT', 'FR'].includes(initials)) { 
                    initials = 'GB';
                }
                return 'https://flagsapi.com/' + initials + '/shiny/32.png';
            },
            /**
             * [stars]
             * calcola e restituisce la quantità di stelle in base al voto
             * @return {Number} numero da 1 a 5
             * ??forse aggiungere mezza stella??
             */
            stars(){
                let stars = Math.ceil(this.voteAverage / 2);
                // console.log(stars);
                return stars
            }
        },
        created(){
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
