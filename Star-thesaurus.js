/* 
 * Star-thesaurus
 * 作者：星恋
 * QQ：3107533211
 * 严禁侵权，侵权必究
 * 版本：v1
 * 使用步骤： 
 *     ① 引入本文件
 *     ② 调用主要函数 Speak
 *         [调用客服函数 Doubt]
 *         [时间显示设置 Timing]
 */


document.addEventListener('load', function() {
    location.reload(true);
});

/***** ---------- 初始化部分 ---------- *****/

/** ---------- GET-时间 ---------- **/
let date = new Date,
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
H < 10 ? H : '0' + H;
m < 10 ? m : '0' + m;
s < 10 ? s : '0' + s;
let time = H + ':' + m + ':' + s;
/** ---------- GET-年月日 ---------- **/
let date2 = new Date,
    Y = date2.getFullYear(),
    Ms = date2.getMonth() + 1,
    M = Ms >= 10 ? Ms : '0' + Ms,
    Ds = date2.getDate(),
    D = Ds >= 10 ? Ds : '0' + Ds,
    ds = date2.getDay(),
    d = ds >= 10 ? ds : '0' + ds;
let Time = Y + '年/' + M + '月/' + D + '日/星期 ' + d;


/** ---------- 自带对话框 Byo ---------- **/
function Byo(btnName, iptPCR, iptVLE) {
    let byo_divs = document.createElement('div');
    document.body.appendChild(byo_divs);
    byo_divs.id = 'byo_first';
    let byo_first = document.querySelector('#byo_first');
    byo_first.style = 'display:flex;position: relative;width: 70%;justify-content: space-around;margin: auto;';
    byo_first.innerHTML =
        '<div id="byo_last"><input type="text" id="byo_ipt" placeholder="' + iptPCR + '" value="' + iptVLE +
        '" list="byo_dom"><datalist id="byo_dom"><option value="获取人机"><option value="特殊指令"><option value="帮助与功能"><option value="人机信息"><option value="官方网站"></datalist></div><button id="byo_btn">' +
        btnName + '</button>';
    let byo_last = byo_first.querySelector('#byo_last');
    byo_last.style.width = '85%';
    let byo_ipt = byo_last.querySelector('#byo_ipt');
    byo_ipt.style.width = '105%';
}

/***** ---------- 实现主体部分 ---------- *****/
/** ---------- 客服设置——疑问 Doubt ---------- **/
function Doubt({
    LP: ul, // 设置父级元素
    LC: li, // 设置子级元素
    name: name, // 设置机器人昵称
    class: fst, // 设置此元素类名
    first: one, // 设置第一个选项（为空请用 “first: '',”）
    second: twe, // 设置第二个选项（为空请用 “second: '',”）
    third: three, // 设置第三个选项（为空请用 “third: '',”）
    fourth: fore, // 设置第四个选项（为空请用 “fourth: '',”）
    fifth: five // 设置第五个选项（为空请用 “fifth: '',”）
}) {
    let sp = document.querySelector(ul),
        spr = document.createElement(li);
    let dbt = [{
        part1: one,
        part2: twe,
        part3: three,
        part4: fore,
        part5: five
    }];
    sp.style.position = 'relative';
    sp.appendChild(spr);
    dbt.forEach(function(value) {
        spr.innerHTML = '<p class="Star-doubt">Hi!我是' + name + ',您是否想问以下问题呢?' + '<br>' + value.part1 + '<br>' +
            value.part2 +
            '<br>' +
            value
            .part3 + '<br>' + value.part4 + '<br>' + value.part5 + '</p>';
    });
}


