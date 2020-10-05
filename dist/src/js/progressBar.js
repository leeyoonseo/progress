"use strict";
class Progress {
    // [TODO] private 넣어야하나?
    constructor(options) {
        this.options = options;
        this.name = "ProgressBar";
        this.version = "1.0.0";
        const defaultOptions = {
            element: '.progress-bar',
        };
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
        let { element } = this.options;
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        this.pointer = element.querySelector('.progress-pointer');
        this.progress = element.querySelector('.progress');
        this.element = element;
    }
    reset() {
        this.draw(0);
        return this;
    }
    draw(percent) {
        this.progress.style.width = percent + '%';
        return this;
    }
}
class Circle extends Progress {
    constructor(options) {
        super(options);
        this.setUp();
    }
    setUp() {
        let halfCircleLeft = this.getHalfCircle();
        let halfCircleRight = this.getHalfCircle();
        this.halfCircleLeft = halfCircleLeft;
        this.halfCircleRight = halfCircleRight;
        this.progress.append(halfCircleLeft);
        this.progress.append(halfCircleRight);
        return this;
    }
    getHalfCircle() {
        const half = document.createElement('div');
        half.classList.add('half-circle');
        half.style.transform = 'rotate(0)';
        return half;
    }
    draw(deg) {
        this.clipBoundary(deg);
        this.rotate(deg);
        return this;
    }
    clipBoundary(deg) {
        const clipStyle = (deg > 180) ? 'rect(auto auto auto auto)' : 'rect(0 1em 1em 0.5em)';
        this.progress.style.clip = clipStyle;
        return this;
    }
    rotate(deg) {
        const leftDeg = (deg > 180) ? deg : 0;
        const rightDeg = (deg > 180) ? 180 : deg;
        const { halfCircleLeft, halfCircleRight, pointer } = this;
        halfCircleLeft.style.transform = 'rotate(' + leftDeg + 'deg)';
        halfCircleRight.style.transform = 'rotate(' + rightDeg + 'deg)';
        pointer.style.transform = 'rotate(' + deg + 'deg)';
        return this;
    }
}
;
//# sourceMappingURL=progressBar.js.map