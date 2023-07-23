import { defineComponent,onMounted,reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button } from '../../shared/Button';
import { Form, FormItem } from '../../shared/Form';
import { http } from '../../shared/Http';
import { onFormError } from '../../shared/onFormError';
import { hasError, Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
export const TagForm = defineComponent({
  props:{
    id: Number
  },
  setup: (props,context) => { 
    const route = useRoute(); 
    const formData = reactive<Partial<Tag>>({
      id : undefined,
      name:'',
      sign:'',
      kind: route.query.kind as 'income' | 'expenses'
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({}) 
    const router = useRouter()
    const onSubmit = async(e:Event) => {
      e.preventDefault();
       const rules:Rules<typeof formData> =[
          { key:'name',type:'required' ,message: '必填'}, 
          { key:'name',type:'pattern',regex: /^.{1,4}$/ ,message: '只能填1-4个字符'},
          { key:'sign',type:'required',message:'必填'},
       ]
       Object.assign(errors, { //这里为啥是Object开头 因为errors是一个reactive对象，所以不能直接赋值，要用Object.assign
        name: [],
        sign: []
      })
      Object.assign(errors, validate(formData, rules))
      if(!hasError(errors)){
      if(formData.id){
        const promise = await formData.id ?
        http.patch(`/tags/${formData.id}`, formData, {
          params: {_mock: 'tagEdit'},
        }) :
        http.post('/tags', formData, {
          params: {_mock: 'tagCreate'},
        })
      await promise.catch((error)=>  onFormError(error, (data)=> Object.assign(errors, data.errors))
      )
      router.back()
    }
    }}
    onMounted(async ()=>{
      if(!props.id){ return }
      const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {
        _mock: 'tagShow'
      })
      Object.assign(formData,response.data.resource)
    })
    return () => (
      <Form onSubmit={onSubmit}>
      <FormItem label='标签名(最多4个字符)'
        type="text"
        v-model={formData.name}
        error={errors['name']?.[0]} />
      <FormItem label={'符号 ' + formData.sign}
        type="emojiSelect" v-model={formData.sign}
        error={errors['sign']?.[0]} />
      <FormItem>
        <p class={s.tips}>记账时长按标签即可进行编辑</p>
      </FormItem>
      <FormItem>
        <Button type="submit" class={[s.button]}>确定</Button>
      </FormItem>
    </Form>
   )
}
})