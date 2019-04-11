(function () {
    var inner = document.getElementsByClassName('inner')[0]
    var banner = document.getElementsByClassName('banner')[0]
    var fucus = document.getElementsByClassName('fucus')[0]
    var fucusImgs = fucus.childNodes
    //实现数据绑定：使用ajax获取数据
    var jsonData = null
    ~function () {
        var xhr = new XMLHttpRequest()
        xhr.open('GET','json/banner.txt?_='+Math.random(),false)

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                jsonData = eval("("+xhr.responseText+")")
            }
        }
        xhr.send(null)
    }()

    //字符串拼接

    ~function () {
        if(jsonData){
            var str = ''
            var fucusStr = ''
            for(var i = 0;i < jsonData.length;i++){
                var curData = jsonData[i]
                str+='<img src="'+curData["img"]+'" width=\'1000\' height="341"  alt="">'
                fucusStr+='<li><img src="img/dot.png" width="20" alt=""></li>'
            }
            //将拼接好的字符串添加进html
            inner.innerHTML = str
            fucus.innerHTML = fucusStr
            //给inner设置动态宽度
            inner.style.width = jsonData.length*1000 + 'px'
        }

    }()

    //设置自动轮播
    var len = jsonData.length
    var step = 0
    var interval = 1000
    var autoTimer = setInterval(autoMove,interval)

    fucusImgs[0].innerHTML = '<img src="./img/dot-on.png" width="20" alt="">'
    function autoMove() {
        step++
        if(step == len){
            step = 0
        }
        changeDot(step)
        inner.style.left = -step * 1000 + 'px'
    }

    //切换小圆点图片
    function changeDot(i) {
        fucusImgs[i].innerHTML = '<img src="./img/dot-on.png" width="20" alt="">'
        //清除其他li里的图片
        fucusImgs.forEach((fucusImg,index) => {
            if(index !== i){
                fucusImgs[index].innerHTML = '<img src="./img/dot.png" width="20" alt="">'
            }
        })
    }


   //鼠标移入移出停止计时器
    banner.onmouseover = function () {
        clearInterval(autoTimer)
    }
    banner.onmouseout = function () {
        autoTimer = setInterval(autoMove,interval)
    }


    //设置点击小圆圈切换为对应图片
    ~function () {
        fucusImgs.forEach((fucusImg,index) => {
                var curLi = fucusImg
                curLi.index = index
                curLi.onclick = function () {
                    step = this.index
                    changeDot(step)
                    inner.style.left = -step * 1000 + 'px'
                }

        })
    }()

    //设置左右点击切换图片
    var bannerLeft = document.getElementsByClassName('bannerLeft')[0];
    var bannerRight = document.getElementsByClassName('bannerRight')[0];
    bannerLeft.onclick = function () {
        if(step == -1){
            step = 4
        }
        inner.style.left = -step * 1000 + 'px'
        changeDot(step)
        step--

    }
    bannerRight.onclick = function () {
        if(step == 5){
            step = 0
        }
        inner.style.left = -step * 1000 + 'px'
        changeDot(step)
        step++

    }





})()