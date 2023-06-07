import axios from 'axios';
import { defineComponent,PropType, reactive, ref } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { Icon } from '../shared/Icon';
import { validate } from '../shared/validate';
import s from './SignInPage.module.scss';
export const SignInPage = defineComponent({
  props:{
    name:{
      type:String as PropType<string>,
    }
  },
  setup: (props,context) => { 
    const formData = reactive({
      email:"",
      validationCode:""
    })
    const refValidationCode = ref<any>();
    const errors = reactive({
      email:[],
      validationCode:[]
    })
    const onSubmit = (e:Event) => {
        e.preventDefault();
        Object.assign(errors, {
          email: [],
          validationCode: []
        })
     Object.assign(errors,validate(formData,[
          {key:'email',type:'required',message:'请输入邮箱地址'},
          {key:'email',type:'pattern',regex:/^.+@.+$/,message:'请输入正确的邮箱地址'},
          {key:'validationCode',type:'required',message:'请输入验证码'},
        ]))
    }
    const onClickSendValidationCode = async() => {
     const response = await axios.post('/api/v1/validation_codes',{email:formData.email})
     refValidationCode.value?.startCount();
    }
    return () => (
      <MainLayout>{{
        title:()=>"登陆",
        icon:()=><Icon name="left" /> ,
        default:()=>(
          <div class ={s.wrapper}>
            <div class ={s.logo}>
              <Icon class ={s.icon} name="mangosteen" />
              <h1 class={s.appName}>山竹记账</h1>
            </div>
            <Form onSubmit={onSubmit}>
              <FormItem label="邮箱地址" type ="text" 
              placeholder='请输入邮箱,然后点击发送验证码'
              v-model={formData.email} error={errors.email?.[0]} />
              <FormItem  ref={refValidationCode} label="验证码" type ="validationCode" 
              placeholder='请输入六位数字'
              onClick= {onClickSendValidationCode}
              v-model={formData.validationCode} error={errors.validationCode?.[0]}/>
              <FormItem style={{paddingTop:'96px'}}>
                <Button>登陆</Button>
              </FormItem>
            </Form>
          </div>
        )
      }}</MainLayout>
   )
}
})