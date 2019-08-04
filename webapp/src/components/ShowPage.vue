<template>
  <div class="wrapper">
    <div class="navigation">
      <a href=""><button>Open news list</button></a>

      <a :href="src"><button>Original link</button></a>

      <a :href="'https://news.ycombinator.com/item?id=' + $route.params.id"><button>Hacker news link</button></a>

      <PocketButton :url-to-save="src"></PocketButton>
    </div>

    <iframe v-if=" src !== '' " :src="src" width="100%" height="100%"></iframe>

    <h3 v-if="title !== ''">{{title}}</h3>
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
                comments: [],

                title: "",
                text: "",
            }
        },
        mounted() {
            console.log(this.$route.params.id)

            axios
                .get("https://hacker-news.firebaseio.com/v0/item/" + this.$route.params.id + ".json")
                .then(result => {
                    this.result = result;

                    if (result.data.url) {
                      this.src = result.data.url;
                    } else {
                        // Ask HN type
                      this.title = result.data.title;
                      this.text = result.data.text;
                    }

                    const comments = result.data.kids;

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