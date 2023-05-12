import { defineComponent , ref } from 'vue';
export const Bar = defineComponent({
  setup: (props,context) => { 
    return () => (
      <div>Bar</div>
   )
}
})