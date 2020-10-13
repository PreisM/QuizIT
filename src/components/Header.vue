<template>
  <div>
    <b-nav class="border-bottom">
      <b-nav-item  disabled class="font-weight-bold">IT Quiz</b-nav-item>
      <b-nav-item disabled>{{$t('header.counter')}} {{numCorrect}}/{{ numTotal}} </b-nav-item>
      <b-nav-item class="text-right fixed-top">
        <b-button variant="outline-secondary" :to="`/${$i18n.locale}/registration`">{{ $t('header.registration') }}</b-button>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  props: [
    'numCorrect',
    'numTotal'
  ]
}
</script>
