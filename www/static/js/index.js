
var anime = new Biu.anime();
var biu = new Biu({
  name: 'biubiu',
  socket: location.protocol + '//' + location.hostname + (location.port ? ':'+location.port : '') ,
  onMessage:(data)=>{
    anime.run(data)
  }
});

var toggle = document.getElementById('toggle');
toggle.addEventListener('change', function (e) {
  var checked = e.target.checked;
  if (checked) {
    biu.open();
    anime.show();
  } else {
    biu.stop();
    anime.hide();
  }
})

var BASE_URL = location.origin;
var GET_PROJECT = BASE_URL + '/project/get';
var ADD_PROJECT = BASE_URL + '/project/post';
var data = {};

var projectInput = document.getElementById('project');
var emailInput = document.getElementById('email');
// var domainInput = document.getElementById('domain');

projectInput.addEventListener('blur', function (e) {
  var name = e.target.value;
  data.name = name;
  fetch(GET_PROJECT + '?name=' + name)
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
})

var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  data.email = emailInput.value;    
  // data.domain = domainInput.value;  
  if (!data.name) {
    alert('项目名不能为空');
    return;
  }else if (!data.email){
    alert('负责人邮箱不能为空');
    return;
  }
  // else if (!data.domain){
  //   alert('域名不能为空');
  //   return;
  // }
  post(ADD_PROJECT, data, function (res) {
    alert('添加项目成功！点击 OK 查看如何在客户端使用。 ',function(){
      window.open('https://github.com/zhengqingxin/biu#在客户端使用')
    });
  });
})

function post(url, data, callback) {
  var formData = new FormData();

  for (var name in data) {
    formData.append(name, data[name]);
  }
  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      if(res.errno != 0){
        alert(res.errmsg)
      }else{
        callback()
      }
    });
}

var tryBtn = document.getElementById('try');
tryBtn.addEventListener('keypress',function(e){
  var value = e.target.value;      
  if(e.keyCode === 13 && value){
    biu.send({text:value})
  }
})


window.alert = function(msg,cb){
  if(cb){
    vex.dialog.alert({
      message:msg,
      callback:cb
    });
  }else{
    vex.dialog.alert(msg);
  }
}

test.addEventListener('click',function(){
  var times = 0;
  var timer = setInterval(function(){
    if(times > 10000){
      clearInterval(timer);
      return;
    }
    biu.send('test')
    times ++
  })
})