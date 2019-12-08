$(document).ready(function(){
    var duration = 3000;
    var speed = 1000;
    var width = $('.rotation-player').width();
    var curIndex = 0;
    var totalIndex = $('.rotation-player>ul>li').length;
    var timer;
    // 将所有照片连在一起,生成滚动条
    $('.rotation-player>ul>li').each(function(index){
        $(this).css("left",index*width+"px");
        $('.player-nav').append("<span>"+(index+1)+"</span>");
    });
    // 默认第一张照片对应的按钮亮起
    $('.player-nav>span').eq(0).addClass('active');
    // 克隆一张照片放在最后
    var firstCild = $('.rotation-player>ul>li').eq(0).clone();
    $('.rotation-player>ul').append(firstCild);
    firstCild.css("left",totalIndex*width+"px");

    // 点击对应按钮切换到对应照片
    $('.player-nav>span').each(function(index){
        $(this).attr("index",index);
        $(this).click(function(){
            curIndex = $(this).attr('index')-1;
            clearTimeout(timer);
            move();
        })
    });

    // 左右导航按键功能
    $('.turn-left-btn').click(()=>{
        if(curIndex === 0){
            curIndex = totalIndex - 2;
            clearTimeout(timer);
            move();
        }else{
            curIndex -= 2;
            clearTimeout(timer);
            move();
        }
    });
    $('.turn-right-btn').click(()=>{
            clearTimeout(timer);
            move();
    })
    // 鼠标悬停停止播放 移出继续播放
    $('.rotation-player>ul').mouseover(function(){
        clearTimeout(timer);
    });
    $('.rotation-player>ul').mouseout(function(){
        timer = setTimeout(move,duration);
    });

    timer=setTimeout(move,duration);

    function move(){
        curIndex++;
        if(curIndex > totalIndex){
            curIndex = 1;
            $('.rotation-player>ul').css("left","0px");
        }
        for(var i=0;i<totalIndex;i++){
            $('.player-nav>span').eq(i).removeClass("active");
        }
        if(curIndex === totalIndex){
            $('.player-nav>span').eq(0).addClass("active");
        }else{
            $('.player-nav>span').eq(curIndex).addClass("active");
        }
        $('.rotation-player>ul').animate({left:width*curIndex*-1+"px"},speed);
        timer=setTimeout(move,duration+speed);
    }
});

var lineGraph = echarts.init(document.getElementsByClassName('biger-section')[0],'wonderland')
var lineGraphOption = {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
lineGraph.setOption(lineGraphOption);

var roundGraph = echarts.init(document.getElementsByClassName('smaller-section')[2]);
roundGraphOption = {
    title: {
        text: '饼状图数据展示',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            color: ['#4ea397', '#22c3aa', '#7bd9a5', '#2d91d1', '#55b9f9'],
            radius: ['50%', '70%'],
            width: '80%',
            left: 'center',
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};
roundGraph.setOption(roundGraphOption);

var histogram = echarts.init(document.getElementsByClassName('smaller-section')[3]);
histogramOption = {
    title: {
            text: '柱状图数据展示',
            left: 'center'
        },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        color: [ '#2d91d1', '#55b9f9'],
    }]
};
histogram.setOption(histogramOption);