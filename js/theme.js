export default class ThemeSwitcher {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            body: 'data-theme',
            themeSwitch: 'data-theme-switch',
            backgrounds: 'data-theme-img'
        };
        
        this.body = document.querySelector(`[${this.selectors.body}]`);
        this.themeSwitch = document.querySelector(`[${this.selectors.themeSwitch}]`);
        this.backgrounds = document.querySelectorAll(`[${this.selectors.backgrounds}]`);

        if (!this.body || !this.themeSwitch || !this.backgrounds) return false;

        this.lightTheme = 'light';
        this.darkTheme = 'dark';
        this.theme = JSON.parse(localStorage.getItem('theme')) || this.darkTheme;
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
    }
}