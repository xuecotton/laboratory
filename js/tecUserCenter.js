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
        fileList1: [],

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
        testList: [
            {
                index: '1',
                title: "道家百日筑基功法静坐修道与长生不老",
                createDate: "前221-10-15",
                author: "至游子",
            },
            {
                index: '2',
                title: "静坐修道与长生不老",
                createDate: "前559-10-11",
                author: "南怀瑾",
            },
            {
                index: '3',
                title: "中国炼丹术考略",
                createDate: "前187-8-15",
                author: "容志毅",
            },
            {
                index: '4',
                title: "中国炼丹术考略",
                createDate: "前187-8-15",
                author: "容志毅",
            },
            {
                index: '5',
                title: "中国炼丹术考略",
                createDate: "前187-8-15",
                author: "容志毅",
            },
            {
                index: '6',
                title: "中国炼丹术考略",
                createDate: "前187-8-15",
                author: "容志毅",
            },
            {
                index: '7',
                title: "中国炼丹术考略",
                createDate: "前187-8-15",
                author: "容志毅",
            },
        ],
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
            {
                title: "至游子曰：吾尝闻三火之说。民火者，外肾也。日落之际，收民火二十七，次聚水三十六，作一口咽至丹田中，微着力擂外肾一，次玆乃水自上而下，外肾民火自外而入，水火相溉也。臣火者，内肾也。当行煮海于戌亥之交，先以左手兜外肾，右手搓脐下，引起臣火煮丹田，使阴消而阳长，左右两手各行八十一，为一通。君火者，心也。亥后静坐，以心意绕丹田，先左后右，各旋转八十一匝，或三百六十匝，乃心之君火下降，与内肾臣火，民火相合，三火聚而结丹，谓之周天火候。",
                options: [
                    "中国炼丹术考略",
                    "静坐修道与长生不老",
                    "道家百日筑基功法",
                    "大周天功法"
                ],
                rightOption: '1'
            }


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
        showExperList: 3,//控制实验一二级页面
        tableData: [{
            date: '虚拟仿真实验',
            name: '20',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }],
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
        {
            date: '虚拟仿真实验',
            name: '20',
            address: '上海市普陀区金沙江路 1518 弄',
            expname: '三峡库区大型松散堆积',
            barcode: '0215',
            date: "2020-12-12  至 2020-12-25",
            status: '未发布',
            pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F00.minipic.eastday.com%2F20160531%2F20160531095846_504cb177be6882aa3e7a77a71a0fb446_3.jpeg&refer=http%3A%2F%2F00.minipic.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613636150&t=2754c42f6397a26ec787da483b49e63c"
        }, {
            date: '虚拟仿真实验',
            name: '20',
            address: '上海市普陀区金沙江路 1518 弄',
            expname: '三峡库区大型松散堆积',
            barcode: '0215',
            date: "2020-12-12  至 2020-12-25",
            status: '未发布',
            pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F00.minipic.eastday.com%2F20160531%2F20160531095846_504cb177be6882aa3e7a77a71a0fb446_3.jpeg&refer=http%3A%2F%2F00.minipic.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613636150&t=2754c42f6397a26ec787da483b49e63c"
        }, {
            date: '虚拟仿真实验',
            name: '20',
            address: '上海市普陀区金沙江路 1518 弄',
            expname: '三峡库区大型松散堆积',
            barcode: '0215',
            date: "2020-12-12  至 2020-12-25",
            status: '未发布',
            pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F00.minipic.eastday.com%2F20160531%2F20160531095846_504cb177be6882aa3e7a77a71a0fb446_3.jpeg&refer=http%3A%2F%2F00.minipic.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613636150&t=2754c42f6397a26ec787da483b49e63c"
        }, {
            date: '虚拟仿真实验',
            name: '20',
            address: '上海市普陀区金沙江路 1518 弄',
            expname: '三峡库区大型松散堆积',
            barcode: '0215',
            date: "2020-12-12  至 2020-12-25",
            status: '未发布',
            pic: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F00.minipic.eastday.com%2F20160531%2F20160531095846_504cb177be6882aa3e7a77a71a0fb446_3.jpeg&refer=http%3A%2F%2F00.minipic.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613636150&t=2754c42f6397a26ec787da483b49e63c"
        }],
        multipleSelection: [],
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }

    },
    created() {
        this.init()
    },
    methods: {
        init: function () {
            sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo))
            // 判断session状态是否登陆，未登录跳转到主页
            var ssinfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if (null !== ssinfo || "" !== ssinfo) {
                this.user_id = ssinfo
                var teaInfo = {
                    _url: pub._url,
                    ur: pub._DetailApi.TeaInfo,
                    data: this.user_id,
                    cbk: this.getTeaInfo,
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
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.user_msg.head_portrait = res.data.src
            this.$message({
                message: '上传成功',
                type: 'success'
            })
        },
        saveUserInfo() {
            var _this = this;
            pub._InitAxios({
                _url: pub._url, //公共接口
                ur: pub._DetailApi.editTeaInfo,
                data: { "head_portrait": _this.user_msg.head_portrait, "user_id": _this.userInfo.user_id },
                cbk: function (res) {
                    if (res.code == 200) {
                        _this.init()
                    }
                },
                cat: function (cat) {
                    this.$message({
                        message: '修改失败',
                        type: 'info'
                    })
                }

            });
        },


        // 修改密码
        editPassword() {
            var _this = this;
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
                }
            } else {
                if (this.pswForm.confirm_password != this.pswForm.new_password) {
                    this.canIUseEditPass = false;
                    this.$message.error('两次密码输入不一致！');
                }
            }
        },
        // 修改手机号
        editPhone() {
            var _this = this;
            let regIphone = new RegExp("^[1]([3-9])[0-9]{9}$");
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
        showExpListDiaFun() {
            this.showExperListDialog = true;
        },
        show_test_list_dioag() {
            this.showTestListDialog = true;
        },
        showTestType(index) {
            this.TestTypeIndex = index
        }

    }
})
TabChange('.tabbar1', 'tab1_act', '.tab_con1', 'hidden')
