(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(8),o=a.n(c),i=(a(15),a(1)),l=a(2),s=a(4),u=a(3),h=a(5),m=(a(7),function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={species:["Fetching species..."]},e}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch(this.props.species[0]).then(function(e){return e.json()}).then(function(t){return e.setState({species:t.name})}).catch(function(){return e.setState({species:"Species Unknown"})})}},{key:"render",value:function(){var e=this.props,t=e.name,a=e.weight,n=e.id,c=e.birth,o=e.gender;return r.a.createElement("div",{className:"Card tc grow bg-washed-yellow br3 pa3 ma3 dib bw2 shadow-5"},r.a.createElement("img",{alt:"robots",src:"https://robohash.org/".concat(n,"?size=200x200")}),r.a.createElement("p",null,r.a.createElement("b",null,"Name:")," ",t," "),r.a.createElement("p",null,r.a.createElement("b",null,"Weight:")," ",a),r.a.createElement("p",null,r.a.createElement("b",null,"Birth:")," ",c),r.a.createElement("p",null,r.a.createElement("b",null,"Gender:")," ",o),r.a.createElement("p",null,r.a.createElement("b",null,"Species:")," ",this.state.species))}}]),t}(n.Component)),p=function(e){var t=e.api_data;console.log("api data",t);var a=t.map(function(e,t){return r.a.createElement(m,{id:t+=1,key:e.url,name:e.name,weight:e.mass,birth:e.birth_year,gender:e.gender,species:e.species})});return r.a.createElement("div",null,a)},d=function(e){e.searchfield;var t=e.searchChange;return r.a.createElement("div",{className:"pa2"},r.a.createElement("input",{className:"pa3 ba b--green bg-lightest-blue",type:"search",placeholder:"search robots",onChange:t}))},f=function(e){return r.a.createElement("div",{style:{overflow:"scroll",border:"1px solid black",height:"800px",marginTop:"25px",background:"rgba(0, 0, 0, 0.8)",boxShadow:"0 0 2px 2px #FFEE58"}},e.children)},b=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).onSearchChange=function(t){e.setState({searchfield:t.target.value})},e.state={api_data:[],searchfield:""},e}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){for(var e=this,t=[],a=1;a<10;a++)t.push("https://swapi.co/api/people/?page="+a.toString());var n=[],r=t.map(function(e){return fetch(e).then(function(e){return e.json()}).then(function(e){return e.results.map(function(e){return n.push(e)})})});Promise.all(r).then(function(t){return e.setState({api_data:n})}).catch(function(e){return console.log("ERROR, please check",e)})}},{key:"render",value:function(){var e=this.state,t=e.api_data,a=e.searchfield,n=t.sort(function(e,t){return e.name.localeCompare(t.name)}).filter(function(e){return e.name.toLowerCase().includes(a.toLowerCase())});return t.length?r.a.createElement("div",{className:"tc"},r.a.createElement("h1",{className:"f1 Title"},"STAR WARS"),r.a.createElement("h2",{className:"Sub-title"},"Robot Card Collection"),r.a.createElement(d,{searchChange:this.onSearchChange}),r.a.createElement(f,null,r.a.createElement(p,{api_data:n}))):r.a.createElement("div",{className:"loading"},r.a.createElement("div",{className:"loading-icon"}),r.a.createElement("h1",null,"Loading"))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(16);o.a.render(r.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},7:function(e,t,a){},9:function(e,t,a){e.exports=a(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.ee595c7d.chunk.js.map