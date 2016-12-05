
jQuery(document).ready(function() {

    // 登录验证
    $('#send').click(function () {
        var username = $('.username').val();
        var password = $('.password').val();
        var data = $('#form').serialize();
        // 表单输入为空时提示信息
        if(username == ""&&password == ""){
            layer.msg('请输入用户名和密码')
        }else{
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
        }
        return false;
    })



});
