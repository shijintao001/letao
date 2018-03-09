$(function () {
   
    
    // 页面加载时 需要获取当前用户个人信息
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",

        success:function(info){
            // console.log(info);
            if(info.error){
                location.href = "login.html"
            }
            // 如果成功直接渲染
            $('.userinfo').html(template("tpl",info));
        }
    });

    //退出功能
    $(".btn_logout").on("click",function () {
       $.ajax({
           type:"get",
           url:"/user/logout",

           success:function(info){
           if(info.success){
               location.href ="login.html";
           }
           }
       }) 
    });
});