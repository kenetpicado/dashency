import{b as k,o as v,w as B,e as c,i as t,m as n,n as u,f as a,p as T,T as w,F as i,k as s,x as C,v as N,R as h,g as f,t as l,h as _,l as $,y as F,j as A}from"./index-DoD9Z4gP.js";import{u as U}from"./useBilling-ejc6_fVn.js";import{I as D}from"./IconEye-D_u7bKNA.js";import{_ as g}from"./InputForm.vue_vue_type_script_setup_true_lang-BoxpC0zP.js";import{_ as R}from"./PaginationComponent.vue_vue_type_script_setup_true_lang-DvnRgicT.js";import{u as j}from"./useAccount-BYbPGXBO.js";import"./query-params-C5SC1Cld.js";const q={class:"flex items-center justify-between mb-8 h-14"},E=t("span",{class:"font-bold text-2xl"},"Facturación",-1),I={class:"grid grid-cols-4 gap-4 mb-4"},L=t("option",{value:""},"Todos",-1),P=["value"],S=t("th",null,"Usuario",-1),z=t("th",null,"Fecha",-1),M=t("th",null,"Referencia",-1),W=t("th",null,"Cliente",-1),G=t("th",null,"Total",-1),H=t("th",null,"Acciones",-1),J={key:0},K=t("td",{colspan:"6",class:"text-center"},"No hay datos que mostrar",-1),O=[K],Q={key:0},X={class:"text-gray-400 text-sm"},Y={class:"flex gap-4"},ce=k({__name:"BillingView",setup(Z){const{getBilling:p,billing:d,queryParams:o}=U(),{accounts:y,getAccounts:b}=j();v(()=>{p(),b()}),B(o.value,()=>p(),{debounce:500,maxWait:1e3});function x(m){o.value.page=m*1}return(m,r)=>(s(),c(i,null,[t("header",q,[E,n(a(h),{to:{name:"billing.create"}},{default:u(()=>[n(C,null,{default:u(()=>[N(" Nueva ")]),_:1})]),_:1})]),t("div",I,[n(T,{text:"Banco",name:"bank",modelValue:a(o).account,"onUpdate:modelValue":r[0]||(r[0]=e=>a(o).account=e)},{default:u(()=>[L,(s(!0),c(i,null,f(a(y),e=>(s(),c("option",{value:e.id,key:e.id},l(e.type)+" - "+l(e.number),9,P))),128))]),_:1},8,["modelValue"]),n(g,{text:"Código o referencia",name:"reference",modelValue:a(o).reference,"onUpdate:modelValue":r[1]||(r[1]=e=>a(o).reference=e),type:"search",placeholder:"Buscar código o referencia"},null,8,["modelValue"]),n(g,{text:"Cliente",name:"client",modelValue:a(o).client,"onUpdate:modelValue":r[2]||(r[2]=e=>a(o).client=e),type:"search",placeholder:"Buscar cliente"},null,8,["modelValue"])]),n(w,null,{header:u(()=>[S,z,M,W,G,H]),body:u(()=>[a(d).data.length?_("",!0):(s(),c("tr",J,O)),(s(!0),c(i,null,f(a(d).data,(e,V)=>(s(),c("tr",{key:V,class:"hover:bg-gray-50"},[t("td",null,[e.user&&typeof e.user!="string"?(s(),$(F,{key:0,item:e.user},null,8,["item"])):_("",!0)]),t("td",null,l(a(A)(e.createdAt)),1),t("td",null,[e.account&&typeof e.account!="string"?(s(),c("span",Q,l(e.account.type)+": "+l(e.account.number),1)):_("",!0),t("div",X,l(e.reference),1)]),t("td",null,l(e.client),1),t("td",null,"$"+l(e.total),1),t("td",null,[t("div",Y,[n(a(h),{to:{name:"billing.show",params:{id:e.id}}},{default:u(()=>[n(a(D),{size:"20"})]),_:2},1032,["to"])])])]))),128))]),_:1}),n(R,{pages:a(d).pages,page:a(d).current,onSelected:x},null,8,["pages","page"])],64))}});export{ce as default};
