$(function () {


var page = 1;
var pagesize = 5 ;

var render = function () {
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:page,
            pageSize:pagesize
        },

        success:function(info){
            // console.log(info);
            $('tbody').html(template('tpl',info));


        //    渲染分页
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage:page,
                totalPages:Math.ceil(info.total/info.size),
                onPageClicked:function (a,b,c,p) {
                    page=p;
                    render();
                }
            })
        }
    });
}

render();


//当点击添加分类时 弹出模态框
    $('.btn_add').on('click',function () {
        // console.log(1);
        //让模态框显示
        $('#firstModal').modal('show');
    });

// 初始化表单校验
var $form = $('form');
    // console.log($form);
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'一级分类名称不能为空'
                    }
                }
            }
        }
    });


    //给表单注册校验成功的事件
    $form.on('success.form.bv',function (e) {
        e.preventDefault();
        // console.log(1);
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function(info){
                // console.log(info);
                if(info.success){
                //    关闭模态框
                    $('#firstModal').modal('hide');
                    //重置表单样式和内容
                    $form.data('bootstrapValidator').resetForm(true);

                    //重新渲染第一页
                    page=1;
                    render();
                }
            }
        })
    })
});