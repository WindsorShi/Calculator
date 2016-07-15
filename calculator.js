function getClass(doc, cname) { //从document得到类名为x的标签内容的函数
    if (document.getElementsByClassName) { //因为IE6,7,8没这个所以需要else重写一个函数
        return doc.getElementsByClassName(cname) //其他兼容的浏览器直接返回类名为cname的数组
    } else {
        var a = [];
        var tag = document.getElementsByTagName("*"); //所有元素集合
        for (var i = 0; i < tag.length; i++) {
            var b = tag[i].className.split(" "); //所有元素集合中的className按照空格进行分割变成数组进行存储
            if (findArr(b, cname)) {
                a.push(tag[i]) //把类名相同的元素放到数组a中
            }
        }
        return a
    }
}

function findArr(b, cname) { //用来判断b中元素是不是等于需要的类名
    for (var i = 0; i < b.length; i++) {
        if (b[i] == cname) {
            return true
        } //遍历b数组中的每个元素直到找到cname或者没找到
    }
    return false
}

function calculate() {//点击等号或者连加连减的时候用的函数
        //+-*/%的情况
        if (text.value == '' && exoper.value == '' && display.value == '') //这三者有一个是空就不要下一步
        {
            return;
        }
        if (exoper.value == '/' && display.value == '0') {
            display.value = "除数不能为零";
            return;
        }
        var num1 = parseFloat(text.value);
        var num2 = parseFloat(display.value);
        switch (exoper.value) {
            case "+":
                display.value = parseFloat((num1 + num2).toFixed(8));
                break;
            case "-":
                display.value = parseFloat((num1 - num2).toFixed(8));
                break;
            case "*":
                display.value = parseFloat((num1 * num2).toFixed(8));
                break;
            case '/':
                display.value = parseFloat((num1 / num2).toFixed(8));
                break;
            case '%':
                display.value = parseFloat((num1 % num2).toFixed(8));
                break;
        }
        text.value = '';
        exoper.value = '';
        clear = true;
    }
window.onload = function() {
    var num = getClass(document, 'num'); //数字
    var display = document.getElementById('display'); //显示框
    var oper = getClass(document, 'oper'); //加减乘除%
    var exoper = document.getElementById('exoper'); //用来输入操作符但被隐藏的输入框
    var text = document.getElementById('text'); //用来输入中间操作数作为中转站但被隐藏的运算框
    var equal = getClass(document, 'equal')[0];
    var sqrt = getClass(document, 'sqrt')[0];
    var sin = getClass(document, 'sin')[0];
    var cos = getClass(document, 'cos')[0];
    var tan = getClass(document, 'tan')[0];
    var abs = getClass(document, 'abs')[0];
    var exp = getClass(document, 'exp')[0];
    var rec = getClass(document, 'rec')[0]; //倒数
    var oper0 = getClass(document, 'oper0')[0]; //正负号
    var back = getClass(document, 'back')[0]; //退格键
    var clean = getClass(document, 'clean')[0]; //清屏
    var clear = false;

    display.value = '0';

    function cleaner() {
        display.value = '0';
        text.value = '';
        exoper.value = '';
    }

    for (var i = 0; i < num.length; i++) {
        num[i].onclick = function() {
            if (clear) {
                cleaner();
                text.value = display.value;
                clear = false;
            }
            if (display.value.indexOf('.') > -1 && this.value == '.') {
                return false;
            }
            if (exoper.value && display.value && text.value == '') {
                text.value = display.value;
                display.value = '';
            } //这里是把显示框清空                           
            if (exoper.value && display.value != 0 && text.value) {
                display.value = this.value;
            } else {
                var x = /^([0]\d+)$/; //n1匹配一个0开头接一个或多个数字   
                display.value += this.value;
                if (x.test(display.value)){//用test来检测字符串display.value中间含与x匹配的文本
                    display.value = this.value; //0开头的输入直接显示成相应数字num值               
                }
            }
        }
    }
    //符号部分的添加
    for (var j = 0; j < oper.length; j++) {
        oper[j].onclick = function() {
            if (text.value && exoper.value && display.value) {
                calculate();
            }
            if (text.value) {
                clear = false;
                display.value = text.value;
                exoper.value = this.value;
            } else {
                exoper.value = this.value;
            }
        }
    }

    // equal.onclick = function(){
    //     calculate();
    //     text.value
    // }
    //点击开根号的时候
    sqrt.onclick = function() {
            var n = Math.sqrt(display.value);
            display.value = n;
        }
        //点击sin时
    sin.onclick = function() {
            var n = parseFloat(Math.sin(display.value * Math.PI / 180).toFixed(8));
            display.value = n;
        }
        //点击cos时
    cos.onclick = function() {
            var n = parseFloat(Math.cos(display.value * Math.PI / 180).toFixed(8));;
            display.value = n;
        }
        //点击tan时
    tan.onclick = function() {
            var n = parseFloat(Math.tan(display.value * Math.PI / 180).toFixed(8));;
            display.value = n;
        }
        //点击abs时
    abs.onclick = function() {
            var n = parseFloat(Math.abs(display.value).toFixed(8));;
            display.value = n;
        }
        //点击exp时
    exp.onclick = function() {
            var n = Math.exp(display.value);
            display.value = n;
        }
        //点击倒数的时候
    rec.onclick = function() {
            var n = 1 / display.value;
            if (display.value == '0') {
                n = '正无穷'
            }
            display.value = n;
        }
        //正负号的时候
    oper0.onclick = function() {
            if (display.value > 0) {
                display.value = -display.value;
            } else {
                display.value = -display.value;
            }
        }
        //退格的时候
    back.onclick = function() {
            display.value = display.value.substr(0, display.value.length - 1);
        }
        //清屏的时候
    clean.onclick = cleaner;
}
