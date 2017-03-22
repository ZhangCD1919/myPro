define(['jquery', 'echarts', 'template', 'cookie'], function ($, echarts, template) {
    // 控制左侧导航菜单的显示和隐藏
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

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

    // cookie设置未登录跳转到登录页面
    var pathname = location.pathname;
    var flag = $.cookie('PHPSESSID');
    if (pathname.indexOf('login') == -1) {
        if (!flag) {
            location.href = '/login';
        } else {
            // 用户信息加载
            var obj = JSON.parse($.cookie("logInfo"));
            var tpl = '<img src="{{tc_avatar}}" class="img-circle avatar">' +
                '<h4>{{tc_name}}</h4>';
            var render = template.compile(tpl);
            var html = render(obj);
            $('.aside .profile').html(html);
        }
    }

    // 退出功能
    $("#logoutId").click(function () {
        $.ajax({
            type: "post",
            url: "/api/logout",
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    location.href = "/login";
                }
            }
        })
    })
});

