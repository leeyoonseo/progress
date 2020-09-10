class Progress {

    private name = "ProgressBar";
    private version ="1.0.0";
    public pointer: HTMLElement;
    public progress: HTMLElement;

    // [TODO] private 넣어야하나?
     constructor(private options: { element : string | object }){
        const defaultOptions = { element : '.progress-bar' };
        this.options = {...defaultOptions, ...options};
        
        let el = this.options.element;
        el = (typeof el === 'string') ? document.querySelector(el) as HTMLElement : el;

        this.pointer = el.getElementsByClassName('progress-pointer')[0];
        this.progress = el.getElementsByClassName('progress')[0];
    }

    reset(){
        this.draw(0);
        return this;
    }

    draw(percent){
        this.progress.style.width = percent + '%';
        return this;
    }
}

class Circle extends Progress {
    constructor(options){
        super(options);

        this.halfCircleLeft;
        this.halfCircleRight;

        this.setUp();

        return this;
    }

    setUp(){
        this.halfCircleLeft = this.getHalfCircle();
        this.halfCircleRight = this.getHalfCircle();

        this.progress.append(this.halfCircleLeft);
        this.progress.append(this.halfCircleRight);

        return this;
    }

    getHalfCircle(){
        const half = document.createElement('div');
        half.classList.add('half-circle');
        half.style.transform = 'rotate(0)';

        return half;
    }

    draw(deg){
        this.clipBoundary(deg);
        this.rotate(deg);

        return this;
    }

    clipBoundary(deg){
        const clipStyle = (deg > 180) ? 'rect(auto auto auto auto)' : 'rect(0 1em 1em 0.5em)';
        this.progress.style.clip = clipStyle;

        return this;
    }
   
    rotate(deg){
        const leftDeg = (deg > 180) ? deg : 0;
        const rightDeg = (deg > 180) ? 180 : deg;
        const { halfCircleLeft, halfCircleRight, pointer } = this;
        
        halfCircleLeft.style.transform = 'rotate('+ leftDeg +'deg)';
        halfCircleRight.style.transform = 'rotate('+ rightDeg +'deg)';
        pointer.style.transform = 'rotate('+ deg +'deg)';

        return this;
    }
};