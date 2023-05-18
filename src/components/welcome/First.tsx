import s from './Welcome.module.scss'
import { FunctionalComponent } from 'vue';

export const First:FunctionalComponent = () =>{  //FuntcionComponent纯函数的意思，函数没有生命周期
  return (
    <div class={s.card} >
      <svg>
        <use xlinkHref='#pig'></use>
      </svg>
      <h2>会挣钱<br />还会省钱</h2>
    </div>
    ) 
}

First.displayName = 'First' //为什么需要写这个 因为vue3.0的bug  会导致在vue-devtools中无法显示组件名字