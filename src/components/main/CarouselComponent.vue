<template>
    <div class="my-carousel">

        <div :id="carouselNumber" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item" v-for="n in cardsForFour"  :class="{'active':n===1}">
                    <div class="row container mx-auto">
                        <div class="col-3" v-for="(currentSerieMovie,index) in list" v-show="(index < (n*4)) && index > (((n-1)*4)-1)">
                                <CardComponent v-if="currentSerieMovie.title"
                                    :isFilm="true"
                                    :title="currentSerieMovie.title"
                                    :originalTitle="currentSerieMovie.original_title"
                                    :originalLinguage="currentSerieMovie.original_language"
                                    :voteAverage="currentSerieMovie.vote_average"
                                    :imgFrontPath="currentSerieMovie.poster_path"
                                    :id="currentSerieMovie.id"
                                    :cast="currentSerieMovie.cast"
                                    @cast-ready="addCredits($event,currentSerieMovie)"
                                />
                                <CardComponent v-else
                                    :isFilm="false"
                                    :title="currentSerieMovie.name"
                                    :originalTitle="currentSerieMovie.original_name"
                                    :originalLinguage="currentSerieMovie.original_language"
                                    :voteAverage="currentSerieMovie.vote_average"
                                    :imgFrontPath="currentSerieMovie.poster_path"
                                    :id="currentSerieMovie.id"
                                    :cast="currentSerieMovie.cast"
                                    @cast-ready="addCredits($event,currentSerieMovie)"
                                />
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="'#'+carouselNumber" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="'#'+carouselNumber" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
    </div>
</template>

<script>
import {store} from '../../data/store';
import CardComponent from '../CardComponent.vue';
export default{
    name: 'HomeComponent',
    components:{
        CardComponent,
    },
    props:{
        list:Array,
        carouselNumber:String,
    },
    data(){
        return{
            store,  

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
        serieMovie.cast = cast;
      },
    },
    computed:{
        cardsForFour(){
            return Math.ceil(this.list.length / 4);
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
