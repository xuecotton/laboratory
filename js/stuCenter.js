var app = new Vue({
    el: "#app",
    data: {
        LoginName: 'first', //登录tab栏名称
        activeName: 'first', //注册tab栏名称
        LeftTabName: 'first', //个人信息tab栏名称
        RightTabName: 'first', //我的实验tab栏名称
        user_id: '',
        user_type: '',
        // 学生信息查询
        head_portrait: '', //头像
        student_name: '', //学生姓名
        student_id: '', //学号
        major: '', //专业
        readonly: false,
        grade: '', //班级
        iphone: '', //手机号
        imgurl: '',//上传头像地址
        // 学生修改密码
        errorStatus: false,
        errorMsg: '',
        pswForm: {
            old_password: "", //旧密码
            new_password: "", //新密码
            confirm_password: "" //重复新密码
        },
        // 修改手机号表单
        phoneForm: {
            password: '', //旧密码
            iphone: '' //新手机号
        },
        baseURL: '',
        todoData: [], //待完成
        pageSize: 5, //分页大小
        pageNum: 1, //页码
        total: 0, //页码总数
        doneData: [], //已完成
        overdueData: [], //已过期
        experiment_code: '', //实验码
        experiment_group_id: '', //实验小组id
        experiment_group_name: '', //实验名称
        teacher_name: '', //老师名字
        start_time: '', //开始时间
        end_time: '', //结束时间
        require_list: [], //实验要求
        experiment_url: '', //实验链接
        upLoadFile: '', //上传实验文件路径
        fileList: [], //上传实验文件
        experiment_report: '', //实验报告
        question_bank_id: '', //题库编号
        experiment_id: '', //实验编号
        experiment_group_id: '', //实验小组编号

        list_status: "",//状态
    },
    created() {
        this.imgurl = pub._url + 'student/uploadPic'; //头像上传路径
        this.upLoadFile = pub._url + 'student/uploadPic'; // 上传实验文件路径
        console.log(this.upLoadFile);
        this.baseURL = pub._url; //实验图片路径前缀
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
                this.judgeStu();
            }
        }
        this.GroupList();
    },
    methods: {
        // 学生完成实验
        completeStu() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.completeStudent,//学生完成实验接口
                data: { "user_id": _this.user_id, "experiment_group_id": _this.experiment_group_id },
                cbk: function cbk(res) {
                    if (res.stateCode == 200 && res.stateMsg == "success") {
                        _this.$message({
                            message: '实验全部提交成功!',
                            type: 'success'
                        });
                    }
                }
            });
        },
        // 预览题目
        gotoTest() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.findScoreStatus,//查询学生试卷答题完成状态接口
                data: { "user_id": _this.user_id, "question_bank_id": _this.question_bank_id, "experiment_group_id": _this.experiment_group_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.stateCode == 200 && res.stateMsg == "success") {
                        if (res.data.complete_status == "0") {
                            window.location.href = '../html/test.html?a=' + _this.question_bank_id + '&b=' + _this.experiment_id + '&c=' + _this.experiment_group_id;
                        } else {
                            _this.$message({
                                message: '试卷答题已经完成!',
                                type: 'warning'
                            });
                        }
                    }
                }
            });
        },
        // 上传实验文件
        handleSuccess(res, file) {
            console.log(file);
            console.log(res);
            var _this = this;
            _this.experiment_report = res.data.src;
            this.saveReport();
        },
        // 上传实验报告
        saveReport() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.saveStudenttReport,//学生提交实验报告接口
                data: { "experiment_group_id": _this.experiment_group_id, "experiment_report": _this.experiment_report, "user_id": _this.user_id },
                cbk: function cbk(res) {
                    if (res.stateCode == 200 && res.stateMsg == "success") {
                        console.log(res);
                        _this.$message({
                            message: '上传实验报告成功!',
                            type: 'success'
                        });
                    }
                }
            });
        },
        //下载实验报告
        download(url) {
            if (url == null || url == "") {
                this.$message({
                    message: '上传实验报告成功!',
                    type: 'success'
                });
                return;
            } else {
                window.location.href = baseURL + "group/download?filename=" + url;
            }
        },
        // 查询实验小组详情
        selectGroup() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.selectGroupInfo,//查询实验小组详情接口
                data: { "experiment_group_id": _this.experiment_group_id },
                cbk: function cbk(res) {
                    if (res.stateCode == 200 && res.stateMsg == "success") {
                        _this.experiment_group_name = res.data.experiment_group_name;
                        _this.teacher_name = res.data.teacher_name;
                        _this.start_time = res.data.start_time;
                        _this.end_time = res.data.end_time;
                        _this.require_list = res.data.experiment_require;
                        _this.experiment_url = res.data.experiment_url;
                        _this.question_bank_id = res.data.question_bank_id;
                        _this.experiment_id = res.data.experiment_id;
                        _this.experiment_group_id = res.data.experiment_group_id;
                    }
                }
            });
        },
        //学生加入实验小组
        addClass() {
            var _this = this;
            _this.$confirm('确定加入该实验小组吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.saveGroupMember,//学生加入实验小组接口
                    data: { "experiment_code": _this.experiment_code, "user_id": _this.user_id },
                    cbk: function cbk(res) {
                        if (res.stateMsg == "success") {
                            _this.GroupList();
                            _this.experiment_code = "";
                            _this.$message({
                                type: 'success',
                                message: '加入实验小组成功!'
                            });
                        } else {
                            _this.$message.error(res.stateMsg);
                        }
                    }
                });

            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消加入'
                });
            });
        },
        //实验小组分
        GroupList() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.GroupListPageS,//实验小组分页列表接口
                data: { "pageSize": _this.pageSize, "pageNum": _this.pageNum, "user_id": _this.user_id, 'experiment_status': _this.list_status },
                cbk: function cbk(res) {
                    if (res.code == 0 && res.msg == "success") {
                        _this.todoData = res.page.list;
                        _this.doneData = res.page.list;
                        _this.overdueData = res.page.list;
                        _this.total = res.page.totalCount;
                    }
                }
            });
        },
        // 待完成
        tableRowtodoData: function (val) {
            if (val.row.experiment_status == "已完成" || val.row.experiment_status == "1") {
                return 'hidden-row';
            } else if (val.row.experiment_status === "已过期" || val.row.experiment_status === "2") {
                return 'hidden-row';
            }
            return '';
        },
        // 已完成
        tableRowdoneData: function (val) {
            if (val.row.experiment_status == "待完成" || val.row.experiment_status == "0") {
                return 'hidden-row';
            } else if (val.row.experiment_status === "已过期" || val.row.experiment_status === "2") {
                return 'hidden-row';
            }
            return '';
        },
        // 已过期
        tableRowoverdueData: function (val) {
            if (val.row.experiment_status == "待完成" || val.row.experiment_status == "0") {
                return 'hidden-row';
            } else if (val.row.experiment_status === "已完成" || val.row.experiment_status === "1") {
                return 'hidden-row';
            }
            return '';
        },

        // 修改手机号
        editPhone() {
            var _this = this;
            let regIphone = new RegExp("^[1]([3-9])[0-9]{9}$");
            if (!regIphone.test(_this.phoneForm.iphone)) {
                _this.$message.error('手机号格式不正确，请重新输入！');
            } else {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.editStuIphone, //学生修改手机号接口
                    data: { ..._this.phoneForm, "user_id": _this.user_id },
                    cbk: function (res) {
                        if (res.code == 200) {
                            _this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            _this.phoneForm = {
                                password: '',
                                iphone: ''
                            }
                            _this.judgeStu();
                        } else {
                            _this.$message(res.msg)
                        }
                    }
                });
            }
        },
        // 学生修改密码
        editPassword() {
            var _this = this;
            if (_this.pswForm.old_password == "") {
                _this.errorStatus = true;
                _this.errorMsg = "旧密码不能为空";
                return;
            } else if (_this.pswForm.new_password == "") {
                _this.errorStatus = true;
                _this.errorMsg = "新密码不能为空";
                return;
            } else if (_this.pswForm.confirm_password == "") {
                _this.errorStatus = true;
                _this.errorMsg = "重复新密码不能为空";
                return;
            } else if (_this.pswForm.new_password != _this.pswForm.confirm_password) {
                _this.errorStatus = true;
                _this.errorMsg = "两次密码输入不一致！";
                return;
            } else {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.editStuPassword, //// 学生修改密码接口
                    data: { ..._this.pswForm, "user_id": _this.user_id },
                    cbk: function (res) {
                        if (res.code == 200) {
                            _this.$message({
                                message: '修改成功，请重新登录',
                                type: 'success'
                            })
                            sessionStorage.removeItem('user_id');
                            window.location.href = "../index.html"
                        } else {
                            _this.$message.error(res.msg);
                        }
                    }
                });
            }
        },
        // 密码验证
        pswblur(val) {
            let regex = new RegExp('^[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,16}$');
            if (val) {//判断正则
                if (!regex.test(this.pswForm.new_password)) {
                    this.errorStatus = true;
                    this.errorMsg = "新密码由大于8位，小于16位的字母数字组合";
                }
            }
        },
        // 上传头像
        handleAvatarSuccess(res, file) {
            var _this = this;
            _this.head_portrait = res.data.src;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.editStudent,//上传头像接口
                data: { "head_portrait": res.data.src, "major": _this.major, "grade": _this.grade, "user_id": _this.user_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        _this.$message({
                            message: '保存头像成功',
                            type: 'success'
                        });
                    }
                }
            });
        },
        //修改学生信息
        saveStudent() {
            var _this = this;
            console.log(_this.head_portrait)
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.editStudent,//修改学生信息接口
                data: { "head_portrait": _this.head_portrait, "major": _this.major, "grade": _this.grade, "user_id": _this.user_id },
                cbk: function cbk(res) {
                    console.log(res);
                    if (res.code == 200 && res.msg == "success") {
                        _this.$message({
                            message: '保存信息成功',
                            type: 'success'
                        });
                        _this.judgeStu();
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
                    if (res.code == 200 && res.msg == "success") {
                        var s = res.data;
                        _this.head_portrait = s.head_portrait;
                        _this.student_name = s.student_name;
                        _this.student_id = s.student_id;
                        _this.major = s.major;
                        _this.grade = s.grade;
                        _this.iphone = s.iphone;
                        if ((s.major != null && s.major != "") && (s.grade != null && s.grade != "")) {
                            _this.readonly = true;
                        }
                    }
                }
            });
        },
        // 登录tab栏选择 
        LoginClick(tab, event) {
        },
        // 注册tab栏选择  
        handleClick(tab, event) {
        },
        // 个人信息tab栏选择
        LeftTabClick(tab, event) {
        },
        // 我的实验tab栏选择
        RightTabClick(tab, event) {
            this.pageSize = 5;
            this.pageNum = 1;
            if (tab.name == 'first') {
                this.list_status = "0"
            } else if (tab.name == 'second') {
                this.list_status = "1"
            } else if (tab.name == 'third') {
                this.list_status = "2"
            }
            this.GroupList();
        },
        close_d() {
            window.location.href = '../html/stuCenter.html'
        },
        close_z() {
            window.location.href = '../html/stuCenter.html'
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.GroupList();
        },
        //点击跳转个人中心页面
        handleCommand(command) {
            console.log(2222222)
            if (command == 'a') {
                console.log(this.user_id)
                window.location.href = '../html/stuCenter.html?user_id=' + this.user_id;
            } else if (command == 'c') {
                window.location.href = '../index.html?user_id=' + this.user_id;
            } else {
                this.user_id = "";
                sessionStorage.clear();
                window.location.href = '../';
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
        // 去修改手机
        toPhone() {
            this.LeftTabName = 'third';
        },
        // 去答题
        TeamClick(row) {
            $('.myLab').css('display', 'none');
            $('.answer').css('display', 'block');
            this.experiment_group_id = row;
            this.selectGroup();
        },
        // 删除题目
        DeleteClick(row) {
            console.log(row);
        },
        // 添加实验后回到我的实验页面
        backMyLab() {
            $('.myLab').css('display', 'block');
            $('.addLab').css('display', 'none');
        },
        // 答题2回到我的实验页面
        back() {
            $('.myLab').css('display', 'block');
            $('.answer').css('display', 'none');
        }
    },
    // filters: {
    //     // 过滤器 判断状态
    //     stuFilter: function (val) {
    //         switch (val) {
    //             case "0":
    //                 return '未发布'
    //             case '1':
    //                 return "已发布"
    //             case '2':
    //                 return "待完成"
    //             case '3':
    //                 return "已完成"
    //         }
    //     },
    // }
});