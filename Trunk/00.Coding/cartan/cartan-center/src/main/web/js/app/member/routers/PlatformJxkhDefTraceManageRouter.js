
/**
 * 关联默认值
 *
 * @author 刘溪滨 (13720880048@163.com)
 * @version 1.0 @Date: 2015-11-18 上午9:10
 */
define(["types/Class",
    "utils/Log",
    "jquery",
    "base/BaseRouter",
    "base/BaseView",
    "grid/simplelist",
    "grid/SimpleListUtil",
    "rpc/AjaxEngine"
], function(Class, Log, $, BaseRouter, BaseView, SimpleListView, SimpleListUtil, 
		AjaxEngine){    
	
    
    function showEditDetilDialog(tp, titles, id, url, content){
    	var kendoUIWindow = SimpleListUtil.showkdDialog(id, content, 350, 190, titles);
    	
        
        if (tp==1){
        $("#submitBtn").click(function(){
            new AjaxEngine(url,
                {
                    async: false,                              
                    data:{id: $("#id").val(),linetype: $("#linetype").val(),soperCd: $("#soperCd").val(),cusCode: $("#cusCode").val(),cusName: $("#cusName").val(),cusManagerId: $("#cusManagerId").val(),cusManagerName: $("#cusManagerName").val(),traceProport: $("#traceProport").val()},
                    dataType: 'json',
                    complete: function(transport){
                        result = transport.responseText;
                        result = $.parseJSON(result);
                        alert("操作成功！");
                        kendoUIWindow.close();
                        var table0=$("#simplelist_list").data("kendoGrid");
                        table0.dataSource.read();
                        table0.refresh();
                    }
                }
            );
        });
    	} else{
        $("#QueryBtn").click(function(){
            new AjaxEngine(url,
                {
                    async: false,
                    data:{id: $("#id").val(),linetype: $("#linetype").val(),soperCd: $("#soperCd").val(),cusCode: $("#cusCode").val(),cusName: $("#cusName").val(),cusManagerId: $("#cusManagerId").val(),cusManagerName: $("#cusManagerName").val(),traceProport: $("#traceProport").val()},
                    dataType: 'json',
                    complete: function(transport){
                        var result = transport.responseText;
                        result = $.parseJSON(result);


                        if($.isArray(result.resultJson)){
                            var data = null;
                            for(var i= 0, count=result.resultJson.length; i<count; i++){
                                data = result.resultJson[i];

                            }
                        }
                        
                        var table0=$("#simplelist_list").data("kendoGrid");
                        table0.dataSource.data([]);
                        table0.dataSource.data(result.resultJson);
                        kendoUIWindow.close();
                    }
                }
            );
        });
    	}
        SimpleListUtil.setDataTimeCn();

        
    }
    
    var PlatformJxkhDefTraceManageRouter = BaseRouter.extend({
        routes: {
            "basic_manage/platform_JxkhDefTrace_manage": "showPlatformJxkhDefTraceManageList",  
            "basic_manage/platform_ckJxkhDefTrace_manage": "showPlatformckJxkhDefTraceManageList"
        },
        showPlatformckJxkhDefTraceManageList: function(){
            $("#Submit").click(function(){
                var sid=SimpleListUtil.getSessionId();
                if (SimpleListUtil.cklogin(sid)=="1"){
                	SimpleListUtil.addSession(sid);
                } else {
                	SimpleListUtil.removeSession(sid);
                }
            });
        },
        showPlatformJxkhDefTraceManageList: function(){
            //var sid=SimpleListUtil.getSessionId();
            //SimpleListUtil.ckSession(sid);            
            var platformJxkhDefTraceManageListView = new SimpleListView({
                id: "platform_jxkhDefTrace_manage_list",
                title: "基础管理 > 关联默认值",
                buttonCount:3,

                ready: function(){
                    this.setSimpleListHeader("关联默认值");
                    this.addToolbarBtn("addBtn", "新 增", function(){
                        var detailstr="";
                        detailstr+="<div id='content' align='center'>";
                        detailstr+="<table>";                       
                        detailstr+="<input id='id' name='编号' hidden='true' style='...'/>";                          
                        detailstr+="<tr><td>";
                        detailstr+="<label id='llinetype' align='right'>条线：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='linetype' name='条线' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lsoperCd' align='right'>关联类型：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='soperCd' name='关联类型' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lcusCode' align='right'>客户代码：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='cusCode' name='客户代码' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lcusName' align='right'>客户名称：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='cusName' name='客户名称' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lcusManagerId' align='right'>客户经理ID：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='cusManagerId' name='客户经理ID' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='lcusManagerName' align='right'>客户经理名称：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='cusManagerName' name='客户经理名称' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="<tr><td>";
                        detailstr+="<label id='ltraceProport' align='right'>关联比例：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='traceProport' name='关联比例' style='...'/>";
                        detailstr+="</td></tr>";
                        detailstr+="</table>";
                        detailstr+="</div>";
                        detailstr+="<div align='center'>";
                        detailstr+="<input id='submitBtn'  name='submitBtn' type='button' value='保 存' />";
                        detailstr+="</div>";
                        showEditDetilDialog(1,"新增","0" ,"http://liuxibin.vicp.cc:8088/router?appKey=000001&method=jxkhDefTrace.createJxkhDefTrace&v=1.0&format=json",$(detailstr));
                        dialogId = null;
                    }, "add");
                    this.addToolbarBtn("deleteBtn", "删 除",function(){
                        var rowCount = platformJxkhDefTraceManageListView.getGridObject().select().length;
                        if (rowCount>0){
                        for(var i=0; i<rowCount; i++){
                            rowEl = platformJxkhDefTraceManageListView.getGridObject().select().get(i);
                            var ID = SimpleListUtil.getColumnValue(platformJxkhDefTraceManageListView.getGridObject(),rowEl, "id");
                            new AjaxEngine("http://liuxibin.vicp.cc:8088/router?appKey=000001&method=jxkhDefTrace.deleteJxkhDefTrace&v=1.0&format=json",
                            {
                                async: false,
                                data:{id: ID},
                                dataType: 'json',
                                complete: function(transport){
                                    result = transport.responseText;
                                    result = $.parseJSON(result);
                                	}
                            	}
                            );
                        }
                        alert("删除成功！");
                        var table0=$("#simplelist_list").data("kendoGrid");
                        table0.dataSource.read();
                        table0.refresh();
                        } else {
                            alert("请先选择记录！");
                        }
                    }, "delete");
                    this.addToolbarBtn("queryBtn", "查 询", function(){
                        var detailstr="";
                        detailstr+="<div id='content' align='center'>";
                        detailstr+="<table>";
                        detailstr+="<input id='id' name='编号' hidden='true' style='...'/>";                          

                        detailstr+="<tr><td>";
                        detailstr+="<label id='llinetype' align='right'>条线：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='linetype' name='条线' style='...'/>";
                        detailstr+="</td></tr>";
                        

                        detailstr+="<tr><td>";
                        detailstr+="<label id='lsoperCd' align='right'>关联类型：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='soperCd' name='关联类型' style='...'/>";
                        detailstr+="</td></tr>";
                        

                        detailstr+="<tr><td>";
                        detailstr+="<label id='lcusCode' align='right'>客户代码：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='cusCode' name='客户代码' style='...'/>";
                        detailstr+="</td></tr>";
                        

                        detailstr+="<tr><td>";
                        detailstr+="<label id='lcusName' align='right'>客户名称：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='cusName' name='客户名称' style='...'/>";
                        detailstr+="</td></tr>";
                        

                        detailstr+="<tr><td>";
                        detailstr+="<label id='lcusManagerId' align='right'>客户经理ID：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='cusManagerId' name='客户经理ID' style='...'/>";
                        detailstr+="</td></tr>";
                        

                        detailstr+="<tr><td>";
                        detailstr+="<label id='lcusManagerName' align='right'>客户经理名称：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='cusManagerName' name='客户经理名称' style='...'/>";
                        detailstr+="</td></tr>";
                        

                        detailstr+="<tr><td>";
                        detailstr+="<label id='ltraceProport' align='right'>关联比例：</label>";
                        detailstr+="</td><td>";

						
                		detailstr+="<input id='traceProport' name='关联比例' style='...'/>";
                        detailstr+="</td></tr>";
                        
                        
                        detailstr+="</table>";
                        detailstr+="</div>";
                        detailstr+="<div align='center'>";
                        detailstr+="<input id='QueryBtn'  name='QueryBtn' type='button' value='查 询'  />";
                        detailstr+="</div>";
                        showEditDetilDialog(2,"查询","2" ,"http://liuxibin.vicp.cc:8088/router?appKey=000001&method=jxkhDefTrace.selectJxkhDefTrace&v=1.0&format=json",$(detailstr));
                        dialogId = null;
                    });
                },

                dataSource: {
                    serverPaging: false,
                    transport: {
                        read: {
                            url: "http://liuxibin.vicp.cc:8088/router?appKey=000001&method=jxkhDefTrace.selectJxkhDefTrace&v=1.0&format=json"
                        }
                    },
                    schema: {
                        model: {
                            fields: {
                        		id: { type: "string" },linetype: { type: "string" },soperCd: { type: "string" },cusCode: { type: "string" },cusName: { type: "string" },cusManagerId: { type: "string" },cusManagerName: { type: "string" },traceProport: { type: "string" }
                            }
                        },
                        parse: function(response) {
                            return response;
                        },
                        //返回的数据
                        data: function(response) {
                            var result = response["resultJson"];

                            if($.isArray(result)){
                                var data = null;
                                for(var i= 0, count=result.length; i<count; i++){
                                    data = result[i];


                                }
                            }
                            result = platformJxkhDefTraceManageListView.appendColValue(result);
                            return result;
                        },
                        //记录条数
                        total: function(response) {
                            var result = response["total"] || response["resultJson"].length;
                            return result;
                        }
                    }
                },
                columns: [
                          {field: "chk", type:"chk", title: "&nbsp;", value:"ID"},
                          {field: "id", title:"编号", hidden:"true", align:"center", width: "100px"},

    						
                    		{field: "linetype", title:"条线", align:"center", width: "100px"},

    						
                    		{field: "soperCd", title:"关联类型", align:"center", width: "100px"},

    						
                    		{field: "cusCode", title:"客户代码", align:"center", width: "100px"},

    						
                    		{field: "cusName", title:"客户名称", align:"center", width: "100px"},

    						
                    		{field: "cusManagerId", title:"客户经理ID", align:"center", width: "100px"},

    						
                    		{field: "cusManagerName", title:"客户经理名称", align:"center", width: "100px"},

    						
                    		{field: "traceProport", title:"关联比例", align:"center", width: "100px"},
                    {
                        width: 100,
                        title: "操作列",
                        align: "center",
                        command: [ {
                            name: "修 改",
                            click: function(e) {
                                var rowEl = SimpleListUtil.getCurrentRow(e.target);
                                platformJxkhDefTraceManageListView.selectRow(rowEl);
                                var Id = SimpleListUtil.getSelectedColumnValue(this, "id");
                                var dialogId = "detail_edit_dialog_" + Id;
                                var columnArray = platformJxkhDefTraceManageListView.get("columns");
                                var col = null;
                                var colName = null;
                                var value = null;
                                var ColumnValue = {};
                                for(var i= 0, colCount=columnArray.length; i<colCount; i++){
                                    col = columnArray[i];
                                    colName = col.field;
                                    value = SimpleListUtil.getSelectedColumnValue(this, colName);
                                    ColumnValue[colName] = value;
                                }

                                var detailstr="";
                                detailstr+="<div id='content' align='center'>";
                                detailstr+="<table>";
                                detailstr+="<input id='id' name='编号' hidden='true' value='"+ColumnValue["id"]+"' style='...'/>";

                                detailstr+="<tr><td>";
                                detailstr+="<label id='llinetype' align='right'>条线：</label>";
                                detailstr+="</td><td>";

        						
                        		detailstr+="<input id='linetype' name='条线' value='"+ColumnValue["linetype"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lsoperCd' align='right'>关联类型：</label>";
                                detailstr+="</td><td>";

        						
                        		detailstr+="<input id='soperCd' name='关联类型' value='"+ColumnValue["soperCd"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lcusCode' align='right'>客户代码：</label>";
                                detailstr+="</td><td>";

        						
                        		detailstr+="<input id='cusCode' name='客户代码' value='"+ColumnValue["cusCode"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lcusName' align='right'>客户名称：</label>";
                                detailstr+="</td><td>";

        						
                        		detailstr+="<input id='cusName' name='客户名称' value='"+ColumnValue["cusName"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lcusManagerId' align='right'>客户经理ID：</label>";
                                detailstr+="</td><td>";

        						
                        		detailstr+="<input id='cusManagerId' name='客户经理ID' value='"+ColumnValue["cusManagerId"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='lcusManagerName' align='right'>客户经理名称：</label>";
                                detailstr+="</td><td>";

        						
                        		detailstr+="<input id='cusManagerName' name='客户经理名称' value='"+ColumnValue["cusManagerName"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                

                                detailstr+="<tr><td>";
                                detailstr+="<label id='ltraceProport' align='right'>关联比例：</label>";
                                detailstr+="</td><td>";

        						
                        		detailstr+="<input id='traceProport' name='关联比例' value='"+ColumnValue["traceProport"]+"' style='...'/>";
                                detailstr+="</td></tr>";
                                
				                detailstr+="</table>";
				                detailstr+="</div>";
				                detailstr+="<div align='center'>";
				                detailstr+="<input id='submitBtn'  name='submitBtn' type='button' value='保 存' />";
				                detailstr+="</div>";
                                showEditDetilDialog(1,"修改",dialogId ,"http://liuxibin.vicp.cc:8088/router?appKey=000001&method=jxkhDefTrace.updateJxkhDefTrace&v=1.0&format=json", $(detailstr));
                                dialogId = null;
                            }

                        }]
                    }
                ]
            });

            this.changePage(platformJxkhDefTraceManageListView);
        }
    });

    return PlatformJxkhDefTraceManageRouter;
});
