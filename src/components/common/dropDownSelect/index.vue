<style src='./dropDownSelect.css' lang='css' scoped></style>
<template src='./template.html'></template>

<script>
  export default {
    name: 'DropDownSelect',
    props: {
      citySelectId: {
        type: String
      }
    },
    data() {
      return {
        cityList: {
          options: [
            { id: '2000', city: 'Sydney' },
            { id: '3000', city: 'Melbourne' },
            { id: '4000', city: 'Brisbane' },
            { id: '0', city: 'Select A City' }
          ],
          selectedOption: !this.citySelectId ? '0': this.citySelectId
        }
      }
    },
    methods: {
      emitSelectChange (event) {
        const value = event.target.value;
        const options = event.target.options;
        const selectedIndex = event.target.selectedIndex;

        if (selectedIndex > -1) {
          this.$emit('select-city', {id: value, city: options[selectedIndex].innerText });
        }
      }
    }
  }
</script>
