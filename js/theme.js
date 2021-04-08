export default class themeSwitcher {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            body: 'data-theme',
            themeSwitch: 'data-theme-switch',
            icons: 'data-theme-icon',
            backgrounds: 'data-theme-img'
        };
        
        this.body = document.querySelector(`[${this.selectors.body}]`);
        this.themeSwitch = document.querySelector(`[${this.selectors.themeSwitch}]`);
        this.icons = document.querySelectorAll(`[${this.selectors.icons}]`);
        this.backgrounds = document.querySelectorAll(`[${this.selectors.backgrounds}]`);

        if (!this.body || !this.themeSwitch || !this.icons || !this.backgrounds) return false;

        this.theme = JSON.parse(localStorage.getItem('theme')) || lightTheme;
        this.lightTheme = 'light';
        this.darkTheme = 'dark';
        return true;
    }

    setupEvents() {
        this.body.dataset.theme = this.theme;
        this.themeSwitch.addEventListener('click', () => this.themeToggle());
    }

    themeToggle() {
        this.activeTheme = this.body.dataset.theme;

        this.activeTheme == this.lightTheme ? 
            (this.body.dataset.theme = this.darkTheme,
                localStorage.setItem('theme', JSON.stringify(this.darkTheme))) :
            (this.body.dataset.theme = this.lightTheme,
                localStorage.setItem('theme', JSON.stringify(this.lightTheme)));

        this.backgroundToggle(this.backgrounds, this.activeTheme);
    }

    backgroundToggle(backgrounds, activeTheme) {
        this.backgrounds.forEach(bg => {
            this.activeBackgroundTheme = bg.dataset.themeImg;

            this.activeBackgroundTheme != this.activeTheme ?
                bg.classList.add('active') :
                bg.classList.remove('active');
        })
    }
}