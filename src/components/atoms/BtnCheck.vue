<template>
  <b-button
    :disabled="disabledCheck"
    pill
    variant="outline-dark"
    class="m-2 font-weight-bold w-50"
    @click="submitAnswer"
    >Check
  </b-button>
</template>

<script>
export default {
  props: {
    disabledCheck: Boolean,
    submitAnswer: Function,
  },
};
</script>
