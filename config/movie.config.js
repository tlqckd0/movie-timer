require('dotenv').config();

const getMovieKey = () => {
    return process.env.MOVIE_KEY;
};

module.exports = { getMovieKey };
