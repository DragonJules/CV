const sections = [...document.querySelectorAll('section')]
const navlinks = [...document.querySelectorAll('.nav-link')]
const icons = [...document.querySelectorAll('i')]

const pAdress = document.querySelector('#adress')
const pFooter = document.querySelector('#footer')


// phone screen handling
let screenphone = false
if(window.innerHeight > window.innerWidth){
    screenphone = true
}
resizeElements()

// resize observer

let data = sections.map(section => section.offsetTop);
addClassAndClear(0)

firstLoad = true;
function handleResize(){
    if(!firstLoad){ 
        data = sections.map(section => section.offsetTop);
    
        if(window.innerHeight > window.innerWidth){
        screenphone = true
    }
    resizeElements()
    } 

    firstLoad = false;
}



const resizeObserver = new ResizeObserver(handleResize)
resizeObserver.observe(document.body)

navlinks.forEach((navlink, i)=>{
    navlink.addEventListener('click', e =>{
        e.preventDefault()

        let sectionNumber = parseInt(e.path[0].classList[0]);  

        let toSub = 0;
        if(screenphone) toSub = 100

        window.scrollTo({
            top: data[sectionNumber] - 90 - toSub,
            behavior: 'smooth'
        })
    })
})

// Scroll Spy

window.addEventListener('scroll', handleScroll)

let savedIndex;
function handleScroll(){
    const scrolled = window.scrollY + window.innerHeight / 3;

    for(const i of data){
        const index = data.indexOf(i)

        if(scrolled >= data[index] && scrolled <= data[index+1]){
            if(index !== savedIndex) {
                savedIndex = index;
                addClassAndClear(index)
            }
            break;
        }

        if(index === data.length -1 && scrolled >= data[index]){
            if(index !== savedIndex) {
                savedIndex = index;
                addClassAndClear(index)
            }
        }
    }

    const navbar = document.getElementById('navbar')
    const navbaronhome = document.getElementById('navbar-on-home')
    if(window.scrollY <= 0){
        navbar.style.display = 'none'
        navbaronhome.style.display = ''
    }else{
        navbar.style.display = 'flex'
        navbaronhome.style.display = 'none'
    }
}
function addClassAndClear(index){
    const elToClear = navlinks.find(navlink => navlink.className.includes('marked'))
    if(elToClear) elToClear.classList.remove('marked')
    navlinks[index].classList.add('marked')
}   

// Form animation

function updateFormAnimation(e){
        if(e.target.value != ''){
            e.target.parentNode.classList.add('animation');
            
        }else if(e.target.value == ''){
            e.target.parentNode.classList.remove('animation');
        }
}




// Auto resize text area
const textarea = document.querySelector('textarea');

textarea.addEventListener('keyup', e =>{
    if(screenphone){
        textarea.style.height = '67px'
    }else{
        textarea.style.height = '47px'
    }
    

    let tHeight = e.target.scrollHeight;
    textarea.style.height = `${tHeight}px`
});


textarea.addEventListener('input', e => {
    if(e.target.value != ''){
        e.target.parentNode.classList.add('animation');
    }else if(e.target.value == ''){
        e.target.parentNode.classList.remove('animation');
    }
});

// top button
const topbutton = document.querySelector('.top-btn')

topbutton.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        right: 0,
        behavior: 'smooth'
    })
});

function resizeElements(){
    if(screenphone){
        icons.forEach((icon, i)=>{
            icon.classList.remove('fa-sm')
            icon.classList.add('fa-xl')

            if(icon.classList[1]=='fa-arrow-up'){
                icon.classList.remove('fa-xl')
                icon.classList.add('fa-4x')
            }
        });

        pAdress.innerHTML = '33B Rue St Germain Compiègne, France'
        pFooter.innerHTML = 'Copyright © 2022 All rights reserved<br>This page is made by '
    }else{
        icons.forEach((icon, i)=>{
            icon.classList.remove('fa-xl')
            icon.classList.add('fa-sm')

            if(icon.classList[1]=='fa-arrow-up'){
                icon.classList.remove('fa-4x')
                icon.classList.add('fa-xl')
            }
        });

        pAdress.innerHTML = '33B Rue St Germain<br>Compiègne, 60200 France'
        pFooter.innerHTML = 'Copyright © 2022 All rights reserved | This page is made by '
    }
}

// Form Verif


let contactForm = document.querySelector('#contact-form')       

let emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
let telRegExp = /((0|\+[0-9]{2,4})[1-9]([0-9]{2}){4})|((0|\+[0-9]{2,4} )[1-9]( *[0-9]{2}){4})/

let emailIsValid = false;
let telIsValid = false;

// name
contactForm.name.addEventListener('change', e =>{
    e.target.parentNode.classList.remove('invalid')
    e.target.previousElementSibling.innerHTML = 'Votre Nom'
})