/** ---------- 常用功能 Speak ---------- **/
function Speak({
    name: name, // 设置机器人昵称
    ipts: ipt, // 设置输入框元素
    btns: btn, // 设置按钮元素
    Lp: ul, // 设置父级元素
    Lc: li, // 设置子级元素
    master: master // 设置你的昵称
}) {
    /** ---------- 头部初始化 ---------- **/
    var ipt = document.querySelector(ipt),
        btn = document.querySelector(btn);
    let sp = document.querySelector(ul);
    ipt.style.textIndent = '0.5em';

    function code(e) {
        if (e.keyCode == 13) {
            btn.click();
            ipt.focus();
        }
    }
    document.addEventListener('keyup', code);

    btn.addEventListener('click', function() {

        /* ---------- 动态添加子级到父级 ---------- */
        let spr = document.createElement(li);
        sp.appendChild(spr);
        spr.style = 'text-align: right;';
        spr.innerHTML = '<p class="Star-speak">' + ipt.value + '</p>';
        let star_speak = spr.querySelector('.Star-speak');
        star_speak.style.textAlign = 'left';

        /** ---------- 敏感词 Sensitive words ---------- **/
        let Sensitive = /尼玛|你妈|智障|脑残|他妈/,
            sps = spr.innerHTML.replace(/尼玛|你妈|智障|脑残|他妈|妈的/gi, '**');
        spr.innerHTML = sps;

        /* ---------- 菜单 Menu ---------- */
        let Menu = /菜单|功能|做什么|干什么|帮助|会什么/
        if (Menu.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>以下是 ' + name +
                ' 能做的哦:<br><b>●特殊指令</b><br><b>●游戏</b><br><b>●时间查询</b><br><b>●询问主人</b><br><b>●听歌</b><br><b>●日常聊天</b><br><b>●get—图片</b><br><br><h2>想得到' +
                name + '吗？点击<a id="get_to" href="Star-thesaurus.js">GET' + name + '</a></p>';
        }

        /* ---------- 特殊指令 Special Instructions ---------- */
        let Special = /特殊指令|特别指令|特定指令/;
        if (Special.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + name +
                ' 特殊指令(介绍及语法):<br><b>●“cls”指令(语法格式)：<br>输入“cls”发送(作用：清屏和刷新页面)</b><br><br><b>●“打开网址”指令(语法格式)：<br>输入“网址,网站...”等相关词 或 直接输入网址(作用：打开指定网站)</b><br><br><b>●“设置字体大小”指令(语法格式)：<br>输入“任意数字加单位”发送即可更改全局字体：常用单位有"vw""vh""px""rem""em"(作用：设置字体大小)</b></p>';
            spr.style = 'color: red; line-height: 3vh;cursor: default;';
        }

        /* ---------- 字体大小 fontSisz ---------- */
        let Size = /em|rem|px|pc|vw|vh|%/;
        if (Size.test(ipt.value)) {
            ipt.style.fontSize = sp.style.fontSize = ipt.value;
        } else if (sp.style.fontSize < 0.5) {
            ipt.style.fontSize = sp.style.fontSize = '16px';
        }

        /* ---------- 询问时间 When ---------- */
        let When = /几点|时间|何时/;
        if (When.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + time + '</p>';
        }

        /* ---------- 询问名字 Yname ---------- */
        let Yname = /名字|叫啥|姓名|你叫什么|你是谁/;
        if (Yname.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>你好呀~我叫 ' + name + ' ,请记住哦</p>';
        } else if (ipt.value == name) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + name + ' 一直在呢！</p>';
        }

        /* ---------- 问好 Greeting ---------- */
        let Greeting = /你好/;
        if (Greeting.test(ipt.value) && Yname.test(ipt.value) == false) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>你好吖！</p>';
        }

        /* ---------- name隐私 Privacy ---------- */
        let Privacy1 = /年龄|芳龄|几岁|多少岁/,
            Privacy2 = /男的|是男|男滴|女的|是女|女滴|性别/,
            bo = /你是男|你是女/,
            Privacy3 = /配偶|结婚|另一半|喜欢的人|男朋友|男友|男票|蓝朋友|男盆友/;
        if (Privacy1.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + name + ' 1岁了哦o(〃＾▽＾〃)o</p>';
        } else if (Privacy2.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            if (bo.test(ipt.value)) {
                spr.innerHTML = '<p>' + name + ' 是女孩子呢(✿◠‿◠)</p>';
            }
        } else if (Privacy3.test(ipt.value)) {
            let you = /你有|你的|你男|你喜|你结|你配|你另/;
            if (you.test(ipt.value)) {
                let spr = document.createElement(li);
                sp.appendChild(spr);
                spr.innerHTML = '<p>' + name +
                    ' 还没有男朋友呢o(*////▽////*)q，这个事不敢想，毕竟主人也单着，我怕主人知道我先找到会把我拆了Σ(っ °Д °;)っ</p>';
            }
        }

        /* ---------- 询问name主人 Master ---------- */
        let Master = /主人|作者|站长|管理者|管理员|上司|上级|长官/;
        if (Master.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + name + ' 的管理者是“' + master + '”哦</p>';
        }

        /* ---------- 询问日期 Date ---------- */
        let Dt = /日期|几月|几年|几日|星期|周几|几号|年份|月份/;
        if (Dt.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + Time + '</p>';
        }

        /* ---------- 图片请求 Picture ---------- */
        let Picture = /风景图|美景|风景|壁纸|二次元|图片|美图|头像|头像/;
        if (Picture.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<img src="https://api.yimian.xyz/img?type=moe" alt="图片加载中...">';
            let img = spr.querySelector('img');
            img.style.width = '50%';
        }

        /* ---------- 听音乐 listen to music ---------- */
        let Music = /音乐|听歌|放歌|歌曲/;
        if (Music.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML =
                '<p><label>' + name +
                ' listen-音乐</label><br><br><a>●《高阶萌妹成长指南》</a><br><a>●《你离开的事实》</a><br><a>●《dumb dumb (sped up) 》</a><br><a>●《在你的身边》</a><br><a>●《骄傲的少年》</a><br><a>●《盗将行》</a><br><a>●《异地恋》</a></p>';
            let sa = spr.querySelectorAll('a');
            for (var sr = 0; sr < sa.length; sr++) {
                sa[sr].style = 'color: red;cursor: pointer;line-height: 2em;';
            }
            sa[0].addEventListener('click', function() {
                let spr = document.createElement(li);
                sp.appendChild(spr);
                spr.innerHTML =
                    '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1962060311&auto=1&height=66"></iframe>';
            });
            sa[1].addEventListener('click', function() {
                let spr = document.createElement(li);
                sp.appendChild(spr);
                spr.innerHTML =
                    '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=139774&auto=1&height=66"></iframe>';
            });
            sa[2].addEventListener('click', function() {
                let spr = document.createElement(li);
                sp.appendChild(spr);
                spr.innerHTML =
                    '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1985051604&auto=1&height=66"></iframe>';
            });
            sa[3].addEventListener('click', function() {
                let spr = document.createElement(li);
                sp.appendChild(spr);
                spr.innerHTML =
                    '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=475479888&auto=1&height=66"></iframe>';
            });
            sa[4].addEventListener('click', function() {
                let spr = document.createElement(li);
                sp.appendChild(spr);
                spr.innerHTML =
                    '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=408332757&auto=1&height=66"></iframe>';
            });
            sa[5].addEventListener('click', function() {
                let spr = document.createElement(li);
                sp.appendChild(spr);
                spr.innerHTML =
                    '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=574566207&auto=1&height=66"></iframe>';
            });
            sa[6].addEventListener('click', function() {
                let spr = document.createElement(li);
                sp.appendChild(spr);
                spr.innerHTML =
                    '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1948478077&auto=1&height=66"></iframe>';
            });
        }

        /* ---------- 打开指定网址 URL ---------- */
        let Url = /网址|网站|网络地址/,
            URL = /http:|HTTP:|Http:|HTTPS:|Https:|https:/;
        if (Url.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<b>双击此文段输入网址</b>';
            spr.className = 'dbl';
            spr.style = 'text-align: center;color: red;';
            let dbl = document.querySelectorAll('.dbl');
            for (let dbs = 0; dbs < dbl.length; dbs++) {
                dbl[dbs].addEventListener('dblclick', function() {
                    spr.innerHTML =
                        '<input id="us" type="url" placeholder="请输入正确网址后“再次点击输入框”进行打开网址">';
                    let us = this.querySelectorAll('#us');
                    for (let ua = 0; ua < us.length; ua++) {
                        us[ua].style =
                            'text-align: center;color: red;border: 2px solid red;background-color: black;width: 300px;height: 30px;outline: none;border-radius: 5px;';
                        us[ua].addEventListener('focus', function() {
                            if (e.keyCode == 18) {
                                open(this.value, '_blank');
                            }
                        });
                    }
                });
            }
        } else if (URL.test(ipt.value)) {
            open(ipt.value, '_blank');
        }

        /* ---------- 日常对话 Daily ---------- */
        let Game = /游戏/;
        let No = /不要|不行|不能|不可以|否定|否决/,
            Like = /喜欢你|爱你/,
            Rally = /真的吗|是吗/,
            Yes = /好吧|行吧|好的|嗯嗯|嗯呐|好滴/,
            eat = /吃啥|吃饭|吃的什么|吃什么|吃的啥/,
            sleep = /睡觉/,
            GMorning = /早安|早上好|早呀|早啊|早吖|早早早/,
            GNoon = /午好/,
            Gevening = /晚好|晚上好/,
            Stay = /在吗|在不在/,
            What = /在干嘛|在干什么|在干啥/;
        if (No.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>为啥呀？</p>';
        } else if (Like.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + name + ' 也喜欢你呢!</p>';
        } else if (Rally.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>真的呀！<br>*\\(⊙o⊙)/*<p>';
        } else if (Game.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>以下是 ' + name + ' 内置游戏:<br>1,《末日生存》<br>2,《代号"Z"》<p>';
        } else if (eat.test(ipt.value)) {
            let GM = /早上|早饭/,
                GN = /中午|午饭/,
                GE = /晚上|下午|晚饭/;
            let spr = document.createElement(li);
            sp.appendChild(spr);
            if (eat.test(ipt.value) && GM.test(ipt.value) && H >= 6 && H <= 8) {
                spr.innerHTML = '<p>' + name + ' 早上吃的土司配牛奶哦(⊙o⊙)！</p>';
            } else if (eat.test(ipt.value) && GM.test(ipt.value) && H > 8) {
                spr.innerHTML = '<p>现在 ' + time + ' ,离吃早饭还有一段时间呢。</p>';
            } else if (eat.test(ipt.value) && GN.test(ipt.value) && H >= 12 && H <= 13) {
                spr.innerHTML = '<p>' + name + ' 的午饭吃的是海鲜大餐呢，还算丰盛吧(⊙o⊙)！</p>';
            } else if (eat.test(ipt.value) && GN.test(ipt.value) && H > 13) {
                spr.innerHTML = '<p>现在 ' + time + ' ,离吃午饭还有一段时间呢。</p>';
            } else if (eat.test(ipt.value) && GE.test(ipt.value) && H >= 18 && H <= 19) {
                spr.innerHTML = '<p>' + name + ' 晚饭吃的是一碗粥和一盘咸菜，晚上吃清淡点益于养生。~o( =∩ω∩= )m</p>';
            } else if (eat.test(ipt.value) && GE.test(ipt.value) && H > 19 && H < 24) {
                spr.innerHTML = '<p>现在 ' + time + ' ,离吃晚饭还有一段时间呢。</p>';
            } else if (eat.test(ipt.value) && H < 6 && H >= 0) {
                spr.innerHTML = '<p>' + name + ' 还没吃呢!</p>';
            }
        } else if (sleep.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            if (H >= 20) {
                spr.innerHTML = '<p>现在已经 ' + time + ' 了哦。早睡早起身体好, ' + name + ' 去睡觉了,你也早点睡吧！</p>';
                setTimeout(function() {
                    while (sp.children.length != 1) {
                        sp.removeChild(sp.childNodes[1]);
                    }
                }, 3000);
            } else {
                spr.innerHTML = '<p>现在才 ' + time + '还早呢！多陪陪 ' + name + ' 呗ヽ(￣ω￣(￣ω￣〃)ゝ</p>';
            }
        } else if (Yes.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>嗯呐</p>';
        } else if (GMorning.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            if (H <= 11) {
                spr.innerHTML = '<p>早上好(￣y▽,￣)╭ </p>';
            } else if (H <= 14 && H > 11) {
                spr.innerHTML = '<p>都中午了ㄟ( ▔, ▔ )ㄏ</p>';
            } else if (H <= 23 && H > 14) {
                spr.innerHTML = '<p>已经晚上了呢(￣_￣|||)</p>';
            }
        } else if (GNoon.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            if (H <= 11) {
                spr.innerHTML = '<p>才早上哦(￣▽￣)"</p>';
            } else if (H <= 2 && H > 11) {
                spr.innerHTML = "<p>中午好(●'◡'●)</p>";
            } else if (H <= 23 && H > 14) {
                spr.innerHTML = '<p>已经晚上了呢(￣_￣|||)</p>';
            }
        } else if (Gevening.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            if (H <= 11) {
                spr.innerHTML = '<p>才早上哦(￣▽￣)"</p>';
            } else if (H <= 14 && H > 11) {
                spr.innerHTML = '<p>都中午了ㄟ( ▔, ▔ )ㄏ</p>';
            } else if (H <= 23 && H > 14) {
                spr.innerHTML = '<p>晚上好o(〃＾▽＾〃)o</p>';
            }
        } else if (Stay.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>在呢！' + name + '将持续为您排忧解难！</p>';
        } else if (What.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + name + '在看书呢，我可是很爱学习的！</p>';
        }

        /* ---------- 《末日生存》 ---------- */
        let Games1 = /末日生存|末世生存/;
        if (Games1.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML =
                '<p><label>《末日生存》</label><br><b>(剧情：)末日来临，城市一片混乱充满哀嚎声——这时你睡醒了...</b><br><br><u>●通过窗门看看外面发生了啥</u><br><u>●不管外面，继续呼呼大睡</u><br><u>●当作没听到，出门逛街</u></p>';
        }
        switch (ipt.value) {
            case '通过窗门看看外面发生了啥':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你通过窗户看到生化病毒爆发，你回头看了看...</b><br><br><u>墙上挂着一把猎枪，直接用他杀出去</u><br><u>人是铁饭是钢，先做饭吃</u><br><u>从惊恐中回过神来，关好门窗继续睡觉</u></p>';
                break;
            case '墙上挂着一把猎枪，直接用他杀出去':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你用墙上的猎枪武装自己，刚解决完门口的丧尸楼下的丧尸就冲上来了，你来不及关门，<u>失败</u>。<i>剧终！</i></b></p>';
                break;
            case '人是铁饭是钢，先做饭吃':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)由于你做饭声响过大，没有处理浓烟，丧尸们闻声而来，你准备逃跑，不料四周全是丧尸，<u>失败</u>。<i>剧终！</i></b></p>';
                break;
            case '从惊恐中回过神来，关好门窗继续睡觉':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你简单吃了点昨天的剩菜后又继续睡觉了...</b><br><br><u>等待救援，小心谨慎找物资</u><br><u>一直睡</u></p>';
                break;
            case '等待救援，小心谨慎找物资':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你成功的等到了救援，<u>成功</u>。<i>剧终!!!</i></b></p>';
                break;
            case '一直睡':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你成功的把自己饿死了，<u>失败</u>。<i>剧终！</i></b></p>';
                break;
            case '不管外面，继续呼呼大睡':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你不想参与外面的热闹，你只想睡觉，于是你吃了两个三明治就关紧门窗继续睡了。。。</b><br><br><u>进入第二天</u><br><u>进入当天夜晚</u></p>';
                break;
            case '进入第二天':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你昨天因为太累睡到了第二天，这时你被一阵敲门声惊醒...</b><br><br><u>通过猫眼看看是谁</u><br><u>不管，吃喝玩乐后继续睡觉</u><br><u>直接开门询问对方什么事</u></p>';
                break;
            case '通过猫眼看看是谁':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你通过猫眼看到是几只丧尸，回头环顾四周...</b><br><br><u>带上猎枪出去浪</u><br><u>找机会发求救信号</u></p>';
                break;
            case '带上猎枪出去浪':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)打开门才发现只一两个丧尸，而是整个尸群，<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            case '找机会发求救信号':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你找到个合适的机会发出了求救信号，没多久附近的末日搜救队找到了你，<u>成功</u>。<i>剧终!!!</i></b></p>';
                break;
            case '不管，吃喝玩乐后继续睡觉':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)由于你的胆小懒惰不敢出去找物资，被饿死了<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            case '直接开门询问对方什么事':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)刚开门一群丧尸就扑向了你，<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            case '进入当天夜晚':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)当天晚上，你看着手机上的美食图片突然饿了想下楼吃夜宵，刚下楼发现街道到处血。你从惊慌中回过神准备跑回家，没想声音太大直接领着尸潮夜跑，结果太累了被丧尸啃食殆尽，<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            case '当作没听到，出门逛街':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《末日生存》</label><br><b>(剧情：)你收拾了一下出门逛街，走到街上发现远处一群人走你前面，你以为是什么活动就跟上去凑热闹。凑近才看到是一群感染者(凑热闹成功,成功加入感染者队列)，<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            default:
                break;
        }

        /* ---------- 《代号"Z"》 ---------- */
        let Games2 = /代号"Z"|代号Z|代号“Z”|代号z/;
        if (Games2.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML =
                '<p><label>《代号"Z"》</label><br><b>(剧情：)这是你当卧底的第二年，你时常不能和家人联系，你有时候不得不误杀无辜的人，你为此每日在佛像前忏悔。这时你的上级秘密给你发了一条信息“你提供的证据已经足够，准备收网吧！”...</b><br><br><u>●回复信息并准备收网行动</u><br><u>●已经叛变，假意配合收网行动</u></p>';
        }
        switch (ipt.value) {
            case '回复信息并准备收网行动':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)你心想终于要回归于光明，便积极准备收网行动，这时毒品老大想让你当老二，一边是普通常人的生活，一边是有风险利但利益大的生活...</b><br><br><u>●为了收网顺利，答应当老二</u><br><u>●为了利益，叛变当老二</u></p>';
                break;
            case '为了收网顺利，答应当老二':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)你答应贩毒头目做老二，但底下的弟兄对你不满...</b><br><br><u>●发表“希特勒式”演讲</u><br><u>●提出不当了，让老大来摆平眼前事</u></p>';
                break;
            case '发表“希特勒式”演讲':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)你的演讲成功洗脑了底下的弟兄，就连头目也有所触动，但头目怕你再演讲下去会篡位，所有当场把你击毙，解释说“是我看走眼了，此人妖言惑众，不能留”。<u>失败</u>。<i>剧终！</i></b></p>';
                break;
            case '提出不当了，让老大来摆平眼前事':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)老大知道了你的难处，于是答应出面帮你摆平，你顺利上位...</b><br><br><u>●秘密和弟兄们商量，傍晚发动起义</u><br><u>●向上级请求立刻收网，你已成功当上老二</u></p>';
                break;
            case '秘密和弟兄们商量，傍晚发动起义':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)当弟兄们得知你是“Z”后大惊，他们心想起义了肯定还是要蹲监狱，所有把你做掉去和老大邀功了。<u>失败</u>。<i>剧终！</i></b></p>';
                break;
            case '向上级请求立刻收网，你已成功当上老二':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)上级同意了你的请求——在收网行动的时候你被不知情的新兵误杀，你英勇牺牲成了人民英雄。<u>成功</u>。<i>剧终!!!</i></b></p>';
                break;
            case '为了利益，叛变当老二':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)上级知道了你叛变的消息就立刻派遣狙击手把你灭口了。<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            case '已经叛变，假意配合收网行动':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)这时老大让你上任当老二，你突然想到当毒贩也挺不错的，你逐渐习惯这样的生活并被眼前的利益蒙蔽了双眼和良知，你萌生了叛变的心理...</b><br><br><u>●告诉老大今天晚上警察要对这里实施收网行动</u><br><u>●告诉弟兄们今晚有行动，让弟兄们准备</u></p>';
                break;
            case '告诉老大今天晚上警察要对这里实施收网行动':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)老大知道你是“Z”后大为震惊，怕你是两边倒，因不忠而叛变，不等你解释就把你活埋了。<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            case '告诉弟兄们今晚有行动，让弟兄们准备':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)晚上，警察果然夜袭，你带弟兄们杀敌无数，被老大赏识便想推荐你去见见头号毒贩...</b><br><br><u>●不了，留在大哥身边当小弟是我的荣幸</u><br><u>●去吧，我能开辟出我的道道</u></p>';
                break;
            case '不了，留在大哥身边当小弟是我的荣幸':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)老大倍感欣慰，便宣布你以后是他的接班人。傍晚你们在开庆功宴，警察对你们区域实施了覆盖性轰炸，顿时现场一片火海，你们就此全军覆没。<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            case '去吧，我能开辟出我的道道':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)你与头号老大相谈甚欢，得知你们还是老乡便用家乡话聊天。最后他让你选则...</b><br><br><u>●当他的老二</u><br><u>●请求分支，自己发展壮大</u></p>';
                break;
            case '当他的老二':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)他身边潜伏多年的卧底“X”发现你就是“Z”后怕你透露对警察不利的信息，于是傍晚把你灭口了。<u>失败</u>。<i>剧终!</i></b></p>';
                break;
            case '请求分支，自己发展壮大':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)头目同意了你的要求，并波给你五百手下——你的队伍日益壮大，首脑对你越来越欣赏，你却突然想回到以前...</b><br><br><u>●联系警方，提出自己要改邪归正</u><br><u>●对此忏悔，开枪自杀</u></p>';
                break;
            case '对此忏悔，开枪自杀':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)由于你误杀了很多无辜的人，你对此而发出忏悔，最终因想得到心里解脱而吞枪自杀。<i>剧终!!</i></b></p>';
                break;
            case '联系警方，提出自己要改邪归正':
                spr.style.textAlign = 'center';
                spr.innerHTML =
                    '<p><label>《代号"Z"》</label><br><b>(剧情：)警方看到了你的诚意，并答应再次启动收网。最后那个地区的所有毒贩被一锅端，你虽然有功，但也被关进监狱改过三年，三年后你回归了正常人的生活...<i>剧终!!</i></b></p>';
                break;
            default:
                break;
        }

        /* ---------- 拒绝英文 English ---------- */
        let USA = /[A-Za-z]/,
            US = /[\u4e00-\u9fa5]/,
            Str = /P-|I-/;
        if (USA.test(ipt.value) && US.test(ipt.value) == false && Str.test(ipt.value) == false && Url.test(ipt
                .value) == false && URL.test(ipt.value) == false && ipt.value != name && ipt.value != 'cls') {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            ipt.value = '';
            spr.innerHTML = name + '提示：请勿使用英文哦';
            spr.style.textAlign = 'center';
        }

        /* ---------- 敏感词 Sensitive words ----- ----- */
        if (Sensitive.test(ipt.value)) {
            let spr = document.createElement(li);
            sp.appendChild(spr);
            spr.innerHTML = '<p>' + name + '提示：请文明用语哦！</p>';
            ipt.placeholder = '善语结善缘，恶语伤人心~';
            if (USA.test(ipt.value)) {
                spr.innerHTML = '<p>' + name + '提示：请文明用语哦！</p>';
                ipt.placeholder = '善语结善缘，恶语伤人心~';
            }
        }

        /** ---------- “发送按钮” 尾部初始化 ---------- **/
        let txt = ipt.value.trim();
        if (txt.length <= 0) {
            ipt.placeholder = '说点什么吧~';
            spr.remove();
        } else if (ipt.value === 'cls') {
            while (sp.children.length != 0) {
                sp.removeChild(sp.childNodes[0]);
            }
            location.reload(true);
        }

        ipt.addEventListener('blur', function() {
            ipt.placeholder = '善语结善缘，恶语伤人心~';
        });

        ipt.value = '';

        /*** -------- 让滚动条一直保持在底部 -------- ***/
        sp.scrollTop = sp.scrollHeight;

    });

}

