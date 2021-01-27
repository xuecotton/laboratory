import TabChange from './common.js'

var app = new Vue({
    el: '#app',
    data: {
        // 教师信息
        user_msg: "",
        userInfo: {
            user_id: "UI3C1Jdst3vcc",
        },
        // 修改密码表单
        pswForm: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
        // 修改手机号表单
        phoneForm: {
            password: '',
            iphone: ''
        },
        canIUseEditPass: true,
        list: [
            {
                "question_count": null,
                "question_bank_name": "试卷1",
                "teacher_name": "zrj",
                "create_time": "2021-01-20 09:49:22",
                "uuid": "2ab833d1e79c404eb44aa2cfe8e6c511",
                "question_bank_id": "QB5HL0BN0sG5",
                "question_status": "0"
            }
        ],

        confirmTips: "",
        // 假题库列表数据

        Q_list: [],//题库分页列表
        QpageSize: 5,
        QpageNum: 1,
        Qtotal: 0,
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

        ExperContent: "", //用来存实验小组具体内容和要求的:编辑页面要用
        groupId: "",//用来存实验小组id 来查看学生列表，跳转时用


        // 小组学生相关
        StudentList: "",//小组成员列表
        StupageSize: 10,
        StupageNum: 1,
        Stutotal: 0,

        // 实验列表相关
        expList: "",//列表数据
        expageSize: 9,
        expageNum: 1,
        exptotal: 0,
        selectExp: '',

        // 选中的实验内容
        actExpItem: '',


        tabPosition: 'right',
        options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        imageUrl: '',
        formUploadUrl: baseURL + pub._DetailApi.uploadPic,
        formLabelAlign: {
            name: '',
            region: '',
            type: ''
        },
        showExperListDialog: false, //选择实验列表
        showTestListDialog: false,//选择题库列表
        TestTypeIndex: 1,
        radio: "",

        // 创建测试题
        val: '',
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
        value1: '',
        index: '',
        request: [
            { title: 1, content: "" },
            { title: 2, content: "" }
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
    },
    created() {
        this.init();
        this.getExperList();

    },
    methods: {
        init: function () {
            var _this = this;
            sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo))
            // 判断session状态是否登陆，未登录跳转到主页
            var ssinfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if (null !== ssinfo || "" !== ssinfo) {
                _this.userInfo = ssinfo
                var teaInfo = {
                    _url: pub._url,
                    ur: pub._DetailApi.TeaInfo,
                    data: _this.userInfo,
                    cbk: _this.getTeaInfo,
                }
                pub._InitAjax(teaInfo);
            } else {
                window.location.href = "../index.html"
            }
        },
        // 获取信息回调
        getTeaInfo(res) {
            console.log(res);
            res.data.head_portrait = res.data.head_portrait.replace(/^/, baseURL)
            this.user_msg = res.data;
            console.log(this.user_msg, "++msg");
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
        // 请求题库分页列表
        getQlistPage() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.QListPage,
                data: { "pageSize": _this.QpageSize, "pageNum": this.QpageNum, "user_id": _this.onlyMyselfQ },
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
                    data: { "user_id": _this.userInfo.user_id, "question_bank_name": _this.editQvalue },
                    cbk: function (res) {
                        _this.showEditQ = false; //关闭弹框
                        _this.editQvalue = "";
                        _this.showTestList = false;//切换到创建题目页面
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
                data: { "question_bank_id": row.question_bank_id },
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
            // this.showEditQ = true;
            // this.EditQtitle = '修改名称'
            // this.EditQid = row.question_bank_id;
            this.showTestList = false;//切换到创建题目页面

        },
        // confirmEditQ() {
        //     var _this = this;
        //     if (_this.editQvalue == '') {
        //         _this.$message({
        //             message: '输入不能为空',
        //             type: 'info'
        //         })
        //     } else {
        //         pub._InitAxios({
        //             _url: pub._url, //公共接口
        //             ur: pub._DetailApi.editQ,
        //             data: { "question_bank_id": _this.EditQid, "question_bank_name": _this.editQvalue },
        //             cbk: function (res) {
        //                 _this.getQlistPage();
        //                 _this.showEditQ = false;
        //                 _this.editQvalue = "";
        //             },
        //             cat: function (cat) {
        //                 _this.$message({
        //                     message: '操作失败',
        //                     type: 'info'
        //                 })
        //             }
        //         });
        //     }

        // },
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
                    data: { "question_bank_id": row.question_bank_id },
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
                    data: { "question_bank_id": row.question_bank_id },
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
            window.open("./preView.html?question_bank_id=" + row.question_bank_id, '_blank')
            // window.location.href = "./preView.html?question_bank_id=" + row.question_bank_id;
        },







        // 实验小组列表
        getExperList() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.ExperList,
                data: { "pageSize": _this.EpageSize, "pageNum": this.EpageNum, "user_id": _this.userInfo.user_id },
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
        // 选择实验列表
        showExpListDiaFun() {
            var _this = this;
            this.showExperListDialog = true;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.ExperListPage,
                data: { "pageSize": _this.expageSize, "pageNum": this.expageNum, "experiment_id": "", "search_data": _this.selectExp, "category_one_id": "" },
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
        // 选择实验列表分页
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

        // 去新增、编辑实验小组内容页面
        toAddE(row) {
            this.showExperList = 2;
            // this. ExperContent = res
            if (row.experiment_group_id) {
                this.ExperContent = "有"
                console.log(this.ExperContent);
            } else {
                this.ExperContent = "没有"
                console.log(this.ExperContent);
            }
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
                    data: { "experiment_group_id": row.experiment_group_id },
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
                    data: { "experiment_group_id": row.experiment_group_id },
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


        // 获取小组学生
        getStuList() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.listGroupStu,
                data: { "pageSize": _this.StupageSize, "pageNum": this.StupageNum, "experiment_group_id": _this.groupId },
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
            this.showExperList = 3
            // 继续写后续逻辑
        },
        // 把学生提出去
        delStu(row) {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.delStudent,
                data: { "user_id": row.student_id, "experiment_group_id": _this.groupId },
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
        },

        handleCommand() { },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview1(file) {
            console.log(file.url);
        },
        handlePreview(file) {
            console.log(file.url);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        show(item) {
            this.index = item;
            this.imageUrl = '../img/fs.jpg'
        },

        show_test_list_dioag() {
            this.showTestListDialog = true;
        },
        showTestType(index) {
            this.TestTypeIndex = index
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
