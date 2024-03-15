var w=Object.defineProperty;var C=(t,s,o)=>s in t?w(t,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[s]=o;var p=(t,s,o)=>(C(t,typeof s!="symbol"?s+"":s,o),o);import{A as k,_ as S,u as V,r as m,l as A,C as L,b as r,c as I,d as O,e,f as i,v as U,x as B}from"./index-777c8e91.js";class R{constructor(){p(this,"authenticate",async(s,o)=>{await k.$axios.post("auth/login",{login:s,senha:o}).then(n=>{const u=n.data.data;localStorage.setItem("auth",JSON.stringify(u))}).catch(n=>{console.log(n.response.data.Message)})})}}const l=t=>(U("data-v-4599c19a"),t=t(),B(),t),T={class:"surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"},E={class:"flex align-items-center justify-content-center"},N={class:"left"},j={class:"w-full surface-card py-7 p-7 px-7 sm:px-8",style:{"border-radius":"10px"}},G={class:"text-center mb-5"},P=["src"],D=l(()=>e("label",{for:"email1",class:"block text-700 text-x font-medium mb-2"},"E-mail",-1)),J=l(()=>e("label",{for:"password1",class:"block text-700 font-medium text-x mb-2"},"Senha",-1)),M={class:"flex align-items-center justify-content-between mb-5 gap-5"},$={class:"flex align-items-center"},q=l(()=>e("label",{for:"rememberme1"},"Lembrar senha",-1)),z=l(()=>e("a",{class:"font-medium no-underline ml-2 text-right cursor-pointer",style:{color:"var(--primary-color)"}},"Esqueceu sua senha?",-1)),F=l(()=>e("div",{class:"text-center mb-0 mt-4"},[e("span",{class:"text-600 font-medium line-height-3"},"Ainda não tem conta?"),e("a",{class:"font-medium no-underline ml-2 text-blue-500 cursor-pointer"},"Cadastre-se!")],-1)),H=l(()=>e("div",{class:"copyright mt-6 align-items-center justify-content-center",style:{padding:"0 30px 30px 30px"}},[e("div",{class:"text-center text-color-secondary"},"2021 - 2024 © Auto Car - Sistema de Gestão para Revendas de Veículos")],-1)),K={__name:"Login",setup(t){const{layoutConfig:s}=V(),o=m(""),n=m(""),d=m(!1),u=new R,_=A(),h=L(()=>`layout/images/${s.darkTheme.value?"LOGO-AUTOCAR-BRANCA":"LOGO-AUTOCAR-PRETA"}.png`),g=async()=>{await u.authenticate(o.value,n.value);const a=JSON.parse(localStorage.getItem("auth")).tipoUsuario===1?"/superadmin":"/dashboard";_.push(a)};return(f,a)=>{const x=r("InputText"),v=r("Password"),b=r("Checkbox"),y=r("Button");return I(),O("div",T,[e("div",E,[e("div",N,[e("div",j,[e("div",G,[e("img",{src:h.value,alt:"AutoCarLogo",class:"mb-5 w-20rem flex-shrink-0"},null,8,P)]),e("div",null,[D,i(x,{id:"email1",type:"text",placeholder:"Digite seu e-mail...",class:"w-full md:w-30rem mb-5",style:{padding:".8rem"},modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=c=>o.value=c)},null,8,["modelValue"]),J,i(v,{id:"password1",modelValue:n.value,"onUpdate:modelValue":a[1]||(a[1]=c=>n.value=c),placeholder:"Digite sua senha...",feedback:!1,toggleMask:!0,class:"w-full mb-3",inputClass:"w-full",inputStyle:{padding:".8rem"}},null,8,["modelValue"]),e("div",M,[e("div",$,[i(b,{modelValue:d.value,"onUpdate:modelValue":a[2]||(a[2]=c=>d.value=c),id:"rememberme1",binary:"",class:"mr-2"},null,8,["modelValue"]),q]),z]),i(y,{label:"Entrar",class:"w-full mt-5 mb-4 p-3 text-xl",onClick:g}),F])]),H])])])}}},X=S(K,[["__scopeId","data-v-4599c19a"]]);export{X as default};
