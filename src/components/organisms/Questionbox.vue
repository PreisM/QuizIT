<template>
    <b-jumbotron>
      <HeaderQuestionBox :currentQuestion="currentQuestion" />
      <Questions :disabledQuestions="disabledQuestions" :shuffledAnswers="shuffledAnswers" :answerType="answerType" @shuffle="shuffle" @selectIndex="selectIndex"/>
      <Buttons :index="index" :disabledCheck="disabledCheck" :disabledNext="disabledNext"  :selectedIndex="selectedIndex" :correctIndex="correctIndex" @check="check"/>
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
    increment: Function,
    index: Number,
  },
   components: {
    Buttons,
    HeaderQuestionBox,
    Questions
  },
  data() {
    return {
      selectedIndex: null,
      correctIndex: null,
      disabledCheck: true,
      disabledQuestions: false,
      disabledNext: true,
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
        this.shuffle()
      },
    },
  },
  methods: {
    check(disabledNext, disabledQuestions, disabledCheck, answered, isCorrect) {
      this.disabledNext = disabledNext
      this.disabledQuestions = disabledQuestions
      this.disabledCheck = disabledCheck
      this.answered = answered 
      this.increment(isCorrect);
    },
    selectIndex(selectedIndex){
      this.selectedIndex = selectedIndex
    },
    shuffle(disabledCheck, disabledQuestions) {
    this.disabledCheck = disabledCheck
    this.disabledQuestions = disabledQuestions
    },
    shuffleAnswers() {
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
