import { defineComponent,PropType, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBool } from '../hooks/useBool';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { Form, FormItem } from '../shared/Form';
import { http } from '../shared/Http';
import { Icon } from '../shared/Icon';
import { refreshMe } from '../shared/me';
import { hasError, validate } from '../shared/validate';
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
      code:""
    })
    const refValidationCode = ref<any>();
    const errors = reactive({
      email:[],
      code:[]
    })
    const {ref:refDisabled,toggle,on:disabled,off:enable} = useBool(false);
    const router  = useRouter();
    const route = useRoute();
    const onSubmit = async (e:Event) => {
        e.preventDefault();
        Object.assign(errors, {
          email: [],
          code: []
        })
        Object.assign(errors,validate(formData,[
          {key:'email',type:'required',message:'请输入邮箱地址'},
          {key:'email',type:'pattern',regex:/^.+@.+$/,message:'请输入正确的邮箱地址'},
          {key:'code',type:'required',message:'请输入验证码'},
        ]))
        if(!hasError(errors)){
          const response = await http.post<{ jwt: string }>('/session', formData)
          .catch(onError)
          console.log(response)
          localStorage.setItem('jwt', response.data.jwt)
          //router.push('/sign_in?return_to='+ encodeURIComponent(route.fullPath))
          const returnTo = route.query.return_to as string | undefined
          refreshMe()
          router.push(returnTo || '/')
        
        }
    }
    const onError = (error:any) => {
      if(error.response.status === 422){
        Object.assign(errors,error.response.data.errors)
      }
      throw error;
    }
 

    const onClickSendValidationCode = async() => {
     disabled();
     const response = await http
     .post('/validation_codes',{email : formData.email})
     .catch(onError)
     .finally(enable)
     refValidationCode.value?.startCount();
    }
    return () => (
      <MainLayout>{{
        title:()=>"登录",
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
              countForm={3}
              disabled={refDisabled.value}
              onClick= {onClickSendValidationCode}
              v-model={formData.code} error={errors.code?.[0]}/>
              <FormItem style={{paddingTop:'96px'}}>
                <Button type = "submit">登录</Button>
              </FormItem>
            </Form>
          </div>
        )
      }}</MainLayout>
   )
}
})