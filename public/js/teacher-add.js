/**
 * Created by NINI on 2017/3/22.
 */
define(['jquery', 'template', 'datepicker', 'language', 'validate', 'form'], function ($, template) {

    function render(renderObj) {
        var html = template("teacherEdit", renderObj);
        $("#teacherForm").html(html);

        $(".datepicker").datepicker({
            // 时间格式
            format: "yyyy-mm-dd",
            language: "zh-CN",
            endDate: "0d"
        });


        $("#add").click(function () {
            // 表格数据转为对象
            $("#teacherForm").validate();
            
            var data = $("#teacherForm").serialize();
            data = data.split("&");
            var obj = {};
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                obj[item.substr(0, item.indexOf("="))] = item.substring(item.indexOf("=") + 1, item.length);
            }
            if (pathname.indexOf("tc_id") == -1) {
                // 添加
                $.ajax({
                    type: "post",
                    url: "/api/teacher/add",
                    data: obj,
                    dataType: "json",
                    success: function (data) {
                    }
                });
            } else {
                obj.tc_id = tc_id;
                // 编辑
                $.ajax({
                    type: "post",
                    url: "/api/teacher/update",
                    data: obj,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                    }
                })
            }
            return false;
        })
    }


    var pathname = location.search;
    var tc_id = pathname.substr(pathname.indexOf("=") + 1, pathname.length);
    if (pathname.indexOf("tc_id") == -1) {
        $("li.active").text("添加讲师");
        render({});
    } else {
        $("li.active").text("编辑讲师");
        $.ajax({
            type: "get",
            url: "/api/teacher/edit",
            data: {tc_id: tc_id},
            dataType: "json",
            success: function (data) {
                render(data.result);
            }
        })
    }
})
;