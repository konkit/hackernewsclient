<template>
  <div class="wrapper">
    <div class="navigation">
      <a href=""><button>Open news list</button></a>

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
        mounted() {
            axios
                .get("https://hacker-news.firebaseio.com/v0/item/" + this.$route.params.id + ".json")
                .then(result => {
                    this.result = result.data;

                    console.log("Result: ", JSON.stringify(this.result))



                    this.title = this.result.title;
                    this.score = this.result.score;

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