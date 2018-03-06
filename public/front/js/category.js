$(function () {

        //1. 发送ajax请求，加载一级分类的数据

        $.ajax({
            type:"get",
            url:"/category/queryTopCategory",
            success:function(info){
                // console.log(info);
                $('.first').html(template('first',info));


                // console.log(info.rows[0].id);
                renderSecond(info.rows[0].id);
            }
        });

        // 当点击一级分类时候 重新渲染二级菜单
    $('.first').on('click',"li",function () {
        // console.log(1);
        $(this).addClass('now').siblings().removeClass('now');
       var id = $(this).data('id');
        // console.log(id);
        renderSecond(id);
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300);
    });


        // 渲染二级分类函数
    function renderSecond(id) {
            $.ajax({
                type:"get",
                url:"/category/querySecondCategory",
                data:{
                    id:id
                },
                success:function(info){
                    // console.log(info);
                    $('.second').html(template('second',info));
                }
            })
    };

});