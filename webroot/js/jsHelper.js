function select () { 
            var data = arguments[0]
            var tmp = ejs.compile("<% function cell(item) { %>\r\n    <% var selected = value==item.value?'selected':'' %>\r\n    <option value=\"<%=item.id%>\" <%=selected%>><%=item.value%></option>\r\n<% } %>\r\n<select name=\"<%=name%>\" value=\"<%=value%>\", class=\"<%=classSelect%>\">\r\n    <% if(model[0] && !model[0].id) {model = model.map(function(e){return {'id':e,'value':e} })} %>\r\n    <% model.map(cell) %>\r\n</select>\r\n\r\n<%# function select(model,name,value,classSelect) { %>\r\n<%# } %>", {})(data);
            return tmp
        }