(this.webpackJsonpcovidfront=this.webpackJsonpcovidfront||[]).push([[0],{239:function(e,t,a){e.exports=a(383)},244:function(e,t,a){},245:function(e,t,a){},383:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(181),o=a.n(i),s=(a(244),a(245),a(32)),l=a(11),c=a.n(l),d=a(122),m=a(18),u=a(15),h=a(199),p=a(202),v=a(123),g=a.n(v),f=a(201),b=a(182),y=a(80),E=a(183),C=a(184),S=a(200),w=a(203),D=a(124),k=a.n(D),O=a(185),z=a.n(O);function x(e,t){return Math.round(Math.abs((e-t)/864e5))}function L(e){var t=""+(e.getMonth()+1),a=""+e.getDate(),n=e.getFullYear();return t.length<2&&(t="0"+t),a.length<2&&(a="0"+a),[a,t,n].join("/")}var P={lastUpdate:{color:"#949494",fontSize:".6em"},cityName:{fontSize:"1em"},dataValue:{color:"#3b3b3b",fontSize:".9em"}},T=function(e){var t=e.name,a=e.state,n=e.date,i=e.cases,o=e.deaths;return r.a.createElement("div",{className:"cityListItem"},r.a.createElement("span",{style:P.lastUpdate},"\xdaltima atualiza\xe7\xe3o ",L(n)),r.a.createElement("br",null),r.a.createElement("span",{style:P.cityName},r.a.createElement("b",null,t,"/",a)),r.a.createElement("br",null),r.a.createElement("span",{style:P.dataValue},r.a.createElement("b",null,"Casos:")," ",i),r.a.createElement("span",null," | "),r.a.createElement("span",{style:P.dataValue},r.a.createElement("b",null,"\xd3bitos:")," ",o))};a(248);var j={MAPBOX_ACCESS_TOKEN:"pk.eyJ1IjoiYWVzdCIsImEiOiJjazk1ejE3MnEwZzh4M2dwMndkMHhvZTQwIn0.kNcRxl_xTpzuf_vwz9_MtQ",BACKEND_URL:"https://cvid19-back.herokuapp.com",MAPBOX_ACCESS_TOKEN_LIST:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",";if(e)return e.split(t)}(Object({NODE_ENV:"production",PUBLIC_URL:"/covid19-br-vis-front",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_MAPBOX_ACCESS_TOKEN:"pk.eyJ1IjoiYWVzdCIsImEiOiJjazk1ejE3MnEwZzh4M2dwMndkMHhvZTQwIn0.kNcRxl_xTpzuf_vwz9_MtQ",REACT_APP_BACKEND_URL:"https://cvid19-back.herokuapp.com"}).MAPBOX_ACCESS_TOKEN_LIST)};k.a.accessToken=j.MAPBOX_ACCESS_TOKEN;var B=function(e){Object(w.a)(a,e);var t=Object(S.a)(a);function a(e){var n;Object(E.a)(this,a),(n=t.call(this,e)).renderCityListItem=function(e,t){var a=n.state.renderableCities[e];return r.a.createElement(T,{name:a.city,state:a.state,date:new Date(a.date),cases:a.totalCases,deaths:a.deaths,key:t})};var i=new Date("2020-02-25");return n.baseUrl=j.BACKEND_URL,n.onSourceLoadBegin=n.props.onSourceLoadBegin,n.onSourceLoadFinished=n.props.onSourceLoadFinished,n.state={lng:e.lng||5,lat:e.lat||34,zoom:e.zoom||2,date:new Date,sliderValue:x(new Date("2020-02-25"),new Date),data:n.props.data,visibleCities:[],renderableCities:[],animate:!1,initialDate:i,maxDays:x(i,new Date),mapType:"infected",loadState:"loading"},n}return Object(C.a)(a,[{key:"getVisibleOnMap",value:function(){var e=this.state.map.queryRenderedFeatures({layers:["all-cities"]}),t={},a={};if(e){e=e.sort((function(e,t){return new Date(e.date)-new Date(t.date)})).map((function(e){return e.properties}));var n,r=Object(y.a)(e);try{for(r.s();!(n=r.n()).done;){var i=n.value,o=i.city;a.hasOwnProperty(i.date)||(a[i.date]=[]),a[i.date].push(i),!t.hasOwnProperty(o)&&i.timestamp<=this.state.date.getTime()&&(t[o]=i)}}catch(s){r.e(s)}finally{r.f()}return[Object.keys(t).map((function(e){return t[e]})),a]}return[[],[]]}},{key:"updateVisibleCities",value:function(){var e=Object(b.a)(g.a.mark((function e(){var t,a,n,r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=this.getVisibleOnMap(),r=Object(f.a)(n,2),t=r[0],a=r[1],this.setState({visibleCities:t,visibleCitiesPerDate:a,renderableCities:t.sort((function(e,t){return e.totalCases-t.totalCases})).reverse()}),this.props.onVisibleCitiesChange&&"loaded"===this.state.loadState&&this.props.onVisibleCitiesChange(t,a);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"animatedStep",value:function(){var e=this;this.state.animate?(this.changeSlider(0),this.animateTimeout=setInterval((function(){e.state.sliderValue<=e.state.maxDays?e.changeSlider(e.state.sliderValue+1):e.changeSlider(0)}),600)):this.animateTimeout&&clearInterval(this.animateTimeout)}},{key:"changeSlider",value:function(e){var t=parseInt(e),a=function(e,t){var a=new Date(e.valueOf());return a.setDate(a.getDate()+t),a}(this.state.initialDate,t);this.state.map.setFilter("covid-heatmap",["<=",["number",["get","timestamp"]],a.getTime()]),this.state.map.setFilter("covid-heatmap-death",["<=",["number",["get","timestamp"]],a.getTime()]),this.state.map.setFilter("covid-point",["==",["number",["get","timestamp"]],a.getTime()]),this.setState({sliderValue:t,date:a})}},{key:"handleMapTypeChange",value:function(e){this.setState({mapType:e.target.value});var t="covid-heatmap-death",a="covid-heatmap";"infected"===e.target.value?(this.state.map.setLayoutProperty(a,"visibility","visible"),this.state.map.setLayoutProperty(t,"visibility","none")):(this.state.map.setLayoutProperty(a,"visibility","none"),this.state.map.setLayoutProperty(t,"visibility","visible"))}},{key:"handleAnimateChange",value:function(e){var t=this;this.setState({animate:e.target.checked},(function(){t.animatedStep()}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:this.props.containerStyle},r.a.createElement("div",{className:"console"},r.a.createElement("h1",{className:"consoleTitle"},"COVID-19 no Brasil at\xe9 o dia ",L(this.state.date)," ",function(){var t=x(e.state.date,new Date);return 0===t?"(hoje)":1===t?"(ontem)":"(h\xe1 ".concat(t," dias)")}()),r.a.createElement("p",null,"Fonte de dados: ",r.a.createElement("a",{href:"https://covid19br.wcota.me/"},"N\xfamero de casos confirmados de COVID-19 no Brasil")),r.a.createElement("div",{className:"session sliderbar"},r.a.createElement("strong",null,L(this.state.date),": ",r.a.createElement("label",{className:"active-hour"},this.state.hour)),r.a.createElement("form",null,r.a.createElement("label",null,r.a.createElement("input",{name:"animate",type:"checkbox",checked:this.state.animate,onChange:function(t){return e.handleAnimateChange(t)}}),"Animar")),r.a.createElement("input",{className:"slider row",type:"range",min:"0",max:this.state.maxDays,step:"1",value:this.state.sliderValue,onChange:function(t){return e.changeSlider(t.target.value)}})),r.a.createElement("form",null,r.a.createElement("label",null,r.a.createElement("input",{type:"radio",value:"infected",checked:"infected"===this.state.mapType,onChange:function(t){return e.handleMapTypeChange(t)}}),"Casos"),r.a.createElement("span",null," | "),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",value:"death",checked:"death"===this.state.mapType,onChange:function(t){return e.handleMapTypeChange(t)}}),"\xd3bitos")),r.a.createElement("div",null),r.a.createElement("div",null,r.a.createElement("div",{className:"cityList"},this.state.renderableCities.length>0?r.a.createElement(z.a,{itemRenderer:this.renderCityListItem,length:this.state.renderableCities.length,type:"uniform",pageSize:3}):r.a.createElement("p",{style:{textAlign:"center",fontStyle:"italic"}},"(Use o zoom e a navega\xe7\xe3o pelo mapa para ver os detalhes de cada localidade.)"))),r.a.createElement("div",{style:{color:"gray",fontSize:"0.5em",bottom:0,position:"absolute"}},r.a.createElement("p",null,r.a.createElement("span",null,r.a.createElement("strong",null,"Zoom: "),this.state.zoom),r.a.createElement("span",null," | "),r.a.createElement("span",null,r.a.createElement("strong",null,"Centro: "),this.state.lat,", ",this.state.lng),r.a.createElement("span",null," | "),r.a.createElement("span",null,r.a.createElement("strong",null,"Cidades vis\xedveis: "),this.state.visibleCities.length)))),r.a.createElement("div",{style:this.props.style,ref:function(t){return e.mapContainer=t}}))}},{key:"componentDidMount",value:function(){var e=this;this.onSourceLoadBegin&&this.onSourceLoadBegin();var t=new k.a.Map({container:this.mapContainer,style:"mapbox://styles/aest/ck93dlpxn00v21imgp8zz3y6x?optimize=true",center:[this.state.lng,this.state.lat],zoom:this.state.zoom,minPitch:0,maxPitch:0,pitchWithRotate:!1,logoPosition:"bottom-right"});this.setState({map:t}),t.on("move",(function(){e.setState({lng:t.getCenter().lng.toFixed(4),lat:t.getCenter().lat.toFixed(4),zoom:t.getZoom().toFixed(2)})})),t.on("load",(function(){t.addSource("covid",{type:"geojson",data:"".concat(e.baseUrl,"/api/v1/br/cities.geojson")}),t.addSource("covid-cities-daily",{type:"geojson",data:"".concat(e.baseUrl,"/api/v1/br/cities-daily.geojson")}),t.on("moveend",(function(){e.updateVisibleCities()})),t.addLayer({id:"covid-heatmap-death",type:"heatmap",source:"covid",visibility:"none",paint:{"heatmap-weight":["interpolate",["linear"],["number",["get","newDeaths"]],0,0,20,1],"heatmap-intensity":["interpolate",["linear"],["zoom"],0,1,9,3],"heatmap-color":["interpolate",["linear"],["heatmap-density"],0,"rgba(255,237,68,0)",.1,"#ff9671",.15,"#ffc75f",.2,"#e24f4f",.4,"#c02f36",.6,"#9e001f",.8,"#7d0006",1,"#5e0000"],"heatmap-radius":["interpolate",["linear"],["zoom"],0,2,9,20],"heatmap-opacity":["interpolate",["linear"],["zoom"],7,1,15,0]}},"waterway-label"),t.addLayer({id:"covid-heatmap",type:"heatmap",source:"covid",paint:{"heatmap-weight":["interpolate",["linear"],["number",["get","newCases"]],0,0,20,1],"heatmap-intensity":["interpolate",["linear"],["zoom"],0,1,9,3],"heatmap-color":["interpolate",["linear"],["heatmap-density"],0,"rgba(255,237,68,0)",.05,"rgb(72,244,66)",.15,"rgb(68,102,237)",.4,"rgb(249,169,0)",.6,"rgb(255,52,45)",.8,"rgb(233,3,8)",1,"rgb(199,5,9)"],"heatmap-radius":["interpolate",["linear"],["zoom"],0,2,9,20],"heatmap-opacity":["interpolate",["linear"],["zoom"],7,1,15,0]}},"waterway-label"),t.addLayer({id:"covid-point",type:"circle",source:"covid-cities-daily",minzoom:8,paint:{"circle-radius":["interpolate",["linear"],["zoom"],7,["interpolate",["linear"],["number",["get","totalCases"]],1,1,6,4],16,["interpolate",["linear"],["number",["get","totalCases"]],1,5,6,50]],"circle-color":["interpolate",["linear"],["number",["get","totalCases"]],1,"rgba(33,102,172,0)",2,"rgb(178,24,43)"],"circle-stroke-color":"white","circle-stroke-width":1,"circle-opacity":["interpolate",["linear"],["zoom"],7,0,8,1]}},"waterway-label"),t.addLayer({id:"all-cities",type:"circle",source:"covid",minzoom:2.8,paint:{"circle-color":"rgba(0,0,0,0)","circle-stroke-width":0}})})),t.on("idle",(function(){e.onSourceLoadFinished&&!e.state.animate&&e.onSourceLoadFinished(),"loading"===e.state.loadState&&(e.setState({loadState:"loaded"}),e.updateVisibleCities())}))}}]),a}(n.Component),M=a(186),N=function(e){var t=e.children,a=e.url,n=e.text,i=e.style,o=e.target,s=void 0===o?"_blank":o;return t?r.a.createElement("a",{href:a,style:i,target:s},t):n?r.a.createElement("a",{href:a,style:i,target:s},n):r.a.createElement("a",{href:a,style:i,target:s},a)};function F(){return r.a.createElement("div",{className:"footer"},r.a.createElement("strong",{style:{fontSize:"1.2em"}},"Importante:"),r.a.createElement("p",null,r.a.createElement("strong",null,"Este \xe9 apenas um experimento em visualiza\xe7\xe3o de dados.")),r.a.createElement("p",null,"N\xe3o sou especialista em visualiza\xe7\xe3o de dados nem em dissemina\xe7\xe3o de doen\xe7as, ent\xe3o n\xe3o confie nos dados deste site, \xe9 apenas uma tentativa de visualizar a dissemina\xe7\xe3o da doen\xe7a e pode (certamente n\xe3o) corresponder com a realdade."),r.a.createElement("p",null,"Ent\xe3o lembre-se de considerar que qualquer dado pode parecer mais ou menos alarmante dependendo da forma como \xe9 apresentado e que eu n\xe3o tenho a compet\xeancia necess\xe1ria para availiar isso de forma totalmente correta."),r.a.createElement("p",null,"Sugest\xf5es ou corre\xe7\xf5es podem ser enviadas pelo GitHub (link a seguir)."),r.a.createElement("hr",null),r.a.createElement("p",null,r.a.createElement("strong",null,"Meu perfil no GitHub:  "),r.a.createElement(N,{url:"https://github.com/ALREstevam"})),r.a.createElement("p",null,r.a.createElement("strong",null,"Reposit\xf3rios deste projeto no GitHub:  "),r.a.createElement(N,{url:"https://github.com/ALREstevam/covid19-br-vis-back"}),r.a.createElement("span",null," e "),r.a.createElement(N,{url:"https://github.com/ALREstevam/covid19-br-vis-back"}),r.a.createElement("span",null,".")))}var I=a(187);function _(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return"string"===typeof e||e instanceof String?e:Number.isInteger(e)?e.toString():Number(e).toFixed(t).toString()}var A=function(e){var t=0;return function(a){return(t+=1)%e===0?(t=0,a):""}}(3),V=function(e){var t=e.data,a=e.colors,n=void 0===a?{scheme:"set3"}:a,i=e.stacked,o=void 0!==i&&i;return r.a.createElement(I.a,{data:t,margin:{top:50,right:60,bottom:100,left:60},tooltip:function(e){var a=0,n=Number.parseInt(e.point.id.split(".")[1]);n>0&&(a=t.filter((function(t){return t.id===e.point.serieId}))[0].data[n-1].y);var i=e.point.data.yFormatted-a,o=_(i);return o=i>=0?"+".concat(o):"".concat(o),r.a.createElement("div",{style:{color:e.point.serieColor,backgroundColor:"#fff",padding:"5px",border:"1px solid ".concat(e.point.borderColor),textAlign:"center",borderRadius:"5px",boxShadow:"5px 5px 10px -7px rgba(0,0,0,0.75)"}},r.a.createElement("strong",{style:{fontSize:".9em"}},e.point.data.xFormatted),r.a.createElement("br",null),r.a.createElement("span",null,e.point.serieId,": ",r.a.createElement("strong",null,e.point.data.yFormatted),r.a.createElement("span",null," (",o,")")))},xScale:{type:"time",format:"%Y-%m-%dT%H:%M:%S"},xFormat:"time:%m/%d",yFormat:_,curve:"natural",yScale:{type:"linear",min:0,max:"auto",stacked:o,reverse:!1},axisTop:null,axisRight:null,axisBottom:{orient:"bottom",tickSize:5,tickPadding:5,tickRotation:0,legend:"Tempo",legendOffset:36,legendPosition:"middle",format:"%d/%m"},axisLeft:{legend:"Pessoas",orient:"left",tickSize:5,tickPadding:5,tickRotation:0,legendOffset:-40,legendPosition:"middle"},colors:n,pointSize:10,pointColor:{theme:"background"},pointBorderWidth:2,pointBorderColor:{from:"serieColor"},enablePointLabel:!0,pointLabel:function(e){return A(_(e.y,4))},pointLabelYOffset:-12,useMesh:!0,legends:[{anchor:"bottom-left",direction:"row",justify:!1,translateX:0,translateY:90,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:80,itemHeight:20,itemOpacity:.75,symbolSize:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}]})},R=function(e){var t=Object.keys(e).sort((function(e,t){return new Date(e)-new Date(t)})).map((function(t){return e[t].reduce((function(e,a){return{date:t,deaths:e.deaths+a.deaths,newCases:e.newCases+a.newCases,newDeaths:e.newDeaths+a.newDeaths,totalCases:e.totalCases+a.totalCases}}),{date:void 0,deaths:0,newCases:0,newDeaths:0,totalCases:0})})),a={id:"Casos",color:"#61cdbb",data:t.map((function(e){return{x:e.date,y:e.totalCases}}))},n={id:"\xd3bitos",color:"#f47560",data:t.map((function(e){return{x:e.date,y:e.deaths}}))};function r(e){var t,a=[],n=[],r=Object(y.a)(e);try{for(r.s();!(t=r.n()).done;){var i=t.value;if(n.push(i),2===n.length){var o=0===n[0].y?1:n[1].y/n[0].y;a.push({x:i.x,y:o}),n=[i]}}}catch(s){r.e(s)}finally{r.f()}return a}return{deaths:n,cases:a,casesGrowthFactor:{id:"Fator de crescimento - casos",color:"#f47560",data:r(a.data)},deathGrowthFactor:{id:"Fator de crescimento - \xf3bitos",color:"#f47560",data:r(n.data)}}},H=function(e,t){if(0===Object.keys(e).length)return t;var a=e[Object.keys(e)[0]],n=Array.from(new Set(a.map((function(e){return e.state}))));if(a.length>350||n.length>=25)return"todo o Brasil";if(a.length>40){var r=n.slice(0,3);return n.length-3>1?"parte de "+r.join(", ")+" e outros "+(n.length-3)+" estados":n.length-3===1?"parte de "+r.join(", ")+" e outro estado":3===r.length?r.join(", "):2===r.length?r.join(" e "):r[0]}var i=a.map((function(e){return e.city})).filter((function(e){return"CASO SEM LOCALIZA\xc7\xc3O DEFINIDA"!==e})),o=i.slice(0,3);return i.length-3>1?o.join(", ")+" e outras "+(i.length-3)+" cidades":i.length-3===1?o.join(", ")+" e outra cidade":3===o.length?o.join(", "):2===o.length?o.join(" e "):o[0]},U=function(){return r.a.createElement("div",{className:"scrollButtons"},r.a.createElement("div",{className:"scrollButton",onClick:function(){document.documentElement.scrollTop=document.body.scrollTop=(window.pageYOffset||document.documentElement.scrollTop)-500}},"\u02c4"),r.a.createElement("div",{className:"scrollButton",onClick:function(){document.documentElement.scrollTop=document.body.scrollTop=(window.pageYOffset||document.documentElement.scrollTop)+500}},"\u02c5"))},K=function(){return r.a.createElement("div",{className:"nivoCharts"},r.a.createElement("h3",null,"Fator de crescimento"),r.a.createElement("p",null,"O ",r.a.createElement("strong",null,"Fator de Crescimento")," (ou ",r.a.createElement("em",null,"Growth Factor"),") \xe9 calculado pela divis\xe3o ",r.a.createElement("code",null,"ValorDia/ValorDiaAnterior")," e reflete o crescimento di\xe1rio no n\xfamero de casos e \xf3bitos computados:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("code",null,"Fator de Crescimento",r.a.createElement("strong",null," > "),"0"),": o valor referido aumentou desde o \xfaltimo dia"),r.a.createElement("li",null,r.a.createElement("code",null,"Fator de Crescimento",r.a.createElement("strong",null," < "),"0"),": o valor referido diminuiu desde o \xfaltimo dia"),r.a.createElement("li",null,r.a.createElement("code",null,"Fator de Crescimento",r.a.createElement("strong",null," \u2248 "),"0"),": o valor referido n\xe3o mudou significativamente desde o \xfaltimo dia")),r.a.createElement("p",null,"O fator de crescimento \xe9 uma importante m\xe9trica na avalia\xe7\xe3o da dissemina\xe7\xe3o da doen\xe7a e ocorr\xeancia de mortes, mas \xe9 totalmente dependente da testagem em massa da popula\xe7\xe3o e da confirma\xe7\xe3o da causa dos \xf3bitos onde h\xe1 suspeita de COVID-19, assim, um aumento ou diminui\xe7\xe3o neste fator pode ocorrer caso a quantidade de testes realizados mude e n\xe3o somente se a quantidade de pessoas infectadas ou \xf3bitos confirmados se alterar."))},W=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).complete=function(){n.setState({loadingBarProgress:100}),n.clearIntervals()},n.onMapLoadedHandler=function(){n.complete(),n.updatePlots()},n.onLoaderFinished=function(){n.setState({loadingBarProgress:0})},n.infiniteLoad=function(){n.setState({loadingBarProgress:n.state.loadingBarProgress+Math.round(5+5*Math.random())}),n.timers.push(setInterval((function(){n.setState({loadingBarProgress:n.state.loadingBarProgress+Math.round(5*Math.random())})}),1200))},n.visibleCitiesChangeHandler=function(){var e=Object(d.a)(c.a.mark((function e(t,a){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({visibleCities:t,visibleCitiesPerDate:a}),n.updatePlots();case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.updatePlots=Object(d.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({perDayChartData:R(n.state.visibleCitiesPerDate),perDateChartName:"COVID-19 em "+H(n.state.visibleCitiesPerDate,"todo o Brasil")});case 1:case"end":return e.stop()}}),e)}))),n.selectedDateChangedHandler=function(e){n.setState({selectedDate:e})},n.state={covidCasesGeoJson:void 0,covidCasesJson:void 0,loadingBarProgress:0,visibleCities:[],visibleCitiesPerDate:{},selectedDate:new Date,perDayChartData:R({}),perDateChartName:"COVID-19 em todo o Brasil"},n.timers=[],n}return Object(u.a)(a,[{key:"clearIntervals",value:function(){var e,t=Object(s.a)(this.timers);try{for(t.s();!(e=t.n()).done;){var a=e.value;clearInterval(a)}}catch(n){t.e(n)}finally{t.f()}}},{key:"add",value:function(e){this.setState({loadingBarProgress:this.state.loadingBarProgress+e})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(M.a,{progress:this.state.loadingBarProgress,height:3,color:"red",onLoaderFinished:this.onLoaderFinished}),r.a.createElement(U,null),r.a.createElement(B,{style:{right:0,left:0,height:"95vh",width:"100%"},data:this.state.covidCasesGeoJson,zoom:3,lat:-13.5958,lng:-54.4587,onSourceLoadBegin:this.infiniteLoad,onSourceLoadFinished:this.onMapLoadedHandler,onVisibleCitiesChange:this.visibleCitiesChangeHandler,onSelectedDateChanged:this.selectedDateChangedHandler}),r.a.createElement("div",{className:"nivoCharts"},r.a.createElement("h2",null,this.state.perDateChartName),r.a.createElement("h3",null,"Casos e \xf3bitos"),r.a.createElement("div",{style:{width:"100%",height:"100vh"}},r.a.createElement(V,{data:[this.state.perDayChartData.deaths,this.state.perDayChartData.cases],colors:["#fa4343","#0068d2"],stacked:!0})),r.a.createElement("h3",null,"\xd3bitos"),r.a.createElement("div",{style:{width:"100%",height:"50vh"}},r.a.createElement(V,{data:[this.state.perDayChartData.deaths],colors:["#fa4343"]})),r.a.createElement(K,null),r.a.createElement("div",{style:{width:"100%",height:"80vh"}},r.a.createElement(V,{data:[this.state.perDayChartData.casesGrowthFactor],colors:["#00d3eb"]})),r.a.createElement("div",{style:{width:"100%",height:"80vh"}},r.a.createElement(V,{data:[this.state.perDayChartData.deathGrowthFactor],colors:["#ff6a7f"]}))),r.a.createElement(F,null))}},{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){this.clearIntervals()}}]),a}(n.Component);var G=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(W,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[239,1,2]]]);
//# sourceMappingURL=main.30b5f5ca.chunk.js.map