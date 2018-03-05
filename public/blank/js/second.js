$(function () {
   
    var page = 1;
    var pagesize = 5;
    
    var render = function () {
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pagesize
            },

            success:function(info){
                // console.log(info);
                $('tbody').html(template('tpl',info));


                // 分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function (a,b,c,p) {
                        page=p;
                        render();
                    }
                })

            }
        })
    }
    
    render();


    //1-点击添加分类弹出模态框
    $('.btn_add').on('click',function () {
        // console.log(1);
        $('#secondModal').modal('show');
        
        
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },

            success:function(info){
                // console.log(info);
                $('.dropdown-menu').html(template('drown',info));
            }
        })
    });

    //2-给dropdown-menu 下面所有的 a 添加 点击事件
    $('.dropdown-menu').on('click','a',function () {
        // console.log(11);

        //把对应值给 dropdown_text 里
        var text = $(this).text();
        // console.log(text);
        $('.dropdown_text').text(text);

        var id = $(this).parent().data('id');
        console.log(id);


        $('[name="categoryId"]').val(id);
        // console.log($('[name="categoryId"]').val(id));
        // 让categoryId 的校验通过
        $form.data('bootstrapValidator').updateStatus('categoryId',"VALID");
    });


    // 3 初始化图片上传

$('#fileupload').fileupload({
    dataType:'json',
    done:function (e,data) {
        // console.log(data);
        //   上传后的图片地址
        var pic = data.result.picAddr;
        // 显示出来
        $('.img_box img').attr('src',pic);

        // 给hidden
        $('[name="brandLogo"]').val(pic);



        //让brandLogo校验成功
        $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");

    }
});

    
    // 4 表单校验功能
    var $form = $("form");
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded:[],
        //校验规则
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入品牌名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传品牌的图片"
                    }
                }
            },
        }
    });


    //5 添加二级分类
    $form.on("success.form.bv",function (e) {
       e.preventDefault();
       $.ajax({
           type:'post',
           url:'/category/addSecondCategory',
           data:$form.serialize(),
           success:function (info) {
               // console.log(info);
               if(info.success){
                   $('#secondModal').modal('hide');
                   page = 1;
                   render();

                   //重置样式
                   $form.data('bootstrapValidator').resetForm(true);
                   $('.dropdown_text').text("请选择一级分类");
                   $('.img_box img').attr('src','../images/none.png');
               }
           }
       })
    });
});