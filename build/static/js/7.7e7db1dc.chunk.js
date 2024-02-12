(this["webpackJsonpaja-pos"]=this["webpackJsonpaja-pos"]||[]).push([[7],{1654:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(5),c=a(6),l=a(0),o=a.n(l),i=a(813),s=a(1636),d=a.n(s),u=a(307),m=a(208),b=a(20),p=a(1),f=a.n(p),g=a(1653),j=["name","id","fullWidth","size","value","onChange","helperText","variant","format","inputVariant","error"],O=function(e){var t=e.name,a=e.id,n=e.fullWidth,r=e.size,c=e.value,l=e.onChange,i=e.helperText,s=e.variant,d=e.format,u=e.inputVariant,m=e.error,p=Object(b.a)(e,j);return o.a.createElement(g.a,Object.assign({variant:s,inputVariant:u,format:d,name:t,id:a||t,fullWidth:n,size:r,value:c,onChange:l,helperText:i,error:m||""!==i,KeyboardButtonProps:{"aria-label":"change date"}},p,{className:"form-control"}))};O.prototype={name:f.a.string,id:f.a.string,fullWidth:f.a.bool,value:f.a.string,variant:f.a.string,format:f.a.string,inputVariant:f.a.string,size:f.a.string,onChange:f.a.func,error:f.a.bool,helperText:f.a.bool},O.defaultProps={fullWidth:!0,variant:"dialog",inputVariant:"standard",format:"YYYY-MM-DD",size:"small",error:!1,helperText:""};var h=O,E=(a(254),a(159)),v=a(82),y=a(17),C=a(305),S=a(30),D=a(1637),x=a.n(D),w=a(1638),k=a.n(w),P=a(223),T=a(50),N=a(1482),R=a(207),M=a(410),I=a.n(M),Y=a(445),A=a(1592),z=a(1593),B=a(1590),L=a(1591),W=a(1594),U=a(1617),_=(a(1597),a(1598),a(1599),a(1600),a(1601),a(225),a(46)),F=a(564),V=a(7),H=a(62),K=a(1635),q=a.n(K),J=a(9),G=Object(C.a)((function(e){return{titleRoot:{marginBottom:2,fontSize:14,letterSpacing:.25,color:e.palette.common.dark},tableCell:{padding:1}}})),Q=o.a.memo((function(e){var t=e.row,a=e.isSelected,r=(e.onRowClick,e.onUserEdit,e.onUserDelete,e.onUserView,G()),c=Object(V.d)(),l="enhanced-table-checkbox-".concat(t.id),i=a(t.id);return o.a.createElement(B.a,{hover:!0,role:"checkbox","aria-checked":i,tabIndex:-1,key:t.id,selected:i,className:r.tableRow},o.a.createElement(L.a,{className:r.tableCell}),o.a.createElement(L.a,{component:"th",id:l,scope:"row",padding:"none",className:r.tableCell},o.a.createElement(u.a,{display:"flex",alignItems:"center"},o.a.createElement("div",null,o.a.createElement(R.a,{className:r.titleRoot,component:"div",variant:"h4"},String(t.order_no).toUpperCase()),o.a.createElement(u.a,{color:t.isPaid?"success.main":"unpaid"===String(t.order_status).toLowerCase()?"primary.main":"secondary.main"},o.a.createElement(R.a,{component:"span",variant:"h6"},"paid"===String(t.order_status).toLowerCase()||t.isPaid?"PAID":String(t.order_status).toUpperCase()))))),o.a.createElement(L.a,{className:r.tableCell,align:"center"},"\u20b1",Number(t.amount_due).toFixed(2)),o.a.createElement(L.a,{align:"center",className:r.tableCell},t.recordedAt),o.a.createElement(L.a,{align:"center",onClick:function(e){return e.stopPropagation()},className:r.tableCell},o.a.createElement(F.a,{onClick:function(){return e=t,c({type:J.bb,payload:Object(n.a)(Object(n.a)({},e),{},{cart_items:e.order_items})}),c({type:J.u,payload:"cart"}),c({type:J.t,payload:e.isPaid?"paidCart":"viewCart"}),void c({type:J.D,payload:!0});var e}},o.a.createElement(q.a,{color:"primary"}))))})),X=a(1589),Z=a(1618),$=[{id:"order_no",numeric:!1,disablePadding:!0,label:"ORDER #"},{id:"amount_due",numeric:!0,disablePadding:!1,label:"TOTAL"},{id:"recordedAt",numeric:!0,disablePadding:!1,label:"DATE"}],ee=[{id:"ref_no",numeric:!1,disablePadding:!0,label:"Ref #"},{id:"description",numeric:!1,disablePadding:!0,label:"Description"},{id:"amount",numeric:!1,disablePadding:!0,label:"TOTAL"},{id:"recordedAt",numeric:!1,disablePadding:!0,label:"DATE"}];var te=o.a.memo((function(e){var t=e.classes,a=e.header,n=(e.onSelectAllClick,e.order),c=e.orderBy,i=(e.numSelected,e.rowCount,e.onRequestSort),s=Object(l.useState)([]),d=Object(r.a)(s,2),u=d[0],m=d[1];return Object(l.useEffect)((function(){m("expenses"===a?ee:$)}),[a]),o.a.createElement(X.a,null,o.a.createElement(B.a,null,o.a.createElement(L.a,{className:t.tableCell}),u.map((function(e){return o.a.createElement(L.a,{className:t.tableCell,key:e.id,align:e.numeric?"center":"left",padding:e.disablePadding?"none":"normal",sortDirection:c===e.id&&n},o.a.createElement(Z.a,{active:c===e.id,direction:c===e.id?n:"asc",onClick:(a=e.id,function(e){i(e,a)})},e.label,c===e.id?o.a.createElement("span",{className:t.visuallyHidden},"desc"===n?"sorted descending":"sorted ascending"):null));var a})),o.a.createElement(L.a,{align:"center",className:t.tableCell})))})),ae=a(1595),ne=a(4),re=a(888),ce=a(117),le=a.n(ce),oe=a(565),ie=a(186),se=a(227),de=Object(C.a)((function(e){return{root:{paddingLeft:e.spacing(4),paddingRight:e.spacing(2),minHeight:0,paddingTop:e.spacing(1),paddingBottom:e.spacing(1)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(S.a)(e.palette.secondary.light,.15)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%"},chipsRoot:{display:"flex",justifyContent:"center",marginLeft:e.spacing(.5),marginRight:e.spacing(.5),"& > *":{margin:e.spacing(.5)}}}})),ue=a(1651),me=o.a.memo((function(e){var t=e.selected,a=e.setSelected,n=e.onAdd,i=(e.filterOptions,e.setFilterOptions,e.searchTerm),s=e.setSearchTerm,d=e.project,m=e.handleSearch,b=de(),p=Object(l.useState)(!1),f=Object(r.a)(p,2),g=f[0],j=f[1],O=o.a.useState(null),h=Object(r.a)(O,2),E=(h[0],h[1],Object(V.d)()),v=t.length;return o.a.createElement(o.a.Fragment,null,o.a.createElement(ae.a,{className:Object(ne.a)(b.root,Object(c.a)({},b.highlight,v>0))},v>0?o.a.createElement(R.a,{className:b.title,color:"inherit",variant:"subtitle1",component:"div"},v," selected"):o.a.createElement(u.a,{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"},"expenses"===d.value&&o.a.createElement(oe.a,{variant:"contained",size:"small",color:"primary",onClick:function(){return n()}},o.a.createElement(ue.a,null),"\xa0Add"),o.a.createElement(u.a,{component:"form",onSubmit:m,display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%"},o.a.createElement(se.a,{onChange:function(e){return s(e.target.value)},value:i,border:!1}))),v>0?o.a.createElement(re.a,{title:"Delete"},o.a.createElement(F.a,{"aria-label":"delete",onClick:function(){j(!0)}},o.a.createElement(le.a,null))):o.a.createElement(o.a.Fragment,null)),o.a.createElement(ie.a,{open:g,title:"Confirm delete users",content:"Are you sure, you want to  delete selected users?",onClose:function(){j(!1)},onConfirm:function(){j(!1),E(Object(H.b)(t,(function(){return a([])})))}}))})),be=a(512),pe=a(49),fe=Object(C.a)((function(e){return{root:{width:"100%"},tableCell:{padding:2,fontSize:"15px",fontWeight:"bold"},paper:{width:"100%",marginBottom:e.spacing(4),backgroundColor:Object(S.f)(e.palette.background.paper,.1)},container:{},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}})),ge=a(57),je=a(23),Oe=a.n(je),he=Oe()((function(e){return{root:{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:15},emptyTitle:Object(c.a)({fontSize:16,color:e.palette.text.disabled,fontWeight:e.typography.fontWeightBold},e.breakpoints.up("lg"),{fontSize:20})}})),Ee=function(e){var t=e.children,a=he();return o.a.createElement(u.a,{className:a.root},o.a.createElement(u.a,{mb:{xs:4,lg:6}},o.a.createElement(ge.a,{src:"/images/icons/search-contact.png",alt:"Empty contacts"})),o.a.createElement("p",{className:a.emptyTitle},t))},ve=a(1489),ye=a(47),Ce=a(188),Se=(a(48),a(83)),De=(a(285),a(1490)),xe=a(1491),we=a(16),ke=Oe()((function(e){return{dialogRoot:{position:"relative"},dialogTitleRoot:{"& .MuiTypography-h6":{fontSize:16,color:e.palette.common.dark}}}})),Pe=function(e){var t=e.data,a=ke(),i=Object(V.e)((function(e){return e.uiReducer})).expenseDialog,s=Object(V.d)(),d=Object(l.useState)(""),m=Object(r.a)(d,2),b=m[0],p=m[1],f=Object(l.useState)({}),g=Object(r.a)(f,2),j=g[0],O=g[1],h=Object(l.useState)({}),E=Object(r.a)(h,2),v=E[0],y=E[1],C=function(e){return function(t){O(Object(n.a)(Object(n.a)({},j),{},Object(c.a)({},e,t.target.value))),y(Object(n.a)(Object(n.a)({},v),{},Object(c.a)({},e,"")))}},S=Object(Ce.a)({accept:"image/*",onDrop:function(e){var t=new FormData;t.append("file",e[0]),s(Object(H.i)(t)).then((function(e){p(e.url),O(Object(n.a)(Object(n.a)({},j),{},{dpUrl:e.url}))})).catch((function(e){console.log(e)}))}}),D=S.getRootProps,x=S.getInputProps,w=function(e){};return o.a.createElement(ve.a,{open:!!i,onClose:function(){s({type:J.S,payload:!1}),s(Object(H.f)(null))},className:a.dialogRoot},o.a.createElement(De.a,{className:a.dialogTitleRoot},t.id?"Edit Details":"Create New Record"),o.a.createElement(xe.a,{dividers:!0},o.a.createElement(u.a,{display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:"center",mb:{xs:6,md:5}},o.a.createElement(u.a,Object.assign({},D(),{mr:{xs:0,md:5},mb:{xs:3,md:0},className:"pointer"}),o.a.createElement("input",x()),o.a.createElement(_.a,{size:70,src:"".concat(we.a.staticUrl).concat(b)})),o.a.createElement(T.a,null,o.a.createElement(N.a,{item:!0,xs:12,sm:12},o.a.createElement(ye.a,{fullWidth:!0,variant:"outlined",label:"Full Name",value:j.name,onChange:C("name"),helperText:v.name})))),o.a.createElement(u.a,{mb:{xs:6,md:5}},o.a.createElement(ye.a,{fullWidth:!0,variant:"outlined",label:"Complete Address",value:j.address,onChange:C("address"),helperText:v.address})),o.a.createElement(u.a,{display:"flex",justifyContent:"flex-end",mb:4},o.a.createElement(oe.a,{onClick:function(){s({type:J.F,payload:!i}),s(Object(H.f)(null))}},"Cancel"),o.a.createElement(u.a,{ml:2},o.a.createElement(oe.a,{variant:"contained",color:"primary",onClick:function(){var e=j.contacts.filter((function(e){return e.number.trim()}));j.name?j.email?Object(pe.d)(j.email)?w(e):y(Object(n.a)(Object(n.a)({},v),{},{email:"Invalid Email Address"})):y(Object(n.a)(Object(n.a)({},v),{},{email:Se.c})):y(Object(n.a)(Object(n.a)({},v),{},{name:Se.c}))}},t.id?"Void":"Save")))))},Te=a(144),Ne=function(e){var t=e.project,a=(e.startDate,e.endDate,fe()),c=Object(V.e)((function(e){return e.usersReducer})).users,i=Object(V.e)((function(e){return e.dataReducer})).expenses,s=Object(V.e)((function(e){return e.orderApp})),d=s.orders,u=s.filterType,m=s.count,b=Object(l.useState)([]),p=Object(r.a)(b,2),f=p[0],g=p[1],j=o.a.useState("name"),O=Object(r.a)(j,2),h=O[0],E=O[1],v=o.a.useState("asc"),y=Object(r.a)(v,2),C=y[0],S=y[1],D=o.a.useState(0),x=Object(r.a)(D,2),w=(x[0],x[1]),k=o.a.useState(10),P=Object(r.a)(k,2),T=P[0],N=P[1],R=o.a.useState([]),M=Object(r.a)(R,2),I=M[0],_=M[1],F=Object(l.useState)({}),K=Object(r.a)(F,2),q=K[0],G=(K[1],Object(l.useState)(!1)),X=Object(r.a)(G,2),Z=(X[0],X[1],Object(l.useState)(!1)),$=Object(r.a)(Z,2),ee=$[0],ae=$[1],ne=Object(l.useState)({name:""}),re=Object(r.a)(ne,2),ce=re[0],le=re[1],oe=Object(l.useState)(!1),se=Object(r.a)(oe,2),de=se[0],ue=(se[1],Object(l.useState)(!1)),pe=Object(r.a)(ue,2),ge=pe[0],je=(pe[1],o.a.useState([])),Oe=Object(r.a)(je,2),he=Oe[0],ve=Oe[1],ye=Object(l.useState)(""),Ce=Object(r.a)(ye,2),Se=Ce[0],De=Ce[1],xe=Object(V.d)(),we=function(e,t){var a=I.indexOf(t),n=[];-1===a?n=n.concat(I,t):0===a?n=n.concat(I.slice(1)):a===I.length-1?n=n.concat(I.slice(0,-1)):a>0&&(n=n.concat(I.slice(0,a),I.slice(a+1))),_(n)},ke=function(e){xe(Object(H.f)(e))},Ne=function(e){xe(Object(H.f)(e)),xe({type:J.W,payload:!0})},Re=function(e){le(e),ae(!0)},Me=function(e){return-1!==I.indexOf(e)};return Object(l.useEffect)((function(){xe(Object(Te.c)({page:0,rowsPerPage:10}))}),[]),Object(l.useEffect)((function(){"orders"===t.value&&g(d),"expenses"===t.value&&g(i)}),[d,t,i]),o.a.createElement("div",{className:a.root},o.a.createElement(Pe,{data:q}),o.a.createElement(Y.a,{className:a.paper},o.a.createElement(me,{selected:I,setSelected:_,onAdd:function(e){return xe({type:J.F,payload:!0})},filterOptions:he,setFilterOptions:ve,searchTerm:Se,setSearchTerm:De,project:t,handleSearch:function(e){e.preventDefault(),xe(Object(Te.e)(Object(n.a)(Object(n.a)({},u),{},{page:0,searchText:Se}))),xe(Object(Te.c)(Object(n.a)(Object(n.a)({},u),{},{page:0,searchText:Se})))}}),o.a.createElement(A.a,{className:a.container},o.a.createElement(z.a,{stickyHeader:!0,className:a.table,"aria-labelledby":"tableTitle","aria-label":"sticky enhanced table"},o.a.createElement(te,{header:t.value,classes:a,numSelected:I.length,order:C,orderBy:h,onSelectAllClick:function(e){if(e.target.checked){var t=c.map((function(e){return e.id}));_(t)}else _([])},onRequestSort:function(e,t){var a=h===t&&"asc"===C;E(t),S(a?"desc":"asc")},rowCount:f.length}),o.a.createElement(W.a,null,f.length?Object(be.b)(f,Object(be.a)(C,h)).map((function(e,t){return o.a.createElement(Q,{key:t,row:e,onRowClick:we,onUserEdit:Ne,onUserDelete:Re,onUserView:ke,isSelected:Me})})):o.a.createElement(B.a,{style:{height:258}},o.a.createElement(L.a,{colSpan:7,rowSpan:10},ge?o.a.createElement(Ee,null,"There are no records found with your filter."):o.a.createElement(Ee,null,de?"There are no records found.":"Loading users...")))))),o.a.createElement(U.a,{rowsPerPageOptions:[10,20,50],component:"div",count:m,rowsPerPage:T,page:u.page,onPageChange:function(e,t){w(t),xe(Object(Te.e)(Object(n.a)(Object(n.a)({},u),{},{searchText:Se,page:t}))),xe(Object(Te.c)(Object(n.a)(Object(n.a)({},u),{},{searchText:Se,page:t})))},onRowsPerPageChange:function(e){N(parseInt(e.target.value,10)),w(0),xe(Object(Te.e)(Object(n.a)(Object(n.a)({},u),{},{searchText:Se,page:0,rowsPerPage:parseInt(e.target.value,10)}))),xe(Object(Te.c)(Object(n.a)(Object(n.a)({},u),{},{searchText:Se,page:0,rowsPerPage:parseInt(e.target.value,10)})))}})),o.a.createElement(ie.a,{open:ee,title:"Confirm delete ".concat(ce.name),content:"Are you sure, you want to  delete this user?",onClose:function(){ae(!1)},onConfirm:function(){ae(!1),xe(Object(H.c)(ce.id))}}))},Re=a(13),Me=a.n(Re),Ie=Object(C.a)((function(e){var t;return{headerItem:(t={display:"flex",alignItems:"center",paddingRight:16,paddingLeft:16},Object(c.a)(t,e.breakpoints.down("xs"),{fontSize:13,paddingLeft:8,paddingRight:8}),Object(c.a)(t,"color",Object(S.a)(e.palette.common.white,.74)),Object(c.a)(t,"&:not(:first-child)",{borderLeft:"1px solid ".concat(Object(S.a)(e.palette.common.white,.8))}),Object(c.a)(t,"& .MuiSvgIcon-root",{marginRight:12}),t),backdropContent:{color:Object(S.a)(e.palette.common.white,.74),"& .form-control":{marginBottom:20,"& label, & .MuiInput-formControl, & .MuiSelect-icon, & .MuiIconButton-root":{color:Object(S.a)(e.palette.common.white,.74)},"& .MuiInput-underline:before, & .MuiInput-underline:after":{borderBottomColor:Object(S.a)(e.palette.common.white,.74)}}},subHeaderBottom:{display:"flex",alignItems:"center",justifyContent:"space-between"}}})),Ye=[{label:"Dashboard",link:"/"},{label:"Reports",link:"/reports"}],Ae=function(e){var t=e.currentProject,a=e.setCurrentProject,n=e.startDate,r=e.setStartDate,c=e.endDate,l=e.setEndDate,i=Ie();return o.a.createElement(v.a,null,o.a.createElement(u.a,{className:i.backdropContent},o.a.createElement(E.a,{label:"Select Report Table",data:m.a.projects,valueKey:"value",labelKey:"label",value:t.value,onChange:function(e){a(m.a.projects.find((function(t){return t.value===e.target.value})))}}),o.a.createElement(h,{label:"Start Date",value:n,onChange:r}),o.a.createElement(h,{label:"End Date",value:c,onChange:l})))},ze=function(e){e.revealed;var t=e.startDate,a=e.endDate,n=Ie();return o.a.createElement(u.a,{display:"flex",alignItems:"center",mx:{xs:-2,sm:-4}},o.a.createElement(u.a,{className:n.headerItem},"Reports"),o.a.createElement(u.a,{className:n.headerItem},o.a.createElement(d.a,null),Object(y.c)(t," DD MMM")," - ",Object(y.c)(a," DD MMM")))};t.default=function(){var e=Ie(),t=Object(V.d)(),a=Object(V.e)((function(e){return e.orderApp})),c=(a.orders,a.filterType),s=(a.count,o.a.useState(m.a.projects[0])),d=Object(r.a)(s,2),b=d[0],p=d[1],f=o.a.useState(Me()().format("YYYY-MM-DD")),g=Object(r.a)(f,2),j=g[0],O=g[1],h=o.a.useState(Me()().format("YYYY-MM-DD")),E=Object(r.a)(h,2),v=E[0],C=E[1],S=Object(l.useState)(!1),D=Object(r.a)(S,2),w=(D[0],D[1]),M=Object(l.useState)([]),Y=Object(r.a)(M,2),A=(Y[0],Y[1],function(e){return function(a){var r=j,l=v;"startDate"===e&&(r=Me()(a).format("YYYY-MM-DD"),O(r)),"endDate"===e&&(l=Me()(a).format("YYYY-MM-DD"),C(l)),t(Object(Te.e)(Object(n.a)(Object(n.a)({},c),{},{page:0,startDate:r,endDate:l}))),t(Object(Te.c)(Object(n.a)(Object(n.a)({},c),{},{startDate:r,endDate:l})))}});return o.a.createElement(P.a,{heading:"Sales Reports",breadcrumbs:Ye},o.a.createElement(T.a,null,o.a.createElement(N.a,{item:!0,xs:12,sm:12,md:12,lg:12},o.a.createElement(i.a,{concealedIcon:o.a.createElement(x.a,null),extrasContainer:o.a.createElement(u.a,null,o.a.createElement(I.a,{className:"pointer",onClick:function(){return alert("PRINT")}}),"\xa0\xa0\xa0",o.a.createElement(k.a,{className:"pointer",onClick:function(){t(Object(Te.c)({page:0,rowsPerPage:10}))}})),backLayerConcealed:o.a.createElement(ze,{revealed:!0,currentProject:b,startDate:j,endDate:v}),backLayerRevealed:o.a.createElement(Ae,{currentProject:b,setCurrentProject:function(e){p(e)},startDate:j,setStartDate:A("startDate"),endDate:v,setEndDate:A("endDate")}),onRevealed:function(e){w(e)},subHeader:o.a.createElement(u.a,null,o.a.createElement(u.a,null,o.a.createElement(R.a,{className:e.title,variant:"h4",id:"tableTitle",component:"div"},b.label)),o.a.createElement(u.a,{className:e.subHeaderBottom},o.a.createElement(u.a,null,Object(y.c)(j," DD MMM")," - ",Object(y.c)(v," DD MMM")),o.a.createElement(u.a,{component:"span",fontSize:14,color:"primary.main"})))},o.a.createElement(u.a,{width:"100%"},o.a.createElement(Ne,{project:b,startDate:j,endDate:v}))))))}}}]);
//# sourceMappingURL=7.7e7db1dc.chunk.js.map