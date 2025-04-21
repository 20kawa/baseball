// Game data structure (manually input games and scores)
const games = {
    '2025-04-05': [
        { teams: 'Pickle vs Apple', score: '5-3' },
        { teams: 'Ahhh vs Banana', score: '7-2' }
    ],
    '2025-04-10': [
        { teams: 'Team C vs Team D', score: '3-1' }
    ],
    '2025-04-12': [
        { teams: 'Team E vs Team F', score: '6-4' }
    ]
};

let currentMonth = 3; // April (0-based index: 0 = January, 1 = February, ...), April is 3
let currentYear = 2025;

function renderCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarGrid = document.getElementById('calendarGrid');
    monthYear.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Clear previous calendar grid
    calendarGrid.innerHTML = '';

    // Add empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += '<div class="day-cell"></div>';
    }

    // Add day cells for the month
    for (let day = 1; day <= lastDate; day++) {
        const dayDate = new Date(currentYear, currentMonth, day);
        const dateString = dayDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

        const cell = document.createElement('div');
        cell.classList.add('day-cell');
        cell.textContent = day;

        // Add games to the day cell if there are any
        if (games[dateString]) {
            games[dateString].forEach(game => {
                const gameElement = document.createElement('span');
                gameElement.classList.add('game');
                gameElement.textContent = `${game.teams} - ${game.score}`;
                cell.appendChild(gameElement);
            });
        }

        calendarGrid.appendChild(cell);
    }
}

function changeMonth(delta) {
    currentMonth += delta;

    if (currentMonth < 0) {
        currentMonth = 11; // Wrap to December
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0; // Wrap to January
        currentYear++;
    }

    renderCalendar();
}

// Event listeners for month navigation buttons
document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));

// Initial render
renderCalendar();
