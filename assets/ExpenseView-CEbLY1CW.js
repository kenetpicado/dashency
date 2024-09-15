import{d as I,r as m,s as M,a as T,z as g,b as P,o as z,w as F,e as p,i as t,l as r,m as f,t as O,_ as G,f as c,n as A,T as W,F as E,j as i,q as $,g as S,x as d,k as L,h as V,p as Z,bW as H,v as J,y as K,I as Q}from"./index-CLiKuHAO.js";import{_ as b}from"./InputForm.vue_vue_type_script_setup_true_lang-D4OBlM8i.js";import{_ as X}from"./PaginationComponent.vue_vue_type_script_setup_true_lang-CoxX_4IN.js";const R=I("expense",()=>{const h=m({data:[],pages:1,current:1});function x(a){h.value=a}return{expenses:h,setExpenses:x}});function Y(){const{setExpenses:h}=R(),{expenses:x}=M(R()),a=m(!1),_=m({concept:"",page:1});function y(){const u=Object.fromEntries(Object.entries(_.value).filter(([l,n])=>n));T.get("/expenses",{params:u}).then(l=>{h(l.data)}).catch(l=>{console.log(l)})}function C(u,l){a.value=!0,T.post("/expenses",u).then(()=>{l(),y(),g.success("Registro creado correctamente")}).catch(n=>{var s;g.error(((s=n.response.data)==null?void 0:s.message)||"Error al crear el registro")}).finally(()=>{a.value=!1})}function k(u,l){a.value=!0,T.put("/expenses/"+u.id,u).then(()=>{l(),g.success("Registro actualizado correctamente"),y()}).catch(n=>{var s;g.error(((s=n.response.data)==null?void 0:s.message)||"Error al crear el registro")}).finally(()=>{a.value=!1})}return{getExpenses:y,expenses:x,processing:a,storeExpense:C,updateExpense:k,queryParams:_}}const U=["TRANSPORTE","COMBUSTIBLE","LUZ","AGUA","INTERNET","IMPUESTO DE RENTA"],ee={class:"flex items-center justify-between mb-8 h-14"},te=t("span",{class:"font-bold text-2xl"},"Gastos",-1),se=t("option",{value:""},"Otro",-1),oe=["value"],ne={class:"grid grid-cols-2 gap-4"},ae={class:"text-xl font-bold mb-4 text-edo-950"},le={class:"flex justify-end gap-4"},ue={class:"grid grid-cols-4 gap-4 mb-4"},re=t("option",{value:""},"Todos",-1),ce=["value"],ie=t("th",null,"Usuario",-1),de=t("th",null,"Fecha",-1),pe=t("th",null,"Concepto",-1),ve=t("th",null,"Cantidad",-1),fe=t("th",null,"Costo",-1),_e=t("th",null,"Total",-1),me=t("th",null,"Acciones",-1),ge={key:0},xe=t("td",{colspan:"7",class:"text-center"},"No hay datos que mostrar",-1),he=[xe],ye={key:0,class:"text-sm text-gray-500"},Ee={class:"flex gap-4"},Ve=["onClick"],Te=P({__name:"ExpenseView",setup(h){const{getExpenses:x,expenses:a,queryParams:_,processing:y,storeExpense:C,updateExpense:k}=Y(),u=m(!1),l=m(!1),n=m("");z(()=>{x()});const s=m({id:"",concept:"",description:"",quantity:1,cost:0}),q=()=>{u.value=!1,n.value="",l.value=!1,s.value={concept:"",description:"",quantity:1,cost:0}};function w(){if(!s.value.concept&&!n.value){g.error("El concepto es requerido");return}if(!s.value.quantity){g.error("La cantidad es requerida");return}if(!s.value.cost){g.error("El costo es requerido");return}n.value&&(s.value.concept=n.value),l.value?k(s.value,()=>q()):C(s.value,()=>q())}F(_.value,()=>x(),{debounce:500,maxWait:1e3});function B(v){s.value={...v},U.includes(v.concept)?n.value=v.concept:(n.value="",s.value.concept=v.concept),l.value=!0,u.value=!0}function j(v){v!=a.value.current&&(_.value.page=v)}return(v,o)=>(i(),p(E,null,[t("header",ee,[te,r(O,{onClick:o[0]||(o[0]=e=>u.value=!0)},{default:f(()=>[$(" Nuevo ")]),_:1})]),r(G,{title:"Gasto",isOpen:u.value,onOnClose:o[7]||(o[7]=e=>u.value=!1)},{default:f(()=>[t("form",{onSubmit:o[6]||(o[6]=H(e=>w(),["prevent"]))},[r(A,{text:"Concepto",name:"concept",modelValue:n.value,"onUpdate:modelValue":o[1]||(o[1]=e=>n.value=e)},{default:f(()=>[se,(i(!0),p(E,null,S(c(U),e=>(i(),p("option",{value:e,key:e},d(e),9,oe))),128))]),_:1},8,["modelValue"]),n.value?V("",!0):(i(),L(b,{key:0,text:"Especificar concepto",name:"concept",modelValue:s.value.concept,"onUpdate:modelValue":o[2]||(o[2]=e=>s.value.concept=e)},null,8,["modelValue"])),r(b,{text:"Descripción (Opcional)",name:"description",modelValue:s.value.description,"onUpdate:modelValue":o[3]||(o[3]=e=>s.value.description=e)},null,8,["modelValue"]),t("div",ne,[r(b,{text:"Cantidad",name:"quantity",modelValue:s.value.quantity,"onUpdate:modelValue":o[4]||(o[4]=e=>s.value.quantity=e),type:"number"},null,8,["modelValue"]),r(b,{text:"Costo",name:"cost",modelValue:s.value.cost,"onUpdate:modelValue":o[5]||(o[5]=e=>s.value.cost=e),type:"number"},null,8,["modelValue"])]),t("div",ae," $"+d((s.value.quantity*s.value.cost).toLocaleString()),1),t("div",le,[r(Z,{onClick:q},{default:f(()=>[$("Cancelar")]),_:1}),r(O,{type:"submit",loading:c(y)},{default:f(()=>[$(d(l.value?"Actualizar":"Guardar"),1)]),_:1},8,["loading"])])],32)]),_:1},8,["isOpen"]),t("div",ue,[r(A,{text:"Concepto",name:"concept",modelValue:c(_).concept,"onUpdate:modelValue":o[8]||(o[8]=e=>c(_).concept=e)},{default:f(()=>[re,(i(!0),p(E,null,S(c(U),e=>(i(),p("option",{value:e,key:e},d(e),9,ce))),128))]),_:1},8,["modelValue"])]),r(W,null,{header:f(()=>[ie,de,pe,ve,fe,_e,me]),body:f(()=>[c(a).data.length?V("",!0):(i(),p("tr",ge,he)),(i(!0),p(E,null,S(c(a).data,(e,D)=>{var N;return i(),p("tr",{key:D,class:"hover:bg-gray-50"},[t("td",null,[e.user?(i(),L(J,{key:0,item:e.user},null,8,["item"])):V("",!0)]),t("td",null,d(c(K)(e.createdAt)),1),t("td",null,[t("div",null,d(e.concept),1),e.description?(i(),p("div",ye,d(e.description),1)):V("",!0)]),t("td",null,d(e.quantity),1),t("td",null,"$"+d(e.cost.toLocaleString()),1),t("td",null,"$"+d((N=e.total)==null?void 0:N.toLocaleString()),1),t("td",null,[t("div",Ee,[t("button",{type:"button",onClick:be=>B(e)},[r(c(Q),{size:"20"})],8,Ve)])])])}),128))]),_:1}),r(X,{pages:c(a).pages,page:c(a).current,onSelected:j},null,8,["pages","page"])],64))}});export{Te as default};