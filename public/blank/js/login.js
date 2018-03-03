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
                    },
                    //专门用来提示信息
                    callback:{
                        message:"用户名错误"
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
                    },
                    //专门用来提示信息
                    callback:{
                        message:"密码错误"
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

    });
    
    //2 给表单注册一个校验成功的事件，成功时候阻止表单默认提交 使用ajax
    $('form').on('success.form.bv',function (e) {
        //阻止浏览器默认行为
        e.preventDefault();
        
        //发送ajax
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$('form').serialize(),//表单序列化
            dataType:"json",
            success:function(info){
                if(info.error === 1000){
                   $('form').data('bootstrapValidator').updateStatus("username","INVALID","callback")
                }
                if(info.error === 1001){
                    $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
                if(info.error){
                    location.href = 'index.html'
                }
            }
        })
    });


    //3 重置表单 清楚所有样式
    $("[type='reset']").on('click',function () {
        $('form').data('bootstrapValidator').resetForm(true);
    });

});