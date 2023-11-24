/**
 * The Background class manages the DOM elements for the dynamic,
 * animated background for the Loading Screen.
 */
export default class Background {
    constructor() {
        document.querySelectorAll('.background__item').forEach(
            this.registerBackgroundEvents.bind(this)
        );
    }

    /**
     * Attaches an event listener for the animationend event to the given element.
     *
     * @param {Element} element
     */
    registerBackgroundEvents(element) {
        element.addEventListener('animationend',
            this.handleBackgroundAnimationendEvent.bind(this)
        );
    }

    /**
     * Handle the animationend event of a single background item
     *
     * This event is fired when the CSS animation of an element is done playing.
     * It won't be fired if the animation has been cancelled or when the
     * element was removed from the DOM.
     *
     * @param {AnimationEvent} event
     */
    handleBackgroundAnimationendEvent(event) {
        event.target.parentNode.appendChild(event.target);
    }
}
