var c=Object.defineProperty;var i=(o,a,t)=>a in o?c(o,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[a]=t;var e=(o,a,t)=>(i(o,typeof a!="symbol"?a+"":a,t),t);import{A as s}from"./index-def3a469.js";import{U as d}from"./UrlService-8cfe23a9.js";class g{constructor(){e(this,"getOptions",async a=>await s.$axios.get(`Modelo/options?${new d().convertToQueryString(a)}`).then(t=>t.data.data));e(this,"getAll",async a=>await s.$axios.get(`Modelo?${new d().convertToQueryString(a)}`).then(t=>t.data.data));e(this,"get",async a=>await s.$axios.get(`Modelo/${a}`).then(t=>t.data.data));e(this,"create",async a=>await s.$axios.post("Modelo",a).then(t=>t.data.data));e(this,"update",async a=>await s.$axios.put("Modelo",a).then(t=>t.data.data));e(this,"delete",async a=>{await s.$axios.delete("Modelo",{data:a})})}}export{g as M};