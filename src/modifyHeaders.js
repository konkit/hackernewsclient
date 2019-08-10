export function setupModifyHeaders() {

    function modifyHeaders(details) {
        const headersToRemove = [
            "x-frame-options",
            "upgrade-insecure-requests",
            'content-security-policy',
            'x-webkit-csp'
        ];

        const resultHeaders = details.responseHeaders.filter(h => !headersToRemove.includes(h.name.toLowerCase()))

        return {responseHeaders: resultHeaders};
    }

    chrome.webRequest.onHeadersReceived.addListener(
        modifyHeaders,
        {urls: ["<all_urls>"]},
        ['blocking', 'responseHeaders']
    );

}