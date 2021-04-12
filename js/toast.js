import { animationToastIn, animationToastOut, addAnimation } from './animations.js';

export default class Toast {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.index = 0;
        return true;
    }

    setupEvents() {
        this.createToastWrapper();
        this.toastWrapper.addEventListener('click', () => this.clear());
    }

    createToastWrapper() {
        this.toastWrapper = document.createElement('div');
        this.toastWrapper.className = 'toast';
        document.body.appendChild(this.toastWrapper);
    }

    createToastElement() {
        this.index++; 

        this.toastEl = document.createElement('div');
        this.toastEl.className = "toast__item";
        this.toastEl.setAttribute('data-toast', `${this.index}`)
        this.toastWrapper.appendChild(this.toastEl);
        
        let element = document.querySelector(`[data-toast="${this.index}"]`);
        this.anim(element);
        
        if (this.toastWrapper.childNodes.length > 2) {
            this.toastWrapper.removeChild(this.toastWrapper.firstChild);
        }

    }

    anim(element) {
        let toastIn = addAnimation(element, animationToastIn, {
            duration: 600,
            fill: 'forwards'
        }); 
    
        setTimeout(() => {
            toastIn.cancel();

            let toastOut = addAnimation(element, animationToastOut, {
                duration: 600,
                fill: 'forwards'
            }); 
            
            toastOut.onfinish = () => {
                element.remove();
            }
            
        }, 2000);
    }

    show(message, state) {
        this.createToastElement();

        this.toastEl.className = `toast__item toast__item--${state}`;
        this.toastEl.innerHTML = `<i class="i-${state} toast__item-icon"></i> ${message}`;
    }

    clear() {
        this.toastWrapper.removeChild(this.toastWrapper.firstChild);
    }
}