const cheerio = require('cheerio');

const parseMovieList = async ({ movieListHtml }) => {
    const $ = cheerio.load(movieListHtml);
    const ret = [];

    $('#schedule > li').each((idx, value) => {
        const $data = cheerio.load(value);
        const title = $data('div.tit > a ').text();
        const movieCd = $data('div.tit > a ').attr('onclick').split("'")[3]; // 'mstView('movie','20212866')' 이렇게 나옴..

        //(제목)
        // #schedule > li:nth-child(1) > div.tit
        // #schedule > li:nth-child(1) > div.tit > a

        const timeList = [];
        console.log(`IDX-${idx} - Title : ${title}... Movie-code : ${movieCd}`);
        $data('div.times > label').each((idx2, value2) => {
            const $time = cheerio.load(value2);
            const time = $time('label').text();
            timeList.push({ idx2, time });
            console.log(`-${idx2} : ${time}`);
        });

        ret.push({
            idx: idx + 1,
            title,
            timeList,
        });
    });

    return ret;
};

const parseBaseLocation = async ({ baseLocationListHtml }) => {
    const $ = cheerio.load(baseLocationListHtml);
    const ret = [];

    $('ul > li').each((idx, value) => {
        /**
         * <li wideareacd="0105001" onclick="selectedWidearea(this, '0105001');">
              <input type="radio" name="step1" id="step1_1" autocomplete="off">
              <label for="step1_1">서울시</label>
            </li>
         */
        const $data = cheerio.load(value);
        const location = $data('label ').text();
        const locationCd = $data('input ').attr('id');

        console.log(idx, locationCd, location);
        ret.push({
            idx: idx + 1, 
            locationCd,
            location
        })
    });

    return ret;
};

const parseDetailLocation = async ({ detailLocationListHtml }) => {
    const $ = cheerio.load(detailLocationListHtml);
    const ret = [];

    $('ul > li').each((idx, value) => {

        const $data = cheerio.load(value);
        const location = $data('label ').text();
        const locationCd = $data('input ').attr('id');

        console.log(idx, locationCd, location);
        ret.push({
            idx: idx + 1, 
            locationCd,
            location
        })
    });

    return ret;

};

const parseTheater = async ({ theaterListhtml }) => {
    const $ = cheerio.load(theaterListhtml);
    const ret = [];

    $('ul > li').each((idx, value) => {

        const $data = cheerio.load(value);
        const theater = $data('label ').text();
        const locationCd = $data('input ').attr('id');

        console.log(idx, theaterCd, theater);
        ret.push({
            idx : idx + 1, 
            theaterCd,
            theater
        })
    });

    return ret;

};

module.exports = { parseMovieList, parseBaseLocation ,parseDetailLocation, parseTheater};
