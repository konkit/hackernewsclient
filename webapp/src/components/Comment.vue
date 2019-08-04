<template>
  <div class="commentWrapper">
    <div>Comment id: {{commentData.id}} by {{commentData.by}} </div>

<!--    <div>{{commentData}}</div>-->

    <div v-html="commentData.text"></div>

    <div v-for="kidComment in kidsComments">
      <Comment :comment-data="kidComment">
      </Comment>
    </div>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Comment",
        props: ['commentData'],
        data: function() {
            return {
                kidsComments: []
            }
        },
        mounted: function() {
            const kids = this.commentData.kids;

            if (kids) {
                console.log(kids)

                kids.sort((a,b) => b > a).forEach(commentId => {
                    axios
                        .get("https://hacker-news.firebaseio.com/v0/item/" + commentId + ".json")
                        .then(result => {
                            this.kidsComments.push(result.data);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            }

        },
    }
</script>

<style scoped>
.commentWrapper {
  border: 1px blue solid;
  padding: 10px;
  margin: 10px;
}
</style>