import{b as O,o as A,r as y,w as R,e as r,l as o,m as n,_ as $,i as e,f as s,n as V,T as B,F as m,j as d,p as w,q as f,t as b,h,R as x,g as N,k as U,v as q,x as c,y as S,I as F,z as j}from"./index-CLiKuHAO.js";import{u as z}from"./useBatch-B5QhQAog.js";import{I as D}from"./IconEye-Cfh1mJmK.js";import{_ as v}from"./InputForm.vue_vue_type_script_setup_true_lang-D4OBlM8i.js";import{_ as L}from"./PaginationComponent.vue_vue_type_script_setup_true_lang-CoxX_4IN.js";const P=e("option",{value:""},"Selecciona un tipo",-1),G=e("option",{value:"AEREO"},"AEREO",-1),W=e("option",{value:"MARITIMO"},"MARITIMO",-1),H={class:"flex justify-end gap-4"},J={class:"flex items-center justify-between mb-8 h-14"},K=e("span",{class:"font-bold text-2xl"},"Lotes",-1),Q={class:"grid grid-cols-4 gap-4 mb-4"},X=e("option",{value:""},"Selecciona un tipo",-1),Y=e("option",{value:"AEREO"},"AEREO",-1),Z=e("option",{value:"MARITIMO"},"MARITIMO",-1),ee=e("th",null,"Usuario",-1),te=e("th",null,"Fecha",-1),oe=e("th",null,"Tipo",-1),ae=e("th",null,"Código o referencia",-1),le=e("th",null,"Paquetes",-1),se=e("th",null,"Total",-1),ne=e("th",null,"Acciones",-1),ue={key:0},de=e("td",{colspan:"7",class:"text-center"},"No hay datos que mostrar",-1),ie=[de],re={class:"flex gap-4"},ce=["onClick"],ye=O({__name:"BatchView",setup(_e){const{getBatches:g,batches:_,processing:T,updateBatch:k,queryParams:u}=z();A(()=>g());const a=y(null),i=y(!1);function I(p){a.value={...p},i.value=!0}function C(){if(a.value){if(!a.value.type||!a.value.code||!a.value.total)return j.error("Todos los campos son requeridos");k(a.value,()=>{i.value=!1,a.value=null})}}R(u.value,()=>g(),{debounce:500,maxWait:1e3});function E(p){u.value.page=p*1}return(p,l)=>(d(),r(m,null,[o($,{title:"Editar",isOpen:i.value,onOnClose:l[4]||(l[4]=t=>i.value=!1)},{default:n(()=>[a.value?(d(),r(m,{key:0},[o(v,{text:"Total",name:"total",modelValue:a.value.total,"onUpdate:modelValue":l[0]||(l[0]=t=>a.value.total=t),type:"number"},null,8,["modelValue"]),o(v,{text:"Código o referencia",name:"code",modelValue:a.value.code,"onUpdate:modelValue":l[1]||(l[1]=t=>a.value.code=t)},null,8,["modelValue"]),o(V,{text:"Tipo",name:"type",modelValue:a.value.type,"onUpdate:modelValue":l[2]||(l[2]=t=>a.value.type=t)},{default:n(()=>[P,G,W]),_:1},8,["modelValue"]),e("div",H,[o(w,{onClick:l[3]||(l[3]=t=>i.value=!1)},{default:n(()=>[f("Cancelar")]),_:1}),o(b,{onClick:C,loading:s(T)},{default:n(()=>[f(" Guardar ")]),_:1},8,["loading"])])],64)):h("",!0)]),_:1},8,["isOpen"]),e("header",J,[K,o(s(x),{to:{name:"batches.create"}},{default:n(()=>[o(b,null,{default:n(()=>[f(" Nuevo ")]),_:1})]),_:1})]),e("div",Q,[o(v,{text:"Código o referencia",name:"code",modelValue:s(u).code,"onUpdate:modelValue":l[5]||(l[5]=t=>s(u).code=t),type:"search",placeholder:"Buscar código o referencia"},null,8,["modelValue"]),o(V,{text:"Tipo",name:"type",modelValue:s(u).type,"onUpdate:modelValue":l[6]||(l[6]=t=>s(u).type=t)},{default:n(()=>[X,Y,Z]),_:1},8,["modelValue"])]),o(B,null,{header:n(()=>[ee,te,oe,ae,le,se,ne]),body:n(()=>[s(_).data.length?h("",!0):(d(),r("tr",ue,ie)),(d(!0),r(m,null,N(s(_).data,(t,M)=>(d(),r("tr",{key:M,class:"hover:bg-gray-50"},[e("td",null,[t.user?(d(),U(q,{key:0,item:t.user},null,8,["item"])):h("",!0)]),e("td",null,c(s(S)(t.createdAt)),1),e("td",null,c(t.type=="MARITIMO"?"🚢":"✈️"),1),e("td",null,c(t.code),1),e("td",null,c(t.packages.length),1),e("td",null,"$"+c(t.total),1),e("td",null,[e("div",re,[o(s(x),{to:{name:"batches.show",params:{id:t.id}}},{default:n(()=>[o(s(D),{size:"20"})]),_:2},1032,["to"]),e("button",{type:"button",onClick:pe=>I(t)},[o(s(F),{size:"20"})],8,ce)])])]))),128))]),_:1}),o(L,{pages:s(_).pages,page:s(_).current,onSelected:E},null,8,["pages","page"])],64))}});export{ye as default};