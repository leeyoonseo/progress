/**
 * 로딩 바 UI
 * @author Lee Yoon Seo (2019.09)
 * @version 1.0.0
 * @see CheckBrowser-2.0.0.js
 * @support Chrome | fireFox | Edge | Safari | Opera
 */
window.ProgressBar = {
    name : "ProgressBar",
    version : "1.0.0",
};

window.ProgressBar = function(){
    this.name = "ProgressBar",
    this.version = "1.0.0";
};

/**
 * Circle 로딩 바
 * @constructor ProgressBar
 * @param {String} element circle이 그려질 부모 id나 class
 */
ProgressBar.prototype.Circle = {
    constructor : ProgressBar,

    options : {
        element : '.pie_wrap',
    },

    init : function(options){
        this.options = $.extend({}, this.options, options);
        this.element = $(this.options.element);
        this.progress;
        this.left;
        this.right;

        this.pointer = this.element.find('.pie_pointer');
        this.progress = this.element.find('.pie');

        this.left = this.createHalfCircle();
        this.right = this.createHalfCircle();

        this.progress.empty().append([this.left, this.right]);

        this.draw(0);

        return this;
    },

    draw : function(deg){
        this.clipBoundary(deg);
        this.rotate(deg);

        return this;
    },

    reset : function(){
        this.draw(0);

        return this;
    },

    createHalfCircle : function(){
        return $('<div></div>').prop({'class' : 'half-circle'})
                               .css({'transform' : 'rotate(0)'});
    },

    rotate : function(deg){
        if(deg < 0) return;

        this.left.css('transform', 'rotate('+ ((deg > 180) ? deg : 0) +'deg)');
        this.right.css('transform', 'rotate('+ ((deg > 180) ? 180 : deg) + 'deg)');
        this.pointer.css('transform', 'rotate('+ deg + 'deg');
        
        return this;
    },

    /**
     * half-circle를 회전 시키기 위한 스타일을 추가하는 함수
     * @param {Number} deg 회전 시키는 각도 값
     */
    clipBoundary : function(deg){
        this.progress.css((deg > 180) ? {'clip': 'rect(auto auto auto auto)'} // full
                                  : {'clip': 'rect(0 1em 1em 0.5em)'}); // half
    
        return this;
    },
};

// /**
//  * Linear 로딩 바
//  * @constructor ProgressBar
//  * @param {Object} options 바 생성에 필요한 엘리먼트들
//  */
// ProgressBar.Linear = function(options){
//     this.name = "ProgressBar.Linear";

//     this.options = $.extend(true, {
//         wrap : '.rec_box',
//         progress : '.rec_bar_played',
//         thumb : '.rec_bar_pointer',
//         bar : '.rec_bar'
//     }, options);

//     this.wrap = (typeof this.options.wrap === 'string') ? $(this.options.wrap) : this.options.wrap;

//     var isTouch = CheckBrowser.isTouchScreen;
//     var progress = this.wrap.find(this.options.progress).get(0);
//     var bar = this.wrap.find(this.options.bar);
//     var thumbRadius = this.wrap.find(this.options.thumb).outerWidth() / 2;

//     /**
//      * 로딩 바 그리기
//      * @issue 로딩 바 밖으로 포인터가 노출되는 문제로 바의 너비에서 포인터의 반지름을 제하기 위하여 값을 계산하여 리턴
//      * @param {Number} currentW 그려져야할 width 값
//      */
//     this.draw = function(currentW){
//         $(progress).width((currentW + thumbRadius) + 'px');
//     };

//     /**
//      * 로딩 바 이벤트
//      * @issue 로딩 바 밖으로 포인터가 노출되는 문제로 바의 너비에서 포인터의 반지름을 제하기 위하여 값을 계산하여 리턴
//      * @param {Object} e 로딩 바 event
//      * @param {Object} audio 제어 할 오디오
//      */
//     this.input = function(e, audio){
//         if (audio.duration == 'Infinity') {
//             return;
//         }
//         var theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
//         var x = (theRealEvent.pageX - $(bar).offset().left);

//         audio.currentTime = Math.round(audio.duration * x / $(bar).outerWidth());
//     };

//     this.reset = function(){
//         this.draw(0);
//     };

//     function init(){
//         this.draw(0);
//     }

//     init.call(this);

//     return {
//         el : this.element,
//         draw : this.draw,
//         input : this.input,
//         reset : this.reset
//     }
// };