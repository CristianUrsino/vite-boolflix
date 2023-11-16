import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'https://api.themoviedb.org/3/',
    endPoint:{
        movies:'search/movie',
        series:'search/tv',
    },
    api_key: '9aa133434562a109367588268257ad2f',
    query:'',
    error: '',
    loading:true,
    moviesList:[],
    seriesList: [],
});