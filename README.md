# Breadth-first Hacker News browser extension client

Browser extension with UI for browsing Hacker News (https://news.ycombinator.com) showing articles and its comments on the same tab.

## Why?
I like reading Hacker News  in a specific manner. 
I read through all link titles and I open interesting ones in new tabs. 
Then I read them at some point in time. 
The problem is, that the comments to the article are equally interesting as the article itself (if not more in some cases). 
In that case, I had to open two tabs for each article - one for the article itself and another one for its comments.
With this extension, I just open one new tab per link, with the article and the comments in one place.

## Why browser extension ?
Yes, initially I wanted it to be an ordinary webpage, but there is one problem with website owners - they don't really like 
their page to be rendered in `<iframe>` tags. Browser extension allowed me to bypass those obstacles by modification of some
 problematic headers from article pages' responses. 

## Build
Just build the app via `npm run build` and the extension will be created in `/dist` folder.