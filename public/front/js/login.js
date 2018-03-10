$(function () {


    $('.btn_login').on("click",function () {
        var username = $("[name=username]").val();
        var password = $("[name=password]").val();

        if(!username){
            mui.toast("请输入用户名");
            return;
        }
        if(!password){
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },

            success:function(info){
                // console.log(info);
                if(info.error){
                    mui.toast(info.message);
                }
                if(info.success){
                    //跳转
                    // 判断 如果有reUrl 参数 说明需要跳回去 reUrl对应地址去
                    //如果没有默认去 user.html
                   if(location.search.indexOf("retUrl")!=-1){
                       // 跳到指定retUrl指定地址
                       // history.go(-1);
                       location.href = location.search.replace("?retUrl=","");
                   }else{
                       location.href = "user.html";
                   }
                }
            }
        })
    });

});