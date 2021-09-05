const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const header = $('.header')
const menuNav = $('.menu-nav')
const modal = $('#modal')
const cart = $('#modal .cart')
const cartExit = $('#modal .cart .head .exit')
const cartNav = $('.cart-nav')

const app = {
    handleEvents: function() {
        document.onscroll = function() {
        const topBarHeight = $('#top-bar').offsetHeight

          const scrollTop = window.scrollY || document.documentElement.scrollTop

          const top = topBarHeight - scrollTop

          header.style.top = (top < 0 ? 0 : top) + 'px';

          if(top<0) header.style.backgroundColor = 'white'
          else header.style.backgroundColor = 'transparent'
        }

        menuNav.addEventListener('mousedown', function() {
            const scrollX = window.scrollX || document.documentElement.scrollLeft
        })

        cartNav.addEventListener('click',() => {
            modal.classList.add('show')
            
            setTimeout(() => {
                cart.classList.add('show')
            },0)
        })

        modal.addEventListener('click',(e) => {
            if(e.target == modal) cartExit.click()
        })

        cartExit.addEventListener('click', () => {
            cart.classList.remove('show')
            setTimeout(() => {
                modal.classList.remove('show')
            },1000)
        })
    },

    responsive: function() {
        
    },
    
    start: function() {
        app.handleEvents()
    }
}

app.start()