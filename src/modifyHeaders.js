export function setupModifyHeaders() {

    function modifyHeaders(details) {
        console.log("Modifyfing headers from within the component")
        console.log("details", details)
        console.log("details", JSON.stringify(details))

        const headersToRemove = [
            "x-frame-options",
            "upgrade-insecure-requests",
            'content-security-policy',
            'x-webkit-csp'
        ];

        const resultHeaders = details.responseHeaders.filter(h => !headersToRemove.includes(h.name.toLowerCase()))

        console.log("Result headers: ", resultHeaders)

        return {responseHeaders: resultHeaders};
    }

    chrome.webRequest.onHeadersReceived.addListener(
        modifyHeaders,
        {urls: ["<all_urls>"]},
        ['blocking', 'responseHeaders']
    );

}