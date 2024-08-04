const { getTodayMovieInfo } = require('./movieInfo');

async function main() {

    await getTodayMovieInfo();
    // const browser = await puppeteer.launch({ headless: true });

    // const page = await browser.newPage();
    // page.setViewport({ width: 1920, height: 1280 });
    // await page.goto(
    //     'https://www.kobis.or.kr/kobis/business/mast/thea/findTheaterSchedule.do'
    // );

    // console.log('open page');

    // // 1. 광역시/도 선택 (base location)
    // const baseLocationListHtml = await page.$eval(
    //     '.step1 > ul',
    //     (e) => e.outerHTML
    // );
    // // location list 추출
    // await parseBaseLocation({ baseLocationListHtml });    
    // await page.click(
    //     '#content > div.schedule > div.fl.step1.on > ul > li:nth-child(2)'
    // );
    // await page.waitForSelector('#sBasareaCd > li:nth-child(1)', {
    //     visible: true,
    // });
    // console.log('click Base Location');

    // // 2. 시 선택 (detail location)
    // const detailLocationListHtml = await page.$eval(
    //     '#sBasareaCd',
    //     (e) => e.outerHTML
    // );
    // await parseDetailLocation({ detailLocationListHtml });
    // await page.click('#sBasareaCd > li:nth-child(8)');
    // await page.waitForSelector('#sTheaCd > li:nth-child(1)', {
    //     visible: true,
    // });
    // console.log('click detail Location');


    // // 3. 영화관 선택 (theater)
    // // #sTheaCd
    // const theaterListhtml = await page.$eval(
    //     '#sTheaCd',
    //     (e) => e.outerHTML
    // );
    // await parseTheater({ theaterListhtml });
    // await page.click('#sTheaCd > li:nth-child(5)');
    // await page.waitForSelector('#schedule > li:nth-child(1)', {
    //     visible: true,
    // });

    // console.log('click theater');

    // const movieListHtml = await page.$eval('#schedule', (e) => e.outerHTML);
    // await parseMovieList({ movieListHtml });

    // // #schedule
    // await page.close();
    // await browser.close();
}

main();
