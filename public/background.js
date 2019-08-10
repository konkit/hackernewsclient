"use strict";

function openMyPage() {
    browser.tabs.create({
        "url": "/index.html"
    });
}

browser.browserAction.onClicked.addListener(openMyPage);




// function rewriteHeaders(e) {
//     console.log("Rewriting headers for ", e)
//
//     const headersToRemove = [
//         "x-frame-options",
//         "content-security-policy",
//         "upgrade-insecure-requests"
//     ];
//
//     return {responseHeaders: e.responseHeaders.filter(h => !headersToRemove.includes(h.name.toLowerCase()))};
// }
//
// browser.webRequest.onHeadersReceived.addListener(
//     rewriteHeaders,
//     {urls: ["<all_urls>"]},
//     ['blocking', 'responseHeaders']
// );
//
//
// // @see https://developer.mozilla.org/en-US/docs/Web/Security/CSP
// let cspHeaders = [
//     'content-security-policy',
//     'x-webkit-csp'
// ];
//
// // @see https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives
// let cspSources = [
//     'connect-src',
//     'default-src',
//     'font-src',
//     'frame-src',
//     'img-src',
//     'media-src',
//     'object-src',
//     'script-src',
//     'style-src'
// ];
//
// function isCspHeader(headerName) {
//     return cspHeaders.includes(headerName.toLowerCase());
// }
//
// function modifyHeaders(details) {
//     console.log("Modifyfing headers", details)
//
//     details.responseHeaders.forEach((responseHeader) => {
//         if (isCspHeader(responseHeader.name)) {
//             let csp = responseHeader.value;
//
//             // Add example.com to the sources list.
//             // @see https://work.planbox.com/blog/development/coding/bypassing-githubs-content-security-policy-chrome-extension.html
//             cspSources.forEach((cspSource) => {
//                 csp = csp.replace(cspSource, cspSource + ' https://example.com https://*.example.com');
//             });
//
//             responseHeader.value = csp;
//         }
//     });
//
//     const headersToRemove = [
//         "x-frame-options",
//         "upgrade-insecure-requests"
//     ];
//
//     return {responseHeaders: details.responseHeaders.filter(h => !headersToRemove.includes(h.name.toLowerCase()))};
// }
//
// console.log("Loading background script");
// console.log("chrome: ", chrome)
//
// chrome.webRequest.onHeadersReceived.addListener(
//     modifyHeaders,
//     { urls: ["<all_urls>"] },
//     [ 'blocking', 'responseHeaders' ]
// );