// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  BingBot
// @author       Nosareva Victoriia
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

window.onload = function() {
    let links = document.links;
    let btnMainPageBing = document.getElementById('search_icon');
    let keywords = ['10 самых популярных шрифтов от Google', 'Отключение редакций и ревизий в WordPress', 'Плагины VS Сode', 'Взаимодействие PHP и MySQL'];
    let keyword = keywords[getRandom(0, keywords.length)];
    let inputEl = document.getElementsByName('q')[0];

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
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

    } else if (location.hostname == 'napli.ru') {
        console.log('Target page');

        setInterval(() => {
            let index = getRandom(0, links.length);
            if (getRandom(0, 101) > 60) {
                location.href = 'https://www.bing.com/';
            } else if (links[index].href.indexOf('napli.ru') !== -1) {
                links[index].click();
            };

        }, getRandom(4000, 5000));

    } else {
        let nextBingPage = true;

        for (let i = 0; i < links.length; i++) {
            if (links[i].href.includes("napli.ru")) {
                console.log('yes ' + links[i]);
                let link = links[i];
                link.removeAttribute('target');
                let nextBingPage = false;
                setTimeout(()=>{
                    link.click();
                }, getRandom(2000, 3500))
            }
        };

        if (document.querySelector('.sb_pagS').innerText == '4') {
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
