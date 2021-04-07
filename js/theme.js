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

        this.lightTheme = 'light';
        this.darkTheme = 'dark';
        return true;
    }

    setupEvents() {
        this.themeSwitch.addEventListener('click', () => this.themeToggle());
    }

    themeToggle() {
        this.activeTheme = this.body.dataset.theme;

        this.activeTheme == this.lightTheme ? 
            this.body.dataset.theme = this.darkTheme :
            this.body.dataset.theme = this.lightTheme;

        this.iconToggle(this.icons, this.activeTheme);
        this.backgroundToggle(this.backgrounds, this.activeTheme);
    }

    iconToggle(icons, activeTheme) {
        this.icons.forEach(icon => {
            this.activeIconTheme = icon.dataset.themeIcon;

            this.activeIconTheme != this.activeTheme ?
                icon.classList.add('active') :
                icon.classList.remove('active');
        })
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