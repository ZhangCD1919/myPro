/**
 * Created by NINI on 2017/3/22.
 */
define(['jquery','template','bootstrap'],function ($,template) {
    $.ajax({
        type:"get",
        url:"/api/teacher",
        dateType:"json",
        success:function (data) {
            var html = template('teacherTpl',{list:data.result});
            $("#teacherList").html(html);
            $(".teacherBtns").on("click",".preview",function () {
                var tcid=$(this).closest("td").attr("data-tcid");
                $.ajax({
                    type:"get",
                    url:"/api/teacher/view",
                    dataType:"JSON",
                    data:{tc_id:tcid},
                    success:function (data) {
                        if (data.code==200){
                            data.result.tc_hometown=data.result.tc_hometown.replace(/\|/g," ");
                            var html=template('teacherInfoModal',data.result);
                            $("#teacherInfo").html(html);
                            $("#teacherModal").modal();
                        }

                    }
                })
            });
        }
    });

});