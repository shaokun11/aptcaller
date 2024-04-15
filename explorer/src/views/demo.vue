<script lang="ts" setup>
import {
  onMounted,
  ref,
  watch,
  computed,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
} from "vue";
import { trace } from "../utils/tools";

const ID = ref<Number>(1);

onBeforeUpdate(() => {
  console.log(`the component is now before updated.`);
});

onBeforeMount(() => {
  console.log(`the component is now before mounted.`);
});

onBeforeUnmount(() => {
  console.log(`the component is now before unmounted.`);
});

onBeforeMount(() => {
  console.log(`the component is now before mounted.`);
});

onMounted(() => {
  trace("ID-", ID);
  console.log(`the component is now mounted.`);
});

onUpdated(() => {
  console.log(`the component is now updated.`);
});

watch(ID, (a: Number, b: Number) => {
  console.log("ID changed.", a, b);
});
computed(() => {
  return 1;
});
onUnmounted(() => {
  console.log(`the component is now unmounted.`);
});
</script>
