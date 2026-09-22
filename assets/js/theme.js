// Theme toggle (issue #117). The inline script in _includes/head.html has
// already set data-theme before paint; this file wires up the header button
// and keeps the page in step with the OS setting and with other open tabs.
(function () {
  var STORAGE_KEY = "theme";
  var ORDER = ["light", "dark", "system"];
  var LABELS = { light: "Light", dark: "Dark", system: "System" };
  // Browser toolbar color on mobile. Light keeps the value the site always had.
  var THEME_COLORS = { light: "#424242", dark: "#1b1b1d" };

  var root = document.documentElement;
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var button = document.getElementById("theme-toggle");
  var themeColorMeta = document.getElementById("theme-color-meta");

  function readPref() {
    var pref;
    try { pref = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    return ORDER.indexOf(pref) === -1 ? "system" : pref;
  }

  function savePref(pref) {
    try { localStorage.setItem(STORAGE_KEY, pref); } catch (e) {}
  }

  // Held in memory too, so the toggle still cycles when storage is blocked.
  var currentPref = readPref();

  function applyTheme(pref) {
    currentPref = pref;
    var theme = pref === "system" ? (darkQuery.matches ? "dark" : "light") : pref;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-theme-pref", pref);
    if (themeColorMeta) themeColorMeta.setAttribute("content", THEME_COLORS[theme]);
    if (button) {
      var label = "Theme: " + LABELS[pref];
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    }
  }

  // Fade colors for a click only; see html.theme-transition in dark-theme.scss.
  var transitionTimer;
  function withTransition() {
    root.classList.add("theme-transition");
    clearTimeout(transitionTimer);
    transitionTimer = setTimeout(function () {
      root.classList.remove("theme-transition");
    }, 300);
  }

  if (button) {
    button.addEventListener("click", function () {
      var next = ORDER[(ORDER.indexOf(currentPref) + 1) % ORDER.length];
      savePref(next);
      withTransition();
      applyTheme(next);
    });
    button.hidden = false;
  }

  darkQuery.addEventListener("change", function () {
    if (currentPref === "system") applyTheme("system");
  });

  // Another tab changed the preference.
  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY) applyTheme(readPref());
  });

  applyTheme(currentPref);
})();
