const progressCircle = document.querySelectorAll('.box-circle .progress-circle')
const progressLinear = document.querySelectorAll('.box-linear .progress-linear')
const timerProgressCircle = document.querySelector('.box-timer .progress-circle');
const timerProgressCircleEl = new Circle({ element : timerProgressCircle });
const timerProgressLinear = document.querySelector('.box-timer .progress-linear');
const timerProgressLinearEl = new Progress({ element : timerProgressLinear });
let timerCircleCount = 0;
let timerLinearCount = 0;

Array.from(progressCircle).map((obj) => {
    const { progress } = obj.dataset;
    new Circle({ element : obj }).draw(progress);
});

Array.from(progressLinear).map((obj) => {
    const { progress } = obj.dataset;
    new Progress({ element : obj }).draw(progress);
});

timer(360, timerCircleCount, timerProgressCircleEl);
timer(100, timerLinearCount, timerProgressLinearEl);

function timer(max, currentCount, el){
    setInterval(() => {
        if(currentCount === max) currentCount = 0;
        
        el.draw(currentCount);
        currentCount++;
    }, 50);
}