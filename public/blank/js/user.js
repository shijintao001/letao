$(function () {


    var page = 1;
    var pageSize = 5;

    function render() {

        $.ajax({

            type:"get",
            url:"/user/queryUser",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info);
                $('tbody').html(template('tpl',info));


                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//如果使用了bootstrap3版本，必须指定
                    currentPage:page,//设置当前页
                    totalPages:Math.ceil(info.total/info.size),//设置总页数
                    numberOfPages:5,//设置控件显示的页码数
                    onPageClicked:function (a,b,c,p) {
                        page = p;
                        render();
                    }
                })

            }
        });
    }
    render();


//    点击启用禁用
    $('tbody').on('click','.btn',function () {
        // console.log(1);
        //模态框显示
        $('#userModal').modal('show');

        //获取点击按钮时 此用户的id
        // console.log($(this));
        var id = $(this).parent().data('id');
        // console.log(id);
        var isDelete = $(this).hasClass('btn-success')?1:0;

        $('.btn_confirm').off().on('click',function () {
            // console.log(11);

            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    // console.log(info);
                    if(info.success){
                        //关闭模态框
                        $('#userModal').modal('hide');
                        //重新渲染
                        render();
                    }
                }
            })
        })
    });


});