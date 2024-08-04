const movieConfig = require('./config/movie.config');
const axios = require('axios');
const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${movieConfig.getMovieKey()}`


async function main(){
    const {data} = await axios.get(url);
    const {movieListResult} = data;
    const {movieList} = movieListResult;
    
    movieList.forEach(movie => {
        console.log(movie.movieNm, movie.Cd);
    });
    
    
}

main();