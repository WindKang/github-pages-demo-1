import { defineComponent , ref } from 'vue';
export const Second  = defineComponent({
  setup: (props,context) => { 
    return () => (
      <div>Second</div>
   )
}
})