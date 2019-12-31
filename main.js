const init = function(){

    // Fullscreen
    const makeFs = function(){
        const fs = document.createElement('div')
        fs.innerHTML = 'Tap to enter fullscreen'
        fs.id = 'fs'
        document.body.appendChild(fs)
        fs.onclick = function(){
            document.body.requestFullscreen()
            fs.remove()
        }
    }
    makeFs()

    // DOM
    const btnStart = document.querySelector('#start')
    const board = document.querySelector('#board')
    const resultBoard = document.querySelector('#resultBoard')
    const resultSpeed = document.querySelector('#resultSpeed')
    const coindeck = document.querySelector('#coindeck')
    const restartWrap = document.querySelector('#restartWrap')
    const btnRestart = document.querySelector('#btnRestart')
    const page = document.querySelectorAll('.page')
    const btnCoin = document.querySelectorAll('.btnCoin')
    const btnSend = document.querySelectorAll('.btnSend')

    let isStart = false
    let timer
    let timestamp = 0
    let val //Target value
    let coinImg = [] // coin image DOM
    let count = 0 // coin count
    let sum = 0 // value sum

    // Initialize
    const initStage = function(){
        timestamp = 0
        resultSpeed.innerHTML = ''
        val = 0
        board.innerHTML = ''
        for(var i = 0; i < count; i ++){
            coinImg[i].remove()
            console.log(i)
        }
        count = 0
        sum = 0
        coinImg = []
        resultBoard.innerHTML = ''
    }

    btnStart.onclick = function(){
        page[1].style['z-index'] = 1
        initStage()
        stage()
    }
    
    const timecheck = function(){
        timestamp ++
        resultSpeed.innerHTML = (timestamp * 0.01).toFixed(2) + 'msec'
    }

    const stage = function(){
        let str = ''
        setTimeout(function(){
            str += '.'
            board.innerHTML = str
        },500)
        setTimeout(function(){
            str += '.'
            board.innerHTML = str
        },1000)
        setTimeout(function(){
            str += '.'
            board.innerHTML = str
        },1500)
        let randCount
        randCount = Math.random() * 2000 + 2000
        
        val = Math.floor(Math.random() * 10) * 500 + Math.floor(Math.random()*4) * 100 // Target value

        setTimeout(function(){
            board.innerHTML = val
            isStart = true
            timer = setInterval(timecheck, 10)
        },randCount)
    }
    
    btnCoin[0].ontouchstart = function(){
        if(isStart) coinStack(500)
    }

    btnCoin[1].ontouchstart = function(){
        if(isStart) coinStack(100)
    }

    btnSend[0].ontouchstart = function(){
        if(isStart){
            result()
        }
    }
    
    const coinStack = function(type){
        
        coinImg[count] = document.createElement('img')
        coinImg[count].src = './data/coin_'+type+'.png'
        coinImg[count].style['transform'] = 'translate('+30*Math.random()+'px, '+count * -18+'px)'
        coindeck.append(coinImg[count])
        coinImg[count].className = 'coinImg500'
        count ++
        sum += type
    }

    const result = function(){
        resultBoard.innerHTML = sum
        if(sum == val){
            resultBoard.style['color'] = 'rgb(0,0,255)'
        } else {
            resultBoard.style['color'] = 'rgb(255,0,0)'
        }
        clearInterval(timer)
        isStart = false
        restartWrap.style['display'] = 'initial'
    }

    // Restart
    btnRestart.onclick = function(){
        initStage()
        stage()
        restartWrap.style['display'] = 'none'
    }
}

window.onload = init
