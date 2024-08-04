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
            idx,
            title,
            timeList,
        });
    });

    //console.log(ret)

    return ret;
};

module.exports = { parseMovieList };
