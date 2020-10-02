<template>
    <b-jumbotron>
      <HeaderQuestionBox :currentQuestion="currentQuestion" />
      <Questions :disabledQuestions="disabledQuestions" :selectAnswer="selectAnswer" :shuffledAnswers="shuffledAnswers" :answerType="answerType"/>
      <Buttons :disabledCheck="disabledCheck" :disabledNext="disabledNext" :next="next"  :submitAnswer="submitAnswer" :selectedIndex="selectedIndex" :btnText="btnText" />
    </b-jumbotron>
</template>

<script>
import lodash from "lodash";
import HeaderQuestionBox from "../atoms/HeaderQuestionBox"
import Questions from "../atoms/Questions"
import Buttons from "../molecules/Buttons"

export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function,
  },
   components: {
    Buttons,
    HeaderQuestionBox,
    Questions
  },
  data: function () {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false,
      disabledCheck: true,
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
