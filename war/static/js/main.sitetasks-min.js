var siteTask={v:{jsonData:null,webCrawlerId:null,siteId:null},fn:{init:function(a){siteTask.v.jsonData=siteJsonData;siteTask.v.webCrawlerId=webCrawlerId;siteTask.v.siteId=siteId;this.hideAdvancedSettings(a);fillQueue(a,"queueName",true,"sync_count",function(){fillQueue(a,"deployQueueName",true,"sync_count")});if(a=="siteEditForm"){fillUrlCheck(a,"urlCheckId",true,"sync_count")}else{$("#"+a).find("#urlCheckId").attr("disabled",true);$("#"+a).find("#urlCheckId").addClass("gray");$("#"+a).find("#urlCheckId").parent().find(".configBox").addClass("configBox-disabled").removeClass("configBox")}fillHttpRequest(a,"httpRequestId",true,"sync_count");fillCustomPlugin("1",a,"urlfetchPluginId",true,"sync_count");fillSite(a,"urlOriginSiteId",true);if(siteId!=null&&siteId!=""&&siteId!="undefined"){$("#"+a).find("select[id=urlOriginSiteId] option[value='"+siteId+"']").remove()}$("#"+a).find("select[id=updateMode]").change(function(){var b=$(this).val();if(b!=null&&b=="1"){$("#"+a).find("#isRepeat").attr("checked",true).attr("disabled",true);$("#"+a).find("#isLoop").attr("checked",true).attr("disabled",true);$("#"+a).find("#isRepeatData").attr("checked",false).attr("disabled",true);$("#"+a).find("#isNotSaveRepeatData").attr("checked",false).attr("disabled",true)}else{if(b!=null&&b=="2"){$("#"+a).find("#isRepeat").attr("checked",true).attr("disabled",true);$("#"+a).find("#isLoop").attr("checked",true).attr("disabled",true);$("#"+a).find("#isRepeatData").attr("checked",true).attr("disabled",true);$("#"+a).find("#isNotSaveRepeatData").attr("checked",true).attr("disabled",true)}else{$("#"+a).find("#isRepeat").attr("checked",false).attr("disabled",false);$("#"+a).find("#isLoop").attr("checked",false).attr("disabled",false);$("#"+a).find("#isRepeatData").attr("checked",false).attr("disabled",false);$("#"+a).find("#isNotSaveRepeatData").attr("checked",false).attr("disabled",false)}}})},hideAdvancedSettings:function(a){$("#"+a).find("#advanced-settings-expander").val(nc.i18n("res.advanced.display.block"));$("#"+a).find("#advanced-settings-expander").unbind("click");$("#"+a).find("#advanced-settings-expander").click(function(){siteTask.fn.showAdvancedSettings(a)});$("#"+a).find(".advanced-settings").each(function(){$(this).css({display:"none"})})},showAdvancedSettings:function(a){$("#"+a).find("#advanced-settings-expander").val(nc.i18n("res.advanced.display.none"));$("#"+a).find("#advanced-settings-expander").unbind("click");$("#"+a).find("#advanced-settings-expander").click(function(){siteTask.fn.hideAdvancedSettings(a)});$("#"+a).find(".advanced-settings").each(function(){$(this).css({display:""})})},chooseShow:function(b,a){var e=b.checked;var d="none";if(e){d="block"}var c=$(b).closest("form");var f=c.attr("id");$("#"+f).find("#"+a).css({display:d})},create:function(x){var y=$("#"+x).find("#name").val();var e=$("#"+x).find("#url").val();var s=$("#"+x).find("#desc").val();var d=$("#"+x).find("#maxSize").val();var t=$("#"+x).find("#expiredDaysUrl").val();var k=$("#"+x).find("#urlCheckId").val();var g=$("#"+x).find("#crawlNumLimit").val();var o=$("#"+x).find("#maxCrawlQueueLimit").val();var a=$("#"+x).find("#urlCheckRegex").val();var h=getCheckbox(x,"isAuto");var u=getCheckbox(x,"isRepeat");var q=getCheckbox(x,"isRepeatData");var w=getCheckbox(x,"isLoop");var j=getCheckbox(x,"isMerge");var i=getCheckbox(x,"isReverse");var v=getCheckbox(x,"isRealtimeCrawl");var m=getCheckbox(x,"isNotSaveData");var p=getCheckbox(x,"isNotSaveRepeatData");var l=$("#"+x).find("#urlfetchPluginId").val();var c=$("#"+x).find("#httpRequestId").val();var b=$("#"+x).find("#queueName").val();var n=$("#"+x).find("#deployQueueName").val();var f=$("#"+x).find("#urlOriginSiteId").val();var r=$("#"+x).find("#updateMode").val();if(!IsURL(e)){showInfo(nc.i18n("res.site.url.invalid"));return}showLoading($("#"+x));jsonrpc.siteTasksService.create(function(z,A,B){removeLoading($("#"+x));if(A){return}var C=z;if(!isNum(C)){showInfo(nc.i18n("res.create.failure"));return}siteTask.fn.addJson(x,C);createSiteTaskNode(siteTask.v.webCrawlerId,C,y);bindEvent();updateSelect(C,y,"nestedSiteId");showInfo(nc.i18n("res.create.success"))},siteTask.v.webCrawlerId,y,e,s,d,h,u,q,w,j,i,t,v,g,a,m,p,l,c,b,n,f,o,r,k)},edit:function(d){var e=siteTask.v.jsonData;for(var b in e){if(isNaN(b)){continue}if(e[b]["id"]!=siteTask.v.siteId){continue}$("#"+d).find("#id").val(e[b]["id"]);$("#"+d).find("#name").val(e[b]["name"]);$("#"+d).find("#url").val(e[b]["url"]);$("#"+d).find("#desc").val(e[b]["desc"]);$("#"+d).find("#maxSize").val(e[b]["maxSize"]);$("#"+d).find("#expiredDaysUrl").val(e[b]["expiredDaysUrl"]==null?"0":e[b]["expiredDaysUrl"]);$("#"+d).find("#urlCheckId").val(e[b]["urlCheckId"]);$("#"+d).find("#crawlNumLimit").val(e[b]["crawlNumLimit"]==null?"0":e[b]["crawlNumLimit"]);$("#"+d).find("#maxCrawlQueueLimit").val(e[b]["maxCrawlQueueLimit"]==null?"0":e[b]["maxCrawlQueueLimit"]);$("#"+d).find("#urlCheckRegex").val(e[b]["urlCheckRegex"]==null?"":e[b]["urlCheckRegex"]);selectCheckbox(d,"isAuto",e[b]["isAuto"]);selectCheckbox(d,"isRepeat",e[b]["isRepeat"]);selectCheckbox(d,"isRepeatData",e[b]["isRepeatData"]);selectCheckbox(d,"isLoop",e[b]["isLoop"]);selectCheckbox(d,"isMerge",e[b]["isMerge"]);selectCheckbox(d,"isRealtimeCrawl",e[b]["isRealtimeCrawl"]);selectCheckbox(d,"isReverse",e[b]["isReverse"]);selectCheckbox(d,"isNotSaveData",e[b]["isNotSaveData"]);selectCheckbox(d,"isNotSaveRepeatData",e[b]["isNotSaveRepeatData"]);$("#"+d).find("#httpRequestId").val(e[b]["httpRequestId"]);$("#"+d).find("#urlfetchPluginId").val(e[b]["urlfetchPluginId"]);$("#"+d).find("#urlOriginSiteId").val(e[b]["urlOriginSiteId"]);$("#"+d).find("#updateMode").val(e[b]["updateMode"]);if(e[b]["updateMode"]!=null&&e[b]["updateMode"]!=""){$("#"+d).find("#updateMode").change()}var c=e[b]["queueName"];if(c==null||c==""){c="R5"}$("#"+d).find("#queueName").val(c);var a=e[b]["deployQueueName"];if(a==null||a==""){a="R4"}$("#"+d).find("#deployQueueName").val(a);return}},update:function(y){var o=$("#"+y).find("#id").val();if(o==null||o.length==0){showInfo(nc.i18n("res.site.select"));return}var z=$("#"+y).find("#name").val();var e=$("#"+y).find("#url").val();var t=$("#"+y).find("#desc").val();var d=$("#"+y).find("#maxSize").val();var u=$("#"+y).find("#expiredDaysUrl").val();var k=$("#"+y).find("#urlCheckId").val();var g=$("#"+y).find("#crawlNumLimit").val();var p=$("#"+y).find("#maxCrawlQueueLimit").val();var a=$("#"+y).find("#urlCheckRegex").val();var h=getCheckbox(y,"isAuto");var v=getCheckbox(y,"isRepeat");var r=getCheckbox(y,"isRepeatData");var x=getCheckbox(y,"isLoop");var j=getCheckbox(y,"isMerge");var i=getCheckbox(y,"isReverse");var w=getCheckbox(y,"isRealtimeCrawl");var m=getCheckbox(y,"isNotSaveData");var q=getCheckbox(y,"isNotSaveRepeatData");var c=$("#"+y).find("#httpRequestId").val();var l=$("#"+y).find("#urlfetchPluginId").val();var b=$("#"+y).find("#queueName").val();var n=$("#"+y).find("#deployQueueName").val();var f=$("#"+y).find("#urlOriginSiteId").val();var s=$("#"+y).find("#updateMode").val();showLoading($("#"+y));jsonrpc.siteTasksService.update(function(A,B,C){removeLoading($("#"+y));if(B){return}var D=A;if(D){siteTask.fn.updateJson(y);updateSiteTaskNode(siteTask.v.webCrawlerId,o,z);updateSelect(o,z,"nestedSiteId");siteTask.fn.updateOtherRules(o);showInfo(nc.i18n("res.update.success"))}else{showInfo(nc.i18n("res.update.failure"))}},siteTask.v.webCrawlerId,o,z,e,t,d,h,v,r,x,j,i,u,w,g,a,m,q,l,c,b,n,f,p,s,k)},updateOtherRules:function(c){var b=siteTask.v.jsonData;for(var a in b){if(isNaN(a)){continue}if(b[a]["id"]==c){$("#crawlRulesTable").find("#crawlUrl").val(b[a]["url"]);if(!(b[a]["isLoop"]=="Y"&&b[a]["isMerge"]=="Y")){$("#crawlRulesTable").find(".mergeRules").css("display","none")}break}}},addJson:function(b,d){var a={id:d,name:$("#"+b).find("#name").val(),url:$("#"+b).find("#url").val(),desc:$("#"+b).find("#desc").val(),maxSize:$("#"+b).find("#maxSize").val(),expiredDaysUrl:$("#"+b).find("#expiredDaysUrl").val(),urlCheckId:$("#"+b).find("#urlCheckId").val(),crawlNumLimit:$("#"+b).find("#crawlNumLimit").val(),maxCrawlQueueLimit:$("#"+b).find("#maxCrawlQueueLimit").val(),urlCheckRegex:$("#"+b).find("#urlCheckRegex").val(),isAuto:getCheckbox(b,"isAuto"),isRepeat:getCheckbox(b,"isRepeat"),isRepeatData:getCheckbox(b,"isRepeatData"),isLoop:getCheckbox(b,"isLoop"),isMerge:getCheckbox(b,"isMerge"),isReverse:getCheckbox(b,"isReverse"),isRealtimeCrawl:getCheckbox(b,"isRealtimeCrawl"),isNotSaveData:getCheckbox(b,"isNotSaveData"),isNotSaveRepeatData:getCheckbox(b,"isNotSaveRepeatData"),httpRequestId:$("#"+b).find("#httpRequestId").val(),queueName:$("#"+b).find("#queueName").val(),deployQueueName:$("#"+b).find("#deployQueueName").val(),urlfetchPluginId:$("#"+b).find("#urlfetchPluginId").val(),urlOriginSiteId:$("#"+b).find("#urlOriginSiteId").val(),updateMode:$("#"+b).find("#updateMode").val()};var c=siteTask.v.jsonData;if(c==null){c=new Array()}c.push(a);addSiteJsonData(c)},updateJson:function(b){var d=$("#id").val();var c=siteTask.v.jsonData;for(var a in c){if(isNaN(a)){continue}if(c[a]["id"]!=siteTask.v.siteId){continue}c[a]["name"]=$("#"+b).find("#name").val();c[a]["url"]=$("#"+b).find("#url").val();c[a]["desc"]=$("#"+b).find("#desc").val();c[a]["maxSize"]=$("#"+b).find("#maxSize").val();c[a]["expiredDaysUrl"]=$("#"+b).find("#expiredDaysUrl").val();c[a]["urlCheckId"]=$("#"+b).find("#urlCheckId").val();c[a]["crawlNumLimit"]=$("#"+b).find("#crawlNumLimit").val();c[a]["maxCrawlQueueLimit"]=$("#"+b).find("#maxCrawlQueueLimit").val();c[a]["urlCheckRegex"]=$("#"+b).find("#urlCheckRegex").val();c[a]["isAuto"]=getCheckbox(b,"isAuto");c[a]["isRepeat"]=getCheckbox(b,"isRepeat");c[a]["isRepeatData"]=getCheckbox(b,"isRepeatData");c[a]["isLoop"]=getCheckbox(b,"isLoop");c[a]["isMerge"]=getCheckbox(b,"isMerge");c[a]["isReverse"]=getCheckbox(b,"isReverse");c[a]["isRealtimeCrawl"]=getCheckbox(b,"isRealtimeCrawl");c[a]["isNotSaveData"]=getCheckbox(b,"isNotSaveData");c[a]["isNotSaveRepeatData"]=getCheckbox(b,"isNotSaveRepeatData");c[a]["httpRequestId"]=$("#"+b).find("#httpRequestId").val();c[a]["queueName"]=$("#"+b).find("#queueName").val();c[a]["deployQueueName"]=$("#"+b).find("#deployQueueName").val();c[a]["urlfetchPluginId"]=$("#"+b).find("#urlfetchPluginId").val();c[a]["urlOriginSiteId"]=$("#"+b).find("#urlOriginSiteId").val();c[a]["updateMode"]=$("#"+b).find("#updateMode").val();return}},remove:function(a){var b=$("#"+a).find("#id").val();if(b==null||b.length==0){showInfo(nc.i18n("res.site.select"));return}if(!confirm(nc.i18n("res.remove.confirm"))){return}showLoading($("#"+a));jsonrpc.siteTasksService.removeCheck(function(c,d,e){var f=c;if(f!="success"){if(!confirm(nc.i18n("res.remove.confirm2",f))){removeLoading($("#"+a));return}}jsonrpc.siteTasksService.remove(function(g,h,i){removeLoading($("#"+a));if(h){return}f=g;if(f){removeSiteTaskNode(siteTask.v.webCrawlerId,b);removeSelectForm(a,b,"nestedSiteId");removeSelectForm("deployForm",b,"siteIdByURL");removeSelectForm("jsDependForm",b,"siteId");removeSelectForm("siteCreateForm",b,"urlOriginSiteId");removeSelectForm("urlCheckForm",b,"urlOriginSiteId");showInfo(nc.i18n("res.remove.success"))}else{showInfo(nc.i18n("res.remove.failure"))}},siteTask.v.webCrawlerId,b)},siteTask.v.webCrawlerId,b)},resetCache:function(a){var b=$("#"+a).find("#id").val();if(b==null||b.length==0){showInfo(nc.i18n("res.site.select"));return}jsonrpc.siteTasksService.resetCache(function(c,d,e){if(d){return}var f=c;if(f){showInfo(nc.i18n("res.reset.mem.success"))}else{showInfo(f)}},siteTask.v.webCrawlerId,b)},autoCrawl:function(){if(siteTask.v.siteId==null){showInfo(nc.i18n("res.site.select"));return}jsonrpc.siteCrawlTestService.crawlData(function(a,b,c){if(b){return}var d=a;if(d!=undefined){showInfo(d)}},siteTask.v.webCrawlerId,siteTask.v.siteId)}}};