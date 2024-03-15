import{C as w}from"./CarteiraService-f1c2ebfb.js";import{T as y}from"./TipoCarteiraService-38162b52.js";import{_ as k,l as D,m as B,n as q,b as r,c as I,d as v,f as e,e as o,t as n,g as p,F as E,k as N,q as T}from"./index-777c8e91.js";import{c as P,a as f,b as V}from"./index.esm-960d875f.js";import"./UrlService-8cfe23a9.js";const U={name:"CarteiraCadastro",components:{},setup(){const t=D(),i=B(),d=new w,a=new y,{errors:l,handleSubmit:u,defineField:c}=q({validationSchema:P({descricao:f().required("Campo obrigatório"),saldoInicial:V().required("Campo obrigatório"),periodoInicial:f().required("Campo obrigatório"),periodoFinal:f().required("Campo obrigatório"),idTipoCarteira:V().required("Campo obrigatório")})}),[_]=c("descricao"),[h]=c("saldoInicial"),[b]=c("periodoInicial"),[m]=c("periodoFinal"),[C]=c("idTipoCarteira");return{router:t,toast:i,tipoCarteiraService:a,carteiraService:d,descricao:_,saldoInicial:h,periodoInicial:b,periodoFinal:m,idTipoCarteira:C,handleSubmit:u,errors:l}},data(){return{breadcrumbHome:{icon:"pi pi-home",to:"/"},breadcrumbItems:[],tipoCarteiras:[],titulo:"",isEdicao:!1,id:0,onSubmit:null,loading:!1}},async mounted(){if(this.isEdicao=this.router.currentRoute.value.fullPath.includes("editar"),this.titulo=this.isEdicao?"Editar carteira":"Nova carteira",this.breadcrumbItems=[{label:"Cadastros",to:"/financeiro/cadastros/carteira"},{label:"Carteiras",to:"/financeiro/cadastros/carteira"},{label:this.titulo,to:"#"}],this.tipoCarteiras=await this.tipoCarteiraService.getOptions(),this.isEdicao){const t=this.router.currentRoute.value.params.id,i=await this.carteiraService.get(t);this.id=i.id,this.descricao=i.descricao,this.saldoInicial=i.saldoInicial,this.periodoInicial=i.periodoInicial,this.periodoFinal=i.periodoFinal,this.idTipoCarteira=i.tipoCarteira.id}this.onSubmit=this.handleSubmit(async t=>{const i={id:this.id,descricao:t.descricao,saldoInicial:t.saldoInicial,periodoInicial:t.periodoInicial,periodoFinal:t.periodoFinal,idTipoCarteira:t.idTipoCarteira};try{this.loading=!0,this.id?await this.carteiraService.update(i):await this.carteiraService.create(i),this.toast.add({severity:"success",summary:"Cadastro salvo com sucesso",detail:"",life:3e3}),setTimeout(()=>{this.router.push("/financeiro/cadastros/carteira")},400)}catch(d){this.toast.add({severity:"error",summary:d.message,detail:"",life:3e3}),this.loading=!1}})},methods:{submit:async function(){this.onSubmit()}}},O={class:"font-medium text-2xl text-color"},R={class:"grid p-fluid"},H={class:"col-12 md:col-12"},z={class:"card"},G={key:0},L={class:"p-input-title"},j={class:"grid formgrid"},A={class:"col-12 mb-2 lg:col-6"},J=o("h6",{class:"p-input-title"},"Descrição",-1),K={class:"p-error",id:"text-error"},M={class:"grid formgrid"},Q={class:"col-12 mb-2 lg:col-6"},W=o("h6",{class:"p-input-title"},"Tipo de Carteira",-1),X={class:"p-error",id:"text-error"},Y={class:"grid formgrid"},Z={class:"col-12 mb-2 lg:col-3"},$=o("h6",{class:"p-input-title"},"Período Inicial",-1),oo={class:"p-error",id:"text-error"},io={class:"col-12 mb-2 lg:col-3"},ao=o("h6",{class:"p-input-title"},"Período Final",-1),eo={class:"p-error",id:"text-error"},to={class:"grid formgrid"},ro={class:"col-12 mb-2 lg:col-3"},so=o("h6",{class:"p-input-title"},"Saldo Inicial",-1),lo={class:"p-error",id:"text-error"},co={class:"my-2"};function no(t,i,d,a,l,u){const c=r("Toast"),_=r("Breadcrumb"),h=r("InputText"),b=r("Dropdown"),m=r("Calendar"),C=r("InputNumber"),F=r("Panel"),g=r("Button"),S=r("router-link"),x=r("Toolbar");return I(),v(E,null,[e(c),o("div",O,n(l.titulo),1),e(_,{home:l.breadcrumbHome,model:l.breadcrumbItems},null,8,["home","model"]),o("div",R,[o("div",H,[o("div",z,[o("form",null,[e(F,{header:"Dados Principais",toggleable:"",class:"mb-4"},{default:p(()=>[l.id?(I(),v("div",G,[o("h6",L,"CÓDIGO: "+n(this.id),1)])):N("",!0),o("div",j,[o("div",A,[J,e(h,{modelValue:a.descricao,"onUpdate:modelValue":i[0]||(i[0]=s=>a.descricao=s),class:T({"p-invalid":a.errors.descricao}),type:"text"},null,8,["modelValue","class"]),o("small",K,n(a.errors.descricao||""),1)])]),o("div",M,[o("div",Q,[W,e(b,{modelValue:a.idTipoCarteira,"onUpdate:modelValue":i[1]||(i[1]=s=>a.idTipoCarteira=s),editable:"",options:l.tipoCarteiras,optionLabel:"opcao",optionValue:"id",placeholder:"Selecione o Tipo de Carteira",class:T(["w-full",{"p-invalid":a.errors.idTipoCarteira}])},null,8,["modelValue","options","class"]),o("small",X,n(a.errors.idTipoCarteira||""),1)])]),o("div",Y,[o("div",Z,[$,e(m,{modelValue:a.periodoInicial,"onUpdate:modelValue":i[2]||(i[2]=s=>a.periodoInicial=s),showIcon:"",showOnFocus:!1},null,8,["modelValue"]),o("small",oo,n(a.errors.periodoInicial||""),1)]),o("div",io,[ao,e(m,{modelValue:a.periodoFinal,"onUpdate:modelValue":i[3]||(i[3]=s=>a.periodoFinal=s),showIcon:"",showOnFocus:!1},null,8,["modelValue"]),o("small",eo,n(a.errors.periodoFinal||""),1)])]),o("div",to,[o("div",ro,[so,e(C,{modelValue:a.saldoInicial,"onUpdate:modelValue":i[4]||(i[4]=s=>a.saldoInicial=s),inputId:"minmaxfraction",minFractionDigits:2,maxFractionDigits:2},null,8,["modelValue"]),o("small",lo,n(a.errors.saldoInicial||""),1)])])]),_:1})])]),e(x,null,{start:p(()=>[e(S,{to:"/financeiro/cadastros/carteira"},{default:p(()=>[e(g,{label:"Voltar",icon:"pi pi-undo",class:"p-button-secondary mr-2",raised:""})]),_:1})]),end:p(()=>[o("div",co,[e(g,{label:"Salvar",icon:"pi pi-save",class:"p-button-sucess mr-4",loading:l.loading,raised:"",onClick:u.submit},null,8,["loading","onClick"])])]),_:1})])])],64)}const bo=k(U,[["render",no]]);export{bo as default};