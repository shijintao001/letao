$(function () {

// 功能1 将地址栏 的值放到input
   var key = getSeatch("key");
   $(".lt_search input").val(key);

   // 根据关键字 发送ajax 获取对应商品
    function render() {
        var param = {};
        param.page = 1;
        param.pageSize = 100;
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
                $(".lt_product").html(template("tpl",info));
            }
        });

    }
    render();
    // 功能2 点击搜索按钮
    //  1 获取 到input 框中的value
    // 2  在次发送ajax
    $('.lt_search button').on('click',function () {

        $('.lt_sort a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
         key = $('.lt_search input').val();

         render();

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
    $('.lt_sort [data-type]').on('click',function () {
        // alert(1);
        // 判断 a 有没有这个类now  如果有判断箭头指向
        if($(this).hasClass('now')){
            //切换箭头
            $(this).find('span').toggleClass('fa-angle-down').toggleClass("fa-angle-up");
        }else {
            $(this).addClass('now').siblings().removeClass('now');
        }
        render();
    })

});