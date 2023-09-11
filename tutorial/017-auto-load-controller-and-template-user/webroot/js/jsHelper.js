function pagination () { 
            var data = arguments[0]
            var tmp = ejs.compile("<%\r\n    \r\n    var\r\n    sizes = [{ id: '5', value: '5' },\r\n    { id: '10', value: '10' },\r\n    { id: '25', value: '25' },\r\n    { id: '50', value: '50' },\r\n    { id: '100', value: '100' },\r\n    { id: '250', value: '250' },\r\n    { id: '500', value: '500' },\r\n    ]\r\n%>\r\n<div class=\"me-2\" role=\"group\" aria-label=\"First group\">\r\n    <li class=\"btn btn-secondary undefined\"><a class=\"undefined\" href=\"?page=1\"><span aria-hidden=\"true\">&lt;&lt;</span></a></li><li class=\"btn btn-secondary undefined\"><a class=\"undefined\" href=\"?page=1\"><span aria-hidden=\"true\">&lt;</span></a></li>\r\n    <%\r\n        var list = []\r\n        var params = req.query\r\n        console.log('params',params)\r\n        for (var p = 1; p <= pages; p++) {\r\n            list.push({id:p,value:p})\r\n        }\r\n    %>\r\n    <%-helpers.select({model:list,name:'page',value:req.query.page,classSelect:'btn btn-primary'})%>  \r\n    <a class=\"btn btn-primary\">/<%=pages%></a><li class=\"btn btn-secondary active\"><a class=\"undefined\" href=\"?page=1\"><span aria-hidden=\"true\">&gt;</span></a></li><li class=\"btn btn-secondary active\"><a class=\"undefined\" href=\"?page=0\"><span aria-hidden=\"true\">&gt;&gt;</span></a></li>\r\n    Số hàng:<%-helpers.select({model:sizes,name:'size',value:req.query.size,classSelect:'btn btn-primary'})%>    \r\n</div>\r\n\r\n<script>\r\n     var pagingSize = document.querySelector('select[name=\"size\"]')\r\n    pagingSize.onchange = (evt)=>{\r\n        var size = evt.target.value\r\n        var params = new URLSearchParams(location.search);\r\n        entries = params.entries()\r\n        arr = []\r\n        arr.push(`size=${size}`)\r\n        for(var entry of entries) {\r\n            if(entry[0]!='page' && entry[0] != 'size'){\r\n                arr.push(`${entry[0]}=${entry[1]}`)\r\n            }\r\n        }\r\n        location.replace(location.pathname+\"?\"+arr.join('&'))\r\n    }\r\n\r\n    var crtPage = document.querySelector('select[name=\"page\"]')\r\n    crtPage.onchange = (evt)=>{\r\n        var page = evt.target.value\r\n        var params = new URLSearchParams(location.search);\r\n        entries = params.entries()\r\n        arr = []\r\n        arr.push(`page=${page}`)\r\n        for(var entry of entries) {\r\n            if(entry[0]!='page' && entry[0] != 'size'){\r\n                arr.push(`${entry[0]}=${entry[1]}`)\r\n            }\r\n        }\r\n        location.replace(location.pathname+\"?\"+arr.join('&'))\r\n    }\r\n</script>", {})(data);
            return tmp
        }function select () { 
            var data = arguments[0]
            var tmp = ejs.compile("<%# function select(model,name,value,classSelect) { %>\r\n<% function cell(item) { %>\r\n  <% var selected = value==item.value?'selected':'' %>\r\n  <option value=\"<%=item.id%>\" <%=selected%>><%=item.value%></option>\r\n<% } %>\r\n<select name=\"<%=name%>\" value=\"<%=value%>\", class=\"<%=classSelect%>\">\r\n  <% if(model[0] && !model[0].id) {model = model.map(function(e){return {'id':e,'value':e} })} %>\r\n  <% model.map(cell) %>\r\n</select>\r\n<%# } %>", {})(data);
            return tmp
        }