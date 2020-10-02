<template>
  <div>
    <BtnCheck :disabledCheck="disabledCheck || selectedIndex === null" :submitAnswer="submitAnswer" :btnText="btnText" :next="next" />
    <BtnNext :disabledNext="disabledNext" :next="next" />
  </div>
</template>

<script>
import BtnCheck from "../atoms/BtnCheck";
import BtnNext from "../atoms/BtnNext";

export default {
  props: {
    disabledCheck: Boolean,
    disabledNext: Boolean,
    next: Function,
    submitAnswer: Function,
    selectedIndex: Number,
    btnText: String,
  },
    components: {
    BtnCheck,
    BtnNext
  },
};
</script>
