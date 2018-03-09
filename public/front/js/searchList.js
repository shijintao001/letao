$(function () {

// 功能1 将地址栏 的值放到input
   var key = getSeatch("key");
   $(".lt_search input").val(key);
    var page = 1;
    var pageSize = 4;
   // 根据关键字 发送ajax 获取对应商品
    function render(callback) {
        var param = {};
        param.page = page;
        param.pageSize = pageSize;
        param.proName = $('.lt_search input').val();

        // 对于price 和num 这两个值不一定要加 如果有now 这个类就加升序
        var $now = $('.lt_sort a.now');
        // console.log($now.length);
        if($now.length > 0){
            var sortName = $now.data('type');
            // console.log(sortName);
            var sortValue=　$now.find('span').hasClass('fa-angle-down')?2:1;
            // console.log(sortValue);
           param[sortName]=sortValue;
        }


        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:param,
            success:function(info){
                // console.log(info);
                setTimeout(function () {
                    callback(info)
                },1000);


            }
        });

    };
    // 下拉刷新 上拉加载
    mui.init({
        pullRefresh:{
            container:".mui-scroll-wrapper",
            down:{
                auto:true,
                callback:function () {
                    // console.log("下拉刷新的函数");
                    page=1;
                    render(function (info) {
                        // console.log(info);

                        $(".lt_product").html(template("tpl",info));

                        // 数据加载完成 把下拉加载框关闭
                        mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                        //重置上拉加载
                        mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                    });
                }
            },
            up:{
                callback:function () {
                    // console.log("上拉加载中")
                    // 要加在下一页的数据
                    page++;
                    render(function (info) {
                        // 数据加载完成 把下拉加载框关闭
                        if(info.data.length > 0){
                            $(".lt_product").append(template("tpl",info));
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(false);
                        }else {
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(true);
                        }

                    });

                }
            }
        }
    })


    // 功能2 点击搜索按钮
    //  1 获取 到input 框中的value
    // 2  在次发送ajax
    $('.lt_search button').on('click',function () {

        $('.lt_sort a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
         key = $('.lt_search input').val();

         //让容器下拉刷新一次即可
         mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();


        // console.log(val);
        var arr = JSON.parse(localStorage.getItem("search_list") || "[]");
        // console.log(arr);

        // 需求数组长度不能超过10
        // 重复的去掉
        var index = arr.indexOf(key);
        if(index !=-1){
            arr.splice(index,1);
        }

        if(arr.length >=10){
            arr.pop();
        }

        // console.log(arr);
        arr.unshift(key);
        // console.log(arr);
        localStorage.setItem('search_list',JSON.stringify(arr));
    });



    // 功能3 点击排序
    $('.lt_sort [data-type]').on('tap',function () {
        // alert(1);
        // 判断 a 有没有这个类now  如果有判断箭头指向
        if($(this).hasClass('now')){
            //切换箭头
            $(this).find('span').toggleClass('fa-angle-down').toggleClass("fa-angle-up");
        }else {
            $(this).addClass('now').siblings().removeClass('now');
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
    });

});