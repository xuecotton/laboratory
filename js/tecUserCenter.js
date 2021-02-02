import TabChange from './common.js'

var app = new Vue({
    el: '#app',
    data: {
        // 教师信息
        user_msg: "",
        // userInfo: {
        //     user_id: "UI3C1Jdst3vcc",
        // },
        userInfo: "",
        pswForm: {// 修改密码表单
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
        phoneForm: {// 修改手机号表单
            password: '',
            iphone: ''
        },
        canIUseEditPass: true,

        // 题库列表数据
        Q_list: [],//题库分页列表
        QpageSize: 5,
        QpageNum: 1,
        Qtotal: 0,
        QStatus: '',//题库状态
        onlyMyselfQ: '',//只查看自己题库
        showEditQ: false,//修改题库名称弹出框
        EditQtitle: '', //弹出框标题
        editQvalue: "",//弹出框的输入值
        EditQid: '',//修改的哪个题库

        unrelease: "待发布",
        released: '已发布',


        // 实验小组列表相关
        ExperList: "", //列表数据
        EpageSize: 5,
        EpageNum: 1,
        Etotal: 0,
        confirmTips: "",//删除小组是的提示信息。
        // 新增要求类型字典
        requestTypeList: [
            {
                label: "实验报告",
                value: 1,
            }, {
                label: "试卷",
                value: 2,
            }, {
                label: "实验操作",
                value: 3,
            }, {
                label: "其他",
                value: 4,
            }
        ],
        // 新增要求类型
        requestType: '',
        ExperContent: { //用来存实验小组具体内容的:编辑页面要用
            experiment_group_id: "",
            experiment_group_name: "",
            experiment_id: "",
            experiment_name: "",
            experiment_status: "",
            experiment_pic: "",
            start_time: "",
            end_time: ""
        },
        ExpRequire: [],//用来存实验小组要求的:编辑页面要用
        groupId: "",//用来存实验小组id 来查看学生列表，跳转时用
        groupName: "",//实验小组名称，展示用
        start_time: '',
        end_time: '',
        isFromNewAdd: true,//是否从新增按钮跳到创建实验小组页面的
        requestItem: {
            require_id: "",
            require_title: "",
            require_type: "",
            require_content: "",
            require_weight: ""
        },//用来存单个要求的中间量
        // 小组学生相关
        StudentList: "",//小组成员列表
        StupageSize: 10,
        StupageNum: 1,
        Stutotal: 0,

        // 
        theStudent: '',
        StuSubmitCont: '',//学生提交内容
        StuShortAnswer: '',//简答题答案








        // 实验列表相关
        expList: "",//列表数据
        expageSize: 9,
        expageNum: 1,
        exptotal: 0,
        selectExp: '',

        // 选中实验需要的变量
        actExpItem: "",//选中的实验详情内容
        actExpMiddle: '',//中间过渡量
        actExpIndex: "",//选中的实验索引




        options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        imageUrl: '',
        formUploadUrl: baseURL + pub._DetailApi.uploadPic,
        preViewReport: baseURL,
        formLabelAlign: {
            name: '',
            region: '',
            type: ''
        },
        showExperListDialog: false, //选择实验列表
        showTestListDialog: false,//选择题库列表

        radio: "",

        // 创建测试题
        tBankId: '',
        val: '',
        TestTypeIndex: 1,//当前页面展示的题目类型
        TestItemIndex: 1,//当前页面选中的某道题。
        testBox: [],//用来盛所有的题。
        testBoxItem: {
            question_answer: null,
            question_id: "1",
            question_option: [],
            question_score: "",
            question_title: "",
            question_type_name: "",
            uuid: "",
        },//用来盛一道题的内容。
        textItemOption: "",//用来盛题目中的某个选项
        jiashujv: [],//假数据
        totalScoreAndNum: '',//存总分和题量的
        testItem: {
            title: "至游子曰：吾尝闻三火之说。民火者，外肾也。日落之际，收民火二十七，次聚水三十六，作一口咽至丹田中，微着力擂外肾一，次玆乃水自上而下，外肾民火自外而入，水火相溉也。臣火者，内肾也。当行煮海于戌亥之交，先以左手兜外肾，右手搓脐下，引起臣火煮丹田，使阴消而阳长，左右两手各行八十一，为一通。君火者，心也。亥后静坐，以心意绕丹田，先左后右，各旋转八十一匝，或三百六十匝，乃心之君火下降，与内肾臣火，民火相合，三火聚而结丹，谓之周天火候。",
            options: [
                "中国炼丹术考略",
                "静坐修道与长生不老",
                "道家百日筑基功法",
                "大周天功法"
            ],
            rightOption: '1'
        },
        testList: [
            {
                title: "至游子曰：吾尝闻三火之说。民火者，外肾也。日落之际，收民火二十七，次聚水三十六，作一口咽至丹田中，微着力擂外肾一，次玆乃水自上而下，外肾民火自外而入，水火相溉也。臣火者，内肾也。当行煮海于戌亥之交，先以左手兜外肾，右手搓脐下，引起臣火煮丹田，使阴消而阳长，左右两手各行八十一，为一通。君火者，心也。亥后静坐，以心意绕丹田，先左后右，各旋转八十一匝，或三百六十匝，乃心之君火下降，与内肾臣火，民火相合，三火聚而结丹，谓之周天火候。",
                options: [
                    "中国炼丹术考略",
                    "静坐修道与长生不老",
                    "道家百日筑基功法",
                    "大周天功法"
                ],
                rightOption: '1'
            },
        ],

        textarea: "",
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
        showTestList: true,//控制题库一二级页面
        showExperList: 1,//控制实验一二级页面

        tableData1: [{
            date: '虚拟仿真实验',
            name: '20',
            address: '上海市普陀区金沙江路 1518 弄',
            expname: '三峡库区大型松散堆积',
            barcode: '0215',
            date: "2020-12-12  至 2020-12-25",
            status: '未发布',
            pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn13%2F100%2Fw1600h900%2F20180725%2Fa11b-hfvkitw2995398.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613636014&t=8b9eea682a0ab0f16dab04d673661422'
        },
        ],
        multipleSelection: [],
        tabPosition: 'right',
    },
    created() {
        this.init();
        this.getExperList();
        // console.log(this.actExpItem, this.actExpIndex);
    },
    methods: {
        // tab切换时触发
        clickQPane(val) {
            if (val.label === '题库') {
                this.getQlistPage();
            } else if (val.label === '我的实验') {
                this.showExperList = 1;
            }
        },
        /**
         * @用户信息模块
         */
        // 获取信息回调
        init: function () {
            var _this = this;
            // sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo))
            // 判断session状态是否登陆，未登录跳转到主页
            var ssinfo = { user_id: JSON.parse(sessionStorage.getItem('user_id')) };
            console.log(ssinfo);
            if (null !== ssinfo || "" !== ssinfo) {
                _this.userInfo = ssinfo;
                console.log(_this.userInfo);
                // console.log(_this.userInfo);
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.TeaInfo,
                    data: _this.userInfo,
                    cbk: function (res) {
                        res.data.head_portrait = res.data.head_portrait.replace(/^/, baseURL)
                        _this.user_msg = res.data;
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '查询失败',
                            type: 'info'
                        })
                    }
                });
            } else {
                window.location.href = "../index.html"
            }
        },
        // 头像上传
        beforeAvatarUpload(file) {

            const isJPG = (file.type === 'image/jpeg' || file.type === "image/png");
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 jpg/png 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 文件上传成功之后保存，然后调用获取信息
        handleAvatarSuccess(res, file) {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.editTeaInfo,
                data: { "head_portrait": res.data.src, "user_id": _this.userInfo.user_id },
                cbk: function (res) {
                    if (res.code == 200) {
                        _this.$message({
                            message: '上传成功',
                            type: 'success'
                        })
                        _this.init()
                    }
                },
                cat: function (cat) {
                    _this.$message({
                        message: '上传失败',
                        type: 'info'
                    })
                }

            });

        },
        // 修改密码
        editPassword() {
            var _this = this;
            if (this.pswForm.old_password == "" || this.pswForm.new_password == "" || this.pswForm.confirm_password == "") {
                this.$message.error('输入不能为空');
            } else {
                if (!this.canIUseEditPass) {
                    this.$message.error('密码格式错误或两次密码输入不一致');
                } else {
                    pub._InitAxios({
                        _url: pub._url, //公共接口
                        ur: pub._DetailApi.editPassword,
                        data: { ..._this.pswForm, "user_id": _this.userInfo.user_id },
                        cbk: function (res) {
                            if (res.code == 200) {
                                _this.$message({
                                    message: '修改成功，请重新登录',
                                    type: 'success'
                                })
                                sessionStorage.removeItem('userInfo');
                                window.location.href = "../index.html"
                            } else if (res.code == 400) {
                                _this.$message(res.msg)
                            }
                        },
                        cat: function (cat) {
                            _this.$message({
                                message: '修改失败',
                                type: 'info'
                            })
                        }

                    });
                }
            }
        },
        // 密码验证
        pswblur(val) {
            if (val == 1) {//判断正则
                let regex = new RegExp('^[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$');
                if (!regex.test(this.pswForm.new_password)) {
                    this.canIUseEditPass = false;
                    this.$message.error('密码不符合规范，请检查后重新输入！');
                } else if (this.pswForm.new_password == this.pswForm.old_password) {
                    this.canIUseEditPass = false;
                    this.$message.error('新密码不能与旧密码相同！');
                } else {
                    this.canIUseEditPass = true;
                }
            } else {
                if (this.pswForm.confirm_password != this.pswForm.new_password) {
                    this.canIUseEditPass = false;
                    this.$message.error('两次密码输入不一致！');
                } else {
                    this.canIUseEditPass = true;
                }
            }
        },
        // 修改手机号
        editPhone() {
            var _this = this;
            let regIphone = new RegExp("^[1]([3-9])[0-9]{9}$");
            if (this.phoneForm.password == "" || this.phoneForm.iphone == "") {
                this.$message.error('输入不能为空');
            } else {
                if (!regIphone.test(this.phoneForm.iphone)) {
                    this.$message.error('手机号格式不正确，请重新输入！');
                } else {
                    pub._InitAxios({
                        _url: pub._url, //公共接口
                        ur: pub._DetailApi.editPhone,
                        data: { ..._this.phoneForm, "user_id": _this.userInfo.user_id },
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
                            } else {
                                _this.$message(res.msg)
                            }
                        },
                        cat: function (cat) {
                            _this.$message({
                                message: '修改失败',
                                type: 'info'
                            })
                        }
                    });
                }
            }
        },



        /**
         * @题库模块
         */
        // 请求题库分页列表
        getQlistPage() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.QListPage,
                data: {
                    "pageSize": _this.QpageSize,
                    "pageNum": _this.QpageNum,
                    "user_id": _this.onlyMyselfQ,
                    "question_bank_status": _this.QStatus
                },
                cbk: function (res) {
                    _this.Q_list = res.page.list;
                    _this.Qtotal = res.page.totalCount;
                },
                cat: function (cat) {
                    _this.$message({
                        message: '请求失败',
                        type: 'info'
                    })
                }
            });
        },
        handleSizeChange(val) {
            this.QpageSize = val;
            this.getQlistPage();
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.QpageNum = val;
            this.getQlistPage();
            // console.log(`当前页: ${val}`);
        },
        // 题库列表操作(表头渲染一个选项框)
        renderProductId(h, { column }) {
            return h('span', [
                h('span', column.label),
                h('el-checkbox',
                    {
                        style: 'margin-left: 13px;font- size: 21px;width: 100px;height: 20px;color: rgb(111 78 78)',
                        on: {
                            change: this.onlyMyQfnc
                        }
                    },
                    "只看自己"
                ),
            ]);
        },
        // 选中只看自己题库
        onlyMyQfnc(val) {
            if (val) {
                this.onlyMyselfQ = this.userInfo.user_id;
                this.getQlistPage();
            } else {
                this.onlyMyselfQ = "";
                this.getQlistPage();
            }
        },
        // 创建题库
        createQ() {
            this.showEditQ = true;
            this.EditQtitle = "新建题库";
        },
        confirmcreateQ() {
            var _this = this;
            if (_this.editQvalue == '') {
                _this.$message({
                    message: '输入不能为空',
                    type: 'info'
                })
            } else {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.saveQ,
                    data: {
                        "user_id": _this.userInfo.user_id,
                        "question_bank_name": _this.editQvalue
                    },
                    cbk: function (res) {
                        _this.showEditQ = false; //关闭弹框
                        _this.editQvalue = "";
                        // _this.tBankId = res.data.question_bank_id;
                        // _this.showTestList = false;//切换到创建题目页面
                        _this.getQlistPage();
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '操作失败',
                            type: 'info'
                        })
                    }
                });
            }

        },
        // 题库提交
        submitQ(row) {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.submitQ,
                data: {
                    "question_bank_id": row.question_bank_id
                },
                cbk: function (res) {
                    _this.$confirm('发布成功！您已经可以在创建实验小组时选择该题库作为测试题。', "提示", {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success',
                        center: true
                    }).then(() => {
                        _this.getQlistPage();
                    }).catch(() => {
                        _this.getQlistPage();
                    })

                },
                cat: function (cat) {
                    _this.$message({
                        message: '操作失败',
                        type: 'info'
                    })
                }

            });
        },
        // 题库标题修改
        editQ(row) {
            var _this = this;
            // this.showEditQ = true;
            // this.EditQtitle = '修改名称'
            this.EditQid = row.question_bank_id;
            this.showTestList = false;//切换到创建题目页面
            this.getTestTypeCon();

            // setTimeout(() => {
            //     _this.testBoxItem = _this.testBox[0]
            //     // console.log(_this.testBox);
            // }, 1000)
            // console.log(this.testBoxItem);

        },
        viewScore() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.viewTestTotalScore,
                data: { "question_bank_id": _this.EditQid },
                cbk: function (res) {
                    _this.totalScoreAndNum = res.data;
                    console.log(res);
                },
                cat: function (cat) {

                }
            });

        },
        DelTest(index) {
            console.log(index);
        },
        getTestTypeCon() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.findByTestType,
                data: { "question_bank_id": _this.EditQid, "question_type_id": _this.TestTypeIndex },
                cbk: function (res) {
                    _this.testBox = res.data;
                    if (res.data.length > 0) {
                        _this.testBoxItem = _this.testBox[0];
                        _this.TestItemIndex = 1;
                    } else {
                        _this.testBoxItem = {
                            question_answer: _this.TestTypeIndex == 2 ? [] : '',
                            question_id: "1",
                            question_option: [],
                            question_score: "",
                            question_title: "",
                            question_type_name: "",
                            uuid: "",
                        },
                            _this.testBox.push(_this.testBoxItem)
                    }
                    console.log(_this.testBox);
                    _this.viewScore();//查看总分和题量
                },
                cat: function (cat) {
                    _this.$message({
                        message: '操作失败',
                        type: 'info'
                    })
                }
            });
        },

        // 选中题型
        showTestType(index) {
            this.TestTypeIndex = index;//切换题型
            this.TestItemIndex = 1;//切换题型时让所有类型的题默认展示第一个;
            this.getTestTypeCon();
            // this.testBoxItem = this.testBox[0];
            if (this.TestItemIndex == 3) {
                this.testBoxItem.question_option = ["正确", "错误"]
            } else if (this.TestItemIndex == 2) {
                this.testBoxItem.question_answer = [];
            }
        },
        showTestItem(it) {
            console.log(it);
            this.TestItemIndex = it.question_id;
            this.testBoxItem = this.testBox[it.question_id - 1]
        },
        // 新增一道题
        addNewOneTest() {
            this.testBoxItem = {
                question_answer: this.TestTypeIndex == 2 ? [] : '',
                question_id: this.testBox.length + 1,
                question_option: [],
                question_score: "",
                question_title: "",
                question_type_name: "",
                uuid: "",
            };
            this.testBox.push(this.testBoxItem)
            this.TestItemIndex = this.testBoxItem.question_id;
        },
        // 新增选项
        addnewOption() {
            this.testBoxItem.question_option.push(this.options[this.testBoxItem.question_option.length])
        },
        // 删除选项
        delOption(k) {
            this.testBoxItem.question_option.splice(k, 1);
        },
        // 保存完整的一道题
        saveOneTest() {
            var _this = this;
            console.log(_this.testBoxItem);
            //  if(_this.testBoxItem.question_answer=='' || _this.testBoxItem.question_answer.length<1){
            //     _this.$message({
            //         message: '未选择正确答案',
            //         type: 'info'
            //     })
            //      return false;
            //  } else if (_this.testBoxItem.question_title=="" || _this.testBoxItem.question_option.length<1) {

            //  } else if (_this.question_score == "") {

            // };
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: _this.testBoxItem.uuid ? pub._DetailApi.editOneTest : pub._DetailApi.addOneTest,
                data: { "question_bank_id": _this.EditQid, ..._this.testBoxItem, "question_type_id": _this.TestTypeIndex },
                cbk: function (res) {
                    _this.getTestTypeCon();
                    // _this.testBox = res.data;
                    // _this.testBoxItem = _this.testBox[0]
                    // _this.testBoxItem = _this.testBox[_this.testBoxItem.question_id - 1]
                    console.log(_this.testBoxItem);
                    _this.$message({
                        message: '保存成功',
                        type: 'info'
                    })
                },
                cat: function (cat) {
                    _this.$message({
                        message: '操作失败',
                        type: 'info'
                    })
                }
            });
        },
        delOneTest(i) {
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.delOneTest,
                data: { "uuid": i.uuid },
                cbk: function (res) {
                    _this.getTestTypeCon();
                },
                cat: function (cat) {
                    _this.$message({
                        message: '操作失败',
                        type: 'info'
                    })
                }
            });
        },
        // 提交
        submitAllTest() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.submitQ,
                data: { "question_bank_id": _this.EditQid },
                cbk: function (res) {
                    _this.showTestList = true;
                    _this.$message({
                        message: '提交成功',
                        type: 'success'
                    })
                },
                cat: function (cat) {
                    _this.$message({
                        message: '操作失败',
                        type: 'info'
                    })
                }
            });
        },

        // 题库删除
        delQ(row) {
            var _this = this;
            _this.$confirm('确认删除吗?删除后此题库中的题目也将一并删除！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger',
                center: true
            }).then(() => {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.delQ,
                    data: {
                        "question_bank_id": row.question_bank_id
                    },
                    cbk: function (res) {
                        _this.getQlistPage();
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '操作失败',
                            type: 'info'
                        })
                    }
                });
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        // 撤回发布的题库
        backQ(row) {
            var _this = this;
            _this.$confirm('确认要撤回吗？撤回之后此题库会变为未发布状态，创建实验小组时将不能选择该题库作为测试题。撤回之后可以修改题库中的题目', "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.recallQ,
                    data: {
                        "question_bank_id": row.question_bank_id
                    },
                    cbk: function (res) {
                        _this.$message({
                            message: '撤回成功',
                            type: 'success'
                        })
                        _this.getQlistPage();
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '操作失败',
                            type: 'info'
                        })
                    }
                });
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消'
                });
            })
        },
        // 题库预览
        preView(row) {
            window.open("./test.html?a=" + row.question_bank_id, '_blank')
            // window.location.href = "./preView.html?question_bank_id=" + row.question_bank_id;
        },




        /**
         * @实验小组模块
         */
        // 实验小组列表
        getExperList() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.ExperList,
                data: {
                    "pageSize": _this.EpageSize,
                    "pageNum": this.EpageNum,
                    "user_id": _this.userInfo.user_id
                },
                cbk: function (res) {
                    _this.ExperList = res.page.list;
                    _this.Etotal = res.page.totalCount;
                },
                cat: function (cat) {
                    _this.$message({
                        message: '请求失败',
                        type: 'info'
                    })
                }
            });
        },
        // 实验小组分页
        handleSizeChange1(val) {
            this.QpageSize = val;
            this.getQlistPage();
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange1(val) {
            this.QpageNum = val;
            this.getQlistPage();
            // console.log(`当前页: ${val}`);
        },
        // 查询实验列表
        showExpListDiaFun() {
            var _this = this;
            this.showExperListDialog = true;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.ExperListPage,
                data: {
                    "pageSize": _this.expageSize,
                    "pageNum": this.expageNum,
                    "experiment_id": "",
                    "search_data": _this.selectExp,
                    "category_one_id": ""
                },
                cbk: function (res) {
                    _this.expList = res.page.list;
                    _this.exptotal = res.page.totalCount;
                },
                cat: function (cat) {
                    _this.$message({
                        message: '请求失败',
                        type: 'info'
                    })
                }
            });
        },
        // 查询实验列表分页
        handleSizeChange2(val) {
            this.expageSize = val;
            this.showExpListDiaFun();
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange2(val) {
            this.expageNum = val;
            this.showExpListDiaFun();
            // console.log(`当前页: ${val}`);
        },
        // 从查询的实验列表选择实验
        selectExpItem(item, index) {
            this.actExpIndex = item.experiment_id;//选中
            this.actExpMiddle = item; //中间过渡量接收到

        },
        // 确认选择
        confirmSelExpItem() {
            this.showExperListDialog = false;//关闭对话框
            // this.actExpItem = this.actExpMiddle; //拿到过渡量
            this.ExperContent.experiment_pic = this.actExpMiddle.experiment_pic;
            this.ExperContent.experiment_id = this.actExpMiddle.experiment_id;
        },
        // 去新增、编辑实验小组内容页面
        toAddE(row) {
            this.showExperList = 2;
            // this. ExperContent = res
            if (row.experiment_group_id) {
                this.isFromNewAdd = false;//告知我不是新增按钮进来的，是从编辑按钮进来的
                // 发送请求
                var _this = this;
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.selectE,
                    data: {
                        "experiment_group_id": row.experiment_group_id
                    },
                    cbk: function (res) {
                        console.log(res);
                        let {
                            experiment_group_id,
                            experiment_group_name,
                            experiment_id,
                            experiment_name,
                            experiment_status,
                            experiment_pic,
                            start_time,
                            end_time
                        } = { ...res.data };

                        _this.ExperContent = {
                            experiment_group_id,
                            experiment_group_name,
                            experiment_id,
                            experiment_name,
                            experiment_status,
                            experiment_pic,
                            start_time,
                            end_time
                        };
                        _this.ExpRequire = res.data.experiment_require;
                        console.log(_this.ExpRequire);
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '请求失败',
                            type: 'info'
                        })
                    }
                });

            } else {
                this.ExperContent = {
                    experiment_group_id: "",
                    experiment_group_name: "",
                    experiment_id: "",
                    experiment_name: "",
                    experiment_status: "",
                    experiment_pic: "",
                    start_time: "",
                    end_time: ""
                },
                    this.ExpRequire = [];
                console.log(this.ExperContent);
            }
        },
        // 增加新要求

        addNewRequest(value) {
            switch (value) {
                case 1:
                    this.requestItem = {
                        require_id: "",
                        require_title: "实验报告",
                        require_type: "1",
                        require_content: "",
                        require_weight: ""
                    }

                    break;
                case 2:
                    this.requestItem = {
                        require_id: "",
                        require_title: "试卷",
                        require_type: "2",
                        require_content: "",
                        require_weight: ""
                    }
                    break;
                case 3:
                    this.requestItem = {
                        require_id: "",
                        require_title: "实验操作",
                        require_type: "3",
                        require_content: "",
                        require_weight: ""
                    }
                    break;
                case 4:
                    this.requestItem = {
                        require_id: "",
                        require_title: "",
                        require_type: "4",
                        require_content: "",
                        require_weight: ""
                    }
                    break;
            }
            this.ExpRequire.push(this.requestItem)
            this.requestType = '';
            console.log(this.ExpRequire);
        },
        // 要求中选择题库
        show_test_list_dioag() {
            this.showTestListDialog = true;
            this.QStatus = '1';
            this.getQlistPage();
        },
        //选中列表中的题库
        confirmQListDia() {
            this.showTestListDialog = false;//关闭弹窗
            this.QStatus = "" //查询列表时，把状态码筛选关闭
            console.log(this.radio);
            // this.requestItem.require_content = this.radio;
            for (var i = 0; i < this.ExpRequire.length; i++) {
                if (this.ExpRequire[i].require_type == '2') {
                    this.ExpRequire[i].require_content = this.radio
                }
            }
        },
        cancalQTilstDia() {
            this.showTestListDialog = false;
            this.QStatus = ""
        },
        // 删除要求
        delRequestItem(index) {
            this.$confirm('确定删除此项要求吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success',
                center: true
            }).then(() => {
                this.ExpRequire.splice(index, 1);
            }).catch(() => {
                this.$message("已取消")
            })

        },
        // 保存 或 修改 实验小组
        saveOrEditGroup() {
            var _this = this;
            console.log(this.isFromNewAdd);
            for (var i = 0; i < _this.ExpRequire.length; i++) {
                _this.ExpRequire[i].require_id = i + 1
            }
            console.log({ ..._this.ExperContent, "user_id": _this.userInfo.user_id, "experiment_require": _this.ExpRequire });
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: _this.isFromNewAdd ? pub._DetailApi.saveE : pub._DetailApi.editE,
                // ur: pub._DetailApi.editE,
                data: {
                    ..._this.ExperContent,
                    "user_id": _this.userInfo.user_id,
                    "experiment_require": _this.ExpRequire
                },
                cbk: function (res) {
                    _this.showExperList = 1;
                    _this.getExperList();
                    _this.$message({
                        message: '保存成功,去发布！',
                        type: 'success'
                    })
                },
                cat: function (cat) {
                    _this.$message({
                        message: '操作失败',
                        type: 'info'
                    })
                }
            });
        },

        // 发布小组
        submitE(row) {
            var _this = this;
            _this.$confirm('是否发布?发布后生成实验码，学生可通过实验码进入该实验小组', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success',
                center: true
            }).then(() => {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.submitE,
                    data: {
                        "experiment_group_id": row.experiment_group_id
                    },
                    cbk: function (res) {
                        _this.$confirm('发布成功！实验码：' + res.code, "提示", {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'success',
                            center: true
                        }).then(() => {
                            // 切换小组列表页面
                            _this.showExperList = 1;
                            _this.getExperList();
                        }).catch(() => {
                            // 切换小组列表页面
                            _this.showExperList = 1;
                            _this.getExperList();
                        })

                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '操作失败',
                            type: 'info'
                        })
                    }

                });
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消'
                });
            })

        },
        // 查看小组成员
        checkE(row) {
            this.showExperList = 4;
            this.groupId = row.experiment_group_id;
            this.groupName = row.experiment_group_name;
            this.getStuList();
        },
        // 删除小组,撤回小组
        delAndBackE(row, val) {
            var _this = this;
            if (val) {
                _this.confirmTips = "确认撤回吗?撤回后此实验小组实验码，小组成员、小组成员实验成绩将全部清空。可修改实验小组内容和要求。撤回前请确保小组中没有加入成员。"
            } else {
                _this.confirmTips = "确认删除吗?删除后此实验小组中内容包括实验码、实验要求、小组成员、小组成员实验成绩将全部清空。慎点！慎点！慎点！";
            }
            _this.$confirm(_this.confirmTips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger',
                center: true
            }).then(() => {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: val ? pub._DetailApi.recallE : pub._DetailApi.delE,
                    data: {
                        "experiment_group_id": row.experiment_group_id
                    },
                    cbk: function (res) {
                        _this.getExperList();
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '操作失败',
                            type: 'info'
                        })
                    }
                });
            }).catch(() => {
                _this.$message({
                    message: '已取消',
                    type: 'info'
                })
            })
        },



        /**
         *@评分操作 
         */
        // 获取小组学生
        getStuList() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.listGroupStu,
                data: {
                    "pageSize": _this.StupageSize,
                    "pageNum": this.StupageNum,
                    "experiment_group_id": _this.groupId
                },
                cbk: function (res) {
                    _this.StudentList = res.page.list;
                    _this.Stutotal = res.page.totalCount;
                },
                cat: function (cat) {
                    _this.$message({
                        message: '请求失败',
                        type: 'info'
                    })
                }
            });
        },
        // 小组学生分页操作
        handleSizeChange3(val) {
            this.StupageSize = val;
            this.getStuList();
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange3(val) {
            this.StupageNum = val;
            this.getStuList();
            // console.log(`当前页: ${val}`);
        },
        // 去给学生打分
        editStu(row) {
            this.showExperList = 3;
            var _this = this;
            if (row) {
                _this.theStudent = row;
            }
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.selectStu,
                data: {
                    "user_id": _this.theStudent.user_id,
                    "experiment_group_id": _this.theStudent.experiment_group_id
                },
                cbk: function (res) {
                    console.log(res);
                    _this.StuSubmitCont = res.data;
                    _this.StuShortAnswer = res.data.student_answer.map((item, index) => {
                        return Object.assign(item, { theScore: '' })
                    })
                    console.log(_this.StuShortAnswer);

                },
                cat: function (cat) {
                }
            });
        },
        // 把学生提出去
        delStu(row) {
            var _this = this;
            _this.$confirm("确定将该学生踢出实验小组吗？踢出后将清空该学生包括答题在内的操作内容", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'danger',
                center: true
            }).then(() => {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.delStudent,
                    data: {
                        "user_id": row.user_id,
                        "experiment_group_id": _this.groupId
                    },
                    cbk: function (res) {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        _this.getStuList()
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '删除失败',
                            type: 'info'
                        })
                    }
                });
            }).catch(() => {
                _this.$message({
                    message: '取消操作',
                    type: 'info'
                })
            })

        },
        // 给某项要求评分
        saveReqScore(type) {
            var _this = this;
            var json = {
                "question_bank_id": _this.StuSubmitCont.question_bank_id,
                "user_id": _this.StuSubmitCont.user_id,
                "require_id": type,
                "require_weight": '',
                "require_score": "",
            };
            for (let i = 0; i < _this.StuSubmitCont.experiment_require.length; i++) {
                if (_this.StuSubmitCont.experiment_require[i].require_type == type) {
                    json.require_weight = _this.StuSubmitCont.experiment_require[i].require_weight;
                    if (type != "2") {
                        json.require_score = _this.StuSubmitCont.experiment_require[i].require_score;
                    } else {
                        json.require_score =
                            parseInt(_this.StuSubmitCont.judgeScore) +
                            parseInt(_this.StuSubmitCont.singleChoiceScore) +
                            parseInt(_this.StuSubmitCont.multipleChoiceScore) +
                            _this.StuShortAnswer.reduce((prev, curr, idx, arr) => {
                                return parseInt(prev.theScore) + parseInt(curr.theScore)
                            })
                    }
                }
            }
            console.log(json);
            // 判空
            if (json.require_score == "") {
                _this.$message({
                    message: '当前要求未评分',
                    type: 'info'
                })
            } else {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.TeaCommit,
                    data: json,
                    cbk: function (res) {
                        _this.editStu();
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '操作失败',
                            type: 'info'
                        })
                    }
                });
            }


        },
        preStu() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.selectStu,
                data: {
                    "user_id": _this.StuSubmitCont.before_user_id,
                    "experiment_group_id": _this.theStudent.experiment_group_id
                },
                cbk: function (res) {
                    console.log(res);
                    _this.StuSubmitCont = res.data;
                    _this.StuShortAnswer = res.data.student_answer.map((item, index) => {
                        return Object.assign(item, { theScore: '' })
                    })
                    console.log(_this.StuShortAnswer);

                },
                cat: function (cat) {
                }
            });
        },
        nextStu() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.selectStu,
                data: {
                    "user_id": _this.StuSubmitCont.after_user_id,
                    "experiment_group_id": _this.theStudent.experiment_group_id
                },
                cbk: function (res) {
                    console.log(res);
                    _this.StuSubmitCont = res.data;
                    _this.StuShortAnswer = res.data.student_answer.map((item, index) => {
                        return Object.assign(item, { theScore: '' })
                    })
                    console.log(_this.StuShortAnswer);
                },
                cat: function (cat) {
                }
            });
        },
        handleCommand(com) {
            if (com == "a") {
                window.location.reload();
            } else if (com == 'b') {
                sessionStorage.removeItem("user_id");
                sessionStorage.removeItem("user_type");
                window.location.href = "../index.html"
            }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        beforeAvatarUpload1() { },
        // 上传实验报告模板
        handleAvatarSuccess1(res) {
            for (var i = 0; i < this.ExpRequire.length; i++) {
                if (this.ExpRequire[i].require_type == '1') {
                    this.ExpRequire[i].require_content = res.data.src
                }
            }

            // this.requestItem.require_content = res.data.src
        },
        handlePreview1(file) {
            console.log(file.url);
        },
        handlePreview(file) {
            console.log(file.url);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },




    },
    watch: {
        showTestList: {
            handler(val) {
                if (val) {
                    this.getQlistPage()
                }
            },
            immediate: true

        }
    },
    filters: {
        // 过滤器 判断状态
        stuFilter: function (val) {
            switch (val) {
                case "0":
                    return '未发布'
                case '1':
                    return "已发布"
                case '2':
                    return "待完成"
                case '3':
                    return "已完成"
            }
        },
        // 给图片路径添加前缀
        addBaseurl: function (val) {
            return val.replace(/^/, baseURL)
        }
    }
})
TabChange('.tabbar1', 'tab1_act', '.tab_con1', 'hidden')
