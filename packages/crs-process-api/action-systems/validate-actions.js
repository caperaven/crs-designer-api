class p{static async perform(s,e,a,r){return await this[s.action](s,e,a,r)}static async assert_step(s,e,a,r){const i=await crs.process.getValue(s.args.source,e,a,r),t=await crs.process.getValue(s.args.process,e,a,r),n=await crs.process.getValue(s.args.step,e,a,r),l=await crs.process.getValue(s.args.required,e,a,r),c={passed:!0,process:t,step:n},o=i[t].steps[n];for(const u of l)await crs.call("object","assert",{source:o.args,properties:[u]})==!1&&(c.passed=!1,c.messages=c.messages||[],c.messages.push(`"${u}" must have a value`));return s.args.target!=null&&await crs.process.setValue(s.args.target,c,e,a,r),c}static async required(s,e,a,r){const i=await crs.call("object","assert",s.args,e,a,r);if(i&&s.pass_step!=null){const t=await crs.getNextStep(a,s.pass_step);await crs.process.runStep(t,e,a,r)}if(!i&&s.fail_step!=null){const t=await crs.getNextStep(a,s.fail_step);await crs.process.runStep(t,e,a,r)}return i}}crs.intent.validate=p;export{p as ValidateActions};
