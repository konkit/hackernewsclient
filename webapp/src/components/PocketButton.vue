<template>
  <a data-pocket-label="pocket"
     class="pocket-btn"
     :data-save-url="urlToSave"
     data-lang="en">
  </a>
</template>

<script>
    export default {
        name: "PocketButton",
        props: ['urlToSave'],
        watch: {
            urlToSave: function(newVal, oldValue) {
                if (oldValue === "" && newVal !== "") {
                    !function (d, i) {
                        if (!d.getElementById(i)) {
                            var j = d.createElement("script");
                            j.id = i;
                            j.src = "https://widgets.getpocket.com/v1/j/btn.js?v=1";
                            var w = d.getElementById(i);
                            d.body.appendChild(j);
                        }
                    }(document, "pocket-btn-js");
                }
            }
        }
    }
</script>

<style>
  .pocket-btn {
    display: inline-block;
  }
</style>