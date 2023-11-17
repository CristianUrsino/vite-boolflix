<template>
    <div class="my-card debug">
        <h4>{{title}}</h4>
        <h4>{{originalTitle}}</h4>
        <h4>{{originalLinguage}}</h4>
        <h4>{{voteAverage}}</h4>
        <img :src="currentFlagCalc" :alt="'bandiera' + originalLinguage">
    </div>
    
</template>

<script>
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
