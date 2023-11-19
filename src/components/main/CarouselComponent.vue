<template>
    <div class="my-carousel">

        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item" v-for="n in cardsForFour"  :class="{'active':n===1}">
                    <div class="row container mx-auto">
                        <div class="col-3" v-for="(treding,index) in store.tredingList" v-show="(index < (n*4)) && index > (((n-1)*4)-1)">
                                <CardComponent v-if="treding.title"
                                    :isFilm="true"
                                    :title="treding.title"
                                    :originalTitle="treding.original_title"
                                    :originalLinguage="treding.original_language"
                                    :voteAverage="treding.vote_average"
                                    :imgFrontPath="treding.poster_path"
                                    :id="treding.id"
                                    :cast="treding.cast"
                                    @cast-ready="addCredits($event,treding)"
                                />
                                <CardComponent v-else
                                    :isFilm="false"
                                    :title="treding.name"
                                    :originalTitle="treding.original_name"
                                    :originalLinguage="treding.original_language"
                                    :voteAverage="treding.vote_average"
                                    :imgFrontPath="treding.poster_path"
                                    :id="treding.id"
                                    :cast="treding.cast"
                                    @cast-ready="addCredits($event,treding)"
                                />
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
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
            return Math.ceil(this.store.tredingList.length / 4);
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
