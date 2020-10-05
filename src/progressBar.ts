class Progress {

    private name = "ProgressBar";
    private version ="1.0.0";

    public element: HTMLElement;
    public pointer: HTMLElement;
    public progress: HTMLElement;

    // [TODO] private 넣어야하나?
     constructor(private options: { element: any }){
        const defaultOptions = {
            element: '.progress-bar',
        };

        this.options = {...defaultOptions, ...options};
        
        let { element } = this.options;

        if(typeof element === 'string'){
            element = document.querySelector(element);
        }

        this.pointer = element.querySelector('.progress-pointer');
        this.progress = element.querySelector('.progress');
        this.element = element;
    }

    reset(): object{
        this.draw(0);
        return this;
    }

    draw(percent: Number): object{
        this.progress.style.width = percent + '%';
        return this;
    }
}

class Circle extends Progress {
    private halfCircleLeft!: HTMLDivElement;
    private halfCircleRight!: HTMLDivElement;

    constructor(options: { element: any }){
        super(options);

        this.setUp();
    }

    setUp(): object{
        let halfCircleLeft = this.getHalfCircle();
        let halfCircleRight = this.getHalfCircle();

        this.halfCircleLeft = halfCircleLeft;
        this.halfCircleRight = halfCircleRight;

        this.progress.append(halfCircleLeft);
        this.progress.append(halfCircleRight);

        return this;
    }

    getHalfCircle(): HTMLDivElement{
        const half = document.createElement('div');
        half.classList.add('half-circle');
        half.style.transform = 'rotate(0)';

        return half;
    }

    draw(deg: Number): object{
        this.clipBoundary(deg);
        this.rotate(deg);

        return this;
    }

    clipBoundary(deg: Number): object{
        const clipStyle = (deg > 180) ? 'rect(auto auto auto auto)' : 'rect(0 1em 1em 0.5em)';
        this.progress.style.clip = clipStyle;

        return this;
    }
   
    rotate(deg: Number): object{
        const leftDeg = (deg > 180) ? deg : 0;
        const rightDeg = (deg > 180) ? 180 : deg;
        const { halfCircleLeft, halfCircleRight, pointer } = this;
        
        halfCircleLeft.style.transform = 'rotate('+ leftDeg +'deg)';
        halfCircleRight.style.transform = 'rotate('+ rightDeg +'deg)';
        pointer.style.transform = 'rotate('+ deg +'deg)';

        return this;
    }
};