//ELEMENTS
const timer_display = document.querySelector('.timer_display');
const start_timer_button = document.querySelector('.start_timer_button');
const pomodoro_count_display = document.querySelector('.pomodoro_count');
const timer_set_form = document.querySelector('.timer_set_form');
const break_time_display = document.querySelector('.break_time_display');
const theme_switch = document.querySelector('input[type=checkbox]');
const navigation = document.querySelector('.navigation');
const navigators = document.querySelectorAll('.navigator');
const body = document.querySelector('body');
const footer = document.querySelector('.footer');
const timer_set_display = document.querySelector('.timer_set_display');

let countdown;
let pomo = 0;
let time_set = 0;
const break_time = 5 * 60;

//FLAGS
let dark_theme = false;
let is_break_time = false;
let timer_active = false;

//FUNCTIONS


//EVENT LISTENERS
function timer(seconds) {
    clearInterval(countdown);
    timer_active = true;

    const start_time = Date.now();
    const end_time = start_time + seconds * 1000;
        
    countdown = setInterval(() => {
        const seconds_left = Math.round((end_time-Date.now()) / 1000); //more accurate way

        if(seconds_left < 0) {
            clearInterval(countdown);

            if(is_break_time) { //if timer was break time timer
                is_break_time = false;
                timer_active = false;

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
    
    timer_display.innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${remainder_seconds < 10 ? '0' : ''}${remainder_seconds}`; 
}

function update_pomo() {
    pomo = pomo + 1;
    localStorage.setItem('pomo', pomo);
    pomodoro_count_display.innerHTML = `${pomo} Pomo Done Today!`;
}

function init() {
    const today_date = JSON.parse(localStorage.getItem('date')) || [];
    const date = new Date();
    const now_date = [ date.getFullYear(), date.getMonth(), date.getDate() ];

    if(today_date == [] || today_date[0] != now_date[0] || today_date[1] != now_date[1] || today_date[2] != now_date[2]) { //if date is different
        pomo = 0;
        localStorage.setItem('pomo', pomo);
        localStorage.setItem('date', JSON.stringify(now_date));

        time_set = 25 * 60;
        localStorage.setItem('time_set', time_set);
        localStorage.setItem('date', JSON.stringify(now_date));
    }
    else { //if date is same
        pomo = parseInt(localStorage.getItem('pomo'));

        time_set = parseInt(localStorage.getItem('time_set'));
    }
    
    pomodoro_count_display.innerHTML = `${pomo} Pomo Done Today!`;
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
    localStorage.setItem('time_set',time_set);

    if(!timer_active) {
        display_time_left(time_set);
    }
    
    timer_set_display.innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function theme_toggle() {
    navigation.classList.toggle("dark");
    body.classList.toggle("dark");
    footer.classList.toggle("dark");

    dark_theme = !dark_theme;   
}

function scroll_navigation() {
    if(this.classList.contains("to_front")) {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    }
    else if(this.classList.contains("to_preference")) {
        element_to_scroll = document.querySelector('.preference');
        scroll_to(element_to_scroll);
    }
}

function scroll_to(element_to_scroll) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element_to_scroll.offsetTop - parseInt(getComputedStyle(element_to_scroll).marginTop)
    });
}

//INIT
start_timer_button.addEventListener('click', timer_start);
timer_set_form.addEventListener('submit',timer_set);
theme_switch.addEventListener('click', theme_toggle);
navigators.forEach(navigator => navigator.addEventListener('click', scroll_navigation));

init();