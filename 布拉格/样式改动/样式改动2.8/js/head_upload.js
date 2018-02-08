
layui.use('upload', function(){
  var $ = layui.jquery
  ,upload = layui.upload;

  //普通图片上传
  var uploadInst = upload.render({
    elem: '#test1'
    ,url: 'php/head_upload.php'
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#demo1').attr('src', result); //图片链接（base64）
      });
    }
    ,done: function(data){
      //如果上传失败
      if(data.success=="true"){
        return layer.msg('上传成功');
      }
      else{
        //alert(data.error);
		if(data.error=="unsigned"){
			alert("请先登陆！");
		}
		if(data.error=="format_error"){
			alert("文件类型不对！");
		}
      }
    }
    ,error: function(){
      //演示失败状态，并实现重传
      var failText = $('#failText');
      failText.html('<span style="color: #FF5722;">抱歉，头像上传失败啦！</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
      failText.find('.demo-reload').on('click', function(){
        uploadInst.upload();
      });
    }
  });
});
