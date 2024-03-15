import{u as k,r as c,a as j,o as C,w as D,b as i,c as V,d as A,e,f as t,g as l,h as p,i as r,t as N}from"./index-def3a469.js";const T={class:"grid"},B=p('<div class="col-12 lg:col-6 xl:col-3"><div class="card mb-0"><div class="flex justify-content-between mb-3"><div><span class="block text-500 font-medium mb-3">Vendas</span><div class="text-900 font-medium text-xl">152</div></div><div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem;"><i class="pi pi-shopping-cart text-blue-500 text-xl"></i></div></div><span class="text-green-500 font-medium">24 novas vendas </span><span class="text-500">sobre o último mês</span></div></div><div class="col-12 lg:col-6 xl:col-3"><div class="card mb-0"><div class="flex justify-content-between mb-3"><div><span class="block text-500 font-medium mb-3">Faturamento</span><div class="text-900 font-medium text-xl">R$2.100,00</div></div><div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem;"><i class="pi pi-map-marker text-orange-500 text-xl"></i></div></div><span class="text-green-500 font-medium">%52+ </span><span class="text-500">sobre o último mês</span></div></div><div class="col-12 lg:col-6 xl:col-3"><div class="card mb-0"><div class="flex justify-content-between mb-3"><div><span class="block text-500 font-medium mb-3">Clientes</span><div class="text-900 font-medium text-xl">28.441</div></div><div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem;"><i class="pi pi-inbox text-cyan-500 text-xl"></i></div></div><span class="text-green-500 font-medium">520 </span><span class="text-500">registrados este mês</span></div></div><div class="col-12 lg:col-6 xl:col-3"><div class="card mb-0"><div class="flex justify-content-between mb-3"><div><span class="block text-500 font-medium mb-3">Propostas</span><div class="text-900 font-medium text-xl">152 criadas</div></div><div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem;"><i class="pi pi-comment text-purple-500 text-xl"></i></div></div><span class="text-green-500 font-medium">85 </span><span class="text-500">este mês</span></div></div>',4),R={class:"col-12 xl:col-6"},J={class:"card"},L=e("h5",null,"Vendas Recentes",-1),M=["src","alt"],S={class:"col-12 xl:col-6 sm:col-12"},$={class:"card"},Y=e("h5",null,"Visualização de Vendas",-1),q={class:"card"},E={class:"flex align-items-center justify-content-between mb-4"},O=e("h5",null,"Notifications",-1),z=p('<span class="block text-600 font-medium mb-3">TODAY</span><ul class="p-0 mx-0 mt-0 mb-4 list-none"><li class="flex align-items-center py-2 border-bottom-1 surface-border"><div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"><i class="pi pi-dollar text-xl text-blue-500"></i></div><span class="text-900 line-height-3">Richard Jones <span class="text-700">has purchased a blue t-shirt for <span class="text-blue-500">79$</span></span></span></li><li class="flex align-items-center py-2"><div class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0"><i class="pi pi-download text-xl text-orange-500"></i></div><span class="text-700 line-height-3">Your request for withdrawal of <span class="text-blue-500 font-medium">2500$</span> has been initiated.</span></li></ul><span class="block text-600 font-medium mb-3">YESTERDAY</span><ul class="p-0 m-0 list-none"><li class="flex align-items-center py-2 border-bottom-1 surface-border"><div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"><i class="pi pi-dollar text-xl text-blue-500"></i></div><span class="text-900 line-height-3">Keyser Wick <span class="text-700">has purchased a black jacket for <span class="text-blue-500">59$</span></span></span></li><li class="flex align-items-center py-2 border-bottom-1 surface-border"><div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0"><i class="pi pi-question text-xl text-pink-500"></i></div><span class="text-900 line-height-3">Jane Davis <span class="text-700">has posted a new questions about your product.</span></span></li></ul>',4),K={__name:"Dashboard",setup(F){const{isDarkTheme:u}=k(),b=c(null),x=j({labels:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],datasets:[{label:"Ano anterior",data:[65,59,80,81,56,55,40,90,70,30,120,150],fill:!1,backgroundColor:"#2f4860",borderColor:"#2f4860",tension:.4},{label:"Ano Atual",data:[28,48,40,19,86,27,90,90,95,100,150,200],fill:!1,backgroundColor:"#00bb7e",borderColor:"#00bb7e",tension:.4}]}),f=c([{label:"Add New",icon:"pi pi-fw pi-plus"},{label:"Remove",icon:"pi pi-fw pi-minus"}]),o=c(null);C(()=>{});const v=a=>a.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),h=()=>{o.value={plugins:{legend:{labels:{color:"#495057"}}},scales:{x:{ticks:{color:"#495057"},grid:{color:"#ebedef"}},y:{ticks:{color:"#495057"},grid:{color:"#ebedef"}}}}},g=()=>{o.value={plugins:{legend:{labels:{color:"#ebedef"}}},scales:{x:{ticks:{color:"#ebedef"},grid:{color:"rgba(160, 167, 181, .3)"}},y:{ticks:{color:"#ebedef"},grid:{color:"rgba(160, 167, 181, .3)"}}}}};return D(u,a=>{a?g():h()},{immediate:!0}),(a,d)=>{const n=i("Column"),m=i("Button"),y=i("DataTable"),_=i("Chart"),w=i("Menu");return V(),A("div",T,[B,e("div",R,[e("div",J,[L,t(y,{value:b.value,rows:5,paginator:!0,responsiveLayout:"scroll"},{default:l(()=>[t(n,{style:{width:"15%"}},{header:l(()=>[r(" Imagem ")]),body:l(s=>[e("img",{src:"demo/images/product/"+s.data.image,alt:s.data.image,width:"50",height:"40",class:"shadow-2"},null,8,M)]),_:1}),t(n,{field:"name",header:"Nome",sortable:!0,style:{width:"35%"}}),t(n,{field:"price",header:"Valor",sortable:!0,style:{width:"35%"}},{body:l(s=>[r(N(v(s.data.price)),1)]),_:1}),t(n,{style:{width:"15%"}},{header:l(()=>[r(" Detalhar ")]),body:l(()=>[t(m,{icon:"pi pi-search",type:"button",class:"p-button-text"})]),_:1})]),_:1},8,["value"])])]),e("div",S,[e("div",$,[Y,t(_,{type:"line",data:x,options:o.value},null,8,["data","options"])]),e("div",q,[e("div",E,[O,e("div",null,[t(m,{icon:"pi pi-ellipsis-v",class:"p-button-text p-button-plain p-button-rounded",onClick:d[0]||(d[0]=s=>a.$refs.menu1.toggle(s))}),t(w,{ref:"menu1",popup:!0,model:f.value},null,8,["model"])])]),z])])])}}};export{K as default};