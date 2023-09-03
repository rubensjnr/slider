export default class Slide{
    constructor(slide, wrapper){
        this.slide = document.querySelector(slide)
        this.wrapper = document.querySelector(wrapper);
        this.dist = { finalPosition: 0, startX: 0, movement: 0 }
    }
    onStart(e){
        let moveype;
        if(e.type === 'mousedown'){
            e.preventDefault();
            this.dist.startX = e.clientX;
            moveype = 'mousemove';
        } else {
            this.dist.startX = e.changedTouches[0].clientX;
            moveype = 'touchmove';
        }

        this.wrapper.addEventListener(moveype, this.onMove);

    }
    addSlideEvents(){
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchstart', this.onStart);
        this.wrapper.addEventListener('touchend', this.onEnd);
    }
    onMove(e){
        const pointerPosition = (e.type === 'mousemove') ? e.clientX : e.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointerPosition);
        this.moveSlide(finalPosition);

    }
    onEnd(e){
        const moveType = (e.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(moveType, this.onMove);
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

    slidePosition(slide){
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth)/2;
        return -(slide.offsetLeft - margin);
    }

    //slides config
    slidesConfig(){
        this.slideArray = [...this.slide.children].map((element) =>{
            const position = this.slidePosition(element);
            return { position, element }
        })
    }
    
    slideIndexNav(index){
        const last = this.slideArray.length - 1;
        this.index = {
            prev: index ? index - 1 : undefined,
            active: index,
            next: index === last ? undefined : index + 1
        }
    }

    changeSlide(index){
        const activeSlide = this.slideArray[index];
        this.moveSlide(this.slideArray[index].position);
        this.slideIndexNav(index);
        this.dist.finalPosition = activeSlide.position;
    }


    init(){
        this.bindEvents();
        this.addSlideEvents();
        this.slidesConfig();
        return this;
    }
}