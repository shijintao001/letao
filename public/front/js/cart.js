$(function () {
    //获取购物车信息
    function render() {
        $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (info) {
                // console.log(info);
                if (info.error) {
                    //此时没有登录 跳转到登录页 还需要调回来
                    location.href = "login.html?retUrl=" + location.href;
                }

                // 需要对值渲染那
                $("#OA_task_2").html(template("tpl", {info: info}));
                //结束下啦刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();

                //重置价格
                $(".lt_order span").text("0.00");

            }
        });
    };
    // 配置下拉刷新
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",
            down: {
                auto: true,
                callback: function () {
                    setTimeout(function () {
                        render();//在真正工作中不需要设置定时器
                    }, 1000)
                }

            }
        }
    });

    //删除
    $('#OA_task_2').on("tap", ".btn_delete", function () {
        var id = $(this).data("id");

        mui.confirm("您是否要删除这件商品？", "温馨提示", ["是", "否"], function (e) {
            if (e.index == 0) {
                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: {
                        id: [id]
                    },
                    success: function (info) {
                        if (info.success) {
                        //触发下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                })

            }
        })

    });

    // 修改
    // 1 给修改按钮注册点击事件
    // 2 获取id
    // 3 根据id查询对应商品信息
    // 4 把查询数据显示在mui.confirm 框中
    // 5 修改尺码和数量
    // 6 点确定 发送ajax请求 修改到数据库
    // 7 下拉一次
    $('#OA_task_2').on("tap",".btn_edit",function () {
        // console.log(1);
        var data = this.dataset;
        // console.log(data);
        var html = template("editTpl",data);
        //替换html换行
        html = html.replace(/\n/g,"");
        mui.confirm(html,"编辑商品",["确定","取消"],function (e) {
        if(e.index === 0){
            //点击了确定
            //发送ajax请求
            var id = data.id;
            var size = $('.lt_edit_size span.now').text();
            var num = $('.mui-numbox-input').val();
            $.ajax({
                type:"post",
                url:"/cart/updateCart",
                data:{
                    id:id,
                    size:size,
                    num:num
                },
                success:function (info) {
                    if(info.success){
                        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                    }
                }
            })
        }
        });

        
        //给span注册点击事件
        $('.lt_edit_size span').on("tap",function () {
            $(this).addClass('now').siblings().removeClass('now');
        });
        //初始化numbox
        mui(".mui-numbox").numbox();
    });

    var total = 0;
    // 计算总金额
    $("#OA_task_2").on("change",".ck",function () {
        // console.log(1);
        //找到所有选中的checkbox 遍历 计算金额
        // console.log($(":checked"));
        $(":checked").each(function () {
            var price = $(this).data("price");
            var num = $(this).data("num");
            total += price * num;
        });
        // console.log(total);
        $(".lt_order span").text(total.toFixed(2));
    });
});