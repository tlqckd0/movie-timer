const puppeteer = require('puppeteer');
const { parseMovieList } = require('./parseHtml');

async function main() {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1280 });
    await page.goto(
        'https://www.kobis.or.kr/kobis/business/mast/thea/findTheaterSchedule.do'
    );

    console.log('open page');

    // 1. 광역시/도 선택
    // #content > div.schedule > div.fl.step1.on > ul
    await page.click(
        '#content > div.schedule > div.fl.step1.on > ul > li:nth-child(2)'
    );
    await page.waitForSelector('#sBasareaCd > li:nth-child(1)', {
        visible: true,
    });
    console.log('click area');

    // 2. 시 선택
    // #sBasareaCd
    await page.click('#sBasareaCd > li:nth-child(8)');
    await page.waitForSelector('#sTheaCd > li:nth-child(1)', {
        visible: true,
    });
    console.log('click small area');

    // 3. 영화관 선택
    // #sTheaCd
    await page.click('#sTheaCd > li:nth-child(5)');
    await page.waitForSelector('#schedule > li:nth-child(1)', {
        visible: true,
    });

    console.log('click theater');

    const movieListHtml = await page.$eval('#schedule', (e) => e.outerHTML);
    await parseMovieList({ movieListHtml });

    // #schedule

    //하나의 세션을 유지하면서 데이터를 받아오는 방법은 없을까..
    await page.close();
    await browser.close();
}

main();
