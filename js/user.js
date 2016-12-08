/**
 * Created by crazy on 2016/12/4.
 */

$(function () {
    getContent();
    getSearch();
    modifyContent();
    addContent();
    delContent();
})
// 获取帖子内容
var getContent = function() {
    $.getJSON('http://localhost:8888/admin/users',function (data) {
        console.log(data);
        var html = template('trlist',{list:data});
        $('#blogContent').html(html);
    })
}

// 搜索帖子
var getSearch = function() {
    // 搜索渲染
    function renderContent() {
        var data = $('#searchInfo').val();
        $.getJSON('http://localhost:8888/admin/users/'+data,function (data) {
            var arr = [];
            arr.push(data);
            var html = template('trlist',{list:arr});
            $('#blogContent').html(html);
        })
    }
    // 点击按钮搜索
    $('#goSearch').click(function () {
        if($('#searchInfo').val() == ""){
            getContent();
        }else{
            renderContent();
        }
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
        $('#myModalLabel').text('添加用户');
    })
// 根据id获取帖子修改内容
var modifyContent = function () {
    $('#blogContent').off('click').on('click','.lbtn',function () {
        // 显示编辑窗口
        $('#myModalLabel').text('修改用户');
        $('#myModal').modal('show');
        // 获取帖子内容存入窗口
        var dataId = $(this).data('id');
        $.getJSON('http://localhost:8888/admin/users/'+dataId,function (data) {
            $('#username').val(data.slug);
            $('#user').val(data.username);
            $('#password').val(data.password);
            // 保存按钮实现
            $('#btnSave').off('click').on('click',function () {
                var username = $('#username').val(),
                    user = $('#user').val(),
                    password = $('#password').val();
                $.ajax({
                    type:'POST',
                    url:'http://localhost:8888/admin/users/update/'+dataId,
                    data:{nickname:username,username:user,password:password},
                    success:function (data) {
                        console.log(data);
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
    $('#addContent').off('click').click(function () {
        $('#btnSave').off('click').click(function () {
            var username = $('#username').val(),
                user = $('#user').val(),
                password = $('#password').val();
            $.ajax({
                type:'POST',
                url:'http://localhost:8888/admin/users/create',
                data:{nickname:username,username:user,password:password},
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
                $.getJSON('http://localhost:8888/admin/users/delete/'+id,function (data) {
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
