<template>
  <div>
    <b-nav tabs>
      <b-nav-item disabled class="font-weight-bold">IT Quiz</b-nav-item>
      <b-nav-item disabled>Good answer: {{numCorrect}}/{{ numTotal}} </b-nav-item>
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
