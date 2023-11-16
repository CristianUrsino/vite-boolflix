<template>
    <div class="my-card debug">
        <h4>{{title}}</h4>
        <h4>{{originalTitle}}</h4>
        <h4>{{originalLinguage}}</h4>
        <h4>{{voteAverage}}</h4>
        <img :src="currentFlag"  @error="fakeFlag()">
    </div>
    
</template>

<script>
import axios from 'axios';
    export default{
        name:'CardComponent',
        props:{
            title:String,
            originalTitle:String,
            originalLinguage:String,
            voteAverage:Number,
        },
        data(){
            return{
                currentFlag:'',
            }
        },
        methods:{
            fakeFlag(){
                this.currentFlag='https://flagsapi.com/GB/shiny/64.png';
            }
        },
        computed:{
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

                this.currentFlag = 'https://flagsapi.com/' + initials + '/shiny/64.png';
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
