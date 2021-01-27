var app = new Vue({
    el: "#app",
    data: {
        user_msg: "",
        userInfo: "",
        Qcontent: "",
    },
    created() {
        this.getUserInfo();
        this.preview();


    },
    methods: {
        handleCommand() {

        },
        // 预览试卷
        preview() {
            var _this = this;
            var question_bank_id = getQueryVariable("question_bank_id");
            if (question_bank_id) {
                pub._InitAxios({
                    _url: pub._url, //公共接口
                    ur: pub._DetailApi.previewQ,
                    data: { "question_bank_id": question_bank_id },
                    cbk: function (res) {
                        _this.Qcontent = _this.res.data;
                        console.log(_this.Qcontent);
                    },
                    cat: function (cat) {
                        _this.$message({
                            message: '预览失败',
                            type: 'info'
                        })
                    }

                });
            }
        },
        // 拿id，请求用户信息详情
        // getUserInfo() {
        //     var _this = this;
        //     _this.userInfo = sessionStorage.getItem("userInfo");
        // },
        getUserInfo: function () {
            var _this = this;
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
    }
})