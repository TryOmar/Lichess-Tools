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

        const text = timeElement.innerText.trim();
        const parts = text.split(':');

        if (parts.length < 2) {
            return 0;
        }

        const minutes = parseInt(parts[0], 10) || 0;
        const secondsPart = (parts[1] || '').split('.')[0];
        const seconds = parseInt(secondsPart, 10) || 0;

        return (minutes * 60) + seconds;
    }

    function getOwnClockAndButton() {
        const bottomClock = document.querySelector('.rclock-bottom .time');
        const bottomButton = document.querySelector('.rclock-bottom button');
        if (bottomClock && bottomButton) {
            return { clock: bottomClock, button: bottomButton };
        }

        const topClock = document.querySelector('.rclock-top .time');
        const topButton = document.querySelector('.rclock-top button');
        if (topClock && topButton) {
            return { clock: topClock, button: topButton };
        }

        return null;
    }

    function tryBerserk(intervalId) {
        const clockAndButton = getOwnClockAndButton();
        if (!clockAndButton) {
            return;
        }

        const time = parseTimeString(clockAndButton.clock);
        if (time >= MIN_SECONDS) {
            const buttonText = (clockAndButton.button.textContent || '').toLowerCase();
            if (!buttonText.includes('berserk')) {
                return;
            }

            clockAndButton.button.click();
            clearInterval(intervalId);
        }
    }

    const interval = setInterval(function() {
        tryBerserk(interval);
    }, CHECK_INTERVAL);

    window.addEventListener('pagehide', function() {
        clearInterval(interval);
    });
})();
