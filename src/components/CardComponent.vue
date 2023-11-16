<template>
    <div class="my-card debug">
        <h4>{{title}}</h4>
        <h4>{{originalTitle}}</h4>
        <h4>{{originalLinguage}}</h4>
        <h4>{{voteAverage}}</h4>
        <img :src="currentFlagCalc"  @error="fakeFlag()">
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
                if (!['GB', 'JP', 'KM', 'IT', 'FR'].includes(initials)) { 
                    initials = 'GB';
                }
                return 'https://flagsapi.com/' + initials + '/shiny/32.png';
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
