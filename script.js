const secondUser = document.querySelectorAll('.second-user');

function isInView(element) {
    const rect = element.getBoundingClientRect();
    const html = document.documentElement;

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
    )
}

secondUser.forEach((el, index) => {
    const elementParent = el.parentElement;
    const elementAttr = el.hasAttribute('data-message');
    const elementText = secondUser[index].querySelector('span');
    const elementHeight = el.clientHeight;
    const elementWidth = elementParent.clientWidth;

    if (elementAttr && elementText) {
        elementParent.style.width = elementWidth + 'px';
        el.style.height = elementHeight + 'px';
        el.dataset.message = elementText.innerHTML;
        elementText.innerHTML = '';
    }
})

window.addEventListener('scroll', () => {
    secondUser.forEach((el, index) => {
        if (isInView(el)) {
            const elementText = el.dataset.message;
            const elementInner = secondUser[index].querySelector('span')
            if (elementText && elementInner.innerHTML === '') {
                wtiteText(elementText, elementInner, 8)
            }
        }
    })
})

const wtiteText = function (text, elem, delay) {
    if (text.length > 0) {
        elem.innerHTML += text[0];
        setTimeout(
            function () {
                wtiteText(text.slice(1), elem, delay);
            }, delay
        );
    }
}

const pricingListItem = document.querySelectorAll('.pricing__list-item');

pricingListItem.forEach((el, index) => {
    el.addEventListener('mouseover', () => {
        el.classList.add('pricing__list-item_best')
        if (index !== 1) pricingListItem[1].classList.remove('pricing__list-item_best')
    })
    el.addEventListener('mouseout', () => {
        if (index !== 1) {
            el.classList.remove('pricing__list-item_best')
            pricingListItem[1].classList.add('pricing__list-item_best')
        }
    })
})

const faqItem = document.querySelectorAll('.faq__list-item');

faqItem.forEach((el, index) => {
    el.addEventListener('click', () => {
        faqItem.forEach((el, i) => {
            if (i !== index) {
                el.classList.remove('faq__list-item_active');
            }
        })
        el.classList.toggle('faq__list-item_active');
    })
})
// preset message

// const fieldInput = document.querySelectorAll('.field input');
// const textarea = document.querySelector('.textarea');

// fieldInput.forEach(el => {
//     if (el.checked) textarea.innerHTML = el.value
//     el.addEventListener('click', () => textarea.innerHTML = el.value)
// })


// smooth scroll

const anchors = document.querySelectorAll('a[href*="#"]');
const mainPage = document.querySelectorAll('.main-page');
const headerBtn = document.querySelectorAll('.header__btn');
const headerMobile = document.querySelector('.header-mobile');

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        if (mainPage.length) e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        headerMobile.classList.remove('header-mobile_open')

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

headerBtn.forEach(el => el.addEventListener('click', () => headerMobile.classList.toggle('header-mobile_open')))