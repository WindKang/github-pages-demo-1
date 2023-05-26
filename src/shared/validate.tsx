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
          if(value === undefined || value === null || value === ''){
            errors[key] = errors[key] ?? [] // ??跟||一样，但是||会把0也算做false，??只会把undefined和null算做false
            errors[key]?.push(message)
          }
          break;
        case 'pattern':
          if(value && !rule.regex.test(value.toString())){
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