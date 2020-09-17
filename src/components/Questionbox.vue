<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template slot="lead">{{ currentQuestion.question }}</template>
      <b-list-group class="my-4">
        <b-list-group-item
          :disabled="disabledQuestions"
          v-for="(answer, index) in shuffledAnswers"
          :key="index"
          @click.prevent="selectAnswer(index)"
          :class="answerType(index)"
        >{{ answer }}</b-list-group-item>
      </b-list-group>
      <b-button
        :disabled="disabledCheck || selectedIndex === null"
        pill
        variant="outline-dark"
        @click="submitAnswer"
        class="m-2 font-weight-bold"
      >Check</b-button>
      <b-button
        :disabled="disabledNext"
        pill
        variant="outline-dark"
        @click="next"
        class="m-2 font-weight-bold"
      >Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function,
  },
  data: function () {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false,
    };
  },
  computed: {
    //get correct and incorrect ansewr
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    },
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        //block next button
        this.disabledNext = true;
        //clean selected answer
        this.selectedIndex = null;
        //clean sent answer
        this.answered = false;
        // mix answers
        this.shuffleAnswers();
      },
    },
  },
  methods: {
    selectAnswer(index) {
      // select answer
      this.selectedIndex = index;
    },
    submitAnswer() {
      //unblock next button
      this.disabledNext = false;
      //block check button
      this.disabledCheck = true;
      //block questions
      this.disabledQuestions = true;
      //check answer
      let isCorrect = false;
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }
      this.answered = true;
      this.increment(isCorrect);
    },
    shuffleAnswers() {
      //unblock check button
      this.disabledCheck = false;
      //unblock questions
      this.disabledQuestions = false;
      // mix correct and incorrect answers
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ];
      this.shuffledAnswers = lodash.shuffle(answers);
      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
    },
    //check answer
    answerType(index) {
      let answerType = "";
      //answer is selected
      if (!this.answered && this.selectedIndex === index) {
        answerType = "selected";
      }
      //answer is correct
      else if (this.answered && this.correctIndex === index) {
        answerType = "correct";
      } 
      //answer is incorrect
      else if (
        this.answered &&
        this.selectedIndex === index &&
        this.correctIndex !== index
      ) {
        answerType = "incorrect";
      }
      return answerType;
    },
  },
};
</script>

<style scoped>
.list-group-item:hover {
  background: rgb(220, 227, 228);
  cursor: pointer;
}
.selected {
  background-color: rgb(44, 56, 228);
  color: black;
  font-weight: bold;
}
.correct {
  background-color: rgb(41, 206, 41);
  color: black;
  font-weight: bold;
}
.incorrect {
  background-color: rgb(241, 6, 6);
  color: black;
  font-weight: bold;
}
</style>
