
jQuery(document).ready(function() {

    // 表单输入为空时提示信息
    $('.page-container form').submit(function(){
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
        if(username == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if(password == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
    });

    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });


    // 登录验证
    var up = $('<div class="no"> 登录失败 </div>');
    $('#send').click(function () {
        var data = $('#form').serialize();
        $.ajax({
            type:"post",
            url:"http://localhost:8888/account/login",
            data:data,
            success:function (data) {
                if(data.code === 1){
                    layer.msg('登录成功');
                    location.href = "index.html";
                }else{
                    layer.msg('登录失败');
                }
            }
        })
        return false;
    })



});
