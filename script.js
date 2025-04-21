const games = {
  // Use the correct date and game names you want to display
  '2025-04-05': ['pickle vs apple', 'ahhh vs banana'],
  '2025-04-10': ['Team C vs Team D'],
  '2025-04-12': ['Team E vs Team F'],
  // Add more games as needed
};

let currentMonth = 3; // April (0-based index: 0 = January, 1 = February, ...)
let currentYear = 2025;

function renderCalendar() {
  const monthYear = document.getElementById('monthYear');
  const calendarGrid = document.getElementById('calendarGrid');

  // Set the month and year in the header
  monthYear.textContent = `Game Schedule - ${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

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
      const gameList = document.createElement('ul');
      games[dateString].forEach(game => {
        const gameItem = document.createElement('li');
        gameItem.textContent = game; // Add each game as a list item
        gameList.appendChild(gameItem);
      });
      cell.appendChild(gameList); // Append the game list to the day cell
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

function showGamesForTonight() {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const tonightGames = games[today]; // Get the games for today from the games object

  const tonightGamesElement = document.getElementById('tonightGames');
  if (tonightGames) {
    // Join the games and display them
    tonightGamesElement.textContent = tonightGames.join(', '); 
  } else {
    tonightGamesElement.textContent = 'No games today.'; // If no games are scheduled for today
  }
}

// Initial render
renderCalendar();
showGamesForTonight();
