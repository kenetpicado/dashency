import{d as B,r as l,s as d,a as n,z as u,H as v}from"./index-CLiKuHAO.js";const g=B("batch",()=>{const s=l({data:[],current:1,pages:1}),c=l();function h(t){s.value=t}function i(t){if(c.value=t,t.packages){const o=t.packages.sort((r,f)=>r.guide.localeCompare(f.guide));c.value.packages=o}}return{batches:s,setBatches:h,batch:c,setBatch:i}});function k(){const{setBatches:s,setBatch:c}=g(),{batches:h,batch:i}=d(g()),t=l(!1),o=l({type:"",code:"",page:1});function r(){const a=Object.fromEntries(Object.entries(o.value).filter(([e,p])=>p));n.get("/batches",{params:a}).then(e=>{s(e.data)}).catch(e=>{console.log(e)})}function f(a){n.get("/batches/"+a).then(e=>{c(e.data)}).catch(e=>{console.log(e)})}function b(a,e){t.value=!0,n.post("/batches",a).then(()=>{e(),u.success("Lote creado correctamente"),v.push({name:"batches"})}).catch(p=>{console.log(p)}).finally(()=>{t.value=!1})}function m(a,e){if(!a.total){u.error("El campo total es requerido");return}if(!a.type){u.error("El campo tipo es requerido");return}t.value=!0,n.put("/batches/"+a.id,a).then(()=>{e(),u.success("Lote actualizado correctamente"),r()}).finally(()=>{t.value=!1})}return{getBatches:r,getBatch:f,batches:h,batch:i,processing:t,storeBatch:b,updateBatch:m,queryParams:o}}export{k as u};
