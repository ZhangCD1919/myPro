define(['jquery', 'echarts', 'template','nprogress', 'cookie'], function ($, echarts, template,nprogress) {
    // 控制左侧导航菜单的显示和隐藏
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });
    //菜单栏的激活状态
    var pathname=location.pathname;
    $('.navs a[href="'+pathname+'"]').addClass("active");

    // 页面加载蒙版
    $(document).ajaxStart(function () {
        $(".overlayer").show();
    });
    $(document).ajaxStop(function () {
        $(".overlayer").hide();
    });
    nprogress.start();
    nprogress.done();

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

