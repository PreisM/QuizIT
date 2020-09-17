<template>
  <div id="app" class="text-center text-secondary">
    <Header :numCorrect="numCorrect" :numTotal="numTotal" />
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="6" offset="3">
          <Questionbox
            v-if="questions.length"
            :currentQuestion="questions[index]"
            :next="next"
            :increment="increment"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Questionbox from "./components/Questionbox.vue";
export default {
  name: "app",
  components: {
    Header,
    Questionbox,
  },
  data() {
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotal: 0,
    };
  },
  methods: {
    next() {
      //new question
      this.index++;
    },
    increment(isCorrect) {
      if (isCorrect) {
        //if answer is correct, numCorrect grow
        this.numCorrect++;
      }
      //the sum of questions grows
      this.numTotal++;
    },
  },
  mounted: function () {
      //take questions from API
      fetch("https://opentdb.com/api.php?amount=50&category=18&type=multiple", {
        method: "get",
      })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        this.questions = jsonData.results;
      });
  },
};
</script>
<style>
#app {
  font-family: "Playfair Display", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 24px;
}
</style>
