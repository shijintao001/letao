$(function () {

    var page = 1;
    var pagesize = 5;

    var result = []; //数组用于存放上传成功的图片的地址
    var render = function () {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: page,
                pageSize: pagesize
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('tpl', info));



                    $('#paginator').bootstrapPaginator({
                        bootstrapMajorVersion: 3,
                        currentPage: page,
                        totalPages: Math.ceil(info.total / info.size),
                        onPageClicked: function (a, b, c, p) {
                            page = p;
                            render();
                        },
                        itemTexts: function (type, page, current) {
                            // console.log(type, page, current);
                            switch (type) {
                                case 'first':
                                    return '首页';
                                case 'prev':
                                    return '上一页';
                                case 'next':
                                    return "下一页";
                                case 'last':
                                    return "尾页";
                                default:
                                    return "第"+page+"页";
                            }
                        },
                        tooltipTitles:function (type, page, current) {
                            switch (type) {
                                case 'first':
                                    return '首页';
                                case 'prev':
                                    return '上一页';
                                case 'next':
                                    return "下一页";
                                case 'last':
                                    return "尾页";
                                default:
                                    return "第"+page+"页";
                            }
                        }

                    });


            }
        });
    };
    render();


//    当点击添加商品 模态框显示
    $('.btn_add').on('click',function () {
        // console.log(111);
        $('#productModal').modal('show');

        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                // console.log(info);

                $('.dropdown-menu').html(template('proTpl',info));
            }
        });
    });


    // 当选择二级分类时 改变输入框的属性
    $('.dropdown-menu').on('click','a',function () {
        // console.log(1);
        // 设置文字
        $('.dropdown_text').text($(this).text());
        // 设置id
        $("[name='brandId']").val($(this).data("id"));
        
        // 让brandId 校验成功
        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
    });


    // 初始化图片上传
    $('#fileupload').fileupload({
        dataType:'json',
        done:function (e,data) {


            if(result.length >= 3){
                return;
            }
            // console.log(data.result);
            // 1 获取到上传的图片地址 往img_box里放
            var pic = data.result.picAddr;

            // $('.img_box').append('<img src="'+pic+'" width="100" height="100">');
            //把img 添加到父盒子上去
            $('<img src="'+pic+'" width="100" height="100">').appendTo('.img_box');



            //将 结果保存到数组中
            result.push(data.result);
            // console.log(result);

            // 当数组长度等于3 校验成功
            if(result.length ===3 ){
            // 让某个字段校验成功
                $('form').data('bootstrapValidator').updateStatus('productLogo','VALID');
            }else {
                $('form').data('bootstrapValidator').updateStatus('productLogo','INVALID');

            }
        }

    });


    // 表单校验
    var  $form = $('form');
    $form.bootstrapValidator({
        // 把不校验的释放让其校验
        excluded:[],

        //校验小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{

                    notEmpty:{
                        message:'请选择品牌'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    },
                    stringLength:{
                        min:2,
                        message:'请输入合法的商品名称'
                    }
                }
            },
            proDesc:{
                validators:{

                    notEmpty:{
                        message:'请输入描述'
                    }
                }
            },
            num:{
                validators:{

                    notEmpty:{
                        message:'请输入商品库存'
                    },
                    //正则校验
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入一个有效的库存'
                    }
                }
            },
            size:{
                validators:{

                    notEmpty:{
                        message:'请输入商品尺码'
                    },
                    //正则校验
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'请输入一个有效的尺码'
                    }
                }
            },
            oldPrice:{
                validators:{

                    notEmpty:{
                        message:'请输入商品原价'
                    },
                    //正则校验
                    regexp:{
                        regexp:/^[1-9]*$/,
                        message:'请输入一个有效的价格'
                    }
                }
            },
            price:{
                validators:{

                    notEmpty:{
                        message:'请输入商品现价'
                    },
                    //正则校验
                    regexp:{
                        regexp:/^[1-9]*$/,
                        message:'请输入一个有效的价格'
                    }
                }
            },
            productLogo:{
                validators:{

                    notEmpty:{
                        message:'请上传3张图片'
                    }


                }
            }


        }
    });


    // 表单校验成功的事件
    $form.on('success.form.bv',function (e) {
        e.preventDefault();
        // console.log(1);

        var param = $form.serialize();
        // console.log(param);
        param += "&picName1="+result[0].picName+"&picAddr1="+result[0].picAddr;
        param += "&picName2="+result[1].picName+"&picAddr2="+result[1].picAddr;
        param += "&picName3="+result[2].picName+"&picAddr3="+result[2].picAddr;

        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:param,
            success:function(info){
                // console.log(info);
                //关闭模态框
                $('#productModal').modal('hide');
                //重新渲染当前页
                page =1 ;
                render();

                //重置样式
                $form.data('bootstrapValidator').resetForm(true);
                $('.dropdown_text').text('请选择二级分类');
                $('.img_box img').remove();
                result = [];
            }
        })

    });


});