import TabChange from './common.js'
var app = new Vue({
    el: '#app',
    data: {
        tabPosition: 'right',
        options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        imageUrl: '',
        formLabelAlign: {
            name: '',
            region: '',
            type: ''
        },
        showExperListDialog: false, //选择实验列表
        value1: '',
        index: '',
        request: [
            { title: 1, content: "" },
            { title: 2, content: "" }
        ],
        textarea: "",
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
        showTestList: true,//控制题库一二级页面
        showExperList: true,//控制实验一二级页面
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
    methods: {
        handleAvatarSuccess() { },
        beforeAvatarUpload() { },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        show(item) {
            this.index = item;
            this.imageUrl = '../img/ys.jpg'
        },
        showExpListDiaFun() {
            this.showExperListDialog = true;
        }

    }
})
TabChange('.tabbar1', 'tab1_act', '.tab_con1', 'hidden')
