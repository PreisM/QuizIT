<template>
  <div>
    <BtnCheck :selectedIndex="selectedIndex" :correctIndex="correctIndex" :disabledCheck="disabledCheck || selectedIndex === null"  />
    <BtnNext :disabledNext="disabledNext"  />
  </div>
</template>

<script>
import BtnCheck from "../atoms/BtnCheck";
import BtnNext from "../atoms/BtnNext";
export default {
  props: {
    disabledCheck: Boolean,
    disabledNext: Boolean,
    selectedIndex: Number,
    correctIndex: Number,
  },
    components: {
    BtnCheck,
    BtnNext,
  },
}
</script>
