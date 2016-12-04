/**
 * Created by crazy on 2016/12/4.
 */
$(function () {
    renderNews();
    renderForm();
    send();
});

    // 渲染页面
    var id = location.href;
    id = id.split('?')[1];
    var renderNews = function () {
        $.getJSON('http://localhost:8888/admin/posts/'+id,function (data) {
            var html = template('set',data),
                head = template('head',data);
            $('#mainContent').html(html);
            $('.head_content').html(head);
        })
    }

    // 加载评论
    var renderForm = function () {
        $.getJSON('http://localhost:8888/comments/'+id,function (data) {
            if(data == ""){
                $('#media').text("还没有用户评论");
            }else{
                var html = template('getMedia',{data:data});
                $('#media').html(html);
                up();
            }
        })
    }

    //发表评论
    var send = function () {
        $('#send').on('click',function () {
            var data = $('#form').serialize();
            $.ajax({
                type:'post',
                url:'http://localhost:8888/comments/create?'+data,
                datatype:'jsonp',
                success:function (data) {
                    if(data.code == 1){
                        renderForm();
                        layer.msg('发表成功');
                        $("input[type=reset]").trigger("click");
                    }else{
                        layer.msg('发表失败');
                    }
                }
            })
        })
    }

    // 点赞
    var up = function () {
        // 点赞
        $('#up').on('click',function () {
            var $this = $(this);
            var a = $(this).children('span').text();
            a++;
            $.getJSON('http://localhost:8888/support/'+id,function (data) {
                $this.children('span').text(a);
            })
        })
        // 踩
        $('#down').on('click',function () {
            var $this = $(this);
            var a = $(this).children('span').text();
            a++;
            $.getJSON('http://localhost:8888/oppose/'+id,function (data) {
                $this.children('span').text(a);
            })
        })
    }
