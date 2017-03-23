/**
 * Created by NINI on 2017/3/22.
 */
define(['jquery', 'template', 'datepicker', 'language', 'validate', 'form'], function ($, template) {

        // 表单转对象
        function formToObj(formData) {
            var formData = formData;
            formData = formData.split("&");
            var obj = {};
            for (var i = 0; i < formData.length; i++) {
                var item = formData[i];
                obj[item.substr(0, item.indexOf("="))] = item.substring(item.indexOf("=") + 1, item.length);
            }
            return obj;
        }

        // 表单验证：
        function formCheck(url) {
            $("#teacherForm").validate({
                onkeyup: true,
                sendForm: false,
                eachValidField: function () {
                    $(this).removeClass("error").addClass("success");
                },
                eachInvalidField: function () {
                    $(this).removeClass("success").addClass("error");
                },
                valid: function () {
                    $(this).ajaxSubmit({
                        url: url,
                        type: "post",
                        dataType: "json",
                        success: function (data) {
                            location.href="/teacher/list"
                        }
                    })
                }
            })
        }

        function render(renderObj) {
            var html = template("teacherEdit", renderObj);
            $("#teacherForm").html(html);

            $(".datepicker").datepicker({
                // 时间格式
                format: "yyyy-mm-dd",
                language: "zh-CN",
                endDate: "0d"
            });

            var obj = formToObj($("#teacherForm").serialize());
            if (pathname.indexOf("tc_id") == -1) {
                formCheck("/api/teacher/add");
            } else {
                // obj.tc_id = tc_id;
                formCheck("/api/teacher/update");
            }
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
    }
);