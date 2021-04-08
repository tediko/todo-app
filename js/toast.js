export default class Toast {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.hideTimeout = null;
        return true;
    }

    setupEvents() {
        this.createToastElement();
        this.toastEl.addEventListener('click', () => this.clear());
    }

    createToastElement() {
        this.toastEl = document.createElement('div');
        this.toastEl.className = "toast";
        this.toastEl.setAttribute('data-toast', 'true');
        document.body.appendChild(this.toastEl);
    }

    show(message, state) {
        clearTimeout(this.hideTimeout);

        this.toastEl.className = `toast toast--visible toast--${state}`;
        this.toastEl.innerHTML = `<i class="i-${state} toast__icon"></i> ${message}`;

        this.hideTimeout = setTimeout(() => {
            this.toastEl.classList.remove('toast--visible');
        }, 2000);
    }

    clear() {
        this.toastEl.classList.remove('toast--visible');
    }
}