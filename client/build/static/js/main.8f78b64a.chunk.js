(this["webpackJsonpkeystone-client"]=this["webpackJsonpkeystone-client"]||[]).push([[0],{103:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(78),s=n.n(c),i=(n(95),n(19)),o=n(18),l=n(7),d=n(85),j=n(114),u=n(116),b=n(113),p=n(82),m=n(9),O=n(87),h=n(23),x="UPDATE_PROPERTIES",g=function(e,t){return t.type===x?Object(i.a)(Object(i.a)({},e),{},{properties:Object(h.a)(t.properties)}):e};var f=n(3),v=["value"],y=Object(r.createContext)(),w=y.Provider,k=function(e){e.value;var t,n=Object(O.a)(e,v),a=(t={properties:[]},Object(r.useReducer)(g,t)),c=Object(m.a)(a,2),s=c[0],o=c[1];return Object(f.jsx)(w,Object(i.a)({value:[s,o]},n))},S=function(){return Object(r.useContext)(y)};n.p;var _,N,P,$,C=function(){var e=S(),t=Object(m.a)(e,2),n=t[0];return t[1],n.currentCategory,Object(f.jsxs)("div",{className:"my-2",children:[Object(f.jsx)("h2",{children:"House List:"}),n.properties.length?Object(f.jsx)("div",{className:"flex-row",children:n.properties.map((function(e){return Object(f.jsxs)("li",{children:["_id=",e._id,"images=",e.image,"address=",e.address,"value=",e.value,"price=",e.forSale]},e._id)}))}):Object(f.jsx)("h3",{children:"No Properties"})]})},E=n(118),F=n(32),A=n(115),I=Object(A.a)(_||(_=Object(F.a)(["\n  query getProperty($id: ID!) {\n    property(_id: $id) {\n      _id\n      address\n      address2\n      city\n      state\n      country\n      zip\n      value\n      lat\n      lng\n      description\n      images\n      forSale\n      salePrice\n    }\n  }\n"]))),R=Object(A.a)(N||(N=Object(F.a)(["\n  query getProperties {\n  properties {\n    _id\n    address\n    address2\n    city\n    state\n    country\n    zip\n    value\n    lat\n    lng\n    description\n    images\n    forSale\n    salePrice\n  }\n}\n"]))),z=(Object(A.a)(P||(P=Object(F.a)(["\n  query getSaleProperties {\n  properties(forSale: true) {\n    _id\n    address\n    address2\n    city\n    state\n    country\n    zip\n    value\n    lat\n    lng\n    description\n    images\n    forSale\n    salePrice\n  }\n}\n"]))),Object(A.a)($||($=Object(F.a)(["\n  query User {\n  user {\n    _id\n    name\n    email\n    properties {\n      _id\n      address\n      address2\n      city\n      state\n      country\n      zip\n      value\n      lat\n      lng\n      description\n      images\n      forSale\n      salePrice\n    }\n  }\n}\n"])))),T=function(){var e=S(),t=Object(m.a)(e,2),n=t[0],a=t[1],c=(n.currentCategory,Object(E.a)(R)),s=c.loading,i=c.data;return Object(r.useEffect)((function(){i&&a({type:x,properties:i.properties})}),[i,s,a]),Object(f.jsx)("div",{className:"container",children:Object(f.jsx)(C,{})})};var D,L,U,W=function(e){var t=e.children;return Object(f.jsx)("div",{style:{height:560,clear:"both",paddingTop:120,textAlign:"center"},children:t})},q=function(){return Object(f.jsx)("div",{children:Object(f.jsxs)(W,{children:[Object(f.jsx)("h1",{children:"404 Page Not Found"}),Object(f.jsx)("h1",{children:Object(f.jsx)("span",{role:"img","aria-label":"Face With Rolling Eyes Emoji",children:"\ud83d\ude44"})})]})})},B=n(14),G=n(8),H=n(15),J=n(111),K=Object(A.a)(D||(D=Object(F.a)(["\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        _id\n      }\n    }\n  }\n"]))),M=Object(A.a)(L||(L=Object(F.a)(["\n  mutation addProperty($address: String, $city: String, $state: String, $zip: String) {\n    addProperty(address: $address, city: $city, state: $state, zip: $zip) {\n      _id\n      address\n      address2\n      city\n      state\n      country\n      zip\n      value\n      description\n      images\n      forSale\n      salePrice\n    }\n  }\n"]))),Q=Object(A.a)(U||(U=Object(F.a)(["\n  mutation addUser($name: String!, $email: String!, $password: String!) {\n    addUser(name: $name, email: $email, password: $password) {\n      token\n      user {\n        _id\n        name\n        email\n        properties {\n          _id\n          address\n        }\n      }\n    }\n  }\n"]))),V=n(20),X=n(21),Y=n(69),Z=n.n(Y),ee=new(function(){function e(){Object(V.a)(this,e)}return Object(X.a)(e,[{key:"getProfile",value:function(){return Z()(this.getToken())}},{key:"loggedIn",value:function(){var e=this.getToken();return!!e&&!this.isTokenExpired(e)}},{key:"isTokenExpired",value:function(e){try{return Z()(e).exp<Date.now()/1e3}catch(t){return!1}}},{key:"getToken",value:function(){return localStorage.getItem("id_token")}},{key:"login",value:function(e){localStorage.setItem("id_token",e),window.location.assign("/")}},{key:"logout",value:function(){localStorage.removeItem("id_token"),window.location.assign("/")}}]),e}());var te=function(e){var t=Object(r.useState)({email:"",password:""}),n=Object(m.a)(t,2),a=n[0],c=n[1],s=Object(J.a)(K),l=Object(m.a)(s,2),d=l[0],j=l[1].error,u=function(){var e=Object(H.a)(Object(G.a)().mark((function e(t){var n,r;return Object(G.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,d({variables:{email:a.email,password:a.password}});case 4:n=e.sent,r=n.data.login.token,ee.login(r),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),b=function(e){var t=e.target,n=t.name,r=t.value;c(Object(i.a)(Object(i.a)({},a),{},Object(B.a)({},n,r)))};return Object(f.jsxs)("div",{className:"container my-1",children:[Object(f.jsx)(o.b,{to:"/signup",children:"\u2190 Go to Signup"}),Object(f.jsx)("h2",{children:"Login"}),Object(f.jsxs)("form",{onSubmit:u,children:[Object(f.jsxs)("div",{className:"flex-row space-between my-2",children:[Object(f.jsx)("label",{htmlFor:"email",children:"Email address:"}),Object(f.jsx)("input",{placeholder:"youremail@test.com",name:"email",type:"email",id:"email",onChange:b})]}),Object(f.jsxs)("div",{className:"flex-row space-between my-2",children:[Object(f.jsx)("label",{htmlFor:"pwd",children:"Password:"}),Object(f.jsx)("input",{placeholder:"******",name:"password",type:"password",id:"pwd",onChange:b})]}),j?Object(f.jsx)("div",{children:Object(f.jsx)("p",{className:"error-text",children:"The provided credentials are incorrect"})}):null,Object(f.jsx)("div",{className:"flex-row flex-end",children:Object(f.jsx)("button",{type:"submit",children:"Submit"})})]})]})};var ne=function(){return ee.loggedIn()?Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)("div",{className:"container my-1",children:[Object(f.jsx)(o.b,{to:"/",children:"\u2190 Back to Home"}),Object(f.jsx)(o.b,{to:"/add-property",children:"Add Property"})]})}):null},re=n(86);function ae(){return ae=Object(H.a)(Object(G.a)().mark((function e(){var t,n,a,c,s,i,o,d,j,u,b,p,O,h;return Object(G.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(l.n)(),n=t.id,a=Object(E.a)(I,{variables:{id:n}}),a.loading,c=a.data,s=(null===c||void 0===c?void 0:c.property)||{},console.log(s),i=Object(r.useState)(null),o=Object(m.a)(i,2),d=o[0],j=o[1],u=Object(r.useState)(),b=Object(m.a)(u,2),p=b[0],O=b[1],h=function(){var e=Object(H.a)(Object(G.a)().mark((function e(t){var r,a;return Object(G.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),(r=new FormData).append("image",p),r.append("propid",n),e.next=6,re.a.post("/api/image-upload",r,{headers:{"Content-Type":"multipart/form-data"}});case 6:a=e.sent,j("/img/prop/"+a.data.filename);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.abrupt("return",Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)("div",{className:"container my-1",children:[Object(f.jsxs)("h2",{children:["PropertyDetail: ",n]}),Object(f.jsx)("div",{children:Object(f.jsx)("h2",{})}),ee.loggedIn()?Object(f.jsxs)("form",{onSubmit:h,method:"post",accept:"image/jpeg",children:[Object(f.jsx)("input",{type:"hidden",name:"propid",value:n}),Object(f.jsx)("input",{filename:p,onChange:function(e){return O(e.target.files[0])},type:"file",accept:"image/*"}),Object(f.jsx)("button",{type:"submit",children:"Submit"})]}):Object(f.jsx)("div",{children:"Other!"}),d&&Object(f.jsx)("img",{src:d})]})}));case 8:case"end":return e.stop()}}),e)}))),ae.apply(this,arguments)}var ce,se=function(){return ae.apply(this,arguments)},ie=n(31);function oe(e,t){(ce=new window.google.maps.places.Autocomplete(t.current,{types:["address"],componentRestrictions:{country:["US"]},fields:["address_components","geometry"]})).setFields(["address_components","formatted_address"]),ce.addListener("place_changed",(function(){return function(e){return le.apply(this,arguments)}(e)}))}function le(){return(le=Object(H.a)(Object(G.a)().mark((function e(t){var n,r;return Object(G.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=ce.getPlace(),r=n.formatted_address,t(r);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var de=function(e){var t=Object(l.l)(),n=Object(J.a)(M),a=Object(m.a)(n,2),c=a[0],s=(a[1].error,Object(r.useState)("")),i=Object(m.a)(s,2),o=i[0],d=i[1],j=Object(r.useRef)(null),u=Object(r.useState)({address:"",city:"",state:"",zip:"",value:"",description:"",imgURL:""}),b=Object(m.a)(u,2);b[0],b[1],Object(r.useEffect)((function(){!function(e,t){var n=document.createElement("script");n.type="text/javascript",n.readyState?n.onreadystatechange=function(){"loaded"!==n.readyState&&"complete"!==n.readyState||(n.onreadystatechange=null,t())}:n.onload=function(){return t()},n.src=e,document.getElementsByTagName("head")[0].appendChild(n)}("https://maps.googleapis.com/maps/api/js?key=AIzaSyDyfKCmxQxrQqrFnDgMSmj6xxhLnIkbuh8&libraries=places",(function(){return oe(d,j)}))}),[]);var p=Object(E.a)(z).data;p&&p.user;var O=function(){var e=Object(H.a)(Object(G.a)().mark((function e(n){var r,a,s,i,o,l,d,j,u,b;return Object(G.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),console.log(ce.getPlace()),r=ce.getPlace(),a="",s="",i="",o="",l=Object(ie.a)(r.address_components),e.prev=8,l.s();case 10:if((d=l.n()).done){e.next=28;break}j=d.value,u=j.types[0],e.t0=u,e.next="street_number"===e.t0?16:"route"===e.t0?18:"postal_code"===e.t0?20:"locality"===e.t0?22:"administrative_area_level_1"===e.t0?24:26;break;case 16:return a="".concat(j.long_name),e.abrupt("break",26);case 18:return a+=" "+j.short_name,e.abrupt("break",26);case 20:return o="".concat(j.long_name),e.abrupt("break",26);case 22:return s="".concat(j.long_name),e.abrupt("break",26);case 24:return i="".concat(j.short_name),e.abrupt("break",26);case 26:e.next=10;break;case 28:e.next=33;break;case 30:e.prev=30,e.t1=e.catch(8),l.e(e.t1);case 33:return e.prev=33,l.f(),e.finish(33);case 36:return console.log(a+s+i+o),e.prev=37,e.next=40,c({variables:{address:a,city:s,state:i,zip:o}});case 40:b=e.sent,console.log("mutationResponse:"),console.log(b),b.data&&t("/property/".concat(b.data.addProperty._id)),e.next=49;break;case 46:e.prev=46,e.t2=e.catch(37),console.log(e.t2);case 49:case"end":return e.stop()}}),e,null,[[8,30,33,36],[37,46]])})));return function(t){return e.apply(this,arguments)}}();return ee.loggedIn()?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("div",{className:"search-location-input"}),Object(f.jsxs)("div",{className:"container my-1",children:["Add Property Form here",Object(f.jsxs)("form",{onSubmit:O,method:"submit",children:[Object(f.jsx)("label",{htmlFor:"fullAddress",children:"Street Address:"}),Object(f.jsx)("input",{ref:j,onChange:function(e){return d(e.target.value)},placeholder:"Enter a City",value:o,id:"fullAddress",size:"80"}),Object(f.jsx)("br",{}),Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"text",name:"imgURL",placeholder:"https://imghost.com/img.jpg"}),Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"text",name:"description",placeholder:"property description"}),Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"text",name:"value",placeholder:"$0?"}),Object(f.jsx)("br",{}),Object(f.jsx)("button",{type:"submit",children:"submit!"})]})]})]}):null};var je=function(e){var t=Object(r.useState)({email:"",password:""}),n=Object(m.a)(t,2),a=n[0],c=n[1],s=Object(J.a)(Q),l=Object(m.a)(s,1)[0],d=function(){var e=Object(H.a)(Object(G.a)().mark((function e(t){var n,r;return Object(G.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,l({variables:{email:a.email,password:a.password,name:a.name}});case 3:n=e.sent,r=n.data.addUser.token,ee.login(r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=function(e){var t=e.target,n=t.name,r=t.value;c(Object(i.a)(Object(i.a)({},a),{},Object(B.a)({},n,r)))};return Object(f.jsxs)("div",{className:"container my-1",children:[Object(f.jsx)(o.b,{to:"/login",children:"\u2190 Go to Login"}),Object(f.jsx)("h2",{children:"Register"}),Object(f.jsxs)("form",{onSubmit:d,children:[Object(f.jsxs)("div",{className:"flex-row space-between my-2",children:[Object(f.jsx)("label",{htmlFor:"firstName",children:"Name:"}),Object(f.jsx)("input",{placeholder:"Full Name",name:"name",type:"name",id:"name",onChange:j})]}),Object(f.jsxs)("div",{className:"flex-row space-between my-2",children:[Object(f.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(f.jsx)("input",{placeholder:"youremail@test.com",name:"email",type:"email",id:"email",onChange:j})]}),Object(f.jsxs)("div",{className:"flex-row space-between my-2",children:[Object(f.jsx)("label",{htmlFor:"pwd",children:"Password:"}),Object(f.jsx)("input",{placeholder:"******",name:"password",type:"password",id:"pwd",onChange:j})]}),Object(f.jsx)("div",{className:"flex-row flex-end",children:Object(f.jsx)("button",{type:"submit",children:"Submit"})})]})]})};var ue=function(){return Object(f.jsxs)("header",{className:"flex-row px-1",children:[Object(f.jsx)("h1",{children:Object(f.jsx)(o.b,{to:"/",children:"Keystone"})}),Object(f.jsx)("nav",{children:ee.loggedIn()?Object(f.jsxs)("ul",{className:"flex-row",children:[Object(f.jsx)("li",{className:"mx-1",children:Object(f.jsx)(o.b,{to:"/profile",children:"Profile"})}),Object(f.jsx)("li",{className:"mx-1",children:Object(f.jsx)(o.b,{to:"/add-property",children:"Add Property"})}),Object(f.jsx)("li",{className:"mx-1",children:Object(f.jsx)("a",{href:"/",onClick:function(){return ee.logout()},children:"Logout"})})]}):Object(f.jsxs)("ul",{className:"flex-row",children:[Object(f.jsx)("li",{className:"mx-1",children:Object(f.jsx)(o.b,{to:"/register",children:"Register"})}),Object(f.jsx)("li",{className:"mx-1",children:Object(f.jsx)(o.b,{to:"/login",children:"Login"})})]})})]})},be=Object(d.a)({uri:"/graphql"}),pe=Object(p.a)((function(e,t){var n=t.headers,r=localStorage.getItem("id_token");return{headers:Object(i.a)(Object(i.a)({},n),{},{authorization:r?"Bearer ".concat(r):""})}})),me=new j.a({link:pe.concat(be),cache:new u.a});var Oe=function(){return Object(f.jsx)(b.a,{client:me,children:Object(f.jsx)(o.a,{children:Object(f.jsx)("div",{children:Object(f.jsxs)(k,{children:[Object(f.jsx)(ue,{}),Object(f.jsxs)(l.c,{children:[Object(f.jsx)(l.a,{path:"/",element:Object(f.jsx)(T,{})}),Object(f.jsx)(l.a,{path:"/login",element:Object(f.jsx)(te,{})}),Object(f.jsx)(l.a,{path:"/register",element:Object(f.jsx)(je,{})}),Object(f.jsx)(l.a,{path:"/profile",element:Object(f.jsx)(ne,{})}),Object(f.jsx)(l.a,{path:"/add-property",element:Object(f.jsx)(de,{})}),Object(f.jsx)(l.a,{path:"/property/:id",element:Object(f.jsx)(se,{})}),Object(f.jsx)(l.a,{path:"*",element:Object(f.jsx)(q,{})})]})]})})})})},he=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function xe(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(Oe,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");he?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):xe(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):xe(t,e)}))}}()},95:function(e,t,n){}},[[103,1,2]]]);
//# sourceMappingURL=main.8f78b64a.chunk.js.map