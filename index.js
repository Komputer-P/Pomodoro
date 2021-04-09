//ELEMENTS
const timer_display = document.querySelector('.timer_display');
const start_timer_button = document.querySelector('.start_timer_button');
const pomodoro_count_display = document.querySelector('.pomodoro_count');
const timer_set_form = document.querySelector('.timer_set_form');
const break_time_display = document.querySelector('.break_time_display');
const theme_switch = document.querySelector('input[type=checkbox]');
const navigation = document.querySelector('.navigation');
const body = document.querySelector('body');
const footer = document.querySelector('.footer');

let countdown;
let pomo = 0;

let time_set = 25 * 60;
let is_break_time = false;
const break_time = 5 * 60;

let dark_theme = false;

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

            if(is_break_time) { //if timer was break time timer
                is_break_time = false;
                break_time_display.innerHTML = "";
                update_pomo();
                
            } else {
                is_break_time = true;
                break_time_display.innerHTML = "BREAK TIME!";
                timer(break_time);
            }
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
    const textField = this.querySelector('.timer_set_text');
    const time_string = this.querySelector('.timer_set_text').value;
    textField.value = "";

    if(!RegExp("[0-9][0-9]:[0-9][0-9]").test(time_string)) { //if not in correct format
        textField.placeholder = "Set Proper Time!";
        return;
    }

    const time_parsed = time_string.split(':');
    const minutes = parseInt(time_parsed[0]);
    const seconds = parseInt(time_parsed[1]);

    time_set = minutes * 60 + seconds;

    timer_init();
}

function theme_toggle() {
    navigation.classList.toggle("dark");
    body.classList.toggle("dark");
    footer.classList.toggle("dark");

    dark_theme = !dark_theme;   
}

//INIT
start_timer_button.addEventListener('click', timer_start);
timer_set_form.addEventListener('submit',timer_set);
theme_switch.addEventListener('click', theme_toggle);
timer_init();