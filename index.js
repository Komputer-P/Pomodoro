//ELEMENTS
const timer_display = document.querySelector('.timer_display');
const start_timer_button = document.querySelector('.start_timer_button');
const pomodoro_count_display = document.querySelector('.pomodoro_count');

let countdown;
let pomo = 0;

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
    let set_time_seconds = 25 * 60;

    timer(set_time_seconds);
}

//INIT
start_timer_button.addEventListener('click', timer_init);