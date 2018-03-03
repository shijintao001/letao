$(function () {

    //禁用进度环
    NProgress.configure({
        showSpinner:false
    });


    $(document).ajaxStart(function () {
        //进度条加载效果
        NProgress.start();
    });

$(document).ajaxStop(function () {
    setInterval(function () {
        NProgress.done();
    },500)
});


//二级菜单显示与隐藏
    $('.second').prev().on("click",function () {
        // console.log(1);
        $(this).next().slideToggle();
    });


    //左侧栏隐藏 给icon-menu 注册点击事件
    $('.icon-menu').on('click',function () {
       // 让侧边栏隐藏
        console.log(1);
        $(".lt-aside").toggleClass("now");

        // 让main 隐藏
        $('.lt-main').toggleClass('now');
    });

    //退出功能
    $('.icon-logout').on('click',function () {
        $('#logoutModal').modal('show');
    });

    $('.btn_logout').on('click',function () {
        // console.log(1);
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(info){
                if(info.success){
                    location.href='login.html'
                }
            }
        })

    });









});