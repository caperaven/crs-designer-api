var o=class{constructor(){this._schemas={},crsbinding.events.emitter.on("run-process",this._runProcess.bind(this))}_runProcess(t){return new Promise(async(e,n)=>{let s=t.step.action,i=t.step.args.schema,l=this._schemas[i];if(l==null&&crs.process.fetch!=null&&(l=await crs.process.fetch(t.step),this.add(l)),l==null)throw new Error(`process "${i}" not in registry and not loaded.`);let r=l[s];r.name=s,await g(r,t.parameters);let d=await crs.process.run(t.context,r).catch(u=>{let b=r.aborted==!0?"crs-process-aborted":"crs-process-error";crsbinding.events.emitter.emit(b,{step:r.currentStep,error:u}),t.step.aborted=!0}),c=t.step.args?.target;c!=null&&await crs.process.setValue(c,d,t.context,t.process,t.item),e()})}add(t){this._schemas[t.id]=t}remove(t){delete this._schemas[t.id]}};async function g(a,t){if(t!=null){a.parameters=a.parameters||{};for(let[e,n]of Object.entries(t))a.parameters[e]=n}}var m=class{static run(t,e,n,s,i){return new Promise(async(l,r)=>{e=JSON.parse(JSON.stringify(e)),e.data=e.data||{},e.context=t,e.functions={},e.text=s,e.expCache={},$(i,e),e.bindable==!0&&(crs.intent.binding==null&&await crs.modules.get("binding"),await crs.intent.binding.create_context(null,t,e,null)),await crsbinding.events.emitter.emit("process-starting",e),crsbinding.idleTaskManager.add(async()=>{let d;await w(t,e,n).catch(c=>{e.aborted=!0,r({process:e.name,step:e.currentStep,error:c})}),await this.runStep(e.steps.start,t,e,n).then(async()=>{d=e.result,await this.cleanProcess(e)}).then(()=>l(d)).catch(c=>{e.aborted=!0,r({process:e.name,step:e.currentStep,error:c})})})})}static async runStep(t,e=null,n=null,s=null){if(t==null)return;await f("binding_before",t,e,n,s);let i;if(t.type!=null&&(crs.intent[t.type]==null&&await crs.modules.get(t.type),i=await crs.intent[t.type].perform(t,e,n,s)),t.args?.log!=null){let l=await this.getValue(t.args.log,e,n,s);console.log(l)}if(await f("binding_after",t,e,n,s),n?.aborted!==!0&&t.aborted!==!0){let l=n?.steps?.[t.alt_next_step||t.next_step];if(n!=null&&(n.currentStep=t.next_step),l!=null)return await this.runStep(l,e,n,s)}return i}static async getValue(t,e=null,n=null,s=null){if(typeof t!="string"||t.indexOf("${")==0)return t;if(t=="$context")return e;if(t=="$process")return n;if(t=="$item")return s;if(t.indexOf("$")==-1)return t;if(t.indexOf("$binding")!=-1)return crsbinding.data.getValue(n.parameters.bId,t.replace("$binding.",""));if(t.indexOf("$fn")!=-1&&(t=t.split("$fn").join("")),t=n?.expCache==null?t:y(t,n),t.indexOf("rgb(")!=-1)return t;let i=n?.functions?.[t];if(i==null){let l=t.split("$").join("");i=new Function("context","process","item",`return ${l};`),n!=null&&n.functions!=null&&(n.functions[t]=i)}return i(e,n,s)}static async setValue(t,e,n,s,i){let l;if(t=s?.expCache==null?t:y(t,s),t.indexOf("$binding")!=-1){let d=s.parameters?.bId,c=t.split(".")[1];return crsbinding.data.setProperty(d,c,e)}t.indexOf("$item")!=-1?(l=i,t=t.replace("$item.","")):t.indexOf("$process")!=-1?(l=s,t=t.replace("$process.","")):(l=n,t=t.replace("$context.",""));let r=l;if(t.indexOf(".")==-1)r[t]=await this.getValue(e,n,s,i);else{let d=t.split(".");for(let c=0;c<d.length-1;c++){let u=d[c];r=r[u]=r[u]||{}}e=await this.getValue(e,n,s,i),r[d[d.length-1]]=e}}static async cleanProcess(t){t.bindable==!0&&crsbinding.data.removeObject(t.parameters.bId),await this.cleanObject(t.data),await this.cleanObject(t.functions),delete t.context,delete t.functions,delete t.parameters,delete t.result,delete t.data,delete t.steps,delete t.text,delete t.prefixes,delete t.expCache,await crsbinding.events.emitter.emit("process-ended",t)}static async cleanObject(t){if(t==null)return;let e=Object.keys(t);for(let n of e)delete t[n];return null}};async function f(a,t,e,n,s){crs.intent.binding==null&&await crs.modules.get("binding");let i=t[a];if(i==null||n.parameters?.bId==null)return;let l=Object.keys(i);for(let r of l)await crs.intent.binding.set_property({args:{property:r,value:i[r]}},e,n,s)}async function w(a,t,e){if(t.parameters_def==null)return;t.parameters=t.parameters||{};let n=!0;for(let[s,i]of Object.entries(t.parameters_def))if(i.required===!0&&(t.parameters[s]==null&&i.default!=null&&(t.parameters[s]=await crs.process.getValue(i.default,a,t,e)),n=t.parameters[s]!=null),n===!1)throw t.aborted=!0,t.currentStep="validate process parameters",new Error(`required parameter "${s}" not set or is null`)}function $(a,t){t.prefixes=t.prefixes||{},a!=null&&Object.assign(t.prefixes,a),t.prefixes.$text="$process.text",t.prefixes.$data="$process.data",t.prefixes.$parameters="$process.parameters",t.prefixes.$bId="$process.parameters.bId",t.prefixes.$global="globalThis"}function y(a,t){if(t==null)return a;if(t.expCache[a]!=null)return t.expCache[a];let e=a,n=a.split(".")[0];return t?.prefixes[n]==null||(a=a.split(n).join(t.prefixes[n]),t.expCache[e]=a),a}async function v(a){await crs.modules.add("action",`${a}/action-systems/action-actions.js`),await crs.modules.add("array",`${a}/action-systems/array-actions.js`),await crs.modules.add("binding",`${a}/action-systems/binding-actions.js`),await crs.modules.add("component",`${a}/action-systems/component-actions.js`),await crs.modules.add("condition",`${a}/action-systems/condition-actions.js`),await crs.modules.add("console",`${a}/action-systems/console-actions.js`),await crs.modules.add("cssgrid",`${a}/action-systems/css-grid-actions.js`),await crs.modules.add("data",`${a}/action-systems/data-actions.js`),await crs.modules.add("db",`${a}/action-systems/database-actions.js`),await crs.modules.add("dom",`${a}/action-systems/dom-actions.js`),await crs.modules.add("events",`${a}/action-systems/events-actions.js`),await crs.modules.add("files",`${a}/action-systems/files-actions.js`),await crs.modules.add("fs",`${a}/action-systems/fs-actions.js`),await crs.modules.add("loop",`${a}/action-systems/loop-actions.js`),await crs.modules.add("math",`${a}/action-systems/math-actions.js`),await crs.modules.add("media",`${a}/action-systems/media-actions.js`),await crs.modules.add("module",`${a}/action-systems/module-actions.js`),await crs.modules.add("object",`${a}/action-systems/object-actions.js`),await crs.modules.add("process",`${a}/action-systems/process-actions.js`),await crs.modules.add("random",`${a}/action-systems/random-actions.js`),await crs.modules.add("rest_services",`${a}/action-systems/rest-services-actions.js`),await crs.modules.add("session_storage",`${a}/action-systems/session-storage-actions.js`),await crs.modules.add("local_storage",`${a}/action-systems/local-storage-actions.js`),await crs.modules.add("string",`${a}/action-systems/string-actions.js`),await crs.modules.add("system",`${a}/action-systems/system-actions.js`),await crs.modules.add("translations",`${a}/action-systems/translations-actions.js`),await crs.modules.add("validate",`${a}/action-systems/validate-actions.js`),await crs.modules.add("fixed_layout",`${a}/action-systems/fixed-layout-actions.js`),crs.dom=(await crs.modules.get("dom")).DomActions}globalThis.crs=globalThis.crs||{};globalThis.crs.intent={};globalThis.crs.processSchemaRegistry=new o;globalThis.crs.process=m;globalThis.crs.AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;globalThis.crs.call=async(a,t,e,n,s,i)=>{crs.intent[a]==null&&await crs.modules.get(a);let l=crs.intent[a];return l[t]==null?await l.perform({action:t,args:e},n,s,i):await l[t]({args:e},n,s,i)};globalThis.crs.getNextStep=(a,t)=>typeof t=="object"?t:crsbinding.utils.getValueOnPath(a.steps,t);crsbinding.events.emitter.on("crs-process-error",a=>{console.error(a.error)});export{v as initialize};
