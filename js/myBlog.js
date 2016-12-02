/**
 * Created by crazy on 2016/12/1.
 */
$(function () {
    var index = 1;

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
                        alert('动画还没写');
                    }
                })
                $('#next').on('click',function () {
                    if(index<data.pagecount){
                        index++;
                        blogContent(index,5);
                        $('body').scrollTop(contentTop.top);
                    }else{
                        alert('动画还没写');
                    }
                })
            })
        })
    }





})