<template>
  <div>
    <h1 class="title is-size-4">Breadth-first Hacker News client by Konkit</h1>

    <template v-if="dbResults.length > 0">
      <div class="story" v-for="story in displayedResults" :key="story.id">
        <p>
          <a :href="story.url" :target_href="'#/showPage/' + story.id" @mousedown="linkMouseDown($event)">
            [{{story.score}}] {{ story.title }}
          </a>
        </p>

        <p>
          By {{story.by}} {{formatTime(story.time)}}
        </p>
      </div>

      <div class="field is-grouped pagination">
        <button class="button" @click="decPage()"><i class="fas fa-arrow-left"></i></button>
        <button class="button"> {{currentPage}}</button>
        <button class="button" @click="incPage()"><i class="fas fa-arrow-right"></i></button>
      </div>
    </template>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "EntryList",
    data: function () {
      return {
        err: "",
        dbResults: [],
        displayedResults: [],
        currentPage: 1,
      };
    },
    mounted: function () {
      axios
        .get("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then(result => {
          this.dbResults = result.data;
          this.rerender(1);
        })
        .catch(err => {
          this.err = err;
        });
    },
    methods: {
      linkMouseDown: function (e) {
        console.log("e: ", e)

        const newHref = e.target.attributes["target_href"].nodeValue
        e.target.href = newHref
      },
      rerender: function (newPage) {
        var startOffset = (newPage - 1) * 20;
        var endOffset = newPage * 20;

        const slicedResults = this.dbResults.slice(startOffset, endOffset);

        var resultsToDisplay = [];

        slicedResults.forEach(elementId => {
          axios
            .get("https://hacker-news.firebaseio.com/v0/item/" + elementId + ".json")
            .then(result => {

              console.log(JSON.stringify(result.data))

              resultsToDisplay.push(result.data);
            })
            .catch(err => {
              console.log(err);
            });
        });

        this.displayedResults = resultsToDisplay;

        this.$forceUpdate();
      },
      formatTime(time) {
        const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});

        const now = new Date().getTime() / 1000;
        const diffInSec = time - now;

        function round(v) {
          return (v >= 0 || -1) * Math.round(Math.abs(v));
        }

        if (Math.abs(diffInSec) < 60) {
          return rtf.format(diffInSec, 'second')
        } else if (Math.abs(diffInSec) < 3600) {
          let diffInMinutes = round(diffInSec / 60);
          return rtf.format(diffInMinutes, 'minute')
        } else if (Math.abs(diffInSec) < 60 * 60 * 24) {
          let diffInHours = round(diffInSec / 60 / 60);
          return rtf.format(diffInHours, 'hour')
        } else {
          let diffInDays = round(diffInSec / 3600 / 24);
          return rtf.format(diffInDays, 'day')
        }
      },
      incPage() {
        this.currentPage += 1;
        this.rerender(this.currentPage)
      },
      decPage() {
        if (this.currentPage > 1) {
          this.currentPage -= 1;
          this.rerender(this.currentPage)
        }
      }
    }
  };
</script>


<style scoped>

  .title {
    margin: 10px;
  }

  .pagination {
    margin: 10px;
  }

  .story {
    margin: 10px;
  }

</style>