interface FData{
    [key:string]:string|number|null|undefined|FData
}
type Rule<T> ={
    key: keyof T,
    message:  string, 
} &(
  {type:'required'}|
  {type:'pattern', regex:RegExp }
)
type Rules<T> = Rule<T>[]
export type {Rules,Rule,FData}
export const validate = <T extends FData>(formData:T,rules:Rules<T>) =>{
    type Errors ={
        [key in keyof T]?:string[]
    }
    const errors:Errors = {}
    rules.forEach(rule=>{ 
      const {key , type ,message} =rule
      const value = formData[key]
      switch(type){
        case 'required':
          if(isEmpty(value)){
            errors[key] = errors[key] ?? [] // ??跟||一样，但是||会把0也算做false，??只会把undefined和null算做false
            errors[key]?.push(message)
          }
          break;
        case 'pattern':
          if(!isEmpty(value) && !rule.regex.test(value!.toString())){ 
            errors[key] = errors[key] ?? []
            errors[key]?.push(message)
          }
          break;
          default:
            return;
      }
    })   
    return errors
}

function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === ''  
}

export function hasError(errors: Record<string, string[]>) {
   let result = false ;
   for(let key in errors){
      if(errors[key]?.length > 0){
        result = true;
        break;
      }
   }
    return result
}