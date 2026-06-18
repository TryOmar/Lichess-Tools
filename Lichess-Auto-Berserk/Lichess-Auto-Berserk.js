// ==UserScript==
// @name         Auto Berserk on Lichess
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-click Berserk if time >= configured threshold
// @author       You
// @match        https://lichess.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var MIN_SECONDS = 30; // Minimum time (in seconds) required to berserk
    var CHECK_INTERVAL = 500; // Interval in ms to check

    function parseTimeString(timeElement) {
        if (!timeElement) {
            return 0;
        }

        var text = timeElement.innerText.trim();
        var parts = text.split(':');

        if (parts.length < 2) {
            return 0;
        }

        var minutes = parseInt(parts[0], 10) || 0;
        var secondsPart = parts[1].split('.')[0];
        var seconds = parseInt(secondsPart, 10) || 0;

        return (minutes * 60) + seconds;
    }

    function tryBerserk(intervalId) {
        var clock = document.querySelector('.rclock-bottom .time') || document.querySelector('.rclock-top .time');
        var berserkBtn = document.querySelector('.rclock-bottom button') || document.querySelector('.rclock-top button');

        if (!clock || !berserkBtn) {
            return;
        }

        var time = parseTimeString(clock);
        if (time >= MIN_SECONDS) {
            berserkBtn.click();
            clearInterval(intervalId);
        }
    }

    var interval = setInterval(function() {
        tryBerserk(interval);
    }, CHECK_INTERVAL);
})();
