<template>
  <b-button
    :disabled="disabledNext"
    pill
    variant="outline-dark"
    class="m-2 font-weight-bold w-50"
    @click="next"
    >Next
  </b-button>
</template>

<script>
export default {
  props: {
    disabledNext: Boolean,
    next: Function,
  },
};
</script>
