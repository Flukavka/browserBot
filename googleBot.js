// ==UserScript==
// @name         GoogleBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  educational project GoogleBot
// @author       Nosareva Victoriia
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
'napli.ru':['Плагины VS Code', '10 самых популярных шрифтов от Google', 'Отключение редакций и ревизий в WordPress'],
'kiteuniverse.ru':['Шоу воздушных змеев', 'Kite Universe', 'красота, грация, интеллект'],
'motoreforma.com':['мотореформа', 'прошивка для CAN-AM', 'тюнинг Maverick X3'],
};
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let links = document.links;
let btnMainPageGoogle = document.getElementsByName('btnK')[1];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let inputEl = document.getElementsByName('q')[0];

if (btnMainPageGoogle !== undefined) {
    document.cookie = `site=${site}`;
} else if(location.hostname == 'www.google.com'){
    site = getCookie('site')
} else {
    site = location.hostname;
};

if (btnMainPageGoogle !== undefined) {
    let i = 0;

    let timerId = setInterval(()=>{
        inputEl.value += keyword[i];
        i++;
        if (i == keyword.length){
            clearInterval(timerId);
            setTimeout(() => {
                btnMainPageGoogle.click();
            }, getRandom(1000, 3000));
        }
    }, 500);

} else if (location.hostname == site) {
    console.log('Target page');
    setInterval(()=>{
        let index = getRandom(0, links.length);
        if (getRandom(0, 101) > 60) {
            location.href = 'https://www.google.com/';
        } else if (links[index].href.indexOf(site) !== -1) {
            links[index].click();
        }
    }, getRandom(4000, 5000));

} else {
    let nextGooglePage = true;

    for (let i = 0; i < links.length; i++) {
        if(links[i].href.includes(site) !== -1){ //удалить  !== -1 ???
            console.log('yes ' + links[i]);
            let link = links[i];
            let nextGooglePage = false;
            setTimeout(() => {
                link.click();
            }, getRandom(2000, 4500))
            break;
        }
    }

    if(document.querySelector('.YyVfkd').innerText == '4'){
        nextGooglePage = false;
        location.href = 'https://www.google.com/';
    }

    if (nextGooglePage) {
        setTimeout(()=>{
            pnnext.click();
        }, getRandom(3000, 5000))
    }
};

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

function getCookie(name) {
let matches = document.cookie.match(new RegExp(
"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
));
return matches ? decodeURIComponent(matches[1]) : undefined;
};
