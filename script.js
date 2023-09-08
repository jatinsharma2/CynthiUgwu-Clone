const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
})

// mouse circle dot following fxn
const mouseFollow = (xscale, yscale) => {
    window.addEventListener('mousemove', (val) => {
        document.querySelector('#miniCircle').style.transform = `
            translate(${val.clientX}px,${val.clientY}px ) scale(${xscale},${yscale})
        `
    })
}
mouseFollow()

// mouse circle squeeze *not important*
let timeout
const mouseSqueeze = () => {
    let xscale = 1
    let yscale = 1
    let xprev = 0
    let yprev = 0
    window.addEventListener('mousemove', (val) => {
        clearTimeout(timeout)
        xscale = gsap.utils.clamp(0.8, 1.2, val.clientX - xprev)
        yscale = gsap.utils.clamp(0.8, 1.2, val.clientY - yprev)

        xprev = val.clientX
        yprev = val.clientY

        mouseFollow(xscale, yscale)
        timeout = setTimeout(() => {
            document.querySelector('#miniCircle').style.transform = `
            translate(${val.clientX}px,${val.clientY}px ) scale(1,1)
        `
        }, 100)
    })
}
mouseSqueeze()

// first page animation
function firstPageAnimation() {
    var timeline = gsap.timeline()

    timeline
        .from('.nav', {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            ease: Expo.easeInOut,
        })
        .to('.boundingElem', {
            y: 0,
            duration: 2,
            ease: Expo.easeInOut,
            stagger: 0.2,
            delay: -1,
        })
        .from('.footer', {
            y: -10,
            opacity: 0,
            duration: 1.5,
            ease: Expo.easeInOut,
            delay: -1,
        })
}
firstPageAnimation()

// second page animation

const secondPage = document.querySelectorAll('.elem')
secondPage.forEach((element) => {
    let rotate = 0
    let rotateDiff = 0
    element.addEventListener('mousemove', (val) => {
        let diff = val.clientY - element.getBoundingClientRect().top
        rotateDiff = val.clientX - rotate
        rotate = val.clientX
        gsap.to(element.querySelector('img'), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: val.clientX,
            rotate: gsap.utils.clamp(-20, 20, rotateDiff) * 0.6,
        })
    })

    element.addEventListener('mouseleave', (val) => {
        gsap.to(element.querySelector('img'), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        })
    })
})
