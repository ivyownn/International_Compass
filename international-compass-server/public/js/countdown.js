(function () {
  // Important Dates (static month/day, dynamic year)
  const today = new Date();
  const year = today.getFullYear();

  const summerBreakEnd = new Date(`${year}-08-15`);
  const fallStart = new Date(`${year}-08-25`);
  const winterStart = new Date(`${year}-12-15`);

  // Handle when today is after winter start → roll over to next year's winter
  if (today > winterStart) {
    summerBreakEnd.setFullYear(year + 1);
    fallStart.setFullYear(year + 1);
    winterStart.setFullYear(year + 1);
  }

  const countdownDiv = document.getElementById("countdown-aside");

  function daysBetween(date1, date2) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.ceil((date2 - date1) / msPerDay);
  }

  let message = "⏳ ";

  if (today < summerBreakEnd) {
    const daysLeft = daysBetween(today, summerBreakEnd);
    message += `${daysLeft} day${
      daysLeft !== 1 ? "s" : ""
    } until Summer Break Ends.`;
  } else if (today < fallStart) {
    const daysLeft = daysBetween(today, fallStart);
    message += `${daysLeft} day${
      daysLeft !== 1 ? "s" : ""
    } until Fall – Return to Campus!`;
  } else if (today < winterStart) {
    const daysLeft = daysBetween(today, winterStart);
    message += `${daysLeft} day${
      daysLeft !== 1 ? "s" : ""
    } until Winter Semester Begins!`;
  } else {
    message = "✅ You're all set for now! Check back later for updates.";
  }

  countdownDiv.textContent = message;

  // Add fade-in effect after content is set
  countdownDiv.classList.add("fade-in");
})();
