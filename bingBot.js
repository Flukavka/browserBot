// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  BingBot
// @author       Nosareva Victoriia
// @match        https://www.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let btnMainPageBing = document.getElementById('search_icon');
let keywords = ['10 самых популярных шрифтов от Google', 'Отключение редакций и ревизий в WordPress'];
let keyword = keywords[getRandom(0, keywords.length)];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

if (btnMainPageBing !== null) {
    document.getElementsByName('q')[0].value = keyword;
    btnMainPageBing.click();
} else {
    for (let i = 0; i < links.length; i++) {
        if(links[i].href.indexOf("napli.ru") !== -1){
            console.log('yes ' + links[i]);
            let link = links[i];
            link.click();
            break;
        }
    }
};
