<template>
  <div class="wrapper">
    <div class="navigation">
      <a href=""><button>Back to news list</button></a>

      <a :href="src"><button>Original link</button></a>

      <a :href="'https://news.ycombinator.com/item?id=' + $route.params.id"><button>Hacker news link</button></a>

      <PocketButton :url-to-save="src"></PocketButton>
    </div>

    <div class="details">
      <h3>[{{score}}] {{title}}</h3>
    </div>

    <iframe v-if=" src !== '' " :src="src" width="100%" height="100%"></iframe>

    <p v-if="text">{{text}}</p>

    <div class="comments">
      <h3>Comments: </h3>

      <div v-for="comment in comments">
        <hr/>

        <Comment :comment-data="comment">
        </Comment>
      </div>
    </div>

  </div>
</template>

<script>
    import Comment from './Comment'
    import axios from 'axios'
    import PocketButton from "./PocketButton";

    export default {
        name: "ShowPage",
        data: function () {
            return {
                result: {},
                src: "",
                score: 0,
                title: "",
                comments: [],

                text: "",
            }
        },
        created() {
            function rewriteHeaders(e) {
                console.log("Rewriting headers for ", e)

                const headersToRemove = [
                    "x-frame-options",
                    "content-security-policy",
                    "upgrade-insecure-requests"
                ];

                return {responseHeaders: e.responseHeaders.filter(h => !headersToRemove.includes(h.name.toLowerCase()))};
            }

            browser.webRequest.onHeadersReceived.addListener(
                rewriteHeaders,
                {urls: ["<all_urls>"]},
                ['blocking', 'responseHeaders']
            );
        },
        mounted() {
            axios
                .get("https://hacker-news.firebaseio.com/v0/item/" + this.$route.params.id + ".json")
                .then(result => {
                    this.result = result.data;

                    this.title = this.result.title;
                    this.score = this.result.score;

                    document.title = this.title + " | Hacker News client by Konkit";

                    if (this.result.url) {
                      this.src = this.result.url;
                    } else {
                        // Ask HN type
                      this.text = this.result.text;
                    }

                    const comments = this.result.kids;

                    comments.forEach(commentId => {
                        axios
                            .get("https://hacker-news.firebaseio.com/v0/item/" + commentId + ".json")
                            .then(result => {
                                this.comments.push(result.data);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                })
        },
        components: {
            PocketButton,
            Comment
        }
    }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    min-height: 5000px;
  }

  .navigation {
    padding: 10px;
  }

  iframe {
    height: 100%;
    width: 100%;
    min-height: 70vh;
  }
</style>