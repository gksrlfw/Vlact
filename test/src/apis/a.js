import { reactive, ref, toRef, toRefs } from "vue";
export const person2 = reactive({
    name: 'reactive other',
    age: 25
});

export const name2 = ref("ref other");

export function getPerson1() {
    return person2;
}
export function getPerson2() {
    return { person2 };
}

export function getPerson3() {
    return toRef(person2);
}

export function getPerson4() {
    return toRefs(person2);
}

export function getPerson5() {
    return toRef(name2);
}

export function getPerson6() {
    return toRefs(name2);
}

