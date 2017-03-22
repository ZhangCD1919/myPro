define(['jquery','echarts','cookie'],function ($,echarts) {
    // 控制左侧导航菜单的显示和隐藏
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    var pathname = location.pathname;

    var flag = $.cookie('PHPSESSID');
    if (!flag && pathname.indexOf('login') == -1) {
        location.href = '/login';
    }
// 登录功能
    $("#loginForm").submit(function () {
        var formData = $(this).serialize();
        $.ajax({
            type: "post",
            url: "/api/login",
            data: formData,
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    var logInfo = JSON.stringify(data.result);
                    $.cookie('logInfo', logInfo, {path: '/'});
                    location.href = '/index/index';
                }
            }
        });
        return false;
    });
// 用户信息加载
    var obj=JSON.parse($.cookie('logInfo'));
    $('.aside .profile img').attr('src',obj.tc_avatar);
    $('.aside .profile h4').html(obj.tc_name);
});

