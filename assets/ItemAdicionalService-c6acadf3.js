var i=Object.defineProperty;var d=(n,a,t)=>a in n?i(n,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[a]=t;var e=(n,a,t)=>(d(n,typeof a!="symbol"?a+"":a,t),t);import{A as s}from"./index-def3a469.js";import{U as c}from"./UrlService-8cfe23a9.js";class m{constructor(){e(this,"getOptions",async()=>await s.$axios.get("ItemAdicional/options").then(a=>a.data.data));e(this,"getAll",async a=>await s.$axios.get(`ItemAdicional?${new c().convertToQueryString(a)}`).then(t=>t.data.data));e(this,"get",async a=>await s.$axios.get(`ItemAdicional/${a}`).then(t=>t.data.data));e(this,"create",async a=>await s.$axios.post("ItemAdicional",a).then(t=>t.data.data));e(this,"update",async a=>await s.$axios.put("ItemAdicional",a).then(t=>t.data.data));e(this,"delete",async a=>{await s.$axios.delete("ItemAdicional",{data:a})})}}export{m as I};