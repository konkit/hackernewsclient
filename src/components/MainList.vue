<template>
  <div>
    <h2>Hacker News client by Konkit</h2>

    <template v-if="dbResults.length > 0">
      <div v-for="story in displayedResults" :key="story.id">
        <p>
          <a :href="story.url" :target_href="'#/showPage/' + story.id" @mousedown="linkMouseDown($event)">
            [{{story.score}}] {{ story.title }}
          </a>
        </p>
      </div>

      <div>
        <button @click="decPage()"> <-</button>
        <button> {{currentPage}}</button>
        <button @click="incPage()"> -></button>
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

              resultsToDisplay.push(result.data);
            })
            .catch(err => {
              console.log(err);
            });
        });

        this.displayedResults = resultsToDisplay;

        this.$forceUpdate();
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

</style>