contactForm.name.addEventListener('input', e =>{
    updateFormAnimation(e)

    e.target.parentNode.classList.remove('invalid')
    e.target.previousElementSibling.innerHTML = 'Votre Nom'
})



// email
contactForm.email.addEventListener('change', e =>{

    let emailTest = emailRegExp.test(e.target.value)

    if (!emailTest && !e.target.value == ''){
        e.target.parentNode.classList.add('invalid')
        e.target.previousElementSibling.innerHTML = 'Votre Email | Format Invalide'

        emailIsValid = false
    }else{        
        e.target.parentNode.classList.remove('invalid')
        e.target.previousElementSibling.innerHTML = 'Votre Email'

        emailIsValid = true
    }
})

contactForm.email.addEventListener('input', e =>{

    let emailTest = emailRegExp.test(e.target.value)

    updateFormAnimation(e)
    if (emailTest){
        e.target.parentNode.classList.remove('invalid')
        e.target.previousElementSibling.innerHTML = 'Votre Email'

        emailIsValid = true
    }

})

// tel
contactForm.tel.addEventListener('change', e =>{

    let telTest = telRegExp.test(e.target.value)

    if (!telTest && !e.target.value == ''){
        e.target.parentNode.classList.add('invalid')
        e.target.previousElementSibling.innerHTML = 'Votre Telephone | Format Invalide'

        telIsValid = false
    }else{        
        e.target.parentNode.classList.remove('invalid')
        e.target.previousElementSibling.innerHTML = 'Votre Telephone'

        telIsValid = true
    }
})

contactForm.tel.addEventListener('input', e =>{

    let telTest = telRegExp.test(e.target.value)

    updateFormAnimation(e)
    if (telTest){
        e.target.parentNode.classList.remove('invalid')
        e.target.previousElementSibling.innerHTML = 'Votre Telephone'

        telIsValid = true
    }

})


// subject
contactForm.subject.addEventListener('change', e =>{
    e.target.parentNode.classList.remove('invalid')
    e.target.previousElementSibling.innerHTML = 'Object'
})

contactForm.subject.addEventListener('input', e =>{
    updateFormAnimation(e)

    e.target.parentNode.classList.remove('invalid')
    e.target.previousElementSibling.innerHTML = 'Objet'
})




// message
contactForm.message.addEventListener('change', e =>{
    e.target.parentNode.classList.remove('invalid')
    e.target.previousElementSibling.innerHTML = 'Ecrivez un Message'
})

contactForm.message.addEventListener('input', e =>{
    updateFormAnimation(e)

    e.target.parentNode.classList.remove('invalid')
    e.target.previousElementSibling.innerHTML = 'Ecrivez un Message'
})



//form
contactForm.addEventListener('submit', e =>{
    e.preventDefault()
    if(e.target[0].value == '' || e.target[0].value.length < 2){
        e.target[0].parentNode.classList.add('invalid')
        e.target[0].previousElementSibling.innerHTML = 'Votre Nom | Ne peut pas être vide'

        return false;
    }

    if (!emailIsValid) {
        e.target[1].parentNode.classList.add('invalid')
        e.target[1].previousElementSibling.innerHTML = 'Votre Email | Format Invalide'

        return false;
    }
    if(!telIsValid){
        e.target[2].parentNode.classList.add('invalid')
        e.target[2].previousElementSibling.innerHTML = 'Votre Telephone | Format Invalide'

        return false;
    }

    if(e.target[3].value == '' || e.target[0].value.length < 2){
        e.target[3].parentNode.classList.add('invalid')
        e.target[3].previousElementSibling.innerHTML = 'Objet | Ne peut pas être vide'

        return false;
    }

    if(e.target[4].value == '' || e.target[3].value.length < 2){
        e.target[4].parentNode.classList.add('invalid')
        e.target[4].previousElementSibling.innerHTML = 'Ecrivez un Message | Veuillez Ecrire un message'

        return false;
    }

    if(emailIsValid && telIsValid && e.target[0] != '' && e.target[3] != ''){
        let formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            tel: contactForm.tel.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value,
        }

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/')
        xhr.setRequestHeader('content-type', 'application/json')

        xhr.onload = () => {
            if(xhr.responseText == 'success'){
                contactForm.name.value = ''
                contactForm.email.value = ''
                contactForm.tel.value = ''
                contactForm.subject.value = ''
                contactForm.message.value = ''
                
                contactForm.name.parentNode.classList.remove('animation');
                contactForm.email.parentNode.classList.remove('animation');
                contactForm.tel.parentNode.classList.remove('animation');
                contactForm.subject.parentNode.classList.remove('animation');
                contactForm.message.parentNode.classList.remove('animation');
            }
            else{
                return alert('Sometings went wrong')
            }
        }

        xhr.send(JSON.stringify(formData))
    }
})



function handleEnter(event) {
    if (event.key==="Enter") {
       const form = document.getElementById('contact-form')
       const index = [...form].indexOf(event.target);
       form.elements[index + 1].focus();
       event.preventDefault();
    }
}
