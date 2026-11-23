const buttons = {
  monthly: document.getElementById("monthly"),
  yearly: document.getElementById("yearly")
};

const swappable = document.querySelectorAll("[data-monthly][data-yearly]");
const status = document.getElementById("status");

function setPeriod(period, announce) {
  // Replace every price, unit label and note with its monthly or yearly value
  swappable.forEach(function (el) {
    el.textContent = el.dataset[period];

    // Replay the small "pop" animation on prices (CSS turns it off for reduced motion)
    if (el.classList.contains("price")) {
      el.classList.remove("swap");
      void el.offsetWidth;   // restart the animation
      el.classList.add("swap");
    }
  });

  // Update the toggle buttons
  Object.keys(buttons).forEach(function (key) {
    buttons[key].setAttribute("aria-pressed", String(key === period));
    buttons[key].classList.toggle("active", key === period);
  });

  // Tell screen readers what changed (not on first load)
  if (announce) {
    status.textContent = "Showing " + period + " prices.";
  }
}

buttons.monthly.addEventListener("click", function () { setPeriod("monthly", true); });
buttons.yearly.addEventListener("click", function () { setPeriod("yearly", true); });

setPeriod("monthly", false);
