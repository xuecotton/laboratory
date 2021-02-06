var app = new Vue({
    el: "#app",
    data: {
        options:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        LoginName: 'first', //登录tab栏名称
        activeName: 'first', //注册tab栏名称
        user_id:'',
        user_type:'',
        // 学生教师信息查询
        head_portrait:'', //头像
        student_name:'', //学生姓名
        teacher_name:'', //教师姓名
        question_bank_id:'', //题库编号
        question_bank_name:'', //试题名
        question_count:'', //题量
        totle_score:'', //总分
        arr:'',
        // 预览题目
        mytest_form:{
            test_arr:[],//判断
            test_arr1:[],//单选
            question_option1:'', //单选选项
            test_arr2:[],//多选
            test_arr3:[{
                textarea:''
            }],//简答
        },
        // 提交试卷
        experiment_id:'', //实验编号
        experiment_group_id:'', //实验小组编号
        danXuan:{
            "question_type_id":"1",
            "score": "",
            "answers":[]
        },
        duoXuan:{
            "question_type_id":"2",
            "score":"",
            "answers":[]
        },
        panDuan:{
            "question_type_id":"3",
            "score":"",
            "answers":[]
        },
        jianDa:{
            "question_type_id":"4",
            "score":"",
            "answers":[]
        },
        student_answer:[],
    },
    created() {
        var user_id=sessionStorage.getItem("user_id")
        var user_type=sessionStorage.getItem("user_type")
        console.log('user_id:'+user_id)
        console.log('user_type:'+user_type)
        this.user_id=user_id;
        this.user_type=user_type;
        if (null==user_id || user_id==""){
            this.downLogin=true;
        }else{
            this.downLogin=false;
            this.onLogin=true;
            this.user_id=user_id;
            // 判断是老师还是学生，查询不同身份信息
            if(this.user_type=="student"){
                this.judgeStu();
            }else if(this.user_type=='teacher'){
                this.judgeTea();
            }
        }  
        if(getQueryVariable('b')!='' && getQueryVariable('c')!=''){
            this.experiment_id=getQueryVariable('b');
            this.experiment_group_id=getQueryVariable('c');
        }
        this.findQuestion();
    },
    methods: {
        isContained(aa,bb){ //判断数组包含另一个数组
            if(!(aa instanceof Array)||!(bb instanceof Array)||((aa.length < bb.length))){
                return false;
            }
            var aaStr = aa.toString();
            for (var i = 0 ;i < bb.length;i++) {
                if(aaStr.indexOf(bb[i]) < 0) return false;
            }
            return true;
        },
        // 提交试卷
        saveScore(){
            var _this = this;
            // 一、单选题
            var danXuan = _this.mytest_form.test_arr1;//单选题
            var score1 =0;
            if(_this.mytest_form.test_arr1){
                for(var i=0;i<danXuan.length;i++){
                    if(danXuan[i].sel == ''){
                        _this.$message({
                            message: '您有未答题目： 单项选择题！第'+danXuan[i].question_id+"题",
                            type: "warning",
                            duration: 3000
                        });
                        return false;
                        console.log(danXuan[i].other);
                    }else if(danXuan[i].sel==danXuan[i].question_answer){
                        score1=score1+ parseInt(danXuan[i].question_score);
                    }
                    var question={
                        "question_id":danXuan[i].question_id,
                        "question_answer":danXuan[i].sel,
                        }
                    _this.danXuan.answers.push(question);
                };
            }
            _this.danXuan.score=score1;

            // 二、多选题
            var duoXuan = _this.mytest_form.test_arr2;//多选题
            var score2 =0;
            if(_this.mytest_form.test_arr2){
                for(var i=0;i<duoXuan.length;i++){
                    if(duoXuan[i].sel.length == 0){
                        _this.$message({
                            message: '您有未答题目： 多项选择题！第'+duoXuan[i].question_id+"题",
                            type: "warning",
                            duration: 3000
                        });
                        return false;
                    }else if(_this.isContained(duoXuan[i].question_answer,duoXuan[i].sel)&&duoXuan[i].question_answer.length==duoXuan[i].sel.length){
                        score2=score2+ parseInt(duoXuan[i].question_score);
                    }
                    var question={
                        "question_id":duoXuan[i].question_id,
                        "question_answer":duoXuan[i].sel,
                        }
                    _this.duoXuan.answers.push(question);
                };
            }
            _this.duoXuan.score=score2;

            // 三、判断题
            var panDuan = _this.mytest_form.test_arr;//判断题
            var score3 =0;
            if(_this.mytest_form.test_arr){
                for(var i=0;i<panDuan.length;i++){
                    if(panDuan[i].sel == ''){
                        _this.$message({
                            message: '您有未答题目： 判断题！第'+panDuan[i].question_id+"题",
                            type: "warning",
                            duration: 3000
                        });
                        return false;
                    }else if(panDuan[i].sel==panDuan[i].question_answer){
                        score3=score3+ parseInt(danXuan[i].question_score);
                    }
                    var question={
                        "question_id":panDuan[i].question_id,
                        "question_answer":panDuan[i].sel,
                        }
                    _this.panDuan.answers.push(question);
                };
            }
            _this.panDuan.score=score3;

             // 四、简答题
             var jianDa = _this.mytest_form.test_arr3;//简答题
             var score4 =0;
             if(_this.mytest_form.test_arr3){
                 for(var i=0;i<jianDa.length;i++){
                    if(jianDa[i].textarea == ''){
                        _this.$message({
                            message: '您有未答题目： 判断题！第'+jianDa[i].question_id+"题",
                            type: "warning",
                            duration: 3000
                        });
                        return false;
                    }
                    var question={
                        "question_id":jianDa[i].question_id,
                        "question_answer":jianDa[i].textarea,
                        }
                    _this.jianDa.answers.push(question);
                };
             }
             _this.jianDa.score=score4;
            
             this.student_answer=[this.danXuan,this.duoXuan,this.panDuan,this.jianDa];
             console.log(this.student_answer);

            _this.$confirm('你是否提交试卷？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then(() => {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.saveScoreMember,//提交试卷接口
                    data: { "experiment_id":_this.experiment_id, "experiment_group_id":_this.experiment_group_id, "question_bank_id":_this.question_bank_id, "user_id":_this.user_id, "student_answer":_this.student_answer },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.stateCode == 200 && res.stateMsg == "success") {
                            _this.$message({
                                message: '试卷提交成功!',
                                type: 'success'
                            });
                            window.location.href = '../html/stuCenter.html?id=2' + '&d=' +_this.experiment_group_id;
                        }
                    }
                });
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消'
                });       
            });            
        },
        // 预览题目
        findQuestion(){
            var _this = this;
            if(getQueryVariable('a')!=''){
                _this.question_bank_id=getQueryVariable('a');
            }
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.findQuestionInfo,//预览题目接口
                data: { "question_bank_id":_this.question_bank_id },
                cbk: function cbk(res) {
                    if (res.stateCode == 200 && res.stateMsg == "success") {
                        _this.mytest_form.test_arr1=res.data[1];
                        _this.mytest_form.test_arr2=res.data[2];
                        _this.mytest_form.test_arr=res.data[3];
                        _this.mytest_form.test_arr3=res.data[4];
                        _this.question_bank_name=res.data.question_bank_name;
                        _this.question_count=res.data.question_count;
                        _this.totle_score=res.data.totle_score;
                        _this.arr=Object.keys(res.data).length - 4;
                    }
                }
            });
        },
        // 查询学生信息
        judgeStu(){
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.studentInfo,//查询学生信息接口
                data: {"user_id":_this.user_id },
                cbk: function cbk(res) {
                    // console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        _this.head_portrait=baseURL + res.data.head_portrait;
                        _this.student_name=res.data.student_name;
                    }
                }
            });
        },
        // 查询教师信息
        judgeTea(){
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.teacherInfo,//查询教师信息接口
                data: {"user_id":_this.user_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        _this.head_portrait=baseURL + res.data.head_portrait;
                        _this.teacher_name=res.data.teacher_name;
                        console.log(_this.head_portrait);
                    }
                }
            });
        },

        // 登录tab栏选择 
        LoginClick(tab, event){
        },
        // 注册tab栏选择  
        handleClick(tab, event) {
        },
        close_d(){
            window.location.href='../html/test.html'
        },
        close_z(){
            window.location.href='../html/test.html'
        },
        // 点击登录注册
        login_d(){
            $('#p1').css('display', 'block');
            $('#p2').css('display', 'none');
        },
        login_z(){
            $('#p2').css('display', 'block');
            $('#p1').css('display', 'none');
        },
        //点击跳转个人中心页面
        handleCommand(command) {
            console.log(2222222)
            if(command=='a'){
                console.log(this.user_id)
                window.location.href = '../html/stuCenter.html?user_id='+this.user_id;
            }else if(command=='c'){
                window.location.href = '../index.html?user_id='+this.user_id;
            }else{
                this.user_id="";
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
        },
    },
});