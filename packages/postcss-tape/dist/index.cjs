"use strict";var e=require("fs"),n=require("path"),o=require("postcss"),t=require("postcss-8.4"),s=require("postcss-html"),r=require("assert");const noopPlugin=()=>({postcssPlugin:"noop-plugin",Rule(){}});noopPlugin.postcss=!0;const c="----------------------------------------";function formatCSSAssertError(e,n,o,t=!1){let s="";if(s+=`\n${e}\n\n`,n.message&&(s+=`message :\n  ${n.message}\n\n`),n.options)try{s+=`options :\n${JSON.stringify(n.options,null,2)}\n\n`}catch(e){}return s+=`output changed :\n${prettyDiff(o.message)}\n`,t||(s+="\n"+c),s}function formatWarningsAssertError(e,n,o,t,s=!1){let r="";if(r+=`\n${e}\n\n`,n.message&&(r+=`message :\n  ${n.message}\n\n`),n.options)try{r+=`options :\n${JSON.stringify(n.options,null,2)}\n\n`}catch(e){}return r+=`unexpected or missing warnings :\n+ actual ${o.length}\n- expected ${t}\n`,s||(o.forEach((e=>{r+=`\n[${e.plugin}]: ${e.text}`})),o.length&&(r+="\n"),r+="\n"+c),r}function prettyDiff(e){return e.replace(/[^\\](\\n)/gm,((e,n)=>e.replace(n," "))).replace(/(\\t)/gm,((e,n)=>e.replace(n," "))).replace(/\+$/gm,"").replace(/^Expected values to be strictly equal:\n/,"")}function formatGitHubActionAnnotation(e,o="error",t={}){let s="::"+o;const r=Object.keys(t).map((e=>{let o=String(t[e]);return"file"===e&&process.env.GITHUB_WORKSPACE&&(o=n.relative(process.env.GITHUB_WORKSPACE,n.resolve(o))),`${e}=${s=o,s.replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/]/g,"%5D").replace(/;/g,"%3B")}`;var s})).join(",");return r&&(s+=` ${r}`),`${s}::${c=e||"",c.replace(/\r/g,"%0D").replace(/\n/g,"%0A")}`;var c}function reduceInformationInCssSyntaxError(e){process.env.DEBUG||(delete e.source,e.input&&delete e.input.source,delete e.postcssNode)}const i=process.env.GITHUB_ACTIONS&&"true"===process.env.ENABLE_ANNOTATIONS_FOR_NODE&&"true"===process.env.ENABLE_ANNOTATIONS_FOR_OS;function postcssSyntax(e){return e.postcssSyntaxHTML?s():null}const a={postcssPlugin:"declaration-cloner",Declaration(e){"to-clone"===e.prop&&e.cloneBefore({prop:"cloned"})}},l={postcssPlugin:"rule-cloner",prepare(){const e=new WeakSet;return{RuleExit(n){e.has(n)||"to-clone"===n.selector&&(e.add(n),n.cloneBefore({selector:"cloned"}))}}}},p={postcssPlugin:"at-rule-cloner",prepare(){const e=new WeakSet;return{AtRuleExit(n){if(!e.has(n))return"to-clone"===n.params?(e.add(n),void n.cloneBefore({params:"cloned"})):"to-clone"===n.name?(e.add(n),void n.cloneBefore({name:"cloned"})):void 0}}}};exports.atRuleClonerPlugin=p,exports.declarationClonerPlugin=a,exports.postcssTape=function postcssTape(s){let a=!1;{!0!==s.postcss&&(a=!0,i?console.log(formatGitHubActionAnnotation('postcss flag not set to "true" on exported plugin object',"error",{file:"./package.json",line:1,col:1})):console.error(`\npostcss flag not set to "true"\n\n${c}`));const n=s();n.postcssPlugin&&"string"==typeof n.postcssPlugin||(a=!0,i?console.log(formatGitHubActionAnnotation('plugin name not set via "postcssPlugin"',"error",{file:"./package.json",line:1,col:1})):console.error(`\nplugin name not set via "postcssPlugin"\n\n${c}`));const o=JSON.parse(e.readFileSync("./package.json").toString()),t=["css-has-pseudo","css-blank-pseudo","css-prefers-color-scheme","@csstools/css-has-pseudo-experimental"].includes(o.name);let r=o.name;if(r.startsWith("@")){r=o.name.split("/").slice(1).join("/")}r.startsWith("postcss-")||t||(a=!0,i?console.log(formatGitHubActionAnnotation('plugin name in package.json does not start with "postcss-"',"error",{file:"./package.json",line:1,col:1})):console.error(`\nplugin name in package.json does not start with "postcss-"\n\n${c}`)),Object.keys(Object(o.dependencies)).includes("postcss")&&!("postcssTapeSelfTest"in s)&&(a=!0,i?console.log(formatGitHubActionAnnotation("postcss should only be a peer and/or dev dependency","error",{file:"./package.json",line:1,col:1})):console.error(`\npostcss should only be a peer and/or dev dependency\n\n${c}`))}return async l=>{const p=new Set;for(const u in l){const g=l[u];g.before&&await g.before();const f=n.join(".","test",u.split(":")[0]),d=n.join(".","test",u.replace(/:/g,"."));let m="css";g.postcssSyntaxHTML&&(m="html");const S=`${f}.${m}`;let A=`${d}.expect.${m}`,$=`${d}.result.${m}`;g.expect&&(A=n.join(".","test",g.expect)),g.result&&($=n.join(".","test",g.result));const h=g.plugins??[s(g.options)],w=await e.promises.readFile(S,"utf8");let x,y="";try{y=await e.promises.readFile(A,"utf8")}catch(e){a=!0,y=!1,i?console.log(formatGitHubActionAnnotation(`${u}\n\nmissing or broken "expect" file: "${n.parse(A).base}"`,"error",{file:S,line:1,col:1})):(p.add(u),console.error(`\n${u}\n\nmissing or broken "expect" file: "${n.parse(A).base}"\n\n${c}`))}let b=!1;try{x=await o(h).process(w,{from:S,to:$,map:{inline:!1,annotation:!1},syntax:postcssSyntax(g)})}catch(e){if(reduceInformationInCssSyntaxError(e),b=!0,g.exception&&g.exception.test(e.message))continue;throw e}!b&&g.exception&&(a=!0,i?console.log(formatGitHubActionAnnotation(`${u}\n\nexpected an exception but got none`,"error",{file:S,line:1,col:1})):(p.add(u),console.error(`\n${u}\n\nexpected an exception but got none\n\n${c}`)));const E=x.css.toString();if(await e.promises.writeFile($,E,"utf8"),process.env.REWRITE_EXPECTS&&e.promises.writeFile(A,E,"utf8"),!1!==y){try{r.strict.strictEqual(E,y)}catch(e){a=!0,i?console.log(formatGitHubActionAnnotation(formatCSSAssertError(u,g,e,!0),"error",{file:A,line:1,col:1})):(p.add(u),console.error(formatCSSAssertError(u,g,e)))}try{if(!g.postcssSyntaxHTML&&x.map.toJSON().sources.includes("<no source>"))throw new Error("Sourcemap is broken")}catch(e){a=!0;const n='\nThis is most likely a newly created PostCSS AST Node without a value for "source".\nsee :\n- https://github.com/postcss/postcss/blob/main/docs/guidelines/plugin.md#24-set-nodesource-for-new-nodes\n- https://postcss.org/api/#node-source';i?console.log(formatGitHubActionAnnotation(`${u}\n\nbroken source map: ${JSON.stringify(x.map.toJSON().sources)}\n${n}`,"error",{file:S,line:1,col:1})):(p.add(u),console.error(`\n${u}\n\nbroken source map: ${JSON.stringify(x.map.toJSON().sources)}\n${n}\n\n${c}`))}g.after&&await g.after();try{const n=await e.promises.readFile($,"utf8");if((await o([noopPlugin()]).process(n,{from:$,to:$,map:{inline:!1,annotation:!1},syntax:postcssSyntax(g)})).warnings().length)throw new Error("Unexpected warnings on second pass")}catch(e){a=!0,i?console.log(formatGitHubActionAnnotation(`${u}\n\nresult was not parsable with PostCSS.`,"error",{file:A,line:1,col:1})):(p.add(u),console.error(`\n${u}\n\nresult was not parsable with PostCSS.\n\n${c}`))}if(o([noopPlugin()]).version!==t([noopPlugin()]).version){const e=await t(h).process(w,{from:S,to:$,map:{inline:!1,annotation:!1}});try{r.strict.strictEqual(e.css.toString(),E)}catch(e){reduceInformationInCssSyntaxError(e),a=!0,i?console.log(formatGitHubActionAnnotation("testing older PostCSS:\n"+formatCSSAssertError(u,g,e,!0),"error",{file:A,line:1,col:1})):(p.add(u),console.error("testing older PostCSS:\n"+formatCSSAssertError(u,g,e)))}}try{(x.warnings().length||g.warnings)&&r.strict.strictEqual(x.warnings().length,g.warnings)}catch(e){a=!0,i?console.log(formatGitHubActionAnnotation(formatWarningsAssertError(u,g,x.warnings(),g.warnings??0,!0),"error",{file:A,line:1,col:1})):(p.add(u),console.error(formatWarningsAssertError(u,g,x.warnings(),g.warnings??0)))}}}if(p.size){console.error("\nunexpected failures:");for(const e of p.values())console.error("  - "+e)}a&&process.exit(1),console.warn("pass "+s().postcssPlugin)}},exports.ruleClonerPlugin=l;