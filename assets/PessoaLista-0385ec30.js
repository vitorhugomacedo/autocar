import{F as w}from"./Filtros-a811aaf2.js";import{_ as F,b as l,c,d as m,f as e,e as t,g as s,j as N,F as T,i as h,t as p,k as b}from"./index-777c8e91.js";function S(o){return o.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4")}function P(o){return o.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,"$1.$2.$3/$4-$5")}function k(o){return valorFormatado=o.toLocaleString("pt-br",{style:"currency",currency:"BRL"})}const $={formatarDocumento(o){return o.length==14?P(o):S(o)},formatarMoeda(o){return k(o)}},B={name:"PessoasLista",components:{Filtros:w},data(){return{breadcrumbHome:{icon:"pi pi-home",to:"/"},breadcrumbItems:[{label:"Cadastros",to:"/cadastros/pessoas"},{label:"Pessoas",to:"/cadastros/pessoas"}],filters:[],loading1:null,filters1:null,loading:!0,formatacaoService:null}},async beforeMount(){this.formatacaoService=$,this.loading=!0,this.loading=!1},methods:{}},I=t("div",{class:"font-medium text-2xl text-color"},"Pessoas",-1),D={class:"grid p-fluid"},M={class:"col-12 md:col-12"},L={class:"card"},V={class:"my-2"},z={class:"grid formgrid"},E={class:"col-12 mb-2 lg:col-6 lg:mb-2"},H=t("h6",{class:"p-input-title"},"Nome Completo",-1),J={class:"col-12 mb-2 lg:col-3 lg:mb-2"},A=t("h6",{class:"p-input-title"},"CPF",-1),G={class:"col-12 mb-2 lg:col-3 lg:mb-2"},R=t("h6",{class:"p-input-title"},"Data de Nascimento",-1),U=t("i",{class:"pi pi-spin pi-spinner",style:{"font-size":"2rem"}},null,-1),j={style:{"vertical-align":"middle"},class:"image-text"},K={style:{"vertical-align":"middle"},class:"image-text"},q={key:0},O={key:1};function Q(o,u,W,X,n,Y){const f=l("Breadcrumb"),r=l("Button"),y=l("FileUpload"),g=l("router-link"),v=l("Toolbar"),d=l("InputText"),x=l("Filtros"),i=l("Column"),_=l("Tag"),C=l("DataTable");return c(),m(T,null,[I,e(f,{title:o.breadcrumbTitle,home:n.breadcrumbHome,model:n.breadcrumbItems},null,8,["title","home","model"]),t("div",D,[t("div",M,[t("div",L,[e(v,{class:"mb-4"},{start:s(()=>[e(r,{label:"Exportar",raised:"",outlined:"",icon:"pi pi-upload",class:"p-button-help mr-4",onClick:u[0]||(u[0]=a=>o.exportCSV(a))}),e(y,{mode:"basic",accept:"image/*",maxFileSize:1e6,label:"Importar",chooseLabel:"Importar",class:"p-button-info"})]),end:s(()=>[t("div",V,[e(g,{to:"/cadastros/pessoas/novo"},{default:s(()=>[e(r,{label:"Novo",icon:"pi pi-plus",class:"p-button-primary mr-2"})]),_:1})])]),_:1}),e(x,null,{container:s(()=>[t("div",z,[t("div",E,[H,e(d,{type:"text",placeholder:"Digite o Nome..."})]),t("div",J,[A,e(d,{type:"text",placeholder:"",inputId:"withoutgrouping",useGrouping:!1})]),t("div",G,[R,e(d,{type:"text",placeholder:"",inputId:"withoutgrouping",useGrouping:!1})])])]),_:1}),e(C,{value:o.pessoas,paginator:!0,sortMode:"multiple",class:"p-datatable backgroud-color-white",rows:5,dataKey:"id",rowHover:!0,filterDisplay:"menu",loading:n.loading,responsiveLayout:"scroll"},N({loading:s(()=>[U]),footer:s(()=>[]),default:s(()=>[e(i,{field:"idPessoa",header:"Cód.",bodyClass:"text-right",style:{"min-width":"6rem"}},{body:s(({data:a})=>[t("span",j,p(a.idPessoa),1)]),_:1}),e(i,{field:"Nome",header:"Nome / Razão Social",style:{"min-width":"12rem"}},{body:s(({data:a})=>[h(p(a.pessoa.razaoSocial),1)]),_:1}),e(i,{field:"Documento",header:"CPF / CNPJ",bodyClass:"text-left",style:{"min-width":"8rem"}},{body:s(({data:a})=>[]),_:1}),e(i,{header:"Tipo",filterField:"typeclient",showFilterMatchModes:!1,filterMenuStyle:{width:"6rem"},style:{"min-width":"6rem"}},{body:s(({data:a})=>[t("span",K,p(a.tipo==0?"Físico":"Jurídico"),1)]),_:1}),e(i,{field:"Ativo",header:"Status",dataType:"boolean",bodyClass:"text-left",style:{"min-width":"4rem"}},{body:s(({data:a})=>[a.ativo?(c(),m("div",q,[e(_,{class:"mr-2 ml-2",style:{width:"3rem"},severity:"success",value:"Ativo"})])):b("",!0),a.ativo?b("",!0):(c(),m("div",O,[e(_,{class:"mr-2 ml-2",style:{width:"3rem"},severity:"danger",value:"Inativo"})]))]),_:1}),e(i,{field:"Edit",header:"",dataType:"boolean",bodyClass:"text-center",style:{"min-width":"4rem"}},{body:s(({data:a})=>[t("div",null,[e(r,{icon:"pi pi-user-edit",class:"p-button-rounded p-button-text",text:"",rounded:""})])]),_:1})]),_:2},[n.loading?void 0:{name:"empty",fn:s(()=>[h("Nenhuma pessoa encontrada.")]),key:"0"}]),1032,["value","loading"])])])])],64)}const te=F(B,[["render",Q]]);export{te as default};
