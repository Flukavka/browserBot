// ==UserScript==
// @name         GoogleBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  educational project GoogleBot
// @author       Nosareva Victoriia
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let btnMainPageGoogle = document.getElementsByName('btnK')[1];
let keywords = ['Взаимодействие ', '10 самых популярных шрифтов от Google', 'Отключение редакций и ревизий в WordPress'];
let keyword = keywords[getRandom(0, keywords.length)];


if (btnMainPageGoogle !== undefined) {
    document.getElementsByName('q')[0].value = keyword;
    btnMainPageGoogle.click();
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

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
