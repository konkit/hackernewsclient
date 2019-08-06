"use strict";

function openMyPage() {
    browser.tabs.create({
        "url": "/index.html"
    });
}

browser.browserAction.onClicked.addListener(openMyPage);