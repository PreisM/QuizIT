<template>
    <h4>{{ currentQuestion.question }}</h4>
</template>

<script>
export default {
  props: {
    currentQuestion: Object,
  },
};
</script>
