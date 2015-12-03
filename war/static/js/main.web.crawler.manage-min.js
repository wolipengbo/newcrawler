var crawlerManage={v:{formId:"webCrawlerAppForm",tableId:"webCrawlerAppTable",jsonData:new Array(),mapData:new Array()},fn:{query:function(){moveAllTr(crawlerManage.v.tableId);queryLoading(crawlerManage.v.tableId);showLoading($("#"+crawlerManage.v.formId));jsonrpc.webCrawlerAppService.query(function(result,exception,profile){moveAllTr(crawlerManage.v.tableId);var data=result;data=eval(data);crawlerManage.v.jsonData=data;var mapData=crawlerManage.v.mapData;for(var i in data){if(isNaN(i)){continue}var id=data[i]["id"];var name=data[i]["name"];var url=data[i]["url"];var ver=data[i]["ver"];var createDate=data[i]["createDate"];var ip=data[i]["ip"];var countryCode=data[i]["countryCode"];var country=data[i]["country"];crawlerManage.fn.addRow(id,name,url,ip,ver,createDate);if(countryCode==null||countryCode==""){crawlerManage.fn.freshIp(id)}else{var isExist=false;for(var i=0,len=mapData.length;i<len;i++){if(mapData[i]["code"]==countryCode){mapData[i]["value"]=mapData[i]["value"]+1;isExist=true;break}}if(!isExist){mapData.push({code:countryCode,value:1,name:country})}}}crawlerManage.fn.updateChartMap(mapData);removeLoading($("#"+crawlerManage.v.formId))})},freshIp:function(id){jsonrpc.webCrawlerAppService.ping(function(result,exception,profile){if(exception){return}var data=eval("("+result+")");var ip=data[0];var location=data[1];if(ip!=null||ip!=""){$("#"+crawlerManage.v.formId).find(".ip_"+id).html(ip);crawlerManage.fn.updateChartMap(location)}else{$("#"+crawlerManage.v.formId).find(".ip_"+id).html("unknown.")}},id)},updateChartMap:function(b){var a=b;$("#"+crawlerManage.v.formId).find(".container").highcharts("Map",{title:{text:"World Map"},legend:{title:{text:"Spider QTY"}},mapNavigation:{enabled:true,enableMouseWheelZoom:false,buttonOptions:{verticalAlign:"bottom"}},colorAxis:{min:1,max:100,minColor:"#A6A6FE",type:"logarithmic"},series:[{data:a,mapData:Highcharts.maps["custom/world"],joinBy:["iso-a2","code"],name:"Spider QTY",dashStyle:"solid",borderColor:"gray",states:{hover:{color:"#BADA55"},select:{color:"black"}},tooltip:{valueSuffix:""}}]})},upgrade:function(){var id=getRadio(crawlerManage.v.formId,"appList");if(id==null||id.length==0){showInfo(nc.i18n("res.select"));return false}var url=$("#"+crawlerManage.v.formId).find("#url").val();showLoading($("#"+crawlerManage.v.formId));jsonrpc.webCrawlerAppService.upgrade(function(result,exception,profile){removeLoading($("#"+crawlerManage.v.formId));if(exception){return}result="("+result+")";result=eval(result);if(result.status=="true"){crawlerManage.fn.query();showInfo(nc.i18n("res.update.ver.success"))}else{showInfo(nc.i18n("res.update.ver.failure"));return false}},id,url);return true},create:function(){var name=$("#"+crawlerManage.v.formId).find("#name").val();var url=$("#"+crawlerManage.v.formId).find("#url").val();var rpcAuth=$("#"+crawlerManage.v.formId).find("#rpcAuth").val();if(name==null||name==""){showInfo(nc.i18n("res.null.name"));return}if(url==null||url==""){showInfo(nc.i18n("res.null.url"));return}if(!url.endsWith("/")){url=url+"/"}showLoading($("#"+crawlerManage.v.formId));jsonrpc.webCrawlerAppService.create(function(result,exception,profile){removeLoading($("#"+crawlerManage.v.formId));if(exception){return}var data=eval("("+result+")");if(data.code!=null&&data.code=="1"){var id=data.id;createWebCrawlerNode(id,name);crawlerManage.fn.query()}else{if(data.code=="-1"){showInfo(nc.i18n("res.rpcAuth.error"))}else{showInfo(nc.i18n("res.create.failure"))}}},name,url,rpcAuth)},update:function(){var id=getRadio(crawlerManage.v.formId,"appList");if(id==null||id.length==0){showInfo(nc.i18n("res.select"));return false}var url=$("#"+crawlerManage.v.formId).find("#url").val();var name=$("#"+crawlerManage.v.formId).find("#name").val();var rpcAuth=$("#"+crawlerManage.v.formId).find("#rpcAuth").val();if(name==null||name==""){showInfo(nc.i18n("res.null.name"));return false}if(url==null||url==""){showInfo(nc.i18n("res.null.url"));return false}if(!url.endsWith("/")){url=url+"/"}showLoading($("#"+crawlerManage.v.formId));jsonrpc.webCrawlerAppService.update(function(result,exception,profile){removeLoading($("#"+crawlerManage.v.formId));if(exception){return}var data=eval("("+result+")");if(data.code!=null&&data.code=="1"){updateWebCrawlerNode(id,name);crawlerManage.fn.query();showInfo(nc.i18n("res.update.success"))}else{if(data.code=="-1"){showInfo(nc.i18n("res.rpcAuth.error"))}else{showInfo(nc.i18n("res.update.failure"))}return false}return true},id,name,url,rpcAuth);return true},edit:function(e){var d=crawlerManage.v.jsonData;for(var c in d){if(isNaN(c)){continue}if(e!=d[c]["id"]){continue}var e=d[c]["id"];var b=d[c]["name"];var a=d[c]["url"];$("#"+crawlerManage.v.formId).find("#id").val(e);$("#"+crawlerManage.v.formId).find("#name").val(b);$("#"+crawlerManage.v.formId).find("#url").val(a);$("#"+crawlerManage.v.formId).find("#rpcAuth").val("******");return}},remove:function(){var a=getRadio(crawlerManage.v.formId,"appList");if(a==null||a.length==0){showInfo(nc.i18n("res.select"));return false}if(!confirm(nc.i18n("res.remove.confirm"))){return}showLoading($("#"+crawlerManage.v.formId));jsonrpc.webCrawlerAppService.remove(function(b,c,d){removeLoading($("#"+crawlerManage.v.formId));if(c){return}var e=b;if(e){removeWebCrawlerNode(a);crawlerManage.fn.query();showInfo(nc.i18n("res.remove.success"))}else{showInfo(nc.i18n("res.remove.failure"))}},a)},addRow:function(h,d,c,g,b,e){b=(b==null?"":b);var f=configInfor["system.property.version.crawler"];f=(f==null?"":f);if(parseFloat(f)==parseFloat(b)){b=b+"<span style='color: green; font-weight: bold;'>&nbsp;&nbsp;Latest</span>"}var a="<tr class='simplehighlight'>";a+='<td nowrap>&nbsp;<input type="radio" name="appList" id="appList" value="'+h+'" onClick="crawlerManage.fn.edit('+h+')"/></td>';a+="<td nowrap>&nbsp;"+d+"</td>";a+="<td nowrap>"+c+"</td>";a+='<td nowrap class="ip_'+h+'">'+g+"</td>";a+="<td nowrap>"+b+"</td>";a+="<td nowrap>"+e+"</td>";a+="</tr>";$(a).appendTo("#"+crawlerManage.v.tableId);$("#"+crawlerManage.v.tableId).find("tr:odd").css("background","#FFFFFF");$("#"+crawlerManage.v.tableId).find("tr:even").css("background","rgb(247, 247, 247)");$("#"+crawlerManage.v.tableId).find(".simplehighlight").hover(function(){$(this).children().addClass("datahighlight")},function(){$(this).children().removeClass("datahighlight")})}}};