const Toast = {
    init() {
        this.hideTimeout = null;

        this.el = document.createElement('div');
        this.el.className = "toast";
        document.body.appendChild(this.el);
    },

    show(message, state) {
        clearTimeout(this.hideTimeout);

        this.el.className = `toast toast--visible toast--${state}`;
        this.el.innerHTML = `<i class="i-warning toast__icon"></i> ${message}`;

        this.hideTimeout = setTimeout(() => {
            this.el.classList.remove('toast--visible');
        }, 3000);
    },

    clear() {
        this.el.classList.remove('toast--visible');
    }


};

document.addEventListener('DOMContentLoaded', () => Toast.init());