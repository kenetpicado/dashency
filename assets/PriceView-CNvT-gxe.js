import{b as T,r as f,o as E,e as d,i as e,m as s,n as l,x as b,_ as w,T as S,F as x,k as c,v as m,q,f as p,t as v,G as z,h as B,g as L,I as M,z as y}from"./index-DoD9Z4gP.js";import{_ as g}from"./InputForm.vue_vue_type_script_setup_true_lang-BoxpC0zP.js";import{u as O}from"./usePrice-DP-vEKvH.js";const U={class:"flex items-center justify-between mb-8 h-14"},j=e("span",{class:"font-bold text-2xl"},"Precios",-1),A={class:"flex justify-end gap-4"},F=e("th",null,"#",-1),G=e("th",null,"Tipo",-1),I=e("th",null,"Valor",-1),D=e("th",null,"Acciones",-1),Y={key:0},H=e("td",{colspan:"4",class:"text-center"},"No hay datos que mostrar",-1),J=[H],K={class:"flex gap-4"},Q=["onClick"],ae=T({__name:"PriceView",setup(R){const{getPrices:V,prices:_,storePrice:C,processing:k,updatePrice:P,destroyPrice:W}=O(),r=f(!1),u=f(!1);E(()=>{V()});const t=f({id:"",type:"",value:0}),i=()=>{r.value=!1,u.value=!1,t.value={id:"",type:"",value:0}};function $(){if(!t.value.type){y.error("El tipo es requerido");return}t.value.type=t.value.type.trim().toLocaleUpperCase();const n=_.value.find(a=>a.type===t.value.type);if(n&&n.id!==t.value.id){y.error("Ya existe un precio con este tipo");return}if(t.value.value<1){y.error("El precio debe ser mayor a 0");return}u.value?P(t.value,()=>i()):C(t.value,()=>i())}function N(n){t.value={...n},u.value=!0,r.value=!0}return(n,a)=>(c(),d(x,null,[e("header",U,[j,s(b,{onClick:a[0]||(a[0]=o=>r.value=!0)},{default:l(()=>[m(" Nuevo ")]),_:1})]),s(w,{title:"Precio",isOpen:r.value,onOnClose:i},{default:l(()=>[e("form",{onSubmit:a[3]||(a[3]=z(o=>$(),["prevent"]))},[s(g,{text:"Tipo",name:"type",modelValue:t.value.type,"onUpdate:modelValue":a[1]||(a[1]=o=>t.value.type=o)},null,8,["modelValue"]),s(g,{text:"Precio",name:"value",modelValue:t.value.value,"onUpdate:modelValue":a[2]||(a[2]=o=>t.value.value=o),type:"number"},null,8,["modelValue"]),e("div",A,[s(q,{onClick:i},{default:l(()=>[m("Cancelar")]),_:1}),s(b,{type:"submit",loading:p(k)},{default:l(()=>[m(v(u.value?"Actualizar":"Guardar"),1)]),_:1},8,["loading"])])],32)]),_:1},8,["isOpen"]),s(S,null,{header:l(()=>[F,G,I,D]),body:l(()=>[p(_).length?B("",!0):(c(),d("tr",Y,J)),(c(!0),d(x,null,L(p(_),(o,h)=>(c(),d("tr",{key:h,class:"hover:bg-gray-50"},[e("td",null,v(h+1),1),e("td",null,v(o.type),1),e("td",null,"$"+v(o.value.toLocaleString()),1),e("td",null,[e("div",K,[e("button",{type:"button",onClick:X=>N(o)},[s(p(M),{size:"20"})],8,Q)])])]))),128))]),_:1})],64))}});export{ae as default};
