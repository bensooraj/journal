"use strict";(self.webpackChunkjournal=self.webpackChunkjournal||[]).push([[171],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=o.createContext({}),c=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(r),m=n,d=p["".concat(s,".").concat(m)]||p[m]||f[m]||a;return r?o.createElement(d,i(i({ref:t},u),{},{components:r})):o.createElement(d,i({ref:t},u))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:n,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3991:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var o=r(7462),n=(r(7294),r(3905));const a={sidebar_position:8},i="Final version",l={unversionedId:"byo-terraform-vultr/final-version",id:"byo-terraform-vultr/final-version",title:"Final version",description:"The proof-of-concept terraform-like IaC tool for Vultr is now complete. The goal was to understand HCL parsing, partial evaluation, resource creation etc. I do have a basic understanding now. Following is a brief video that showcases just that,",source:"@site/docs/2-byo-terraform-vultr/8-final-version.md",sourceDirName:"2-byo-terraform-vultr",slug:"/byo-terraform-vultr/final-version",permalink:"/docs/byo-terraform-vultr/final-version",draft:!1,tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"tutorialSidebar",previous:{title:"Decoding using Spec",permalink:"/docs/byo-terraform-vultr/decoding-using-Spec"}},s={},c=[{value:"Resources",id:"resources",level:2},{value:"Pull request/Commits",id:"pull-requestcommits",level:2}],u={toc:c},p="wrapper";function f(e){let{components:t,...r}=e;return(0,n.kt)(p,(0,o.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"final-version"},"Final version"),(0,n.kt)("p",null,"The proof-of-concept terraform-like IaC tool for Vultr is now complete. The goal was to understand HCL parsing, partial evaluation, resource creation etc. I do have a basic understanding now. Following is a brief video that showcases just that,"),(0,n.kt)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/pMChGOwHOc8?si=dtY80cKgX1DFsxPN&controls=0",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"I won't be continuing this series anymore."))),(0,n.kt)("h2",{id:"resources"},"Resources"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://hcl.readthedocs.io/en/latest/index.html"},"HCL Config Language Toolkit")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://blog.devgenius.io/build-your-own-dsl-with-go-hcl-602c92ce24c0"},"Build your own DSL with Go & HCL"),"\ni. ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/wesovilabs"},"wesovilabs/orion")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://rotemtam.com/2022/08/06/configuration-languages-with-hcl/"},"Creating Terraform-like configuration languages with HCL and Go")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/hashicorp/terraform"},"hashicorp/terraform"),"\ni. ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/hashicorp/terraform/blob/main/internal/configs/configschema/schema.go"},"internal/configs/configschema/schema.go"),"\nii. ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/hashicorp/terraform/blob/main/internal/configs/depends_on.go"},"internal/configs/depends_on.go"))),(0,n.kt)("h2",{id:"pull-requestcommits"},"Pull request/Commits"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/bensooraj/griffon/pull/8/files"},"PR | Final version"))))}f.isMDXComponent=!0}}]);