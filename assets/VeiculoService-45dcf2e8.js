var c=Object.defineProperty;var i=(s,a,t)=>a in s?c(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t;var e=(s,a,t)=>(i(s,typeof a!="symbol"?a+"":a,t),t);import{A as n}from"./index-b821698f.js";import{U as d}from"./UrlService-8cfe23a9.js";class g{constructor(){e(this,"getOptions",async()=>await n.$axios.get("Veiculo/options").then(a=>a.data.data));e(this,"getAll",async a=>await n.$axios.get(`Veiculo?${new d().convertToQueryString(a)}`).then(t=>t.data.data));e(this,"get",async a=>await n.$axios.get(`Veiculo/${a}`).then(t=>t.data.data));e(this,"create",async a=>await n.$axios.post("Veiculo",a).then(t=>t.data.data));e(this,"update",async a=>await n.$axios.put("Veiculo",a).then(t=>t.data.data));e(this,"delete",async a=>{await n.$axios.delete("Veiculo",{data:a})})}}export{g as V};