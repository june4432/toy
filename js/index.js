/*
스크립트는 body 태그 아래에 있는게 좋음. 그게 아니라면 onload에 태워주던가. 
상단에 있으면 html을 파싱하다가 스크립트를 실행해버림. 
ex) vue 객체 생성시 #app 을 찾을 수 없는 에러가 발생함.
스크립트 호출시 
async => 스크립트를 다운받는 순간까지는 파싱을 계속함. 스크립트 다운(fetching)이 끝나면 html 파싱이 중단되고 스크립트를 실행(execution). 스크립트 실행 완료 후 html 파싱 계속 실행
defer => html을 파싱하는 동안 스크립트를 다운(비동기로 스크립트 다운 실행), html 파싱이 완료되면 스크립트를 실행 말그대로 스크립트 실행을 html파싱이 끝날때까지 '연기한다'
=> index.html head 내에 스크립트로 호출하고, defer 설정하여 html 파싱 이후에 스크립트를 실행하도록 변경.
*/
localStorage.clear(); //로컬스토리지에 테스트데이터가 쌓여서 이것저것 테스트하는동안은 초기화 후 테스트데이터로 해야한다.
localStorage.setItem("0", "{\"seq_no\":\"0\",\"to_do\":\"커피사가기\",\"note\":\"맥심 커피모카, 카누 아메리카노\",\"due_date\":\"20211227\",\"due_time\":\"1300\", \"reg_date\":\"20211223\", \"reg_time\":\"1459\", \"complete_date\":\"20211229\", \"complete_time\":\"1430\"}");
localStorage.setItem("1", "{\"seq_no\":\"1\",\"to_do\":\"라면사가기\",\"note\":\"굴진짬뽕!!!\",\"due_date\":\"20211229\",\"due_time\":\"1300\", \"reg_date\":\"20211224\", \"reg_time\":\"1459\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("2", "{\"seq_no\":\"2\",\"to_do\":\"휴대폰요금결제\",\"note\":\"케이티 홈페이지에서..\",\"due_date\":\"20211231\",\"due_time\":\"1300\", \"reg_date\":\"20211225\", \"reg_time\":\"1459\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("3", "{\"seq_no\":\"3\",\"to_do\":\"카드요금결제\",\"note\":\"국민, 우리, 하나 체크 교통\",\"due_date\":\"20211231\",\"due_time\":\"1300\", \"reg_date\":\"20211226\", \"reg_time\":\"1459\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("4", "{\"seq_no\":\"4\",\"to_do\":\"아이패드사기\",\"note\":\"쿠팡에서 싼거 혹은 당근마켓 미개봉\",\"due_date\":\"20220124\",\"due_time\":\"1300\", \"reg_date\":\"20211226\", \"reg_time\":\"1459\", \"complete_date\":\"\", \"complete_time\":\"\"}");

var todoList = [];
var lsLength = localStorage.length;

//로컬스토리지에 저장된 내용을 json으로 파싱하여 배열에 집어넣는다.
for (var i = 0; i < lsLength; i++) {
  todoList.push(JSON.parse(localStorage.getItem(i)));
  
}

console.log(todoList);

var app = new Vue({
  el:"#app",
  vuetify: new Vuetify(),  //vuetify를 적용하려면 요렇게 선언해야 하는듯.
  data:{
    message:"해야 할 일",
    todoList:todoList
  },
  methods:{
    doComplete : function(idx){
      this.todoList[idx].complete_date = "20211228";
      this.todoList[idx].complete_time = "1232";
      localStorage.setItem(idx, JSON.stringify(this.todoList[idx]));
      console.log(localStorage.getItem(idx));
    }
  }
});

// localStorage.setItem("name", "LYJ");
// Vue.set(app, "message", localStorage.getItem("name"));