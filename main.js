const init = function(){

    const cons = document.createElement('div')
    cons.style['position'] = 'fixed'
    cons.style['top'] = '0px'
    cons.style['left'] = '0px'
    cons.style['color'] = 'red'
    cons.style['font-size'] = '40px'
    document.body.appendChild(cons)

    const btnStart = document.querySelector('#start')
    const board = document.querySelector('#board')
    const resultBoard = document.querySelector('#resultBoard')
    const resultSpeed = document.querySelector('#resultSpeed')
    const coindeck = document.querySelector('#coindeck')
    const page = document.querySelectorAll('.page')
    const btnCoin = document.querySelectorAll('.btnCoin')
    const btnSend = document.querySelectorAll('.btnSend')

    btnStart.onclick = function(){
        page[1].style['z-index'] = 1
        stage()
    }

    let isStart = false
    let timer
    let timestamp = 0
    let val
    const timecheck = function(){
        timestamp ++
        resultSpeed.innerHTML = (timestamp * 0.1).toFixed(1) + 'msec'
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
        
        val = Math.floor(Math.random() * 10) * 500 + Math.floor(Math.random()*4) * 100

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

    let coinImg = []
    let count = 0
    let sum = 0
    
    const coinStack = function(type){
        count ++
        coinImg[count] = document.createElement('img')
        coinImg[count].src = './data/coin_'+type+'.png'
        coinImg[count].style['transform'] = 'translate('+30*Math.random()+'px, '+count * -25+'px)'
        coindeck.append(coinImg[count])
        coinImg[count].className = 'coinImg500'
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
    }

    if ('serviceWorker' in navigator) {
    navigator.serviceWorker
            .register('/sw.js')
    }
}

window.onload = init
