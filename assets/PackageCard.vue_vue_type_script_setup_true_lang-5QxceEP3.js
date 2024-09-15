import{A as r,b as p,j as o,e as i,i as t,q as h,x as s,k as n,f as l,h as c,b_ as g,bg as f}from"./index-yVOrI8SX.js";/**
 * @license @tabler/icons-vue v3.12.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var u=r("outline","arrow-right","IconArrowRight",[["path",{d:"M5 12l14 0",key:"svg-0"}],["path",{d:"M13 18l6 -6",key:"svg-1"}],["path",{d:"M13 6l6 6",key:"svg-2"}]]);/**
 * @license @tabler/icons-vue v3.12.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var y=r("filled","circle-check-filled","IconCircleCheckFilled",[["path",{d:"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z",key:"svg-0"}]]);const k={class:"flex flex-col bg-white border rounded-lg p-4"},_={class:"flex justify-between"},b={class:"flex items-center gap-1 text-lg font-bold text-edo-950"},v={class:"text-gray-400 text-sm"},x={class:"mb-2"},C={class:"text-sm text-gray-400 mb-4 flex-1"},w={class:"flex items-center justify-between"},I={class:"flex items-center gap-2"},A={class:"text-xl text-edo-950"},M=p({__name:"PackageCard",props:{item:{},showIcon:{type:Boolean},icon:{}},emits:["selectedItem"],setup(B,{emit:d}){const m=d;return(e,a)=>(o(),i("div",k,[t("div",_,[t("span",b,[h(s(e.item.guide)+" ",1),e.item.status=="FACTURADO"?(o(),n(l(y),{key:0,size:"20",class:"text-green-600"})):c("",!0)]),t("span",v,s(l(g)(e.item.entryDate)),1)]),t("div",x,s(e.item.client),1),t("div",C,s(e.item.description)+" ("+s(e.item.pieces)+")",1),t("div",w,[t("span",null,s(e.item.type=="AEREO"?"✈️":"🚢"),1),t("span",I,[t("span",A,s(e.item.grossWeight)+" lbs",1),e.showIcon?(o(),i("button",{key:0,type:"button",onClick:a[0]||(a[0]=D=>m("selectedItem",e.item)),class:"bg-edo-950 rounded-full p-1 text-white"},[(o(),n(f(e.icon??l(u)),{size:"22"}))])):c("",!0)])])]))}});export{M as _};
