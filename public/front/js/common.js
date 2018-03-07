
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

// 把地址栏 所有的参数封装成一个对象
function getSeatch(key) {
    // 1 获取到参数
    var search = location.search;

    // 2  对获取的参数进行解码
    search = decodeURI(search);

    // 3 去掉？
    search =search.slice(1);

    // 4 根据字符串切割数组
    var arr = search.split('&');

    // 5 遍历数组
    var obj = {};
    arr.forEach(function (ele,index) {
        // console.log(ele);
        var k = ele.split('=')[0];
        var v = ele.split('=')[1];
        obj[k]=v;
    });
    return obj[key];
}
