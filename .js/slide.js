export default class Slide{
    constructor(slide, wrapper){
        this.slide = document.querySelector(slide)
        this.wrapper = document.querySelector(wrapper);
        this.dist = { finalPosition: 0, startX: 0, movement: 0 }
    }
    onStart(e){
        e.preventDefault();
        this.dist.startX = e.clientX;
        this.wrapper.addEventListener('mousemove', this.onMove);

    }
    addSlideEvents(){
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
    }
    onMove(e){
        e.preventDefault();
        const finalPosition = this.updatePosition(e.clientX);
        this.moveSlide(finalPosition);

    }
    onEnd(){
        this.wrapper.removeEventListener('mousemove', this.onMove);
        this.dist.finalPosition = this.dist.movePosition;
    }
    bindEvents(){
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    updatePosition(clientX){
        this.dist.movement = (this.dist.startX - clientX) * 1.6;
        return  this.dist.finalPosition - this.dist.movement;
    }

    moveSlide(distX){
        this.dist.movePosition = distX;
        this.slide.style.transform = `translate3d( ${distX}px, 0, 0)`;
    }

    init(){
        this.bindEvents();
        this.addSlideEvents();
        return this;
    }
}