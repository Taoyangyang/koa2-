//获取修改数据的ID
let updateId = getQueryString("id") ? getQueryString("id") : '';
if(updateId){
	$("#submit").hide()
}else{
	$("#update").hide()
}

$('#file').change(function(){
	if (this.files.length != 0) {
		var file = this.files[0],
			reader = new FileReader();
		if (!reader) {
			this.value = '';
			return;
		};
		console.log(file.size,file.type)
		// if (file.size >= 1024 * 1024 / 2) {
		// 	fade("请上传小于512kb的图片!")
		// 	return 
		// }
		if (!/image/g.test(file.type)) {
			fade("请上传图片文件!")
			$('#avatorVal').val('')
			$('form .preview').attr('src', '')
			$('form .preview').fadeOut()
			return 
		}
		reader.onload = function (e) {
			this.value = '';
			$('form .preview').attr('src', e.target.result)
			$('form .preview').fadeIn()
			 var image = new Image();
			 image.onload = function(){
				 var canvas = document.createElement('canvas');
				 var ctx = canvas.getContext("2d");
				 canvas.width = 100;
				 canvas.height = 100;
				 ctx.clearRect(0, 0, 100, 100);
				 ctx.drawImage(image, 0, 0, 100, 100);
				 var blob = canvas.toDataURL("image/png");
				 $('#avatorVal').val(blob)
			 }
			 image.src = e.target.result
		};
		reader.readAsDataURL(file);
	};
})
function sub(){
	$.ajax({
		url: '/signup',
		type: 'POST',
		data: {
			name      : $("#name").val(),
			password  : $("#pwd").val(),
			repeatpass: $("#repwd").val(),
			avator    : $('#avatorVal').val()
		},
		success: function(res) {
			console.log(res)
			if(res.code==200){
				alert("添加成功")
			}
		}
	})
}
function update(){
	$.ajax({
		url: '/updateData',
		type: 'POST',
		data: {
			id		  : updateId,
			name      : $("#name").val(),
			password  : $("#pwd").val(),
			repeatpass: $("#repwd").val(),
			avator    : $('#avatorVal').val()
		},
		success: function(res) {
			console.log(res)
			if(res.code==200){
				
			}
		}
	})
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 
