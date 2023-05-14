import { defineComponent , ref } from 'vue';
export const First = defineComponent({
  setup: (props,context) => { 
    return () => (
      <div>First</div>
   )
}
})