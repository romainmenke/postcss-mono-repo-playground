"use strict";var e=require("@rmenke/postcss-mono-repo-playground--package-a");const creator=o=>{const r=Object.assign({color:null,preserve:!1},o);return console.log(e.identify()),{postcssPlugin:"postcss-mono-repo-playground--plugin-b",Declaration(e){if("purple"===e.value){let o="orange";if(r.color&&(o=r.color),o===e.value)return;if(e.cloneBefore({prop:"color",value:o}),r.preserve)return;e.remove()}}}};creator.postcss=!0,module.exports=creator;