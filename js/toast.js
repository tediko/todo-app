export const Toast = {
    init() {
        this.hideTimeout = null;

        this.el = document.createElement('div');
        this.el.className = "toast";
        this.el.setAttribute('data-toast', 'true');
        document.body.appendChild(this.el);
    },

    show(message, state) {
        clearTimeout(this.hideTimeout);

        this.el.className = `toast toast--visible toast--${state}`;
        this.el.innerHTML = `<i class="i-${state} toast__icon"></i> ${message}`;

        this.hideTimeout = setTimeout(() => {
            this.el.classList.remove('toast--visible');
        }, 2000);
    },

    clear() {
        this.el.classList.remove('toast--visible');
    }
};