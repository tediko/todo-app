// Object with animations keyframes
let animations = {
    fadeIn: [
        {
            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: 'top'
        },
        {
            opacity: 1,
            transform: 'scaleY(1)',
        }
    ],
    fadeOut: [
        {
            transform: 'translate(0)',
            opacity: 1,
        },
        {
            transform: 'translate(-100px)',
            opacity: 0
        },
        {
            transform: 'translateY(-100px)',
            opacity: 0,
            height: 0
        }
    ],
    toastIn: [
        {
            transform: 'translateY(20px)',
            opacity: 0,
        },
        {
            opacity: 0
        },
        {
            transform: 'translateY(0)',
            opacity: 1,
            visibility: 'visible'
        }
    ],
    toastOut: [
        {
            transform: 'translateX(0)',
            opacity: 1,
            visibility: 'visible'
        },
        {
            transform: 'translateX(-50px)',
            opacity: 0,
            visibility: 'hidden'
        }
    ],
};

let fadeIn = animations.fadeIn;
let fadeOut = animations.fadeOut;
let toastIn = animations.toastIn;
let toastOut = animations.toastOut;

// Fn to add animation to element with options
const addAnimation = (element, animation, options) => {
    return element.animate(animation, options);
}

export { fadeIn as animationFadeIn, fadeOut as animationFadeOut, toastIn as animationToastIn, toastOut as animationToastOut, addAnimation};