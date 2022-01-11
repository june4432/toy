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
localStorage.setItem("item_0", "{\"key\":\"item_0\",\"seq_no\":\"0\",\"to_do\":\"커피사가기\",\"note\":\"맥심 커피모카, 카누 아메리카노\",\"due_date\":\"2021-12-27\",\"due_time\":\"13:00\", \"reg_date\":\"2021-12-23\", \"reg_time\":\"14:59\", \"complete_date\":\"2021-12-29\", \"complete_time\":\"14:30\"}");
localStorage.setItem("item_1", "{\"key\":\"item_1\",\"seq_no\":\"1\",\"to_do\":\"라면사가기\",\"note\":\"굴진짬뽕!!!\",\"due_date\":\"2021-12-29\",\"due_time\":\"13:00\", \"reg_date\":\"2021-12-24\", \"reg_time\":\"14:59\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("item_2", "{\"key\":\"item_2\",\"seq_no\":\"2\",\"to_do\":\"휴대폰요금결제\",\"note\":\"케이티 홈페이지에서..\",\"due_date\":\"2021-12-31\",\"due_time\":\"17:45\", \"reg_date\":\"2021-12-25\", \"reg_time\":\"14:59\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("item_3", "{\"key\":\"item_3\",\"seq_no\":\"3\",\"to_do\":\"카드요금결제\",\"note\":\"국민, 우리, 하나 체크 교통\",\"due_date\":\"2021-12-31\",\"due_time\":\"13:00\", \"reg_date\":\"2021-12-26\", \"reg_time\":\"14:59\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("item_4", "{\"key\":\"item_4\",\"seq_no\":\"4\",\"to_do\":\"아이패드사기\",\"note\":\"쿠팡에서 싼거 혹은 당근마켓 미개봉\",\"due_date\":\"2022-01-24\",\"due_time\":\"13:00\", \"reg_date\":\"2021-12-26\", \"reg_time\":\"14:59\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("item_5", "{\"key\":\"item_5\",\"seq_no\":\"5\",\"to_do\":\"맥북프로사기\",\"note\":\"교육할인 혹은 당근마켓 미개봉\",\"due_date\":\"2022-02-04\",\"due_time\":\"13:00\", \"reg_date\":\"2022-01-10\", \"reg_time\":\"14:59\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("item_6", "{\"key\":\"item_6\",\"seq_no\":\"6\",\"to_do\":\"신발사기\",\"note\":\"파주아울렛 가보기. 나이키 아디다스\",\"due_date\":\"2022-02-14\",\"due_time\":\"19:00\", \"reg_date\":\"2022-01-12\", \"reg_time\":\"17:23\", \"complete_date\":\"\", \"complete_time\":\"\"}");
localStorage.setItem("item_7", "{\"key\":\"item_7\",\"seq_no\":\"7\",\"to_do\":\"음식물쓰레기버리기\",\"note\":\"출근하는 길에 처리하기\",\"due_date\":\"2022-02-21\",\"due_time\":\"22:00\", \"reg_date\":\"2021-01-13\", \"reg_time\":\"19:01\", \"complete_date\":\"\", \"complete_time\":\"\"}");

let todoList = [];

let app = new Vue({
  el:"#app",
  vuetify: new Vuetify(),  //vuetify를 적용하려면 요렇게 선언해야 하는듯.
  created(){
    console.log("created...");
    this.visible.wholePageLoading = true;
  },
  mounted(){
    this.visible.wholePageLoading = false;
    console.log("mounted...");
  },
  destroyed(){
    console.log("destroyed...");
  },
  computed: {
  },
  data:{
    reg_btn_nm :"등록하기",
    prefix:"item_",
    snackBarMsg:"",
    snackBarTimeOut:"1500",
    visible:{
      wholePageLoading : true, //첫페이지 로딩 시 화면 로딩중 표시여부
      insert : false,
      snackBar : false,
      calMenu : false
    },
    date:"",
    todoList:[],
    inputValues:{
      to_do:"",
      note:"",
      due_date:"",
      due_time:"",
      reg_date:"",
      reg_time:"",
      key:"",
      seq_no:""
    }
  },
  methods:{
    doSearch : function(){
      todoList = [];
      //로컬스토리지에 저장된 내용을 json으로 파싱하여 배열에 집어넣는다.
      for (var item in localStorage){
        if(item.startsWith("item_")){
          todoList.push(JSON.parse(localStorage.getItem(item)));
        }
      }
      todoList.sort(function(a,b){
        return a.seq_no - b.seq_no;
      });
      this.todoList = todoList;
    },
    doComplete : function(list){
      list.complete_date = this.getTime("date");
      list.complete_time = this.getTime("time");
      localStorage.setItem(list.key, JSON.stringify(list));
      this.doSnackBar("수고하셨어요.");
    },
    doDelete : function(key){
      //해당 아이템 삭제 
      localStorage.removeItem(key);
      this.doSnackBar("삭제하였습니다.");
      this.visible.insert = false;
      //재조회
      this.doSearch();
    },
    doEdit : function(list){
      this.inputValues.key = list.key;
      this.inputValues.seq_no = list.seq_no;
      this.inputValues.to_do = list.to_do;
      this.inputValues.note = list.note;
      this.inputValues.due_date = list.due_date;
      this.inputValues.due_time = list.due_time;
      this.inputValues.reg_date = list.reg_date;
      this.inputValues.reg_time = list.reg_time;
      this.doSnackBar("수정할 수 있어요.");
      if(!this.visible.insert){
        this.visible.insert = true;
        this.reg_btn_nm = "닫기";
      } 
    },
    doSave : function(){
      if(this.inputValues.to_do == "" || this.inputValues.to_do == "" == null){
        this.doSnackBar("할일을 입력해주세요.");
        return;
      }
      let seqNo = this.inputValues.seq_no || this.getMaxSeqNo();
      let key = this.inputValues.key || this.prefix+seqNo.toString();
      let reg_date = this.reg_date || this.getTime("date");
      let reg_time = this.reg_time || this.getTime("time");

      let obj = {"key":key,
                 "seq_no":seqNo,
                 "to_do":this.inputValues.to_do,
                 "note":this.inputValues.note,
                 "due_date":this.inputValues.due_date,
                 "due_time":this.inputValues.due_time,
                 "reg_date":reg_date,
                 "reg_time":reg_time,
                 "complete_date":"",
                 "complete_time":""
                };
      //console.log(this.$refs.to_do) -> ref가 to_do인 객체를 리턴한다.
      let stringObj = JSON.stringify(obj);
      localStorage.setItem(key,stringObj);
      this.inputValues.seq_no = null;
      this.inputValues.key = null;
      this.inputValues.to_do = null;
      this.inputValues.note = null;
      this.inputValues.due_date = null;
      this.inputValues.due_time = null;
      this.doSnackBar("저장되었습니다.");
      this.doSearch();
      this.visible.insert = false;
    },
    getMaxSeqNo : function(){
      let refList = this.todoList;      
      refList.sort(function(a,b){
        return Number(b.seq_no) - Number(a.seq_no);
      });
      var maxSeqNo = Number(refList[0].seq_no)+1;
      return maxSeqNo;
    },
    getTime : function(type){
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      let day = today.getDay();
      let hours = today.getHours();
      let minutes = today.getMinutes();

      return type == "date" ? ""+year+"-"+month+"-"+day : ""+hours+":"+minutes;
    },
    setDate : function(){
      this.$refs.calMenu.save(this.inputValues.due_date)
    },
    doHiddenInsertBtn : function(){
      this.visible.insert = !this.visible.insert;
      this.reg_btn_nm = this.visible.insert ? "닫기" : "등록하기";
      if(this.visible.insert == false){
        this.inputValues.seq_no = null;
        this.inputValues.key = null;
        this.inputValues.to_do = null;
        this.inputValues.note = null;
        this.inputValues.reg_date = null;
        this.inputValues.reg_time = null;
        this.inputValues.due_date = null;
        this.inputValues.due_time = null;
        this.inputValues.complete_date = null;
        this.inputValues.complete_time = null;
      }
    },
    doSnackBar : function(message){
      this.visible.snackBar = false;
      this.snackBarTimeOut = "1500";
      this.snackBarMsg = message;
      this.visible.snackBar = !this.visible.snackBar;
    },
    setInsertFalse : function(){
      this.visible.insert = false;
      this.doSnackBar("취소했어요.");
    },
    toggleMenu : function(){
      menuApp.visible.showMenu = !menuApp.visible.showMenu;
    }
  }
});

app.doSearch();