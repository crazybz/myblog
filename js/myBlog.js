/**
 * Created by crazy on 2016/12/1.
 */
$(function () {
    var index = 1;
    var up = $('<div class="no"> <span>不能往前了哟！</span> </div>');
    blogContent(index,5);
    function blogContent(pageindex,pagesize) {
        $.getJSON('http://localhost:8888/posts/getpage',{pageindex:pageindex,pagesize:pagesize},function (data) {
            var obj = {};
            obj.result = data;
            var html = template('blog_msg',obj);
            $('.blog_content').html(html);
            // 上下页实现
            var contentTop = $('.container').offset();
            $.getJSON('http://localhost:8888/posts/count',{pagesize:pagesize},function (data) {
                $('#previous').on('click',function () {
                    if(index>1){
                        index--;
                        blogContent(index,5);
                        $('body').scrollTop(contentTop.top);
                    }else{
                        layer.msg('不能往前了哟！');
                    }
                })
                $('#next').on('click',function () {
                    if(index<data.pagecount){
                        index++;
                        blogContent(index,5);
                        $('body').scrollTop(contentTop.top);
                    }else{
                        layer.msg('后面也没了哟！');
                    }
                })
            })
        })
    }




})