<template>
  <div>
    <BtnCheck :selectedIndex="selectedIndex" :correctIndex="correctIndex" :disabledCheck="disabledCheck || selectedIndex === null"  />
    <BtnNext :index="index" :disabledNext="disabledNext"  />
  </div>
</template>

<script>
import BtnCheck from "../atoms/BtnCheck";
import BtnNext from "../atoms/BtnNext";
export default {
  props: {
    index: Number,
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
