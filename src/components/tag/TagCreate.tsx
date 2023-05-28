import { defineComponent,reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import s from './Tag.module.scss';
import { Icon } from '../../shared/Icon';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
export const TagCreate = defineComponent({
  props:{
    modelValue: {
      type: String,
    }
  },
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
      <MainLayout>{{
        title: () => '新增标签',
        icon: ()=> <Icon name='left' onClick={()=>{}}/>,
        default :()=>(
          <form class={s.form} onSubmit={onSubmit}>
          <div class={s.formRow}>
            <label class={s.formLabel}>
              <span class={s.formItem_name}>标签名</span>
              <div class={s.formItem_value}>
                <input v-model={formData.name} class={[s.formItem, s.input, s.error]}></input>
              </div>
              <div class={s.formItem_errorHint}>
               <span>{errors['name'] ? errors['name'][0] : '　'}</span>
              </div>
            </label>
            </div>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>符号 {formData.sign}</span>
                <div class={s.formItem_value}>
                  <EmojiSelect v-model ={formData.sign} class={[s.formItem, s.emojiList, s.error]} />  
                </div>
                <div class={s.formItem_errorHint}>
                  <span>{errors['sign'] ? errors['sign'][0] : '　'}</span>
                </div>
            </label>
            </div>
            <p class={s.tips}>记账时长按标签即可进行编辑</p>
            <div class={s.formRow}>
              <div class={s.formItem_value}>
                <Button class={[s.formItem, s.button]}>确定</Button>
              </div>
           </div>
          </form>
        ) 
      }}</MainLayout>
   )
}
})