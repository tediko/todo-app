const body = document.querySelector('[data-theme]');
const themeSwitch = document.querySelector('[data-theme-switch]');
const icons = document.querySelectorAll('[data-theme-icon]');
const backgrounds = document.querySelectorAll('[data-theme-img]');

const lightTheme = 'light';
const darkTheme = 'dark';

const themeToggle = () => {
    let activeTheme = body.dataset.theme;
    
    activeTheme == lightTheme ?
        body.dataset.theme = darkTheme :
        body.dataset.theme = lightTheme;

    iconToggle(icons, activeTheme);
    backgroundToggle(backgrounds, activeTheme);
}

const iconToggle = (icons, activeTheme) => {
    icons.forEach(icon => {
        let activeIconTheme = icon.dataset.themeIcon;

        activeIconTheme != activeTheme ?
            icon.classList.add('active') :
            icon.classList.remove('active');
    })
}

const backgroundToggle = (backgrounds, activeTheme) => {
    backgrounds.forEach(bg => {
        let activeBackgroundTheme = bg.dataset.themeImg;

        activeBackgroundTheme != activeTheme ?
            bg.classList.add('active') :
            bg.classList.remove('active');

    })
}

export default themeSwitch.addEventListener('click', themeToggle);