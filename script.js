// Example Game Data (You would ideally fetch this from a database or an API)
const games = {
  "2025-04-21": {
    time: "7:00 PM",
    teams: "Team A vs Team B",
    location: "Stadium X"
  },
  "2025-04-22": {
    time: "3:00 PM",
    teams: "Team C vs Team D",
    location: "Stadium Y"
  },
  // Add more games here
};

// Function to generate the calendar days dynamically
function renderCalendar(month, year) {
  const calendarGrid = document.querySelector(".calendar-grid");
  calendarGrid.innerHTML = ""; // Clear the grid before rendering
  
  const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in month
  const firstDay = new Date(year, month - 1, 1).getDay(); // Get day of the week of the first day of the month
  
  let dayCounter = 1;
  
  // Add empty cells for days before the 1st day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-cell");
    calendarGrid.appendChild(emptyCell);
  }

  // Add actual days to the calendar
  for (let day = firstDay; day < firstDay + daysInMonth; day++) {
    const date = `${year}-${month < 10 ? '0' + month : month}-${dayCounter < 10 ? '0' + dayCounter : dayCounter}`;
    
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-cell");
    dayCell.innerHTML = dayCounter;
    
    // Check if there are games scheduled for this day
    if (games[date]) {
      dayCell.classList.add("game-day"); // You can add a CSS class to highlight the day
      dayCell.setAttribute("title", `${games[date].teams} at ${games[date].location} at ${games[date].time}`);
    }

    dayCell.onclick = () => showGameDetails(date); // Show game details on click
    calendarGrid.appendChild(dayCell);
    dayCounter++;
  }
}

// Show game details in the header when a day is clicked
function showGameDetails(date) {
  const gameDetails = games[date];
  if (gameDetails) {
    document.getElementById('tonightGames').innerText = `${gameDetails.teams} at ${gameDetails.location} at ${gameDetails.time}`;
  } else {
    document.getElementById('tonightGames').innerText = "No games scheduled.";
  }
}

// Initialize the calendar for April 2025
renderCalendar(4, 2025);
