class s{constructor(t){this._router=t,this._mutationHandler=this._mutation.bind(this),this._observer=new MutationObserver(this._mutationHandler),this._observer.observe(this._router,{attributes:!0}),this._router.setAttribute("view",this._router.routesDef.default)}dispose(){delete this._router,this._observer.disconnect(),this._observer=null,this._mutationHandler=null}async _mutation(t){for(let e of t)if(e.attributeName==="view"){const r=this._router.getAttribute("view");await this._router.goto(r)}}}export{s as NavigationProvider};
