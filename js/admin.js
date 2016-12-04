
$(function () {
    getContent();
    getSearch();
    modifyContent();
    addContent();
    delContent();
})
    // 获取帖子内容
    var getContent = function() {
        var data = {pageindex:1,pagesize:1000};
        $.getJSON('http://localhost:8888/admin/posts',data,function (data) {
            var html = template('trlist',{list:data});
            $('#blogContent').html(html);
        })
    }

    // 搜索帖子
    var getSearch = function() {
        // 搜索渲染
        function renderContent() {
            var data = $('#searchInfo').val();
            $.getJSON('http://localhost:8888/admin/posts/search',{wd:data},function (data) {
                var html = template('trlist',{list:data});
                $('#blogContent').html(html);
            })
        }
        // 点击按钮搜索
        $('#goSearch').click(function () {
            renderContent();
        })
        // 按回车键搜索
        $(window).keydown(function(event){
            var isFocus=$("#searchInfo").is(":focus");
            if(event.keyCode == 13 && isFocus == true){
                renderContent();
            }
        });
    }

    // 修改添加标题
    $('#addContent').click(function () {
        $('#myModalLabel').text('添加帖子');
    })
    // 根据id获取帖子修改内容
    var modifyContent = function () {
        $('#blogContent').on('click','.lbtn',function () {
            // 显示编辑窗口
            $('#myModalLabel').text('编辑帖子');
            $('#myModal').modal('show');
            // 获取帖子内容存入窗口
            var dataId = $(this).data('id');
            $.getJSON('http://localhost:8888/admin/posts/'+dataId,function (data) {
                $('#title').val(data.data.title);
                ue.setContent(data.data.content);
                // 保存按钮实现
                $('#btnSave').on('click',function () {
                    var nowTitle = $('#title').val();
                    var nowContent = ue.getContent();
                    $.ajax({
                        type:'POST',
                        url:'http://localhost:8888/admin/posts/update',
                        data:{title:nowTitle,content:nowContent,id:dataId},
                        success:function (data) {
                            if(data.code == 1){
                                layer.msg('保存成功');
                                $('#myModal').modal('hide');
                                getContent();
                            }else{
                                layer.msg('保存失败');
                            }
                        }
                    })
                })
            })
        })
    }
    
    // 添加帖子
    var addContent = function () {
        $('#addContent').click(function () {
            $('#btnSave').click(function () {
                var dataTitle = $('#title').val(),
                    dataContent = ue.getContent();
                $.ajax({
                    type:'POST',
                    url:'http://localhost:8888/admin/posts/create',
                    data:{title:dataTitle,content:dataContent},
                    success:function (data) {
                        if(data.code == 1){
                            layer.msg('添加成功');
                            $('#myModal').modal('hide');
                            getContent();
                        }else{
                            layer.msg('添加失败');
                        }
                    }
                })
            })
        })
    }
    
    // 删除帖子
    var delContent = function () {
        $('#blogContent').on('click','.rbtn',function () {
            var id = $(this).data('id');
            layer.msg('要删除了哟!!!',{
                time:0,
                btn:["确认","取消"],
                yes:function () {
                    $.getJSON('http://localhost:8888/admin/posts/delete/'+id,function (data) {
                        if(data.code == 1){
                            layer.msg('删除成功');
                            getContent();
                        }else{
                            layer.msg('删除失败');
                        }
                    })
                }
            })
        })
    }
