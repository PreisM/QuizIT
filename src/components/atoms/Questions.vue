<template>
  <b-list-group class="my-3">
    <b-list-group-item
      :disabled="disabledQuestions"
      v-for="(answer, index) in shuffledAnswers"
      :key="index"
      @click.prevent="selectAnswer(index)"
      :class="answerType(index)"
    >{{ answer }}</b-list-group-item>
  </b-list-group>
</template>

<script>

export default {
  props: {
    disabledQuestions: Boolean,
    shuffledAnswers: Array,
    answerType: Function,
  },
  methods: {
    selectAnswer(index) {
      // select answer
      this.selectedIndex = index;
      this.$emit('selectIndex', index)
    },
    shuffle(disabledCheck, disabledQuestions) {
    //unblock check button
    this.disabledCheck = false;
    //unblock questions
    this.disabledQuestions = false;
    this.$parent.$emit('shuffle', disabledCheck, disabledQuestions)
    },
  }
};
</script>

<style scoped>
.list-group-item:hover {
  background: rgb(220, 227, 228);
  cursor: pointer;
}
.selected, .correct, .incorrect {
  color: black;
  font-weight: bold;
}
.selected {
  background-color: rgb(44, 56, 228);
}
.correct {
  background-color: rgb(41, 206, 41);
}
.incorrect {
  background-color: rgb(241, 6, 6);
}
</style>
