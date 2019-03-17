require('./index.less');
const inputBox = require('./components/input-box/index.js'),
 	  list = require('./components/list/index.js'),
      datePicker = require('./components/date-picker/index.js'),
      item = require('./components/item/index.js');

NEJ.define(['base/element','base/event','util/ajax/xdr'], function(_e,_v,_p){
	const myInput = new inputBox();  //初始化组件
	const myList = new list();
	const myDate = new datePicker();
	const myItem = new item();

	const header = _e._$create('div');
	header.innerHTML = myInput.tpl({message:'请输入您的昵称：'});
	const body = _e._$create('div');
	body.innerHTML = myList.tpl();
	const date = _e._$create('span');
	date.innerHTML = myDate.tpl();

	const app = _e._$get("app");   //挂载组件
	app.appendChild(header);
	app.appendChild(body);
	const btn = _e._$get("btn");
	const form = document.getElementsByTagName("form")[0];
	form.insertBefore(date,btn);


	let user = "";
	const itemlist = _e._$get("list");

	_v._$addEvent(                    //删除按钮点击事件，事件委托
		itemlist,"click",function(e){ 
			const node = e.target;

			const deleteData = serialize({user:node.getAttribute("user"),event:node.previousSibling.previousSibling.innerText,time:node.nextSibling.nextSibling.innerText});

			_p._$request("http://localhost:3000/remove",{     //删除事件
				type: 'json',
				data: deleteData,
				method: 'POST',
				timeout: 5000,
				mode: 0,
				onload: function(_data){
					if (_data.status == "0"){
						alert(_data.message);
					}
				},
				onerror: function(_error){
					alert(_error.message);
				}
			});
			_e._$remove(node.parentNode,true);
		}
	);

	_v._$addEvent(                        //登录按钮点击事件
		'btn','click',function(_event){
			const input = _e._$get("inputbox");
			const dateInput = date.firstChild;
			let eventInput = input.value;

			if (!eventInput){
				alert("输入不能为空");
				return;
			};

			if (_event.target.innerText != "提交"){    //登录
				_event.target.innerText = "提交";
				user = eventInput;
				if (eventInput.length > 5) eventInput = `${eventInput.slice(0,3)}...`;
				document.getElementsByTagName("label")[0].innerText = `${eventInput}, 请输入你的事件：`;
				input.setAttribute("placeholder","例如：明天拜访XXX老师！");
				dateInput.removeAttribute("hidden");

				_p._$request("http://localhost:3000/init",{   //请求初始化事件列表
					type: 'text/html',
					data: serialize({user:user}),
					method: 'POST',
					timeout: 5000,
					mode: 0,
					onload: function(_data){	
						if (_data){
							_e._$get("list").innerHTML = _data;
						}
					},
					onerror: function(_error){
						alert(_error.message);
					}
				});
			}else{                                 //输入事件
				if (!dateInput.value){
					alert("事件时间不能为空");
					return;
				}

				const data = serialize({user:user,event:eventInput,time:dateInput.value});

				_p._$request("http://localhost:3000/save",{    //保存事件
					type: 'json',
					data: data,
					method: 'POST',
					timeout: 5000,
					mode: 0,
					onload: function(_data){
						if (_data.status == "0"){
							alert(_data.message);
						}
					},
					onerror: function(_error){
						alert(_error.message);
					}
				});

				
				const tempNode = _e._$create('div');   //初始化新事件，并挂载到页面
				tempNode.innerHTML = myItem.tpl({event:eventInput,time:dateInput.value,user:user});
				const close = tempNode.firstChild.childNodes[3];
				close.setAttribute("index", document.getElementsByTagName("li").length);
				itemlist.appendChild(tempNode.firstChild);
				dateInput.value = "";
			}
			input.value = "";

		},false
	);
});


if (process.env.NODE_ENV != 'production'){
	console.log("我们在开发环境");
}else{
	console.log("我们在生产环境");
}

function serialize(data){     //表单序列化函数
	let str="";
	if (data instanceof Object){
		for (let key in data){
			if (str) str += "&";
			str += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
		}
	}
	return str;
}