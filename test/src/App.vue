<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div>{{response}}</div>
    <div>{{person}}</div>
    <div>{{name}}</div>
    <div>{{age}}</div>
    <button @click="changeValue">change value</button>
    <button @click="changeReactive">change Reactive</button>
  </div>
  <router-view />
</template>
<script>
import SearchPostApi from "@/apis/api.js";
import { onMounted, ref, reactive, watch } from 'vue';
import { person2, name2, getPerson1, getPerson2, getPerson3, getPerson4, getPerson5,getPerson6 } from '@/apis/a.js';
export default {
// setup에서 await...
  setup() {

    const search = new SearchPostApi();
    const response = reactive({});
    const user = ref('ref current');
    let person = reactive({
      name: 'reactive current',
      age: 26
    });
    const { name, age } = person;
    console.log(person, person.value, user, user.value);  // o
    console.log(person2, person2.value, name2, name2.value);  // o
    console.log(getPerson1(), getPerson2().person2, getPerson3()._object, getPerson4().age.value);  // o
    console.log(getPerson5(), getPerson6());

    const p2 = getPerson1();
    const p4 = getPerson4();

    watch(() => person.name, () => {
      console.log(person);
    });

    watch(() => p2.name, () => {
      console.log(p2.name);
    });

    watch(() => p4.name.value, () => {
      console.log(p4.name.value);
    });

    function changeValue() {
      setTimeout(() => {
        person.name = 'change value';
        // p2.name = 'p2.name changed!!!!!!!!!!!!!!';
        p4.name.value = 'p4.name changed!!!!!!!!!!!!!!!!!!!!!!!!';
        console.log(person, p4, p2);
      }, 0);
    }

    function changeReactive() {
      setTimeout(() => {
        person = reactive({ name: 'change reactive', age: '3000' });
        console.log(person);
      }, 1000);
    }

    return {
      response,
      person,
      name,
      age,
      changeValue,
      changeReactive
    }

    
  }
};
</script>
<style lang="scss">
</style>
