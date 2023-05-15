import { defineComponent , ref } from 'vue';
export const Third = defineComponent({
  setup: (props,context) => { 
    return () => (
      <div>Third</div>
   )
}
})