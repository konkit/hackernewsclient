<template>
  <div class="wrapper">
    <div class="navigation">
      <a href="">
        <button class="button"><i class="fas fa-arrow-left"></i></button>
      </a>

      <span class="details">
        <h3 class="is-size-5">[{{score}}] {{title}}</h3>
      </span>

      <a :href="src">
        <button class="button">Original link</button>
      </a>

      <a :href="'https://news.ycombinator.com/item?id=' + $route.params.id">
        <button class="button">Hacker news link</button>
      </a>

      <PocketButton :url-to-save="src"></PocketButton>
    </div>


    <iframe v-if=" src !== '' " :src="src" width="100%" height="100%"></iframe>

    <div v-if="text" class="container">
      <div class="text-wrapper">
        <div v-html="text"></div>
      </div>
    </div>

    <div class="comments-wrapper">
      <div class="container comments">

        <h5 class="is-size-5">Comments: </h5>

        <div v-for="comment in comments">
          <Comment :comment-data="comment">
          </Comment>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Comment from './Comment'
  import axios from 'axios'
  import PocketButton from "./PocketButton";
  import {setupModifyHeaders} from "../modifyHeaders";

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
    beforeCreate() {
      setupModifyHeaders()
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

<style>
  .wrapper {
    width: 100%;
    min-height: 5000px;
  }

  .navigation {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    border-bottom: 1px solid #b2b2b2;
  }

  .navigation .details h3 {
    margin: 0 20px;
  }

  iframe {
    height: 100%;
    width: 100%;
    min-height: calc(100vh - 150px);
  }

  .comments-wrapper {
    border: 1px solid #b2b2b2;
  }

  .comments {
    border-radius: 4px;
    padding: 10px;
  }

  .text-wrapper p {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }
</style>