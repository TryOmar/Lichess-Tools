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

    const MIN_SECONDS = 30; // Minimum time (in seconds) required to berserk
    const CHECK_INTERVAL = 500; // Interval in ms to check

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

    function getOwnClockAndButton() {
        var bottomClock = document.querySelector('.rclock-bottom .time');
        var bottomButton = document.querySelector('.rclock-bottom button');
        if (bottomClock && bottomButton) {
            return { clock: bottomClock, button: bottomButton };
        }

        var topClock = document.querySelector('.rclock-top .time');
        var topButton = document.querySelector('.rclock-top button');
        if (topClock && topButton) {
            return { clock: topClock, button: topButton };
        }

        return null;
    }

    function tryBerserk(intervalId) {
        var clockAndButton = getOwnClockAndButton();
        if (!clockAndButton) {
            return;
        }

        var time = parseTimeString(clockAndButton.clock);
        if (time >= MIN_SECONDS) {
            clockAndButton.button.click();
            clearInterval(intervalId);
        }
    }

    var interval = setInterval(function() {
        tryBerserk(interval);
    }, CHECK_INTERVAL);

    window.addEventListener('pagehide', function() {
        clearInterval(interval);
    });
})();
