// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  BingBot
// @author       Nosareva Victoriia
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

window.onload = function() {
    let sites = {
    'napli.ru': ['Плагины VS Code', '10 самых популярных шрифтов от Google', 'Отключение редакций и ревизий в WordPress'],
    'kiteuniverse.ru': ['Шоу воздушных змеев', 'Kite Universe', 'красота, грация, интеллект'],
    'motoreforma.com': ['мотореформа', 'прошивка для CAN-AM', 'тюнинг Maverick X3'],
    };
    let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
    let links = document.links;
    let btnMainPageBing = document.getElementById('search_icon');
    let keywords = sites[site];
    let keyword = keywords[getRandom(0, keywords.length)];
    let inputEl = document.getElementsByName('q')[0];

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };

    function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
    };



    if (btnMainPageBing !== null) {
        document.cookie = `site=${site}`;
    } else if (location.hostname == 'www.bing.com') {
        site = getCookie('site')
    } else {
        site = location.hostname;
    };

    if (btnMainPageBing !== null) {
        let i = 0;

        let timerId = setInterval(() => {
            inputEl.value += keyword[i];
            console.log(inputEl.value)
            i++;
            if (i == keyword.length) {
                clearInterval(timerId);
                setTimeout(() => {
                    btnMainPageBing.click();
                }, getRandom(3000, 5000))
            }
        }, 500);

    } else if (location.hostname == site) {
        console.log('Target page');

        setInterval(() => {
            let index = getRandom(0, links.length);
            if (getRandom(0, 101) > 60) {
                location.href = 'https://www.bing.com/';
            } else if (links[index].href.indexOf(site) !== -1) {
                links[index].click();
            };

        }, getRandom(4000, 5000));

    } else {
        let nextBingPage = true;

        for (let i = 0; i < links.length; i++) {
            if (links[i].href.includes(site)) {
                console.log('yes ' + links[i]);
                let link = links[i];
                link.removeAttribute('target');
                let nextBingPage = false;
                setTimeout(()=>{
                    link.click();
                }, getRandom(2000, 3500))
            }
        };

        if (document.querySelector('.sb_pagS_bp').innerText == '4') {
            nextBingPage = false;
            location.href = 'https://www.bing.com/';
        };

        if (nextBingPage) {
            setTimeout(() => {
                let btnNextPage = document.querySelector('.sb_pagN');
                btnNextPage.click();
            }, getRandom(3000, 5000))
        }
    };
}
