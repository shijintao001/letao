//

$(function () {
    //1 校验表单
    $('form').bootstrapValidator({
        // 要求 ：用户名不能为空
        //密码不为空 密码长度6-12
        //配置校验规则
        fields:{
            //对应 了form 中name 属性
            username:{

                //给username配置校验规则
                validators:{

                    //不能为空
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    // 长度校验
                    stringLength:{
                        min:2,
                        max:20,
                        message:'用户名长度必须2到20之间'
                    }
                }

            },
            password:{
                validators:{

                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:30,
                        message:'密码长度必须在6到30之间'
                    }
                }
            }
        },
        //配置小图标 成功 失败 校验中
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }

    })
});