export default class Slide{
    constructor(slide, wrapper){
        this.slide = document.querySelector(slide)
        this.wrapper = document.querySelector(wrapper);
    }
    onStart(e){
        e.preventDefault();
        this.wrapper.addEventListener('mousemove', this.onMove);

    }
    addSlideEvents(){
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
    }
    onMove(e){
        console.log('moveu');
        e.preventDefault();
    }
    onEnd(){
        this.wrapper.removeEventListener('mousemove', this.onMove);
    }
    bindEvents(){
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init(){
        this.bindEvents();
        this.addSlideEvents();
        return this;
    }
}