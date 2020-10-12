<template>
  <div><b-button
    :disabled="disabledNext"
    pill
    variant="outline-dark"
    class="m-2 font-weight-bold w-50"
    @click="next"
    >Next
  </b-button>
  </div>
</template>

<script>
export default {
  props: {
    disabledNext: Boolean,
    index: Number
  },
  methods: {
    next() {
      let index = this.index;
      index++
      this.$parent.$parent.$emit('next', index)
    },
  }
};
</script>
