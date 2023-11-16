<template>
    <div class="my-card debug">
        <h4>{{title}}</h4>
        <h4>{{originalTitle}}</h4>
        <h4>{{originalLinguage}}</h4>
        <h4>{{voteAverage}}</h4>
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
    }
</script>

<style lang="scss" scoped>
    
</style>
