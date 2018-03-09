$(function () {
    // 功能1  渲染数据
    // 1 获取到地址栏中productId
    // 2 发送ajax
    // 3 结合模版渲染
    var productId = getSeatch("productId");

    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{ id:productId},

        success:function(info) {
            //给info添加一个数组
            var tempArr = info.size.split('-');
            var arr = [];
            // console.log(tempArr);
            for (var i = +tempArr[0]; i < tempArr[1]; i++) {
                arr.push(i);
            }
            // console.log(arr);
            info.sizeArr = arr;
            // console.log(info);
            $('.mui-scroll').html(template('tpl', info));
            // 重新初始化轮播图
            mui('.mui-slider').slider();

            //     初始化numbox
            mui(".mui-numbox").numbox();

            // 可以选择尺码
           $('.lt_size span').on("click",function () {
               // console.log(1);
               $(this).addClass("now").siblings().removeClass("now");
           })

        }
    });

    //功能2 加入购物车
    // 1 给加入购物车 注册点击事件
    // 2 获取productId, num, size ,发送ajax请求

    $('.btn_add_cart').on("click",function () {
        // console.log(1);
        var size = $(".lt_size span.now").text();
        // console.log(size);
        var num = $('.mui-numbox-input').val();
        // console.log(num);
        if(!size){
            mui.toast("请选择尺码");
            return;
        }
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
            productId:productId,
                num:num,
                size:size
            },
            success:function(info){
                // console.log(info);
                if(info.error){
                //   跳转登录页 并且把当前页传递过去
                location.href = "login.html?retUrl="+location.href;
                }

                if(info.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function (e) {
                        if(e.index == 0){
                            location.href = "cart.html";
                        }
                    })
                }
            }
        })
    });

});