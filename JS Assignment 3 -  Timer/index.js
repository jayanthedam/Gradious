let timer_id;
let time_left;

function display() {
    const d_in = parseInt(document.getElementById("daysIn").value) || 0;
    const h_in = parseInt(document.getElementById("hoursIn").value) || 0;
    const m_in = parseInt(document.getElementById("minsIn").value) || 0;
    const s_in = parseInt(document.getElementById("secsIn").value) || 0;

    time_left = (d_in * 86400) + (h_in * 3600) + (m_in * 60) + s_in;
    updateDisplay();
}

function setTimer() {
    clearInterval(timer_id);
    display();
}

function updateDisplay() {
    const d_out = Math.floor(time_left / 86400);
    const h_out = Math.floor((time_left % 86400) / 3600);
    const m_out = Math.floor((time_left % 3600) / 60);
    const s_out = time_left % 60;

    document.getElementById("days").textContent = d_out.toString().padStart(2, "0");
    document.getElementById("hours").textContent = h_out.toString().padStart(2, "0");
    document.getElementById("mins").textContent = m_out.toString().padStart(2, "0");
    document.getElementById("secs").textContent = s_out.toString().padStart(2, "0");
}

function start() {
    if (!timer_id) {
        timer_id = setInterval(() => {
            if (time_left > 0) {
                time_left--;
                updateDisplay();
            } else clearInterval(timer_id);
        }, 1000);
    }
}

function stop() {
    clearInterval(timer_id);
    timer_id = null;
}

function reset() {
    clearInterval(timer_id);
    timer_id = null;
    document.getElementById("daysIn").value = "0";
    document.getElementById("hoursIn").value = "0";
    document.getElementById("minsIn").value = "0";
    document.getElementById("secsIn").value = "0";
    time_left = 0;
    updateDisplay();
}
