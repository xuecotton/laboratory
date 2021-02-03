var app = new Vue({
    el: "#app",
    data: {
        LoginName: 'first', //登录tab栏名称
        activeName: 'first', //注册tab栏名称
        onLogin: false, //登录状态
        downLogin: true, //未登录状态
        user_id: '',
        user_type: '',
        // 学生注册
        iphone1: '', //手机号
        student_name1: '', //学生姓名
        account_num1: '', //学号  123
        password1: '', //密码 123
        upassword1: '', //确认密码
        errorStatus1: false,
        errorMsg1: '',
        // 学生登录
        account_num2: '', //学号或手机号
        password2: '', //密码
        errorStatus2: false,
        errorMsg2: '',
        // 老师注册
        iphone3: '', //手机号
        teacher_name3: '', //老师姓名
        account_num3: '', //学号
        password3: '', //密码
        upassword3: '', //确认密码
        errorStatus3: false,
        errorMsg3: '',
        // 老师登录
        account_num4: '', //学号或手机号
        password4: '', //密码
        errorStatus4: false,
        errorMsg4: '',
        // 学生教师信息查询
        head_portrait: '', //头像
        student_name: '', //学生姓名
        teacher_name: '', //教师姓名
        // 首页列表
        pageSize: 12,//分页大小
        pageNum: 1, //页码
        tabledata: [],
        imgurl: '',
        // 搜索框查询
        experiment_name: '', //实验名称
        // 查询实验详情
        experiment_id: '', //实验id
    },
    created() {
        this.ListPage();
        this.imgurl = pub._url; //实验图片路径前缀

        var user_id = sessionStorage.getItem("user_id")
        var user_type = sessionStorage.getItem("user_type")
        console.log('user_id:' + user_id)
        console.log('user_type:' + user_type)

        this.user_id = user_id;
        this.user_type = user_type;
        if (null == user_id || user_id == "") {
            this.downLogin = true;
        } else {
            this.downLogin = false;
            this.onLogin = true;
            this.user_id = user_id;
            if (this.user_type == 'student') {
                // console.log(this.user_type)
                this.judgeStu();
            } else if (this.user_type == 'teacher') {
                // console.log(this.user_type)
                this.judgeTea();
            }
        }
    },
    methods: {
        //查询实验详情
        queryDetails(experiment_id) {
            this.experiment_id = experiment_id;
            window.location.href = '../html/labDetails.html?b=' + this.experiment_id;
        },
        // 搜索框搜索实验
        getExperiment() {
            window.location.href = '../html/labCenter.html?a=' + encodeURI(this.experiment_name);
        },
        // 实验分页
        ListPage() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.experimentListPage,//查询学生信息接口
                data: { "pageSize": _this.pageSize, "pageNum": _this.pageNum },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.stateCode == 200 && res.stateMsg == "success") {
                        _this.tabledata = res.page.list;
                    }
                }
            });
        },
        // 查询学生信息
        judgeStu() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.studentInfo,//查询学生信息接口
                data: { "user_id": _this.user_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        _this.head_portrait = baseURL + res.data.head_portrait;
                        _this.student_name = res.data.student_name;
                    }
                }
            });
        },
        // 查询教师信息
        judgeTea() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.teacherInfo,//查询教师信息接口
                data: { "user_id": _this.user_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        _this.head_portrait = baseURL + res.data.head_portrait;
                        _this.teacher_name = res.data.teacher_name;
                        console.log(_this.head_portrait);
                    }
                }
            });
        },
        // 学生注册
        StudentReg() {
            var _this = this;
            if (_this.iphone1 == "") {
                _this.errorStatus1 = true;
                _this.errorMsg1 = "手机号不能为空";
                return;
            } else if (_this.student_name1 == "") {
                _this.errorStatus1 = true;
                _this.errorMsg1 = "真实姓名不能为空";
                return;
            } else if (_this.account_num1 == "") {
                _this.errorStatus1 = true;
                _this.errorMsg1 = "学号不能为空";
                return;
            } else if (_this.password1 == "") {
                _this.errorStatus1 = true;
                _this.errorMsg1 = "密码不能为空";
                return;
            } else if (_this.upassword1 == "") {
                _this.errorStatus1 = true;
                _this.errorMsg1 = "确认密码不能为空";
                return;
            } else if (_this.password1 != _this.upassword1) {
                _this.errorStatus1 = true;
                _this.errorMsg1 = "两次密码输入不一致";
                return;
            } else if (_this.errorStatus1) {
                return
            } else {
                _this.errorStatus1 = false;
                _this.errorMsg1 = "";
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.Stureg, //学生注册接口
                    data: { "iphone": _this.iphone1, "student_name": _this.student_name1, "account_num": _this.account_num1, "password": _this.password1, "upassword": _this.password1 },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            var user_id = res.data.user_id;
                            var user_type = res.data.user_type;
                            console.log(user_id, user_type);
                            sessionStorage.user_id = user_id;
                            sessionStorage.user_type = user_type;
                            _this.errorStatus1 = false;
                            _this.errorMsg1 = "";
                            _this.login_d();
                        } else {
                            _this.errorStatus1 = true;
                            _this.errorMsg1 = res.msg;
                        }
                    }
                });
            }
        },
        // 学生登录
        Studentlog() {
            var _this = this;
            if (_this.account_num2 == "") {
                _this.errorStatus2 = true;
                _this.errorMsg2 = "学号不能为空";
                return;
            } else if (_this.password2 == "") {
                _this.errorStatus2 = true;
                _this.errorMsg2 = "密码不能为空";
                return;
            } else if (_this.account_num2 != "" && _this.password2.Length != "") {
                pub._InitAxios({
                    _url: pub._url, //公共接
                    ur: pub._DetailApi.Stulogin, //学生登录接口
                    data: { "account_num": _this.account_num2, "password": _this.password2 },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            var user_id = res.data.user_id;
                            var user_type = res.data.user_type;
                            sessionStorage.user_id = user_id;
                            sessionStorage.user_type = user_type;
                            _this.errorStatus2 = false;
                            _this.errorMsg2 = "";
                            sessionStorage.setItem("user_id", user_id);
                            sessionStorage.setItem("user_type", user_type);
                            _this.judgeStu();
                            _this.close_d();
                        } else {
                            _this.errorStatus2 = true;
                            _this.errorMsg2 = res.msg;
                        }
                    }
                });
            }
        },
        // 老师注册
        TeacherReg() {
            var _this = this;
            if (_this.iphone3 == "") {
                _this.errorStatus3 = true;
                _this.errorMs3 = "手机号不能为空";
                return;
            } else if (_this.teacher_name3 == "") {
                _this.errorStatus3 = true;
                _this.errorMsg3 = "教师姓名不能为空";
                return;
            } else if (_this.account_num3 == "") {
                _this.errorStatus3 = true;
                _this.errorMsg3 = "工号不能为空";
                return;
            } else if (_this.password3 == "") {
                _this.errorStatus3 = true;
                _this.errorMsg3 = "密码不能为空";
                return;
            } else if (_this.upassword3 == "") {
                _this.errorStatus3 = true;
                _this.errorMsg3 = "确认密码不能为空";
                return;
            } else if (_this.password3 != _this.upassword3) {
                _this.errorStatus3 = true;
                _this.errorMsg3 = "两次密码输入不一致";
                return;
            } else if (_this.errorStatus3) {
                return
            } else {
                _this.errorStatus3 = false;
                _this.errorMsg3 = "";
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.Teareg, //老师注册接口
                    data: { "iphone": _this.iphone3, "teacher_name": _this.teacher_name3, "account_num": _this.account_num3, "password": _this.password3, "upassword": _this.password3 },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            var user_id = res.data.user_id;
                            var user_type = res.data.user_type;
                            console.log(user_id, user_type);
                            sessionStorage.user_id = user_id;
                            sessionStorage.user_type = user_type;
                            _this.errorStatus3 = false;
                            _this.errorMsg3 = "";
                            _this.login_d();
                        } else {
                            _this.errorStatus3 = true;
                            _this.errorMsg3 = res.msg;
                        }
                    }
                });
            }
        },
        // 老师登录
        Teacherlog() {
            var _this = this;
            if (_this.account_num4 == "") {
                _this.errorStatus4 = true;
                _this.errorMsg4 = "工号不能为空";
                return;
            } else if (_this.password4 == "") {
                _this.errorStatus4 = true;
                _this.errorMsg4 = "密码不能为空";
                return;
            } else if (_this.account_num4 != "" && _this.password4.Length != "") {
                pub._InitAxios({
                    _url: pub._url, //公共接
                    ur: pub._DetailApi.Tealogin, //老师登录接口
                    data: { "account_num": _this.account_num4, "password": _this.password4 },
                    cbk: function cbk(res) {
                        console.log(res);
                        if (res.code == 200 && res.msg == "success") {
                            console.log(res);
                            var user_id = res.data.user_id;
                            var user_type = res.data.user_type;
                            sessionStorage.user_id = user_id;
                            sessionStorage.user_type = user_type;
                            _this.errorStatus4 = false;
                            _this.errorMsg4 = "";
                            sessionStorage.setItem("user_id", user_id);
                            sessionStorage.setItem("user_type", user_type);
                            _this.judgeTea();
                            _this.close_d();
                        } else {
                            _this.errorStatus4 = true;
                            _this.errorMsg4 = res.msg;
                        }
                    }
                });
            }
        },
        // 密码验证
        pswblur(val) {
            //判断正则
            let regex = new RegExp('^[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,16}$');
            if (val) {//判断正则
                if (!regex.test(this.password1)) {
                    this.errorStatus1 = true;
                    this.errorMsg1 = '密码由大于8位，小于16位的字母数字组合';
                } else {
                    this.errorStatus1 = false;
                }
            } else {
                if (!regex.test(this.password3)) {
                    this.errorStatus3 = true;
                    this.errorMsg3 = '密码由大于8位，小于16位的字母数字组合';
                } else {
                    this.errorStatus3 = false;
                }
            }
        },

        // 登录tab栏选择 
        LoginClick(tab, event) {
        },
        // 注册tab栏选择  
        handleClick(tab, event) {
        },
        close_d() {
            window.location.href = '../index.html'
        },
        close_z() {
            window.location.href = '../index.html'
        },
        //点击跳转个人中心页面
        handleCommand(command) {
            if (command == 'a' && this.user_type == 'student') {
                window.location.href = '../html/stuCenter.html?user_id=' + this.user_id;
            } else if (command == 'a' && this.user_type == 'teacher') {
                window.location.href = '../html/user.html?user_id=' + this.user_id;
            } else {
                this.user_id = "";
                this.user_type = "";
                sessionStorage.clear();
                window.location.href = '../index.html';
            }
        },
        // 点击登录注册
        login_d() {
            $('#p1').css('display', 'block');
            $('#p2').css('display', 'none');
        },
        login_z() {
            $('#p2').css('display', 'block');
            $('#p1').css('display', 'none');
        },
        // 立即注册
        again_zhu() {
            $('#p2').css('display', 'block');
            $('#p1').css('display', 'none');
        },
        // 直接登录
        again_log() {
            $('#p1').css('display', 'block');
            $('#p2').css('display', 'none');
        },
        // 忘记密码
        forget_mi() {
            $('.forget_mi').css('display', 'block');
        },
        forget_ma() {
            $('.forget_err').css('display', 'block');
        }
    }
});