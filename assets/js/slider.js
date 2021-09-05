const getSlider = (str = "") => document.querySelector(`.slider${str}`)

const sliders = document.querySelectorAll(`.slider`)
let curSlides = []
for(i=0;i<sliders.length;i++) curSlides.push(1)

const buildSlider = (slider,index) => {

    let duration = 1000 //setup time transition
    let waitingTime = 3000 //setup time for display each
    
    let n=0
    let slides = []
    let timer;
    let sliderBox = slider.parentNode

    const prefix = (slider) => {
        let slides = slider.querySelectorAll(".slide")
        n = slides.length
        let first = slides[0]
        let last = slides[n-1]

        let cloneFirst = first.cloneNode(true)
        let cloneLast = last.cloneNode(true)

        slider.insertBefore(cloneLast, first)
        slider.insertBefore(cloneFirst, null)

        slides = slider.querySelectorAll('.slide')

        return slides
    }

    const sliderStyle = () => {
        sliderBox.style.position = "relative"
        sliderBox.style.overflow = "hidden"
        sliderBox.style.padding = 0
        sliderBox.style.margin = 0
        nodes = sliderBox.querySelectorAll("*")
        for(let node of nodes) {
            node.style.boxSizing = "border-box"
            // node.style.margin = "0"
        }

        slider.style.display = "flex"
        slider.style.listStyleType = "none"
        slider.style.width = "100%"
        slider.style.position = "relative"
        slider.style.top = "0"
        slider.style.left = "-100%"
        slider.style.transition = `all ${duration}ms`

        for(let slide of slides) {
            slide.style = `
            display: block;
            flex-shrink: 0;
            width: 100%;
            flex-basis: 100%;
            `
        }

        sliderBox.querySelector(".control-turn").style = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 120%;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        transition: width .25s;
        `

        let css = `.slider-box:hover .control-turn { width: 100% !important; }
            
            .turn-left, .turn-right {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #282828;
                font-size: 3rem;
                font-weight: 400;
                border-radius: 50%;
                background-color: rgba(255, 255, 255,0.3);
                height: 50px;
                width: 50px; 
            }
        `
        
        let style = document.createElement('style');

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style);
    }

    const updateCurSlide = (curSlide) => {
        if(curSlide < 1) {
            curSlide = n
            slider.style.transition = 'none'
            slider.style.left = -n*100 + '%'
        }

        if(curSlide > n) {
            curSlide = 1
            slider.style.transition = 'none'
            slider.style.left = '-100%'
        }

        return curSlide
    }

    const newSetTime = () => {
        return setInterval(() => {
            nxt.click()
        },waitingTime)
    }

    n=0;
    slides = prefix(slider)
    const nxt = sliderBox.querySelector('.turn-right')
    const prv = sliderBox.querySelector('.turn-left')

    let optionList = sliderBox.querySelectorAll('.option')
    // for(let i=0; i<optionList.length; i++) {
    //     optionList[i].addEventListener('click',() => {
    //         console.log('click')
    //         clearInterval(timer)

    //         prv.removeEventListener('click',prvClick)
    //         nxt.removeEventListener('click',nxtClick)
    //         setTimeout(() => {
    //             prv.addEventListener('click',prvClick)
    //             nxt.addEventListener('click',nxtClick)
    //             timer = newSetTime()
    //         },duration)

    //         updateCurSlide(curSlides[index])

    //         setTimeout(() => {
    //             let curSlide = i
    //             curSlides[index] = curSlide

    //             slider.style.transition = `all ${duration}ms`
    //             slider.style.left = -curSlide*100 + '%'
    //             sliderBox.querySelector('.option.active').classList.remove('active')
    //             if(curSlide>n) optionList[0].classList.add('active')
    //             else if(curSlide<1) optionList[n-1].classList.add('active')
    //             else optionList[curSlide-1].classList.add('active')
    //         },1)
    //     })
    // }


    sliderStyle()

    const nxtClick = () => {
        clearInterval(timer)
        nxt.removeEventListener('click',nxtClick)
        setTimeout(() => {
            nxt.addEventListener('click',nxtClick)
        },duration)

        
        let curSlide = curSlides[index]

        // fix
        curSlide = updateCurSlide(curSlide)

        curSlide++;

        // move
        setTimeout(() => {
            slider.style.transition = `all ${duration}ms`
            slider.style.left = -curSlide*100 + '%'
            sliderBox.querySelector('.option.active').classList.remove('active')
            if(curSlide>n) optionList[0].classList.add('active')
            else if(curSlide<1) optionList[n-1].classList.add('active')
            else optionList[curSlide-1].classList.add('active')
        },1)
        

        curSlides[index] = curSlide
        timer = newSetTime()
    }

    const prvClick = () => {
        clearInterval(timer)
        prv.removeEventListener('click',prvClick)
        nxt.removeEventListener('click',nxtClick)
        console.log(timer)
        setTimeout(() => {
            prv.addEventListener('click',prvClick)
            nxt.addEventListener('click',nxtClick)
        },duration)
        console.log(timer)


        let curSlide = curSlides[index]
        
        curSlide = updateCurSlide(curSlide)
        

        curSlide--;
        

        // move
        setTimeout(() => {
            slider.style.transition = `all ${duration}ms`
            slider.style.left = -curSlide*100 + '%'
            sliderBox.querySelector('.option.active').classList.remove('active')
            if(curSlide>n) optionList[0].classList.add('active')
            else if(curSlide<1) optionList[n-1].classList.add('active')
            else optionList[curSlide-1].classList.add('active')
        },1)
        
        // console.log(curSlide,n)

        curSlides[index] = curSlide
        timer = newSetTime()
    }

    nxt.addEventListener('click',nxtClick)
    prv.addEventListener('click',prvClick)

    timer = newSetTime()
}

for(let i=0;i<sliders.length;i++) buildSlider(sliders[i],i)






