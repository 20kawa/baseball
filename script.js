const games = {
    '2025-04-05': [
        { teams: 'Pickle vs Apple', score: '2 - 3' },
        { teams: 'Ahhh vs Banana', score: '1 - 4' }
    ],
    '2025-04-10': [
        { teams: 'Team C vs Team D', score: '5 - 6' }
    ],
    '2025-04-12': [
        { teams: 'Team E vs Team F', score: '3 - 2' }
    ],
    // Add more games as needed
};

let currentMonth = 3; // April (0-based index: 0 = January, 1 = February, ...)
let currentYear = 2025;

function renderCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarGrid = document.getElementById('calendarGrid');

    // Set the month and year in the header
    monthYear.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

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

        if (games[dateString]) {
            games[dateString].forEach(game => {
                const gameElement = document.createElement('div');
                gameElement.classList.add('game');
                gameElement.textContent = game.teams;

                const scoreElement = document.createElement('div');
                scoreElement.classList.add('score');
                scoreElement.textContent = game.score;

                cell.appendChild(gameElement);
                cell.appendChild(scoreElement);
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

// Initial render
renderCalendar();
