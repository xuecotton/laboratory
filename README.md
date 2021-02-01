<div align="center" style="display:flex;flex-direction:column;">
    <div style="width:500px;height:300px;">
    	<img src="./img/itemLogo.png">
    </div>
    <h4>vr试验管理平台项目</h4>
    <h4>VR test management platform project</h4>
    <p>Isn't adding one more sentence of English to make you look bigger</p>
    <p>
		<img src="https://img.shields.io/badge/teacher-cotton-brightgreen">
        <img src="https://img.shields.io/badge/student-cc-brightgreen">
        <img src="https://img.shields.io/badge/index-cc-brightgreen">
    </p>
    <p>
    	<img src="https://img.shields.io/badge/release-1.0.0-9fc">
    </p>
</div>
​      

## 项目描述

​	项目为pc端学生实验管理平台，按使用人员划分三个模块，学生端，教师端，公共端。按照功能分为实验展示模块，实验创建模块，在线测试模块，试验评分模块，学生成绩管理模块。

## 项目开发文档





## 工作记录

### cotton:

- 2021/1/27
  - 修改了更改密码和修改手机号时的验证bug，修改了头像显示问题。
  - 完成实验小组列表，发布，删除，撤回接口对接，小组成员列表，删除，批改，接口对接，实验查询列表接口对接。
  - 补充题库预览界面和小组成员列表。
  - 完善了教师中心我的实验tab面板内部几个界面的切换逻辑。
- 2021/1/28
  - 修改选中实验时的逻辑。
  - 完成实验小组页面动态加载插入内容，完成实验小组的编辑和修改接口对接。
- 2021/1/29
  - 修改题库列表接口筛选条件。
  - 完成创建实验小组接口对接，实验小组要求中的题库替换、报告上传功能。
  - 请求中添加token验证
  - 完成获取题库数据，动态展示和动态添加选项功能。
- 2021/02/01
  -  完成题库中单道题目的 增删改查接口对接。
  -  帮cc理答题页面题目渲染和答案封装的逻辑。

### cc:





### 待解决问题

- 添加实验要求相关
  - 创建实验小组要求时，控制每条要求填写完毕才能生成下一条要求。
  - 添加试卷要求时，让内容显示为试卷名字而不是id (思路是过滤器里边添加请求。或者改radio)
  - 保存或修改创建的小组时，判断权重是否100%；
  - 保证除其他类型之外的要求不能超过一个（可能需要）
  - 在给实验报告和测试题要求添加request_content时 没有用index去替换，而是用类型替换了，后续待调整。
- 动态添加试题选项时用了假数据代替，需要用promise解决一下异步获取数据再赋值的问题。
- 教师端学生端主界面对接
- 题库相关
  - 每创建一道题之前判断一次。



- ~~后台：接口4-17 （加返回参数-外层：题量，总分，内层：保存正确答案字段）~~