import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'https://api.themoviedb.org/3/',
    endPoint:{
        movies:'search/movie',
        series:'search/tv',
        movieCast: 'movie/',
        tvCast:'tv/',
        genre: 'genre/tv/list',
        treding: '/trending/all/day',
    },
    api_key: '9aa133434562a109367588268257ad2f',
    query:'',
    error: '',
    loading:true,
    moviesList:[],
    seriesList: [],
    genreList:[],
    currentGenreId:'',
    tredingList:[],
    currentMustTreding:{},
    stars_calc: (voteAverage)=>Math.ceil(voteAverage / 2),
    /**
             * [currentFlagCalcl]
             * Converte le iniziali delle lingue più comuni nel formato supportato dall'API (flagsapi), poi le confronta con quelle utilizzabili e se diverse le converte in 'inglesi' e ritorna l'url completo
             * @returns {String} url per richiamare l'epi (flagsapi)
             * !!!!!!!!!!!CREARE ARRAY PER LE INIZIALI CONOSCIUTE!!!!!!!!!!!!
             */
    currentFlagCalc : (originalLinguage)=> {
        let initials = originalLinguage.toUpperCase();
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
});