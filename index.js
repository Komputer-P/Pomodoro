//ELEMENTS
const timer_display = document.querySelector('.timer_display');
const start_timer_button = document.querySelector('.start_timer_button');
const pomodoro_count_display = document.querySelector('.pomodoro_count');
const timer_set_form = document.querySelector('.timer_set_form');

let countdown;
let pomo = 0;
let time_set = 25 * 60;

//FUNCTIONS


//EVENT LISTENERS
function timer(seconds) {
    clearInterval(countdown);
    
    const start_time = Date.now();
    const end_time = start_time + seconds * 1000;
        
    countdown = setInterval(() => {
        const seconds_left = Math.round((end_time-Date.now()) / 1000); //more accurate way

        if(seconds_left < 0) {
            clearInterval(countdown);
            update_pomo();
            return;
        }
        
        display_time_left(seconds_left);
    }, 1000);
}

function display_time_left(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder_seconds = seconds % 60;
    
    const time_display = `${minutes < 10 ? '0' : ''}${minutes}:${remainder_seconds < 10 ? '0' : ''}${remainder_seconds}`;

    timer_display.innerHTML = time_display;
}

function update_pomo() {
    pomo = pomo + 1;
    pomodoro_count_display.innerHTML = `${pomo} Pomo Done Today!`;
}

function timer_init() {
    display_time_left(time_set);
}

function timer_start() {
    timer(time_set);
}

function timer_set(e) {
    e.preventDefault();
    
    const time_string = this.querySelector('.timer_set_text').value;
    this.querySelector('.timer_set_text').value = "";

    const time_parsed = time_string.split(':');
    const minutes = parseInt(time_parsed[0]);
    const seconds = parseInt(time_parsed[1]);
    console.log(minutes);
    time_set = minutes * 60 + seconds;

    timer_init();
}

//INIT
start_timer_button.addEventListener('click', timer_start);
timer_set_form.addEventListener('submit',timer_set);
timer_init();