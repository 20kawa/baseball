const games = {
    '2025-04-05': [
        { teams: 'Pickle vs Apple', score: '3 - 4' },
        { teams: 'Ahhh vs Banana', score: '1 - 5' }
    ],
    '2025-04-10': [
        { teams: 'Team C vs Team D', score: '7 - 2' }
    ],
    '2025-04-12': [
        { teams: 'Team E vs Team F', score: '9 - 6' }
    ],
    // Add more games here
};

let currentMonth = 3; // April (0-based index)
let currentYear = 2025;

function renderCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarGrid = document.getElementById('calendarGrid');

    monthYear.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    // Empty cells before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += '<div class="day-cell"></div>';
    }

    // Add the day cells
    for (let day = 1; day <= lastDate; day++) {
        const dayDate = new Date(currentYear, currentMonth, day);
        const dateString = dayDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

        const cell = document.createElement('div');
        cell.classList.add('day-cell');
        cell.textContent = day;

        if (games[dateString]) {
            cell.classList.add('game');

            // Add game details
            let gameDetails = '<div class="games-list">';
            games[dateString].forEach(game => {
                gameDetails += `<span>${game.teams} - ${game.score}</span>`;
            });
            gameDetails += '</div>';

            cell.innerHTML = `${day} ${gameDetails}`;
        }

        calendarGrid.appendChild(cell);
    }
}

function changeMonth(delta) {
    currentMonth += delta;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
}

document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));

renderCalendar();
