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
import { EventBus } from '../../main.js'
export default {
  props: {
    disabledNext: Boolean
  },
  data() {
    return{
      countIndex: 1
    }
  },
  methods: {
    next() {
      let count = this.countIndex
      this.countIndex++
      EventBus.$emit('next', count)
    }
  }
};
</script>
