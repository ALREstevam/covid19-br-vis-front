(this.webpackJsonpcovidfront=this.webpackJsonpcovidfront||[]).push([[0],{227:function(e,t,a){e.exports=a(366)},232:function(e,t,a){},233:function(e,t,a){},366:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),r=a(179),o=a.n(r),l=(a(232),a(233),a(16)),s=a(12),c=a(83),m=a(82),u=a(11),d=a.n(u),p=a(84);function h(e,t,a,n){return y.apply(this,arguments)}function y(){return(y=Object(p.a)(d.a.mark((function e(t,a,n,i){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch(t).then((function(e){return e.json()})).then((function(e){return a(i(e))})).catch((function(e){console.error(e),n&&n(e)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(){return(v=Object(p.a)(d.a.mark((function e(t,a){var n,i,r=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.length>2&&void 0!==r[2]?r[2]:function(e){return e},i="http://127.0.0.1:5000/br/cities?response_type=json",e.abrupt("return",h(i,t,a,n));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var g=a(32),f=a(122),b=a.n(f);function E(e,t){return Math.round(Math.abs((e-t)/864e5))}function w(e){var t=""+(e.getMonth()+1),a=""+e.getDate(),n=e.getFullYear();return t.length<2&&(t="0"+t),a.length<2&&(a="0"+a),[a,t,n].join("/")}var C={container:{lineHeight:"1em",marginBottom:"15px"},lastUpdate:{color:"#949494",fontSize:".6em"},cityName:{fontSize:"1em"},dataValue:{color:"#3b3b3b",fontSize:".9em"}},k=function(e){var t=e.name,a=e.state,n=e.date,r=e.cases,o=e.deaths;return i.a.createElement("div",{style:C.container},i.a.createElement("span",{style:C.lastUpdate},"\xdaltima atualiza\xe7\xe3o ",w(n)),i.a.createElement("br",null),i.a.createElement("span",{style:C.cityName},i.a.createElement("b",null,t,"/",a)),i.a.createElement("br",null),i.a.createElement("span",{style:C.dataValue},i.a.createElement("b",null,"Casos:")," ",r),i.a.createElement("br",null),i.a.createElement("span",{style:C.dataValue},i.a.createElement("b",null,"\xd3bitos:")," ",o))};b.a.accessToken="pk.eyJ1IjoiYWVzdCIsImEiOiJjazkyNzZka2gwMnloM2xuNzZiMzEyODFrIn0.Yvk6wdCcwxvAB99OScpc2Q";var x=function(e){var t=e.cities;return t.length?i.a.createElement("div",{className:"cityList"},t.sort((function(e,t){return e.totalCases-t.totalCases})).reverse().map((function(e){return i.a.createElement(k,{name:e.city,state:e.state,date:new Date(e.date),cases:e.totalCases,deaths:e.deaths,key:"cityItem"+e.city+e.state})}))):i.a.createElement("p",null,"(Zoom para mais detalhes)")},z=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;Object(l.a)(this,a),n=t.call(this,e);var i=new Date("2020-02-25");return n.state={lng:e.lng||5,lat:e.lat||34,zoom:e.zoom||2,date:new Date,sliderValue:E(new Date("2020-02-25"),new Date),data:n.props.data,visibleCities:[],animate:!1,initialDate:i,maxDays:E(i,new Date),mapType:"infected"},n}return Object(s.a)(a,[{key:"getVisibleOnMap",value:function(){if(this.state.zoom<5)return[];var e=this.state.map.queryRenderedFeatures({layers:["all-cities"]}),t={};if(e){e=e.sort((function(e,t){return new Date(e.date)-new Date(t.date)}));var a,n=Object(g.a)(e);try{for(n.s();!(a=n.n()).done;){var i=a.value,r=i.properties.city;"INDEFINIDA"===r&&(r=r+"/"+i.properties.state),!t.hasOwnProperty(r)&&i.properties.timestamp<=this.state.date.getTime()&&(t[r]=i.properties)}}catch(o){n.e(o)}finally{n.f()}return Object.keys(t).map((function(e){return t[e]}))}return[]}},{key:"animatedStep",value:function(){var e=this;this.state.animate?(this.changeSlider(0),this.animateTimeout=setInterval((function(){e.state.sliderValue<=e.state.maxDays&&e.changeSlider(e.state.sliderValue+1),e.state.sliderValue===e.state.maxDays&&setTimeout((function(){e.changeSlider(0)}),2e3)}),400)):this.animateTimeout&&clearInterval(this.animateTimeout)}},{key:"changeSlider",value:function(e){var t,a,n=parseInt(e),i=(t=this.state.initialDate,a=n,(t=new Date(t.valueOf())).setDate(t.getDate()+a),t);this.setState({sliderValue:n,date:i,visibleCities:this.getVisibleOnMap()}),this.state.map.setFilter("covid-heatmap",["<=",["number",["get","timestamp"]],i.getTime()]),this.state.map.setFilter("covid-heatmap-death",["<=",["number",["get","timestamp"]],i.getTime()]),this.state.map.setFilter("covid-point",["==",["number",["get","timestamp"]],i.getTime()])}},{key:"handleMapTypeChange",value:function(e){this.setState({mapType:e.target.value});var t="covid-heatmap-death",a="covid-heatmap";"infected"===e.target.value?(this.state.map.setLayoutProperty(a,"visibility","visible"),this.state.map.setLayoutProperty(t,"visibility","none")):(this.state.map.setLayoutProperty(a,"visibility","none"),this.state.map.setLayoutProperty(t,"visibility","visible"))}},{key:"handleAnimateChange",value:function(e){var t=this;this.setState({animate:e.target.checked},(function(){t.animatedStep()}))}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{style:this.props.containerStyle},i.a.createElement("div",{className:"console"},i.a.createElement("h1",null,"Casos de COVID-19 no Brasil at\xe9 o dia ",w(this.state.date)," (h\xe1 ",E(this.state.date,new Date)," dias)"),i.a.createElement("p",null,"Fonte de dados: ",i.a.createElement("a",{href:"https://covid19br.wcota.me/"},"N\xfamero de casos confirmados de COVID-19 no Brasil")),i.a.createElement("div",{className:"session sliderbar"},i.a.createElement("h2",null,"Data ",w(this.state.date),": ",i.a.createElement("label",{className:"active-hour"},this.state.hour)),i.a.createElement("form",null,i.a.createElement("label",null,i.a.createElement("input",{name:"animate",type:"checkbox",checked:this.state.animate,onChange:function(t){return e.handleAnimateChange(t)}}),"Animar")),i.a.createElement("input",{className:"slider row",type:"range",min:"0",max:this.state.maxDays,step:"1",value:this.state.sliderValue,onChange:function(t){return e.changeSlider(t.target.value)}})),i.a.createElement("form",null,i.a.createElement("label",null,i.a.createElement("input",{type:"radio",value:"infected",checked:"infected"===this.state.mapType,onChange:function(t){return e.handleMapTypeChange(t)}}),"Casos"),i.a.createElement("span",null," | "),i.a.createElement("label",null,i.a.createElement("input",{type:"radio",value:"death",checked:"death"===this.state.mapType,onChange:function(t){return e.handleMapTypeChange(t)}}),"\xd3bitos")),i.a.createElement("div",null),i.a.createElement("div",null,i.a.createElement(x,{cities:this.state.visibleCities}))),i.a.createElement("div",{style:this.props.style,ref:function(t){return e.mapContainer=t}}))}},{key:"componentDidMount",value:function(){var e=this,t=new b.a.Map({container:this.mapContainer,style:"mapbox://styles/aest/ck93dlpxn00v21imgp8zz3y6x",center:[this.state.lng,this.state.lat],zoom:this.state.zoom});this.setState({map:t}),t.on("move",(function(){e.setState({lng:t.getCenter().lng.toFixed(4),lat:t.getCenter().lat.toFixed(4),zoom:t.getZoom().toFixed(2)})})),t.on("load",(function(){t.addSource("covid",{type:"geojson",data:"http://localhost:5000/br/cities?response_type=geojson"}),t.addSource("covid-cities-daily",{type:"geojson",data:"http://localhost:5000/br/cities-daily?response_type=geojson"}),t.on("moveend",(function(){e.setState({visibleCities:e.getVisibleOnMap()})})),t.addLayer({id:"covid-heatmap-death",type:"heatmap",source:"covid",visibility:"none",paint:{"heatmap-weight":["interpolate",["linear"],["number",["get","newDeaths"]],0,0,20,1],"heatmap-intensity":["interpolate",["linear"],["zoom"],0,1,9,3],"heatmap-color":["interpolate",["linear"],["heatmap-density"],0,"rgba(255,237,68,0)",.1,"#ff9671",.15,"#ffc75f",.2,"#e24f4f",.4,"#c02f36",.6,"#9e001f",.8,"#7d0006",1,"#5e0000"],"heatmap-radius":["interpolate",["linear"],["zoom"],0,2,9,20],"heatmap-opacity":["interpolate",["linear"],["zoom"],7,1,15,0]}},"waterway-label"),t.addLayer({id:"covid-heatmap",type:"heatmap",source:"covid",paint:{"heatmap-weight":["interpolate",["linear"],["number",["get","newCases"]],0,0,20,1],"heatmap-intensity":["interpolate",["linear"],["zoom"],0,1,9,3],"heatmap-color":["interpolate",["linear"],["heatmap-density"],0,"rgba(255,237,68,0)",.05,"rgb(72,244,66)",.15,"rgb(68,102,237)",.4,"rgb(249,169,0)",.6,"rgb(255,52,45)",.8,"rgb(233,3,8)",1,"rgb(199,5,9)"],"heatmap-radius":["interpolate",["linear"],["zoom"],0,2,9,20],"heatmap-opacity":["interpolate",["linear"],["zoom"],7,1,15,0]}},"waterway-label"),t.addLayer({id:"covid-point",type:"circle",source:"covid-cities-daily",minzoom:8,paint:{"circle-radius":["interpolate",["linear"],["zoom"],7,["interpolate",["linear"],["number",["get","totalCases"]],1,1,6,4],16,["interpolate",["linear"],["number",["get","totalCases"]],1,5,6,50]],"circle-color":["interpolate",["linear"],["number",["get","totalCases"]],1,"rgba(33,102,172,0)",2,"rgb(178,24,43)"],"circle-stroke-color":"white","circle-stroke-width":1,"circle-opacity":["interpolate",["linear"],["zoom"],7,0,8,1]}},"waterway-label"),t.addLayer({id:"all-cities",type:"circle",source:"covid",minzoom:5,paint:{"circle-color":["interpolate",["linear"],["number",["get","totalCases"]],1,"rgba(33,102,172,0)"],"circle-stroke-color":"white","circle-stroke-width":0}},"waterway-label")}))}}]),a}(n.Component),S=a(180),D=[{id:"japan",color:"hsl(258, 70%, 50%)",data:[{x:2,y:247},{x:3,y:90},{x:4,y:45},{x:4.3,y:155},{x:5,y:270},{x:6,y:263},{x:7,y:8},{x:8,y:49},{x:9,y:64},{x:10,y:91},{x:11,y:34},{x:12,y:196}]}],O=function(e){var t=e.data;return console.log("MyResponsiveLine"),i.a.createElement(S.a,{data:t||D,margin:{top:50,right:110,bottom:50,left:60},xScale:{type:"log",base:2,max:"auto"},yScale:{type:"linear",min:"auto",max:"auto",stacked:!0,reverse:!1},axisTop:null,axisRight:null,axisBottom:{orient:"bottom",tickSize:5,tickPadding:5,tickRotation:0,legend:"transportation",legendOffset:36,legendPosition:"middle"},axisLeft:{orient:"left",tickSize:5,tickPadding:5,tickRotation:0,legend:"count",legendOffset:-40,legendPosition:"middle"},colors:{scheme:"nivo"},pointSize:10,pointColor:{theme:"background"},pointBorderWidth:2,pointBorderColor:{from:"serieColor"},pointLabel:"y",pointLabelYOffset:-12,useMesh:!0,legends:[{anchor:"bottom-right",direction:"column",justify:!1,translateX:100,translateY:0,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:80,itemHeight:20,itemOpacity:.75,symbolSize:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}]})},j=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={covidCasesGeoJson:void 0,covidCasesJson:void 0},n}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(z,{style:{right:0,left:0,height:"95vh",width:"100%"},data:this.state.covidCasesGeoJson,zoom:3,lat:-13.5958,lng:-54.4587}),i.a.createElement("div",{style:{width:"100%",height:"100vh",backgroundColor:"red"}},i.a.createElement(O,null)))}},{key:"componentDidMount",value:function(){var e=this;!function(e,t){v.apply(this,arguments)}((function(t){console.log(t),e.setState({covidCasesJson:t})}),console.error)}}]),a}(n.Component);var M=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(j,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[227,1,2]]]);
//# sourceMappingURL=main.73e42330.chunk.js.map