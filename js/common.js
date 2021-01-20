const myfunc = {
    /**
* tab切换功能
* @param { string } tabBar  点击对象的选择器名
* @param { string } activeClass 选中状态给添加的类名
* @param { string } contentBox  内容栏类名
*/
    TabChange: function (tabBar, activeClass, contentBox, hidden) {
        $(tabBar).click(function () {
            $(this).addClass(activeClass).siblings().removeClass(activeClass);
            var index = $(this).index(tabBar);
            $(contentBox).addClass(hidden).eq(index).removeClass(hidden);

        })
    }

}

export default myfunc.TabChange
