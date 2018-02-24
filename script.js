window.onload=function(){
	GetFileData();
	btnSend.onclick=function(){
		var xhr=new XMLHttpRequest();
		var str='username='+username.value+'&'+
		'password='+password.value;
		xhr.open('get','/getajax?'+str,true)
		xhr.send();
		xhr.onreadystatechange=function(){
			if(xhr.readyState!==4) return;
			if(xhr.status!==200){
			alert(xhr.status+":"+xhr.statusText)
		}
		else
			alert(xhr.responseText);

		}
		
	}
	btnSend1.onclick=function(){
		var xhr=new XMLHttpRequest();
		var obj=JSON.stringify({
			username:username.value,
			password:password.value
		})
		console.log(obj);
		xhr.open('post','/postajax',true)
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(obj);
		xhr.onreadystatechange=function(){
			if(xhr.readyState!==4) return;
			if(xhr.status!==200){
			alert(xhr.status+":"+xhr.statusText)
		}
		else
			alert(xhr.responseText);

		}
	}
	btnFile.onclick=GetFileData;
	function GetFileData(){
		var xhr=new XMLHttpRequest();
		xhr.open('get','/getfile',true);
		xhr.send();
		xhr.onreadystatechange=function(){
			if(xhr.readyState!==4) return;
			if(xhr.status!==200){
				console.log(xhr.status+':'+xhr.statusText);
			}
			else{
				var data=JSON.parse(xhr.responseText);
				console.log(data.length);
				console.log(data[1].age);
				filedata.innerHTML='';
				var ul=document.createElement('ul');
				filedata.appendChild(ul);

				for(var i=0;i<data.length;i++){
					var li=document.createElement('li');
					ul.appendChild(li);
					li.innerHTML=data[i].username+"   "+data[i].password+'   '+data[i].age;
				}
			}
		}
	}
	addUser.onclick=function(){
		var xhr=new XMLHttpRequest();
		var user=JSON.stringify({
			username:username.value,
			password:password.value,
			age:age.value
		})
		
		//xhr.setRequestHeader('Content-Type','application/json');
		xhr.open('post','/adduser',true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(user);
		xhr.onreadystatechange=function(){
			if(xhr.readyState!==4) return;
			if(xhr.status!==200)
				console.log(xhr.status+":"+xhr.statusText);
			else
				console.log(xhr.responseText);
		}
		GetFileData();
		username.value='';
		password.value='';
		age.value='';
	}
}