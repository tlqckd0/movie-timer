const puppeteer = require('puppeteer');
const {
    parseMovieList,
    parseBaseLocation,
    parseDetailLocation,
    parseTheater,
} = require('./movieInfo/parseHtml');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const openPage = async () => {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1280 });
    await page.goto(
        'https://www.kobis.or.kr/kobis/business/mast/thea/findTheaterSchedule.do'
    );

    console.log('open page');

    return { browser, page };
};

const closePage = async ({ page, browser }) => {
    // #schedule
    console.log('cloas page');
    await page.close();
    await browser.close();
};

const getBaseLocationList = async ({page}) => {
    const baseLocationListHtml = await page.$eval(
        '.step1 > ul',
        (e) => e.outerHTML
    );
    // location list 추출
    return await parseBaseLocation({ baseLocationListHtml });
};

const selectBaseLocation = async ({page, idx})=> {
    await page.click(
        `#content > div.schedule > div.fl.step1.on > ul > li:nth-child(${idx})`
    );
    // 다음 step 나올때까지 대기
    await page.waitForSelector('#sBasareaCd > li:nth-child(1)', {
        visible: true,
    });
    console.log('Select Base Location');
}

const getDetailLocationList = async ({page}) => {
    const detailLocationListHtml = await page.$eval(
        '#sBasareaCd',
        (e) => e.outerHTML
    );
    return await parseDetailLocation({ detailLocationListHtml });
};

const selectDetailLocation = async ({page, idx})=>{
    await page.click(`#sBasareaCd > li:nth-child(${idx})`);
    await page.waitForSelector('#sTheaCd > li:nth-child(1)', {
        visible: true,
    });
    // 다음 step 나올때까지 대기
    console.log('click detail Location');
}

const getTheaterList = async ({page}) => {
    const theaterListhtml = await page.$eval('#sTheaCd', (e) => e.outerHTML);
    return await parseTheater({ theaterListhtml });
};

const selectTheater = async ({page, idx})=>{
    await page.click(`#sTheaCd > li:nth-child(${idx})`);
    await page.waitForSelector('#schedule > li:nth-child(1)', {
        visible: true,
    });
    console.log('click theater');
}

const getMovieList = async ({page})=>{
    const movieListHtml = await page.$eval('#schedule', (e) => e.outerHTML);
    return await parseMovieList({ movieListHtml });
}

const getTodayMovieInfo = async ()=> {

    const {browser, page} = await openPage();

    const baseLocationInfo = await getBaseLocationList({page});
    console.log(baseLocationInfo);
    await selectBaseLocation({page, idx });

    const detailLocationInfo = await getDetailLocationList({page});
    console.log(detailLocationInfo);
    await selectDetailLocation({page, idx});

    const theatherList = await getTheaterList({page});
    console.log(theatherList);
    await selectTheater({page, idx});

    const movieList = await getMovieList({page});

    // #schedule
    await closePage({page, browser});

    return movieList;
}

module.exports = { getTodayMovieInfo };
