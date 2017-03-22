/**
 * Created by NINI on 2017/3/22.
 */
define(['jquery','template'],function ($,template) {
    $.ajax({
        type:"get",
        url:"/api/teacher",
        dateType:"json",
        success:function (data) {
            // console.log(data);
            var html = template('teacherTpl',{list:data.result});
            $("#teacherList").html(html);
        }

    })
});