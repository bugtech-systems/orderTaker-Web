(this["webpackJsonpaja-pos"]=this["webpackJsonpaja-pos"]||[]).push([[6],{1649:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(5),o=a(0),l=a.n(o),c=a(50),i=a(223),m=a(1480),s=a(23),d=a.n(s),u=a(308),p=a(20),g=a(66),b=(a(1622),a(1625),a(125)),f=(d()((function(){return{cardRoot:{position:"relative",paddingLeft:95,minHeight:120,display:"flex",flexDirection:"column",justifyContent:"center","&:hover":{boxShadow:"0px 12px 17px rgba(0, 0, 0, 0.14), 0px 5px 22px rgba(0, 0, 0, 0.12), 0px 7px 8px rgba(0, 0, 0, 0.2)","& $iconThumb":{width:95,height:"100%",borderRadius:0},"& $hoverContent":{transform:"translate(-10px, -50%)"}}},cardContent:{padding:20},iconWrapper:{position:"absolute",left:0,top:0,zIndex:1,width:95,height:"100%",display:"flex",justifyContent:"center",alignItems:"center"},iconThumb:{width:56,height:56,transition:"all 0.3s ease",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center"},hoverContent:{position:"absolute",top:"50%",right:0,zIndex:1,padding:10,transform:"translate(100%, -50%)",transition:"all 0.3s ease"}}})),a(813),a(75)),E=a(1619),h=a.n(E),y=(a(208),a(82)),v=a(207),x=(a(748),a(48)),O=a(46),j=a(306),C=a(31),S=(Object(j.a)((function(e){return{cardRoot:{position:"relative","& .Cmt-root-avatar-group":{position:"relative",marginLeft:-4}},subTitleRoot:{fontSize:12,color:e.palette.text.disabled,marginBottom:0,marginTop:4},productView:{backgroundColor:Object(C.a)(e.palette.common.dark,.04),padding:"8px 24px",marginLeft:-24,marginRight:-24,display:"flex",alignItems:"center",marginTop:-10},updateProductListScrollbar:{height:240,padding:"8px 24px 8px 8px"},listItem:{display:"flex",alignItems:"center",marginBottom:8,"&:last-child":{marginBottom:0}},listItemTitle:{marginLeft:8},collapseRoot:{color:e.palette.text.primary,"& g.recharts-layer":{fill:e.palette.text.primary}}}})),a(6)),w=a(1587),R=a(1592),k=a(1591),N=a(1588),I=a(1589),A=(a(887),a(564)),P=(a(92),a(1617)),T=a.n(P),L=(a(1618),a(225),a(77)),z=a.n(L),D=a(4),B=(Object(j.a)((function(e){return{scrollbarRoot:Object(S.a)({height:350,marginLeft:-24,marginRight:-24},e.breakpoints.up("xl"),{height:269}),tableRowRoot:{position:"relative",transition:"all .2s",borderTop:"solid 1px ".concat(e.palette.borderColor.main),"&:hover":{backgroundColor:Object(C.a)(e.palette.primary.main,.08),transform:"translateY(-4px)",boxShadow:"0 3px 10px 0 ".concat(Object(C.a)(e.palette.common.dark,.2)),borderTopColor:"transparent","& $tableCellRoot":{color:e.palette.text.primary,"&:last-child":{color:e.palette.error.main},"&.success":{color:e.palette.success.main}}},"&:last-child":{borderBottom:"solid 1px ".concat(e.palette.borderColor.main)}},tableCellRoot:{paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5,fontSize:14,letterSpacing:.4,color:e.palette.common.dark,borderBottom:"0 none","&:first-child":{paddingLeft:24},"&:last-child":{textAlign:"right",paddingRight:24}},tableRowCellRoot:{fontSize:12,"&:last-child":{paddingRight:64}},blockRoot:{display:"block",fontSize:14}}})),a(253)),F=(a(1607),a(565)),_=(a(226),a(1567),a(609),a(1558)),H=a(1626),W=a.n(H),M=d()((function(e){return{agentItemsRoot:{paddingLeft:10,paddingRight:10},cardRoot:{width:225,margin:2,marginTop:28,backgroundColor:e.palette.background.paper,boxShadow:"0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14)",borderRadius:e.overrides.MuiCard.root.borderRadius,padding:"34px 16px 20px 16px",position:"relative"},titleRoot:{color:e.palette.common.dark,letterSpacing:.25,marginBottom:6},starIconActive:{color:e.palette.warning.main,fontSize:20,marginRight:3},starIcon:{color:e.palette.grey[400],fontSize:20,marginRight:3},avatarView:{position:"absolute",left:16,top:-28,zIndex:1},avatar:{width:56,height:56,border:"solid 2px ".concat(e.palette.grey[400])}}})),Y=function(e){var t=e.item,a=M();return l.a.createElement(u.a,{className:a.agentItemsRoot},l.a.createElement(u.a,{className:a.cardRoot},l.a.createElement(u.a,{className:a.avatarView},t.profilePic?l.a.createElement(O.a,{className:a.avatar,src:t.profilePic,alt:t.name}):l.a.createElement(O.a,{className:a.avatar,color:"primary",alt:t.name},t.name.charAt(0).toUpperCase())),l.a.createElement(v.a,{component:"div",variant:"h5",className:a.titleRoot},t.name),l.a.createElement(u.a,{display:"flex",alignItems:"center"},l.a.createElement(W.a,{className:t.starred?a.starIconActive:a.starIcon}),l.a.createElement(u.a,{component:"p",color:"text.secondary",fontSize:12},"Balance: \u20b1","".concat(t.balance)))))},$=function(e){var t=e.unpaidCustomers;return l.a.createElement(z.a,{style:{width:"100%"}},l.a.createElement(x.a,{data:t,style:{display:"flex",flexDirection:"row",marginLeft:-10,marginRight:-10},renderRow:function(e,t){return l.a.createElement(Y,{key:t,item:e})}}))},V=a(1627),K=a.n(V),U=d()((function(e){return{cardRoot:{backgroundColor:"transparent",boxShadow:"none"},cardHeaderRoot:Object(S.a)({padding:0,paddingBottom:30},e.breakpoints.down("xs"),{"& .Cmt-action-default-menu button":{fontSize:11,"& .MuiSvgIcon-root":{fontSize:20}}})}})),G=function(e){var t=e.unpaidCustomers,a=e.count,n=U();return l.a.createElement(g.a,{className:n.cardRoot},l.a.createElement(f.a,{className:n.cardHeaderRoot,title:a>0?"Unpaid Customers (".concat(a,")"):"",titleProps:{variant:"h4",component:"div"}},l.a.createElement(F.a,{component:b.b,to:"/Customers",color:"primary"},l.a.createElement(u.a,{component:"span",mr:2},"Go to Customers list"),l.a.createElement(K.a,null))),l.a.createElement($,{unpaidCustomers:t}))},J=a(227),q=(d()((function(e){return{tableCellRoot:{paddingLeft:6,paddingRight:6,paddingTop:0,paddingBottom:12,fontSize:12,letterSpacing:.4,color:e.palette.common.dark,fontWeight:e.typography.fontWeightRegular,borderBottom:"0 none","&:first-child":{paddingLeft:24},"&:last-child":{textAlign:"right",paddingRight:24}}}})),a(1616)),X=[{id:"order_no",numeric:!1,disablePadding:!1,label:"Order #"},{id:"amount_due",numeric:!0,disablePadding:!1,label:"Total Amount"},{id:"recordedAt",numeric:!1,disablePadding:!1,label:"Date"},{id:"amount_payable",numeric:!0,disablePadding:!1,label:"Amount Payable",align:"right"}];var Q=l.a.memo((function(e){var t=e.classes,a=(e.onSelectAllClick,e.order),n=e.orderBy,r=e.onRequestSort;return l.a.createElement(w.a,null,l.a.createElement(N.a,null,X.map((function(e){return l.a.createElement(I.a,{key:e.id,align:e.align?e.align:e.numeric?"center":"left",padding:e.disablePadding?"none":"normal",sortDirection:n===e.id&&a},l.a.createElement(q.a,{active:n===e.id,direction:n===e.id?a:"asc",onClick:(o=e.id,function(e){r(e,o)})},e.label,n===e.id?l.a.createElement("span",{className:t.visuallyHidden},"desc"===a?"sorted descending":"sorted ascending"):null));var o}))))})),Z=a(1628),ee=a.n(Z),te=a(1647),ae=(a(814),a(17)),ne=(a(895),a(7)),re=a(9),oe=a(30),le=Object(j.a)((function(e){return{tableRowRoot:{position:"relative",transition:"all .2s",borderTop:"solid 1px ".concat(e.palette.borderColor.main),"&:hover, &.active":{backgroundColor:Object(C.a)(e.palette.primary.main,.08),"& $tableCellRoot, & $titleRoot":{color:e.palette.text.primary},"& $showContent":{width:0},"& $hideContent":{transform:"translateX(0)",width:"100%"}},"&:last-child":{borderBottom:"solid 1px ".concat(e.palette.borderColor.main)},"&:hover":{transform:"translateY(-4px)",boxShadow:"0 3px 10px 0 ".concat(Object(C.a)(e.palette.common.dark,.2)),borderTopColor:"transparent"},"&.collapse-table-row":{borderTop:"0 none","& $tableCellRoot":{padding:0}},"&.active":{borderTop:"0 none","&:hover":{transform:"none",boxShadow:"none"}}},tableCellRoot:{padding:6,fontSize:14,letterSpacing:.25,color:e.palette.text.secondary,borderBottom:"0 none",position:"relative","&:first-child":{paddingLeft:24},"&:last-child":{textAlign:"right",paddingRight:24}},tableCellFirst:{width:"50%"},tableCellSecond:{width:"25%"},tableCellHideShow:{width:"25%"},titleRoot:{color:e.palette.text.secondary,letterSpacing:.25},hideShowContent:{display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",overflow:"hidden",position:"relative"},showContent:{transition:"all 0.3s ease-in-out",width:"100%",overflow:"hidden",position:"absolute",right:0},hideContent:{transition:"all 0.3s ease-in-out",transform:"translateX(110%)",overflow:"hidden"},hideShowLink:{cursor:"pointer"},collapseTable:{paddingLeft:60,"& td":{color:e.palette.text.secondary,fontSize:12,letterSpacing:.4,padding:0,borderBottom:"0 none"}},openDataRot:{color:e.palette.text.secondary,fontSize:12,letterSpacing:.4,paddingLeft:63,textAlign:"left",paddingBottom:10,marginTop:-15}}})),ce=function(e){var t=e.row,a=le(),c=Object(ne.d)(),i={weekday:"long",year:"numeric",month:"long",day:"numeric"},m=Object(o.useState)(!1),s=Object(r.a)(m,2),d=s[0],p=s[1],g=Object(o.useState)([]),b=Object(r.a)(g,2),f=b[0],E=b[1],h=Object(o.useState)(null),y=Object(r.a)(h,2),x=y[0],O=y[1],j=function(e){t&&t.customers&&0!==t.customers.length?(c(Object(oe.j)(t.customers[0])),c({type:re.bb,payload:Object(n.a)(Object(n.a)({},t),{},{customerId:t.customers[0].id,cart_items:t.order_items})})):c({type:re.bb,payload:Object(n.a)(Object(n.a)({},t),{},{customerId:null,cart_items:t.order_items})}),localStorage.removeItem("cart"),c({type:re.u,payload:"cart"}),c({type:re.t,payload:e}),c({type:re.D,payload:!0})};return Object(o.useEffect)((function(){if(t&&t.payments){var e=t.payments.sort((function(e,t){return Number(t.id)-Number(e.id)}));E(e)}t.customers&&0!==t.customers.length&&O(t.customers[0])}),[t]),l.a.createElement(l.a.Fragment,null,l.a.createElement(N.a,{className:Object(D.a)(a.tableRowRoot,d?"active":"")},l.a.createElement(I.a,{className:Object(D.a)(a.tableCellRoot,a.tableCellSecond)},l.a.createElement(v.a,null,t.order_no)),l.a.createElement(I.a,{align:"center",className:Object(D.a)(a.tableCellRoot,a.tableCellSecond)},"\u20b1",t.amount_due),l.a.createElement(I.a,{className:Object(D.a)(a.tableCellRoot,a.tableCellSecond)},t.recordedAt),l.a.createElement(I.a,{className:Object(D.a)(a.tableCellRoot,a.tableCellHideShow),onClick:function(){return p(!d)}},l.a.createElement("div",{className:a.hideShowContent},l.a.createElement("div",{className:a.showContent},"\u20b1",t.amount_payable),l.a.createElement(u.a,{className:Object(D.a)(a.hideContent,a.hideShowLink),color:"primary.main",display:"flex",alignItems:"center",justifyContent:"flex-end"},l.a.createElement("span",{style:{fontWeight:700},className:"mr-2"},d?"HIDE":"DETAIL"),d?l.a.createElement(te.a,{fontSize:"small"}):l.a.createElement(ee.a,{fontSize:"small"}))))),l.a.createElement(N.a,{className:Object(D.a)(a.tableRowRoot,d?"active":"collapse-table-row")},l.a.createElement(I.a,{className:a.tableCellRoot,colSpan:12},l.a.createElement(_.a,{in:d,timeout:"auto",unmountOnExit:!0},l.a.createElement("div",{className:a.openDataRot},l.a.createElement("br",null),x&&l.a.createElement("div",{style:{display:"flex",alignItems:"center",marginBottom:"5px"}},l.a.createElement("div",null,l.a.createElement(v.a,{color:"primary",component:"spane"},"Customer Name:")),"\xa0\xa0\xa0",l.a.createElement("div",{className:"mr-3"},l.a.createElement(v.a,{component:"span"},x.name))),0!==f.length?l.a.createElement(l.a.Fragment,null,l.a.createElement("h4",{style:{marginBottom:"10px"}},"Payment History:"),f.map((function(e,t){return l.a.createElement("div",{key:e.id+t,style:{display:"flex",alignItems:"flex-start",flexDirection:"column",margin:"5px"}},l.a.createElement("div",{className:"mr-3"},"Order Date: \xa0\xa0",l.a.createElement(u.a,{component:"span",fontWeight:"fontWeightRegular",color:"text.primary"},new Date(e.createdAt).toLocaleDateString("en-US",i))),l.a.createElement("div",{className:"mr-3"},l.a.createElement("b",null,"Amount:")," \xa0\xa0",l.a.createElement(u.a,{component:"span",fontWeight:"fontWeightRegular",color:"text.primary"},new Intl.NumberFormat("ja-JP",{style:"currency",currency:"PHP"}).format(e.amount))),l.a.createElement("hr",null))})),l.a.createElement("br",null),l.a.createElement("div",{style:{marginLeft:"auto"}},l.a.createElement(F.a,{size:"small",variant:"contained",color:"primary",onClick:function(){return j("unpaid")}},"Pay Now"))):l.a.createElement(u.a,{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},l.a.createElement("h3",{style:{textAlign:"center",margin:"5px"}},"No Recent Payments"),l.a.createElement("br",null),l.a.createElement(F.a,{size:"small",variant:"contained",color:"primary",onClick:function(){return j("unpaid")}},"Pay Now")))))))},ie=Object(j.a)((function(e){return{root:{width:"100%"},paper:{width:"100%",marginBottom:e.spacing(4),backgroundColor:Object(C.f)(e.palette.background.paper,.1)},container:{maxHeight:415},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}})),me=a(512),se=function(e){var t=e.data,a=ie(),n=Object(o.useState)("desc"),c=Object(r.a)(n,2),i=c[0],m=c[1],s=Object(o.useState)("order_no"),d=Object(r.a)(s,2),u=d[0],p=d[1];return l.a.createElement("div",{className:"Cmt-table-responsive"},l.a.createElement(k.a,null,l.a.createElement(Q,{classes:a,order:i,orderBy:u,onRequestSort:function(e,t){var a=u===t&&"asc"===i;p(t),m(a?"desc":"asc")}}),l.a.createElement(R.a,null,0!==t.length&&Object(me.b)(t,Object(me.a)(i,u)).map((function(e){return l.a.createElement(ce,{row:e,key:e.id})})))))},de=d()((function(e){return{cardRoot:Object(S.a)({},e.breakpoints.down("xs"),{"& .Cmt-header-root":{flexDirection:"column"},"& .Cmt-action-default-menu":{marginLeft:0}}),cardContentRoot:{padding:0,marginTop:"-30px"},scrollbarRoot:{height:275}}})),ue=function(e){var t=e.unpaidOrders,a=de(),n=Object(o.useState)([]),c=Object(r.a)(n,2),i=c[0],m=c[1],s=Object(o.useState)([]),d=Object(r.a)(s,2),p=d[0],b=d[1];return Object(o.useEffect)((function(){var e=t.filter((function(e){return String(e.order_no).toLowerCase().trim("").includes(String(p).toLowerCase())||String(e.recordedAt).toLowerCase().trim("").includes(String(p).toLowerCase())||String(e.amount_payable).toLowerCase().trim("").includes(String(p).toLowerCase())||String(e.amount_due).toLowerCase().trim("").includes(String(p).toLowerCase())||String(e.amount_payable).toLowerCase().trim("").includes(String(p).toLowerCase())||e.customers&&e.customers[0]&&String(e.customers[0].name).toLowerCase().trim("").includes(String(p).toLowerCase())}));m(e)}),[p,t]),l.a.createElement(g.a,{className:a.cardRoot},l.a.createElement(f.a,{className:"pt-4",title:l.a.createElement(u.a,{width:"100%",display:"flex",justifyContent:"space-between"},l.a.createElement(v.a,{color:"primary"},"Unpaid Orders"),l.a.createElement(J.a,{onChange:function(e){return b(e.target.value)},value:p,border:!1,onlyIcon:!0})),titleProps:{variant:"h4",component:"div"}}),l.a.createElement(y.a,{className:a.cardContentRoot},l.a.createElement(z.a,{className:a.scrollbarRoot},l.a.createElement(se,{data:i}))))},pe=a(811),ge=a(119),be=a(1615),fe=a(18),Ee=function(){var e=Object(ne.e)((function(e){return e.dashboard})),t=Object(ne.e)((function(e){return e.cartApp})),a=l.a.useState(0),c=Object(r.a)(a,2),i=(c[0],c[1],Object(o.useState)([10])),m=Object(r.a)(i,2),s=(m[0],m[1],Object(o.useState)([])),d=Object(r.a)(s,2),p=d[0],E=d[1];Object(o.useEffect)((function(){var a=e.popularProducts,r=t.cart_items,o=a.map((function(e){var t=r.find((function(t){return t.productId===e.id}));return t?Object(n.a)(Object(n.a)({},e),{},{stocks:t.stocks}):e}));E(o)}),[e,t]);var h=Object(ne.d)(),v=Object(ne.e)((function(e){return e.productApp})).filterType,x=Object(ne.e)((function(e){return e.dashboard})).popularProducts;return Object(o.useEffect)((function(){h(Object(fe.i)())}),[]),l.a.createElement(g.a,null,l.a.createElement(f.a,{className:"pt-4",title:"Popular Products",titleProps:{variant:"h4",component:"div"}},l.a.createElement(u.a,{clone:!0},l.a.createElement(F.a,{component:b.b,to:"/products",color:"primary"},l.a.createElement("span",{className:"ml-2"},"Go to Products list")))),l.a.createElement(y.a,{style:{height:"400px",overflow:"auto"}},l.a.createElement(ge.a,{itemPadding:10,responsive:{xs:1,sm:1,md:2,lg:2,xl:3},data:p,renderRow:function(e,t){return l.a.createElement(pe.a,{pageSize:5,key:t,item:e,product:e})}}),l.a.createElement(be.a,{rowsPerPageOptions:[10,25,50],component:"div",count:x.length,rowsPerPage:v.rowsPerPage,page:v.page,onPageChange:function(e,t){h(Object(fe.r)(Object(n.a)(Object(n.a)({},v),{},{page:t}))),h(Object(fe.o)(Object(n.a)(Object(n.a)({},v),{},{page:t})))},onRowsPerPageChange:function(e){h(Object(fe.r)(Object(n.a)(Object(n.a)({},v),{},{page:0,rowsPerPage:parseInt(e.target.value,10)}))),h(Object(fe.o)(Object(n.a)(Object(n.a)({},v),{},{page:0,rowsPerPage:parseInt(e.target.value,10)})))}})))},he=a(1629),ye=a.n(he),ve=a(1630),xe=a.n(ve),Oe=a(1620),je=a.n(Oe),Ce=a(230),Se=Object(j.a)((function(e){return{cardRoot:{height:"auto",overflow:"hidden",position:"relative","& .Cmt-card-content":{paddingTop:16}},cardHeader:{backgroundColor:e.palette.primary.main,color:e.palette.common.white,paddingTop:16},iconBtn:{color:e.palette.common.white},listContainer:{display:"flex",flexDirection:"column",height:"500px"},listContainerA:{display:"flex",flexDirection:"column",height:"400px"},menuActive:{backgroundColor:Object(C.a)(e.palette.common.dark,.2)},scrollbarRoot:{flex:1,flexGrow:1,marginRight:-24,marginLeft:-24,marginTop:-10,paddingTop:10},eventItemRoot:{position:"relative",padding:"10px 24px",transition:"all .2s","& .Cmt-media-image":{alignSelf:"flex-start"},"&:hover, &.checked":{"& $titleRoot, & $subTitleRoot":{color:e.palette.text.disabled}},"&:hover":{cursor:"pointer",backgroundColor:Object(C.a)(e.palette.primary.main,.1),transform:"translateY(-4px)",boxShadow:"0 3px 10px 0 ".concat(Object(C.a)(e.palette.common.dark,.2))}},titleRoot:{fontWeight:e.typography.fontWeightRegular,marginBottom:4},subTitleRoot:{fontSize:12,letterSpacing:.4},eventTitle:{color:e.palette.text.disabled,fontSize:10,letterSpacing:1.5,textTransform:"uppercase",marginBottom:10},btnRoot:Object(S.a)({textTransform:"capitalize",fontWeight:e.typography.fontWeightRegular},e.breakpoints.up("sm"),{fontSize:16})}})),we=a(573),Re=a.n(we),ke=(a(107),function(e){var t=e.item,a=Object(ne.d)(),r=Se();return l.a.createElement(u.a,{className:Object(D.a)(r.eventItemRoot,{checked:t.isPaid}),onClick:function(){return(e=t)&&e.customers&&0!==e.customers.length&&(console.log(e),a(Object(oe.j)(e.customers[0])),a({type:re.bb,payload:Object(n.a)(Object(n.a)({},e),{},{customerId:e.customers[0].id})})),localStorage.removeItem("cart"),a({type:re.bb,payload:Object(n.a)(Object(n.a)({},e),{},{cart_items:e.order_items})}),a({type:re.u,payload:"cart"}),a({type:re.t,payload:e.isPaid?"paidCart":"viewCart"}),void a({type:re.D,payload:!0});var e}},l.a.createElement(Ce.a,{avatarPos:"center",title:t.order_no,titleProps:{variant:"h4",component:"div",className:r.titleRoot},subTitle:l.a.createElement(v.a,{className:r.subTitleRoot},l.a.createElement(u.a,{component:"span"},"TOTAL: "),"\xa0",l.a.createElement("strong",null,"\u20b1",t.amount_due),l.a.createElement(u.a,{component:"span",mx:2},"|"),"Customer:",l.a.createElement(u.a,{component:"span",color:"primary.main",ml:1},t.customers[0]?t.customers[0].name:"-")),actionsComponent:"paid"===String(t.order_status).toLowerCase()||t.isPaid?l.a.createElement(u.a,{color:"success.main"},l.a.createElement(je.a,null)):"cancelled"===String(t.order_status).toLowerCase()?l.a.createElement(u.a,null,l.a.createElement(Re.a,{color:"secondary",fontSize:"small"})):!t.isPaid&&l.a.createElement(u.a,null,l.a.createElement(je.a,null))}))}),Ne=a(1631),Ie=a.n(Ne),Ae=a(143),Pe=a(10),Te=a(1586),Le=a(1585),ze=a(561),De=a(563),Be=a(1501),Fe=a.n(Be),_e=a(286),He=a.n(_e),We=Object(Pe.a)({paper:{border:"1px solid #d3d4d5"}})((function(e){return l.a.createElement(ze.a,Object.assign({elevation:0,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},e))}));Object(Pe.a)((function(e){return{}}))(De.a);function Me(e){var t=e.handleFilter,a=e.active,n=l.a.useState(null),o=Object(r.a)(n,2),c=o[0],i=o[1],m=Se(),s=function(e){t(e),d()},d=function(){i(null)};return l.a.createElement("div",null,l.a.createElement(A.a,{className:m.iconBtn,size:"small","aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){i(e.currentTarget)}},l.a.createElement(Fe.a,null)),l.a.createElement(We,{id:"customized-menu",anchorEl:c,keepMounted:!0,open:Boolean(c),onClose:d},l.a.createElement(De.a,{className:"all"===a?m.menuActive:"",onClick:function(){return s("all")}},l.a.createElement(Te.a,null,l.a.createElement(u.a,{p:1},l.a.createElement(He.a,{color:"primary",fontSize:"small"}))),l.a.createElement(Le.a,{primary:" All"})),l.a.createElement(De.a,{className:"paid"===a?m.menuActive:"",onClick:function(){return s("paid")}},l.a.createElement(Te.a,null,l.a.createElement(u.a,{color:"success.main",p:1},l.a.createElement(je.a,{fontSize:"small"}))),l.a.createElement(Le.a,{primary:"Paid"})),l.a.createElement(De.a,{className:"unpaid"===a?m.menuActive:"",onClick:function(){return s("unpaid")}},l.a.createElement(Te.a,null,l.a.createElement(u.a,{p:1},l.a.createElement(je.a,{fontSize:"small"}))),l.a.createElement(Le.a,{primary:"Unpaid"})),l.a.createElement(De.a,{className:"cancelled"===a?m.menuActive:"",onClick:function(){return s("cancelled")}},l.a.createElement(Te.a,null,l.a.createElement(u.a,{p:1},l.a.createElement(Re.a,{color:"secondary",fontSize:"small"}))),l.a.createElement(Le.a,{primary:"Cancelled"}))))}var Ye=function(e){var t=e.setDateCounter,a=e.dateCounter,c=(e.filter,e.setFilter),i=(Object(ne.e)((function(e){return e.orderApp})).orders,Object(ne.e)((function(e){return e.auth})).isAdmin),m=Object(ne.d)(),s=Se(),d=Object(o.useState)([]),p=Object(r.a)(d,2),b=p[0],E=p[1],h=Object(o.useState)(Object(ae.d)(a,"DD MMM, YYYY, hh:mm a")),O=Object(r.a)(h,2),j=O[0],C=O[1],S=function(e,t){var a;a=e.filter((function(e){return Object(ae.g)(e.createdAt,t)})),E(a)},w=function(e){var a=Object(ae.d)(e,"DD MMM, YYYY, hh:mm a");t(e),C(a),m(Object(Ae.c)({dateCounter:e})).then((function(e){S(e,a)})).catch((function(e){console.log(e)}))};return Object(o.useEffect)((function(){w(0)}),[]),l.a.createElement(g.a,{className:s.cardRoot},l.a.createElement(f.a,{className:s.cardHeader,title:function(){var e=Object(ae.b)(j),t=Object(ae.g)(new Date,j);return l.a.createElement(u.a,{display:"flex",flexDirection:"column"},l.a.createElement(u.a,{display:"flex",color:"common.white",alignItems:"baseline"},l.a.createElement(u.a,{component:"span",mr:2,fontSize:{xs:26,md:36,xl:48},lineHeight:1,fontWeight:"fontWeightBold"},e.date.date),t&&l.a.createElement(u.a,{component:"span",fontSize:16},e.time)),l.a.createElement(u.a,{display:"flex",mt:1,color:"common.white"},l.a.createElement(u.a,{mr:1},e.day,","),l.a.createElement(u.a,null,e.date.month+" "+e.date.year)))}(),backgroundColor:["rgba(255, 255, 255, 0.3)","rgba(0, 0, 0, 0.3)"]},l.a.createElement(u.a,{display:"flex",alignItems:"center",color:"common.white",mt:-5},l.a.createElement(A.a,{className:s.iconBtn,size:"small",onClick:function(){return w(a-1)}},l.a.createElement(ye.a,null)),l.a.createElement(u.a,{component:"span",mx:2,onClick:function(){return w(0)},className:"pointer"},"SALES"),l.a.createElement(A.a,{className:s.iconBtn,size:"small",onClick:function(){return w(a+1)}},l.a.createElement(xe.a,null))),l.a.createElement(u.a,{display:"flex",alignItems:"center",color:"common.white",mt:-5},l.a.createElement(Me,{handleFilter:function(e){var t={};if("all"===e)return w(a);"paid"===e&&(t.isPaid=!0),"unpaid"===e&&(t.isPaid=!1,t.searchText="Unpaid"),"cancelled"===e&&(t.searchText="Cancelled",t.isPaid=!1),c(e),m(Object(Ae.c)(Object(n.a)({dateCounter:a},t))).then((function(e){S(e,j),console.log(e)})).catch((function(e){console.log(e)}))}}))),l.a.createElement(y.a,{className:i?s.listContainerA:s.listContainer},l.a.createElement(v.a,{className:s.eventTitle},Object(ae.h)(j)?"Today":Object(ae.b)(j).date.dateString),l.a.createElement(z.a,{className:s.scrollbarRoot},0!==b.length?l.a.createElement(x.a,{data:b,renderRow:function(e,t){return l.a.createElement(ke,{item:e,key:t})}}):l.a.createElement(u.a,{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},l.a.createElement(Ie.a,null),"\xa0",l.a.createElement(v.a,null,"No Recent Orders"))),l.a.createElement(u.a,{className:s.productView})))},$e=a(68),Ve=["title","hoverAction","isHovered","toggleAction","isToggled","children"],Ke=function(e){var t=e.title,a=e.hoverAction,n=e.isHovered,c=e.toggleAction,i=e.isToggled,m=e.children,s=Object(p.a)(e,Ve),d=Object(o.useState)(!1),u=Object(r.a)(d,2),b=u[0],E=u[1],h=Object($e.a)();return l.a.createElement(g.a,s,l.a.createElement(f.a,{title:t,separator:{color:h.palette.borderColor.main}},a&&l.a.createElement("div",{onMouseEnter:function(){n&&n(!0)},onMouseLeave:function(){n&&n(!1)}},"string"===typeof a?l.a.createElement(v.a,null,a):a),c&&l.a.createElement("div",{className:Object(D.a)("pointer","ml-2"),onClick:function(){i&&i(!b),E(!b)}},"string"===typeof c?l.a.createElement(v.a,null,c):c)),l.a.createElement(y.a,null,m))},Ue=function(e){var t=e.data,a=e.color,n=e.bgColor;return l.a.createElement(B.g,{width:"100%",height:60},l.a.createElement(B.b,{data:t,margin:{top:0,right:0,left:0,bottom:0}},l.a.createElement(B.h,{cursor:!1,content:function(e){return e.payload[0]?l.a.createElement(u.a,{p:2},l.a.createElement(v.a,{component:"p",color:"secondary"},e.payload[0].payload.label),l.a.createElement(u.a,null,l.a.createElement(u.a,{component:"span",color:a},"Total Sales: \u20b1",e.payload[0].payload.value))):null},wrapperStyle:{background:"#fff",border:"1px solid rgba(0, 0, 0, 0.1)",borderRadius:4,radius:4,overflow:"hidden",textAlign:"left"}}),l.a.createElement("defs",null,l.a.createElement("linearGradient",{id:"color3",x1:"0",y1:"0",x2:"0",y2:"1"},l.a.createElement("stop",{offset:"5%",stopColor:n,stopOpacity:1}),l.a.createElement("stop",{offset:"95%",stopColor:"#fff",stopOpacity:1})),l.a.createElement("linearGradient",{id:"color4",x1:"0",y1:"0",x2:"0",y2:"1"},l.a.createElement("stop",{offset:"5%",stopColor:"#C8372D",stopOpacity:1}),l.a.createElement("stop",{offset:"95%",stopColor:"#fff",stopOpacity:1}))),l.a.createElement(B.a,{dataKey:"value",type:"monotone",strokeWidth:2,stackId:"2",stroke:a,fill:"url(#color3)",fillOpacity:1}),l.a.createElement(B.a,{dataKey:"visits",type:"monotone",strokeWidth:2,stackId:"2",stroke:"#F2E7FE",fill:"url(#color4)",fillOpacity:1})))},Ge=Object(j.a)((function(e){return{toggleCardRoot:{position:"relative","& .Cmt-header-root":{paddingTop:12,paddingBottom:12},"& .MuiSvgIcon-root":{display:"block"},"& .Cmt-card-content":{height:100,position:"relative",display:"flex",flexDirection:"column",justifyContent:"flex-end"},"&.chart-active":{"& $toggleAnalyticsContent":{right:24,left:"auto",top:10,transform:"translate(0, 0)"},"& $toggleAnalyticsContentInner":{alignItems:"flex-end"},"& $titleRoot":{fontSize:16,marginBottom:5}}},toggleHoverBtn:{padding:"5px 12px",borderRadius:30,fontSize:14,letterSpacing:.15,lineHeight:1,cursor:"pointer",transition:"all 0.3s ease"},toggleAnalyticsContent:{position:"absolute",left:"50%",top:"50%",zIndex:1,transform:"translate(-50%, -50%)",transition:"all 0.3s ease"},toggleAnalyticsContentInner:{display:"flex",flexDirection:"column",alignItems:"center",transition:"all 0.3s ease"},titleRoot:Object(S.a)({},e.breakpoints.up("xl"),{fontSize:24}),dataChartRoot:{marginRight:-24,marginLeft:-24,marginBottom:-24},visitedDoubleToggle:Object(S.a)({},e.breakpoints.down("xs"),{"& .Cmt-card-content":{height:160}}),currentMonth:[{day:1,value:100},{day:2,value:120},{day:3,value:130},{day:4,value:120},{day:5,value:110},{day:6,value:105},{day:7,value:110},{day:8,value:120},{day:9,value:130},{day:10,value:140},{day:11,value:145},{day:12,value:140},{day:13,value:130},{day:14,value:125}],pastMonth:[{day:1,value:100},{day:2,value:120},{day:3,value:130},{day:4,value:120},{day:5,value:110},{day:6,value:105},{day:7,value:110},{day:8,value:100},{day:9,value:90},{day:10,value:95},{day:11,value:80},{day:12,value:60},{day:13,value:65},{day:14,value:50}]}})),Je=a(575),qe=a.n(Je),Xe=a(574),Qe=a.n(Xe),Ze=function(e){var t=e.hovered,a=e.sales,n=void 0===a?{total:0,xrate:""}:a,r=n.total,o=n.xrate,c=Ge();return l.a.createElement(u.a,{className:c.toggleAnalyticsContent},l.a.createElement(u.a,{display:"flex",flexDirection:{xs:"column",sm:"row"}},l.a.createElement(u.a,{className:c.toggleAnalyticsContentInner,mr:{sm:16}},t?l.a.createElement(u.a,{display:"flex",alignItems:"center",style:{marginBottom:"5px"}}," ",l.a.createElement(v.a,{className:c.titleRoot,component:"div",variant:"h3"},new Intl.NumberFormat("ja-JP",{style:"currency",currency:"PHP"}).format(r),"  ")," ",o&&l.a.createElement(l.a.Fragment,null,"|",l.a.createElement(u.a,{display:"flex",alignItems:"center",component:"p",color:"text.secondary",whiteSpace:"nowrap",fontSize:16},l.a.createElement(u.a,{display:"flex",alignItems:"center",component:"span",ml:2,color:"#6200EE"},"35%",l.a.createElement(u.a,{component:"span",ml:2},l.a.createElement(T.a,null)))))," "):l.a.createElement(u.a,{display:"flex",alignItems:"center",style:{marginBottom:"5px"}}," ",l.a.createElement("h3",null,"******"),"\xa0",o&&l.a.createElement("h3",null,"***")," "),l.a.createElement(v.a,{variant:"subtitle2"},"TOTAL"))))},et=function(e){var t=e.data,a=Object(o.useState)(!1),n=Object(r.a)(a,2),c=n[0],i=n[1],m=Object(o.useState)(!1),s=Object(r.a)(m,2),d=s[0],p=s[1],g=Object(o.useState)(!0),b=Object(r.a)(g,2),f=b[0],E=b[1],y=Ge();return Object(o.useEffect)((function(){var e=localStorage.getItem("visible");E(e||!1)}),[]),l.a.createElement(Ke,{className:Object(D.a)(y.toggleCardRoot,y.visitedDoubleToggle,d?"chart-active":""),title:"DAILY SALES",isHovered:i,isToggled:p,hoverAction:l.a.createElement(A.a,{onClick:function(){E(!f),localStorage.setItem("visible",!f)}},c||f?l.a.createElement(qe.a,null):l.a.createElement(Qe.a,null)),toggleAction:l.a.createElement(h.a,{color:d?"primary":"action"})},l.a.createElement(Ze,{hovered:c||f,sales:t}),d&&0!==t.today.length&&l.a.createElement(u.a,{className:y.dataChartRoot},l.a.createElement(Ue,{data:t.today,color:c?"#6200EE":"#ADDC4C",bgColor:c?"#F2E7FE":"#D7F5B1"})))},tt=a(444),at={transition:"transform 300ms"},nt={exiting:{transform:"scale(0)"},exited:{transform:"scale(0)"}},rt=function(e){var t=e.in,a=e.style,r=e.timeout,c=e.children,i=Object(n.a)(Object(n.a)({},a),l.a.isValidElement(c)?c.props.style:{});return l.a.createElement(tt.a,{in:t,timeout:r||300},(function(e,t){return Object(o.cloneElement)(c,Object(n.a)({style:Object(n.a)(Object(n.a)(Object(n.a)({},at),i),nt[e])},t))}))},ot=function(e){var t=e.value,a=e.revenueSummary,n=0===t?"#5F33C2":"#FF8C00",r=1===t?"#5F33C2":"#FF8C00";return l.a.createElement(l.a.Fragment,null,l.a.createElement(rt,{in:0===t,direction:"up"},l.a.createElement(u.a,null,l.a.createElement(B.g,{width:"100%",height:0===t?205:0},l.a.createElement(B.b,{data:a,margin:{top:0,right:20,left:20,bottom:0}},l.a.createElement(B.h,{labelStyle:{color:"black"},cursor:!1}),l.a.createElement(B.i,{dataKey:"month"}),l.a.createElement(B.a,{dataKey:"expense",stackId:"2",stroke:r,fillOpacity:1,fill:r}),l.a.createElement(B.a,{dataKey:"income",stackId:"1",stroke:n,fillOpacity:1,fill:n}))))),l.a.createElement(rt,{in:1===t,direction:"down"},l.a.createElement(u.a,null,l.a.createElement(B.g,{width:"100%",height:1===t?205:0},l.a.createElement(B.b,{data:a,margin:{top:0,right:20,left:20,bottom:0}},l.a.createElement(B.h,{labelStyle:{color:"black"},cursor:!1}),l.a.createElement(B.i,{dataKey:"month",axisLine:!1}),l.a.createElement(B.a,{dataKey:"expense",stackId:"2",stroke:r,fillOpacity:1,fill:r}),l.a.createElement(B.a,{dataKey:"income",stackId:"1",stroke:n,fillOpacity:1,fill:n}))))))},lt=a(1604),ct=a(1602),it=[{id:2,name:"Earning",slug:"earning"},{id:3,name:"Expense",slug:"expense"}],mt=d()((function(e){return{tabsRoot:{position:"relative",minHeight:10,"& .MuiTab-root":{maxWidth:"none",minWidth:10,fontSize:10,minHeight:10,letterSpacing:1.5}}}})),st=function(e){var t=e.tabValue,a=e.setTabValue,n=mt();return l.a.createElement("div",null,l.a.createElement(lt.a,{value:t,onChange:function(e,t){return a(t)},indicatorColor:"primary",textColor:"primary","aria-label":"scrollable auto tabs example",className:n.tabsRoot},it.map((function(e,t){return l.a.createElement(ct.a,Object.assign({key:e.id,label:e.name},function(e){return{id:"scrollable-force-tab-".concat(e),"aria-controls":"scrollable-force-tabpanel-".concat(e)}}(t)))}))))},dt=d()((function(e){return{cardRoot:Object(S.a)({height:"100%","@media screen and (min-width: 1280px) and (max-width: 1368px)":{"& .Cmt-header-root":{flexDirection:"column"}}},e.breakpoints.down("xs"),{"& .Cmt-header-root":{flexDirection:"column"}}),titleRoot:{marginBottom:4},titlePrimary:{color:e.palette.primary.main},subTitle:{fontSize:12,color:e.palette.text.secondary}}})),ut=function(e){var t=e.data;return l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement(pt,{title:"Annual Sales",figure:"\u20b1".concat(t.totalSales),className:"mr-5"}),l.a.createElement(pt,{title:"Available Inventory",figure:"\u20b1".concat(Number(t.totalInventory).toFixed(2)),className:"mr-5"}))},pt=function(e){var t=e.title,a=e.figure,n=e.className,r=dt();return l.a.createElement("div",{className:n||""},l.a.createElement(v.a,{component:"div",variant:"h1",className:r.titleRoot},a),l.a.createElement(v.a,{className:r.subTitle},t))},gt=function(){var e=Object(ne.e)((function(e){return e.dashboard})).revenueSummary,t=Object(o.useState)(0),a=Object(r.a)(t,2),n=a[0],c=a[1],i=dt();return l.a.createElement(g.a,{className:i.cardRoot},l.a.createElement(f.a,{title:l.a.createElement(ut,{data:e})},l.a.createElement(st,{tabValue:n,setTabValue:c})),l.a.createElement(ot,{value:n,revenueSummary:e.data}))},bt=(a(63),a(229)),ft=a(13),Et=a.n(ft),ht=(a(697),d()((function(){return{pageFull:{width:"100%"},profileSidebar:{"@media screen and (min-width: 1280px) and (max-width: 1499px)":{flexBasis:"100%",maxWidth:"100%"}},profileMainContent:{"@media screen and (min-width: 1280px) and (max-width: 1499px)":{flexBasis:"100%",maxWidth:"100%"}},popularProductRoot:{"& .scrollbar-container":{height:"266px !important"}}}}))),yt=[];t.default=function(){var e=ht(),t=Object(ne.d)(),a=Object(ne.e)((function(e){return e.orderApp})).orders,s=(Object(ne.e)((function(e){return e.productApp})).filterType,Object(ne.e)((function(e){return e.auth}))),d=s.loadUser,p=s.authUser,g=s.isAdmin,b=Object(ne.e)((function(e){return e.dashboard})),f=b.unpaidCustomers,E=b.unpaidOrders,h=b.popularProducts,y=Object(o.useState)(0),v=Object(r.a)(y,2),x=v[0],O=v[1],j=Object(o.useState)({total:0,today:[],xrate:null}),C=Object(r.a)(j,2),S=C[0],w=C[1],R=Object(o.useState)("all"),k=Object(r.a)(R,2),N=k[0],I=k[1],A=function(e){O(e)};return Object(o.useEffect)((function(){d&&t(Object(bt.a)())}),[d,p]),Object(o.useEffect)((function(){!function(){var e=a.filter((function(e){return Object(ae.g)(e.createdAt,Object(ae.d)(x,"DD MMM, YYYY, hh:mm a"))})).sort((function(e,t){return e.id-t.id})),t=0,r=e.map((function(e,a){var n=new Et.a(e.createdAt),r=Object(ae.b)(n);return"Cancelled"!==e.order_status&&(t+=Number(e.amount_due)),{label:r.time,value:t}}));r.unshift({label:"00:00 AM",value:0}),w(Object(n.a)(Object(n.a)({},S),{},{total:t,today:r}))}()}),[a,x]),l.a.createElement(i.a,{heading:"DASHBOARD",breadcrumbs:yt},l.a.createElement(c.a,null,g?l.a.createElement(l.a.Fragment,null,l.a.createElement(m.a,{item:!0,xs:12,sm:12,lg:6},l.a.createElement(c.a,null,l.a.createElement(m.a,{item:!0,xs:12,sm:12,lg:12},l.a.createElement(Ye,{dateCounter:x,setDateCounter:A,filter:N,setFilter:function(e){I(e)}})))),l.a.createElement(m.a,{item:!0,xs:12,sm:12,lg:6},l.a.createElement(c.a,null,l.a.createElement(m.a,{item:!0,xs:12,sm:12,lg:12},l.a.createElement(et,{data:S})),l.a.createElement(m.a,{item:!0,xs:12,sm:12,lg:12},l.a.createElement(gt,null)))),h&&0!==h.length&&l.a.createElement(m.a,{item:!0,xs:12,lg:12,className:e.orderLg1},l.a.createElement(u.a,{pb:6,className:e.popularProductRoot},l.a.createElement(Ee,null)))):l.a.createElement(l.a.Fragment,null,h&&0!==h.length&&l.a.createElement(m.a,{item:!0,xs:12,lg:12,className:e.orderLg1},l.a.createElement(u.a,{pb:6,className:e.popularProductRoot},l.a.createElement(Ee,{count:h.length}))),l.a.createElement(m.a,{item:!0,xs:12,sm:12,lg:12},l.a.createElement(Ye,{dateCounter:x,setDateCounter:A}))),f&&0!==f.length&&l.a.createElement(m.a,{item:!0,xs:12,lg:12,className:e.orderLg1},l.a.createElement(u.a,{pb:6},l.a.createElement(G,{unpaidCustomers:f,count:f.length}))),E&&0!==E.length&&l.a.createElement(m.a,{item:!0,xs:12,lg:12},l.a.createElement(ue,{unpaidOrders:E}))))}}}]);
//# sourceMappingURL=6.1305eb41.chunk.js.map