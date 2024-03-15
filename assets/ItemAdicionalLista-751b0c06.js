import{I as F}from"./ItemAdicionalService-5c57b820.js";import{T as V}from"./TipoVeiculoService-4381615b.js";import{U as k}from"./UrlService-8cfe23a9.js";import{_ as I,y as A,m as D,b as a,p as N,c as g,d as b,f as e,e as r,g as o,j as B,F as R,q as j,t as m,i as p,s as v,k as P}from"./index-777c8e91.js";import{F as z}from"./Filtros-a811aaf2.js";const E={name:"ItemAdicionalLista",components:{Filtros:z},setup(){const t=A(),n=D(),c=new k,l=new V;return{confirm:t,toast:n,urlService:c,tipoVeiculoService:l}},data(){return{breadcrumbHome:{icon:"pi pi-home",to:"/"},breadcrumbItems:[{label:"Cadastros",to:"/cadastros/itens-adicionais"},{label:"Itens Adicionais",to:"/cadastros/itens-adicionais"}],filters:[],itemAdicionalService:null,registros:[],loading:!0}},async beforeMount(){this.searchRecords(),this.buildFilters()},methods:{showTemplate:function(t,n){this.confirm.require({group:"templating",header:"Confirmação",message:n,icon:"pi pi-exclamation-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",rejectClass:"p-button-outlined p-button-sm",acceptClass:"p-button-sm",rejectLabel:"Cancelar",acceptLabel:"Excluir",accept:async()=>{await this.itemAdicionalService.delete({id:t});const c=this.registros.data.findIndex(l=>l.id==t);c>-1&&this.registros.data.splice(c,1),this.toast.add({severity:"success",summary:"Registro excluído com sucesso",detail:"",life:3e3})}})},searchRecords:async function(){this.loading=!0,this.itemAdicionalService=new F,this.registros=await this.itemAdicionalService.getAll(this.urlService.getQueryParamsObject()),this.loading=!1},buildFilters:async function(){const t=await this.tipoVeiculoService.getOptions();this.filters=[{field:"Nome",property:"nome",type:"text"},{field:"Tipo de Veículo",property:"idTipoVeiculo",type:"multiselect",options:t}]},updateFilter:function(t){this.urlService.clearQueryParams();for(var n in t)t.hasOwnProperty(n)&&this.urlService.setParam(n,t[n]);this.searchRecords()},changePage:async function(t){this.urlService.setParam("page",t.page+1),this.searchRecords()}}},L=r("div",{class:"font-medium text-2xl text-color"},"Itens Adicionais",-1),H={class:"grid p-fluid"},O={class:"col-12 md:col-12"},q={class:"card"},Q={class:"my-2"},U={class:"flex flex-column align-items-center w-full gap-3 surface-border"},K=r("i",{class:"pi pi-spin pi-spinner",style:{"font-size":"2rem"}},null,-1),M={style:{"vertical-align":"middle"},class:"image-text"},G={key:0};function J(t,n,c,l,s,h){const y=a("Breadcrumb"),u=a("Button"),_=a("router-link"),x=a("Toolbar"),w=a("ConfirmDialog"),C=a("Filtros"),d=a("Column"),S=a("DataTable"),T=a("Toast"),f=N("tooltip");return g(),b(R,null,[L,e(y,{home:s.breadcrumbHome,model:s.breadcrumbItems},null,8,["home","model"]),r("div",H,[r("div",O,[r("div",q,[e(x,{class:"mb-4"},{end:o(()=>[r("div",Q,[e(_,{to:"/cadastros/itens-adicionais/novo"},{default:o(()=>[e(u,{label:"Novo",icon:"pi pi-plus",class:"p-button-primary mr-2"})]),_:1})])]),_:1}),e(w,{group:"templating"},{message:o(i=>[r("div",U,[r("i",{class:j([i.message.icon,"text-6xl text-primary-500"])},null,2),r("p",null,m(i.message.message),1)])]),_:1}),e(S,{value:s.registros.data,paginator:"",lazy:"",first:(s.registros.currentPage-1)*s.registros.pageSize,rows:s.registros.pageSize,totalRecords:s.registros.count,class:"p-datatable backgroud-color-white",dataKey:"id",rowHover:!0,filterDisplay:"menu",loading:s.loading,responsiveLayout:"scroll"},B({header:o(()=>[e(C,{filters:s.filters,updateFilter:h.updateFilter},null,8,["filters","updateFilter"])]),loading:o(()=>[K]),footer:o(()=>[]),default:o(()=>[e(d,{field:"id",header:"Cód.",bodyClass:"text-left",style:{"min-width":"2rem"}},{body:o(({data:i})=>[r("span",M,m(i.id),1)]),_:1}),e(d,{field:"nome",header:"Nome",style:{"min-width":"12rem"}},{body:o(({data:i})=>[p(m(i.nome),1)]),_:1}),e(d,{field:"tipoVeiculo",header:"Tipo de veículo",style:{"min-width":"12rem"}},{body:o(({data:i})=>[p(m(i.tipoVeiculo.descricao),1)]),_:1}),e(d,{field:"Edit",header:"",dataType:"boolean",bodyClass:"text-right",style:{"min-width":"10rem",width:"5rem"}},{body:o(({data:i})=>[i.editavel?(g(),b("div",G,[e(_,{class:"mr-4",to:`/cadastros/itens-adicionais/editar/${i.id}`},{default:o(()=>[v(e(u,{icon:"pi pi-user-edit",class:"p-button-rounded p-button-text",text:"",rounded:""},null,512),[[f,"Editar",void 0,{top:!0}]])]),_:2},1032,["to"]),v(e(u,{icon:"pi pi-trash",class:"p-button-rounded p-button-text",text:"",rounded:"",onClick:W=>h.showTemplate(i.id,`Deseja realmente excluir o item adicional ${i.nome}?`)},null,8,["onClick"]),[[f,"Excluir",void 0,{top:!0}]])])):P("",!0)]),_:1})]),_:2},[s.loading?void 0:{name:"empty",fn:o(()=>[p("Nenhum item adicional encontrado. ")]),key:"0"}]),1032,["value","first","rows","totalRecords","loading"])])]),e(T)])],64)}const te=I(E,[["render",J]]);export{te as default};