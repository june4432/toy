/*
스크립트는 body 태그 아래에 있는게 좋음. 그게 아니라면 onload에 태워주던가. 
상단에 있으면 html을 파싱하다가 스크립트를 실행해버림. 
ex) vue 객체 생성시 #app 을 찾을 수 없는 에러가 발생함.
스크립트 호출시 
async => 스크립트를 다운받는 순간까지는 파싱을 계속함. 스크립트 다운(fetching)이 끝나면 html 파싱이 중단되고 스크립트를 실행(execution). 스크립트 실행 완료 후 html 파싱 계속 실행
defer => html을 파싱하는 동안 스크립트를 다운(비동기로 스크립트 다운 실행), html 파싱이 완료되면 스크립트를 실행 말그대로 스크립트 실행을 html파싱이 끝날때까지 '연기한다'
=> index.html head 내에 스크립트로 호출하고, defer 설정하여 html 파싱 이후에 스크립트를 실행하도록 변경.
*/
var app = new Vue({
  el:"#app",
  data:{
    message:"lyj"
  }
});

localStorage.setItem("name", "LYJ");
Vue.set(app, "message", localStorage.getItem("name"));