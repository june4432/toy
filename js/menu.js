let menuApp = new Vue({
  el:"#menuApp",
  vuetify: new Vuetify(),
  created(){
    console.log("created...");
  },
  mounted(){
    console.log("mounted....");
  },
  destroyed(){
    console.log("destroyed...");
  },
  computed: {
  },
  data:{
    visible:{
      showMenu : false
    }
  },
  methods:{
    toggleMenu : function(){
      this.visible.showMenu = !this.visible.showMenu;
    }
  }
});
