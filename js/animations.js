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
    ]
};

let fadeIn = animations.fadeIn;
let fadeOut = animations.fadeOut;

// Fn to add animation to element with options
const addAnimation = (element, animation, options) => {
    return element.animate(animation, options);
}

export { fadeIn as animationFadeIn, fadeOut as animationFadeOut, addAnimation};