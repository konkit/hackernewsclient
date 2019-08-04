"use strict";

function rewriteHeaders(e) {
    console.log("Clearing headers for " + e.url);

    const headersToRemove = [
        "x-frame-options",
        "content-security-policy",
        "upgrade-insecure-requests"
    ];

    const headersToReturn = {responseHeaders: e.responseHeaders.filter(h => !headersToRemove.includes(h.name.toLowerCase()))};

    console.log("Headers before: ", e.responseHeaders)
    console.log("Headers after: ",headersToReturn);

    return headersToReturn;
}

browser.webRequest.onHeadersReceived.addListener(
    rewriteHeaders,
    {urls: ["<all_urls>"]},
    ['blocking',
    'responseHeaders']
);



function openMyPage() {
    browser.tabs.create({
        "url": "/index.html"
    });
}

browser.browserAction.onClicked.addListener(openMyPage);