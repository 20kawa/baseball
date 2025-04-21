document.addEventListener('DOMContentLoaded', () => {
  const calendarGrid = document.querySelector('.calendar-grid');
  const tonightGamesElement = document.getElementById('tonightGames');

  const gamesForTonight = {
    'April 21, 2025': 'Team A vs Team B',
    'April 22, 2025': 'Team C vs Team D',
    // Add more games here for future dates
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const monthDays = endOfMonth.getDate();

  // Populate the calendar with days
  for (let i = 1; i <= monthDays; i++) {
    const day = new Date(currentYear, currentMonth, i);
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');
    cell.textContent = i;

    // Check if it's today
    if (day.toDateString() === currentDate.toDateString()) {
      cell.classList.add('today');
    }

    // Check if there is a game scheduled for this day
    const gameKey = `${currentMonth + 1} ${i}, ${currentYear}`;
    if (gamesForTonight[gameKey]) {
      cell.classList.add('game-day');
      cell.addEventListener('click', () => {
        alert(`Tonight's Game: ${gamesForTonight[gameKey]}`);
      });
    }

    calendarGrid.appendChild(cell);
  }

  // Show tonight's games
  const tonightKey = `${currentMonth + 1} ${currentDate.getDate()}, ${currentYear}`;
  if (gamesForTonight[tonightKey]) {
    tonightGamesElement.textContent = gamesForTonight[tonightKey];
  } else {
    tonightGamesElement.textContent = 'No games scheduled.';
  }