<template>
  <div><b-button
    :disabled="disabledCheck"
    pill
    variant="outline-dark"
    class="m-2 font-weight-bold w-50"
    @click="check"
    >{{$t('btn.check')}}
  </b-button>
  </div> 
</template>

<script>
export default {
  props: {
    disabledCheck: Boolean,
    selectedIndex: Number,
    correctIndex: Number
  },
  methods: {
    check(disabledQuestions, disabledNext, disabledCheck, answered) {
      //check correct
      let isCorrect = false;
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }
      //block questions
      disabledQuestions = true;
      //unblock next button
      disabledNext = false;
      //block check button
      disabledCheck = true;
      //check answer
      answered = true;
      this.$parent.$emit('check', disabledNext, disabledQuestions, disabledCheck, answered, isCorrect)
    },
  }
}
</script>
