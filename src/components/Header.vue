<template>
  <div>
    <b-nav class="border-bottom">
      <b-nav-item  disabled class="font-weight-bold">IT Quiz</b-nav-item>
      <b-nav-item disabled>Good answer: {{numCorrect}}/{{ numTotal}} </b-nav-item>
      <b-nav-item class="text-right fixed-top">
        <b-button variant="outline-secondary" to="/about">Zarejestruj się</b-button>
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