/** ---------- 时间显示设置 Timing ---------- **/
function Timing({
    LP: lpr, // 设置父级元素
    LC: lcr, // 设置子级元素
    Dis: dis, // 设置 是|否 显示时间元素
    MYPY: MYPY, // MY：移动端拖动此方块，PY：PC端拖动此方块，MPY = MY + PY
}) {
    var lp = document.querySelector(lpr);
    var New_DIV = document.createElement('div');
    document.body.appendChild(New_DIV);
    New_DIV.className = 'ND';
    New_DIV.style =
        'position:absolute;left: 0;top: 20px;width: 90px;border: 2px solid black;cursor: default; border-left: 0;border-radius: 0 50px 50px 0;color: white;background-color: #aaa;';
    New_DIV.style.display = dis;

    /* ---------- 时间流逝设置 ---------- */
    setInterval(function() {
        New_DIV.innerHTML = H + ':' + m + ':' + s++ + '<label>🔴</label>';
        let label = New_DIV.querySelector('label');
        label.style = 'float: right;';
        if (s >= 60) {
            s = 0;
            ++m;
        } else if (m >= 60) {
            m = 0;
            ++H;
        } else if (H >= 24) {
            H = 0;
        }
    }, 1000);

    /* ---------- 时间模块隐藏与显示 ---------- */
    function tie() {
        setTimeout(function() {
            var stim = setInterval(function() {
                New_DIV.style.left = New_DIV.offsetLeft - 10 + 'px';
                if (New_DIV.offsetLeft == -70) {
                    clearInterval(stim);
                }
            }, 10);
        }, 5000);
    }
    tie();
    New_DIV.addEventListener('mouseenter', function oner() {
        if (New_DIV.offsetLeft == -70) {
            var stim2 = setInterval(function() {
                New_DIV.style.left = New_DIV.offsetLeft + 10 + 'px';
                if (New_DIV.offsetLeft == 0) {
                    clearInterval(stim2);
                    tie();
                }
            }, 10);
        }
    });



    /* ---------- 时间模块的拖动 ---------- */
    // 移动端拖拽
    function touch() {
        let New_Y = 0,
            startY = 0;
        New_DIV.addEventListener('touchstart', function(e) {
            startY = e.targetTouches[0].pageY;
            New_Y = this.offsetTop;
        });
        New_DIV.addEventListener('touchmove', function(e) {
            let moveY = e.targetTouches[0].pageY - startY;
            this.style.top = New_Y + moveY + 'px';
            if (New_DIV.offsetTop <= 0) {
                New_DIV.style.top = 0;
            } else if (New_DIV.offsetTop >= window.screen.availHeight - 25) {
                New_DIV.style.top = window.screen.availHeight - 25 + 'px';
            }
        });
    }

    // PC端拖拽
    function mouse() {
        New_DIV.addEventListener('mousedown', function(e) {
            document.onselectstart = function() {
                return false;
            }
            let e_y = e.pageY - New_DIV.offsetTop;

            function move(e) {
                New_DIV.style.top = e.pageY - e_y + 'px';
                if (New_DIV.offsetTop <= 0) {
                    New_DIV.style.top = 0;
                } else if (New_DIV.offsetTop >= document.documentElement.clientHeight - 25) {
                    New_DIV.style.top = document.documentElement.clientHeight - 25 + 'px';
                }
            }

            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', move);
            });
        });
    }


    if (MYPY == 'MY') {
        touch();
    } else if (MYPY == 'PY') {
        mouse();
    } else if (MYPY == 'MPY') {
        mouse();
        touch();
    }
}
