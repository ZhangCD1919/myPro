/**
 * Created by NINI on 2017/3/22.
 */
define(['jquery', 'template', 'datepicker', 'language'], function ($, template) {
    $(".datepicker").datepicker({
        // 时间格式
        format: "yyyy-mm-dd",
        language: "zh-CN",
        // startDate:'-3d',
        endDate: "0d"
    });


    var pathname = location.search;
    var tc_id=pathname.substr(pathname.indexOf("=")+1,pathname.length);
    console.log(tc_id);
    if (pathname.indexOf("tc_id") == -1) {
        $("li.active").text("添加讲师");

        }else {
        $("li.active").text("编辑讲师");
        // 编辑
        $.ajax({
            type:"get",
            url:"/api/teacher/edit",
            data:{tc_id:tc_id},
            dataType:"json",
            success:function (data) {
                var html=template("teacherEdit",data.result);
                $("#teacherForm").html(html);
            }
        })
    }

    $("#add").click(function () {
        // 表格数据转为对象
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
                    if (data.code == 200) {
                        // var html=template(id,data.result);
                        console.log(1);
                    }
                }
            })
        } else {
            // 编辑
            $.ajax({
                type:"get",
                url:"/api/teacher/edit",
                data:{tc_id:tc_id},
                dataType:"json",
                success:function (data) {

                }
            })
        }
        return false;
    })
});