import { defineComponent,PropType } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { Icon } from './Icon';
export const BackIcon = defineComponent({
  setup: (props,context) => { 
    const route = useRoute();
    const router = useRouter();
    const onClick = () => {
      const {route_to} = route.query;
      if(route_to){
        router.push(route_to as string);
      }else{
        router.back();
      }
    }
    return () => (
      <Icon name="left" onClick={onClick} />
   )
}
})