import{_ as k}from"./StatCard.vue_vue_type_script_setup_true_lang-DftuceDv.js";import{u as b}from"./useBatch-B5QhQAog.js";import{b as x,o as y,E as B,e as l,i as c,F as m,g as p,f as r,k as _,v as w,h as f,G as C,j as t,y as $}from"./index-CLiKuHAO.js";import{_ as F}from"./PackageCard.vue_vue_type_script_setup_true_lang-B6JBml4r.js";const j=c("header",{class:"flex items-center justify-between mb-8 h-14"},[c("span",{class:"font-bold text-2xl"},"Detalles")],-1),D={class:"grid grid-cols-4 gap-2 mb-4"},E={class:"mb-4 bg-white p-4 rounded-xl border"},N={key:0,class:"grid grid-cols-2 xl:grid-cols-3 gap-4"},I=x({__name:"BatchShow",setup(T){const g=C(),{getBatch:h,batch:e}=b();y(()=>h(g.params.id));const v=B(()=>{var n,u,a,s,o;return[{title:"Tipo",value:((n=e.value)==null?void 0:n.type)||""},{title:"Total",value:"$ "+((u=e.value)==null?void 0:u.total)||""},{title:"Paquetes",value:((a=e.value)==null?void 0:a.packages.length)||"0"},{title:"Código o referencia",value:((s=e.value)==null?void 0:s.code)||""},{title:"Creado",value:$((o=e.value)==null?void 0:o.createdAt)||""}]});return(n,u)=>{var a,s,o;return t(),l(m,null,[j,c("main",D,[(t(!0),l(m,null,p(v.value,(i,d)=>(t(),_(k,{stat:i,key:d},null,8,["stat"]))),128))]),c("div",E,[(a=r(e))!=null&&a.user?(t(),_(w,{key:0,item:r(e).user},null,8,["item"])):f("",!0)]),(s=r(e))!=null&&s.packages?(t(),l("div",N,[(t(!0),l(m,null,p((o=r(e))==null?void 0:o.packages,(i,d)=>(t(),_(F,{item:i,key:d,showIcon:!1},null,8,["item"]))),128))])):f("",!0)],64)}}});export{I as default};
