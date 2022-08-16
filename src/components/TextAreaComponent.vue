<template>
  <div class="text-center mt-5">
    <h4 for="obs">Observações / Análise:</h4>
    <b-form-textarea
      id="textarea"
      rows="10"
      placeholder="Digite as observações"
    ></b-form-textarea>
  </div>
</template>

<script>
export default {
  name: "TextAreaComponent",
};
</script>

<style>
#textarea {
  /* width: 90%; */
  border-radius: 6px;
  /* border-style: none; */

  resize: none;
}

.txt-container {
  margin: auto;
  padding: 60px;
}
</style>