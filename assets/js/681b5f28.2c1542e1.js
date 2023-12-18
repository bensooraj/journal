"use strict";(self.webpackChunkjournal=self.webpackChunkjournal||[]).push([[171],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>h});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(r),m=o,h=p["".concat(s,".").concat(m)]||p[m]||f[m]||a;return r?n.createElement(h,i(i({ref:t},u),{},{components:r})):n.createElement(h,i({ref:t},u))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3991:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const a={sidebar_position:8},i="Final version",l={unversionedId:"byo-terraform-vultr/final-version",id:"byo-terraform-vultr/final-version",title:"Final version",description:"The proof-of-concept terraform-like IaC tool for Vultr is now complete. The goal was to understand HCL parsing, partial evaluation, resource creation etc. I do have a basic understanding now. Following is a brief video that showcases just that,",source:"@site/docs/2-byo-terraform-vultr/8-final-version.md",sourceDirName:"2-byo-terraform-vultr",slug:"/byo-terraform-vultr/final-version",permalink:"/docs/byo-terraform-vultr/final-version",draft:!1,tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"tutorialSidebar",previous:{title:"Decoding using Spec",permalink:"/docs/byo-terraform-vultr/decoding-using-Spec"}},s={},c=[{value:"Resources",id:"resources",level:2},{value:"Pull request/Commits",id:"pull-requestcommits",level:2}],u={toc:c},p="wrapper";function f(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"final-version"},"Final version"),(0,o.kt)("p",null,"The proof-of-concept terraform-like IaC tool for Vultr is now complete. The goal was to understand HCL parsing, partial evaluation, resource creation etc. I do have a basic understanding now. Following is a brief video that showcases just that,"),(0,o.kt)("admonition",{type:"danger"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("strong",{parentName:"p"},"I won't be continuing this series."))),(0,o.kt)("h2",{id:"resources"},"Resources"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://hcl.readthedocs.io/en/latest/index.html"},"HCL Config Language Toolkit")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://blog.devgenius.io/build-your-own-dsl-with-go-hcl-602c92ce24c0"},"Build your own DSL with Go & HCL"),"\ni. ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/wesovilabs"},"wesovilabs/orion")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://rotemtam.com/2022/08/06/configuration-languages-with-hcl/"},"Creating Terraform-like configuration languages with HCL and Go")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/hashicorp/terraform"},"hashicorp/terraform"),"\ni. ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/hashicorp/terraform/blob/main/internal/configs/configschema/schema.go"},"internal/configs/configschema/schema.go"),"\nii. ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/hashicorp/terraform/blob/main/internal/configs/depends_on.go"},"internal/configs/depends_on.go"))),(0,o.kt)("h2",{id:"pull-requestcommits"},"Pull request/Commits"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/bensooraj/griffon/pull/8/files"},"PR | Final version"))))}f.isMDXComponent=!0}}]);