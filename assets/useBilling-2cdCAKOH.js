import{d as B,r as i,s as h,a as s,z as v,H as y}from"./index-CLiKuHAO.js";import{c as g}from"./query-params-C5SC1Cld.js";const u=B("billing",()=>{const a=i({data:[],pages:1,current:1}),l=i();function o(t){a.value=t}function c(t){l.value=t}return{billing:a,setBilling:o,bill:l,setBill:c}});function D(){const{setBilling:a,setBill:l}=u(),{billing:o,bill:c}=h(u()),t=i(!1),r=i({date:"",reference:"",client:"",bank:"",page:1,timezoneOffset:new Date().getTimezoneOffset()});function f(){const n=g(r.value);s.get("/billing",{params:n}).then(e=>{a(e.data)}).catch(e=>{console.log(e)})}async function m(){const n=g(r.value);await s.get("/billing-day",{params:n}).then(e=>{const d={data:e.data,pages:1,current:1};a(d)}).catch(e=>{console.log(e)})}function p(n){s.get("/billing/"+n).then(e=>{l(e.data)}).catch(e=>{console.log(e)})}function b(n){t.value=!0,s.post("/billing",n).then(()=>{v.success("Factura creada correctamente"),y.push({name:"billing"})}).finally(()=>{t.value=!1})}return{getBilling:f,billing:o,processing:t,storeBilling:b,queryParams:r,getBill:p,bill:c,getBillingDay:m}}export{D as u};
