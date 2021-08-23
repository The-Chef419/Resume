const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {

            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')


const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')

    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/* SHOW SCROLL TOP */
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');

    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollTop)

/* DARK LIGHT THEME */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark ' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon ' : 'bx-sun'

if (selectedTheme) {

    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}


themeButton.addEventListener('click', () => {

    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* REDUCE THE SIZE AND PRINT ON AN A4 SHEET */
function scaleCv() {
    document.body.classList.add('scale-cv')
}

/* REMOVE THE SIZE WHEN THE CV IS DOWNLOADED */
function removeScale() {
    document.body.classList.remove('scale-cv')
}

/* GENERATE PDF */
// PDF generated area
let areaCV = document.getElementById('CV')

let resumeButton = document.getElementById('resume-button')

// Html2pdf options
let opt = {
    margin: 0,
    filename: 'CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2},
    jsPDF: { format: 'a4', orientation: 'portrait' }
};



// Function to call areaCV and Html2Pdf options 
function generateResume() {
    html2pdf(areaCV, opt)
}


// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {

    scaleCv()

    generateResume()

    setTimeout(removeScale, 3000)
})