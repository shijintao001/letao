$(function () {




    //功能1 列表渲染

    // 1-从本地缓存中获取需要到渲染的数据
    function getHistory() {
        var history = localStorage.getItem("search_list") || '[]';
        // console.log(history);
        var arr = JSON.parse(history);
        return arr;
    };

    function render() {
        var arr = getHistory();
        // console.log(arr);
        // 2- 结合模版引擎渲染
        $('.lt_history').html(template('tpl', {info: arr}));
    };
    render();


    // 功能2 清空
    // 思路
    // 1 给清空按钮注册点击事件
    // 2 清空 search_list
    // 3 重新渲染
    $('.lt_history').on('click','.btn_empty',function () {
        // alert(1)

        mui.confirm('你确定清空吗?','温馨提示',['否','是'],function (e) {
            // console.log(e.index);
            if(e.index === 1){
                //删除缓存
                localStorage.removeItem('search_list');
                //重新渲染
                render();
            }

        })

    });

    // 功能3 点击× 删除对应的数据
    // 思路
    // 1 给btn_delete 添加点击事件
    // 2 获取删除index
    // 3 获取 web 存储中的数组
    // 4 删除数组中对应的下标
    // 5 重新设置search_list 值
    // 6 重新渲染
    $('.lt_history').on('click','.btn_delete',function () {
        // alert(1);
        var that = $(this);
        // console.log($('this'));
        mui.confirm('你确定删除这条记录吗?','温馨提示',['否','是'],function (e) {
            if(e.index === 1){
                // console.log(that);
                var index = that.data('index');
                // console.log(index);
                var arr = getHistory();
                // console.log(arr);
                arr.splice(index,1);
                // console.log(arr);
                // 重新设置 search_list
                localStorage.setItem('search_list',JSON.stringify(arr));
                render();
            }
        });

    });



    // 功能3 增加功能
    // 1 给搜索按钮注册事件
    // 2 获取文本框的value 值
    // 3 获取存储数据
    // 4 把增加的添加到数组最前面
    // 5 重新设置 search_list
    // 6 （跳转）
    $('.lt_search button').on('click',function () {
        // alert(1);
        var val = $('.lt_search input').val().trim();
        $('.lt_search input').val('');
        if(val == ''){
            // alert('请输入一个关键字');
            mui.toast('请输入一个关键字');
            return;
        }
        // console.log(val);
       var arr = getHistory();

        // 需求数组长度不能超过10
        // 重复的去掉
        var index = arr.indexOf(val);
        if(index !=-1){
            arr.splice(index,1);
        }

        if(arr.length >=10){
            arr.pop();
        }

        // console.log(arr);
        arr.unshift(val);
        // console.log(arr);
        localStorage.setItem('search_list',JSON.stringify(arr));
        // render();
      location.href = 'searchList.html?key='+val;
    });

});