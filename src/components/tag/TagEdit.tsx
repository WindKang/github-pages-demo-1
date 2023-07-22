import { defineComponent,reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { Rules, validate } from '../../shared/validate';
import { TagForm } from './TagForm';
import s from './Tag.module.scss';
export const TagEdit = defineComponent({
  setup: (props,context) => { 
    const formData = reactive({
      name:'',
      sign:'',
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({}) 
    //解释  
    const onSubmit = (e:Event) => {
       const rules:Rules<typeof formData> =[
          { key:'name',type:'required' ,message: '必填'}, 
          { key:'name',type:'pattern',regex: /^.{1,4}$/ ,message: '只能填1-4个字符'},
          { key:'sign',type:'required',message:'必填'},
       ]
       Object.assign(errors, { //这里为啥是Object开头 因为errors是一个reactive对象，所以不能直接赋值，要用Object.assign
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
      e.preventDefault();
    }
    return () => (
        <MainLayout >{{
        title: () => '新增标签',
        icon: ()=> <BackIcon/>,
        default :()=> <>
        <TagForm />
        <div class= {s.actions}>
          <Button  level='danger' class ={s.removeTags} onClick ={()=>{}}>删除标签</Button>
          <Button  level='danger' class ={s.removeTagsAndItems} onClick ={()=>{}}>删除标签和记账</Button>
        </div>
        </>
      }}</MainLayout>
   )
}
})