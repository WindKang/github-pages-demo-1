import { defineComponent  } from 'vue';
import { Icon } from './Icon';
export const FloatButton = defineComponent({
  setup: (props,context) => { 
    return () => (
      <div>
        <svg>
          <Icon name="add"/>
        </svg>
      </div>
   )
}
})