/**
 * Sets the IDX results sidebar title from the saved-link path (/i/{slug}).
 * Loaded from idx-footer.html on sdcommunities.idxbroker.com.
 */
(function () {
  var TITLES = {
    general: "All San Diego Homes",
    military: "Homes Near San Diego Bases",
    "la-jolla": "Homes in La Jolla",
    "pacific-beach": "Homes in Pacific Beach",
    "university-city": "Homes in University City / UTC",
    clairemont: "Homes in Clairemont",
    "mission-valley": "Homes in Mission Valley",
    "del-mar": "Homes in Del Mar",
    "carmel-valley": "Homes in Carmel Valley",
    "point-loma": "Homes in Point Loma",
    "sorrento-valley": "Homes in Sorrento Valley",
    "bay-park": "Homes in Bay Park",
    "ocean-beach": "Homes in Ocean Beach",
    hillcrest: "Homes in Hillcrest",
    "north-park": "Homes in North Park",
  };

  function slugFromPath() {
    var match = window.location.pathname.match(/^\/i\/([^/?#]+)/i);
    return match ? match[1].toLowerCase() : null;
  }

  function resolveTitle() {
    var slug = slugFromPath();
    if (slug && TITLES[slug]) return TITLES[slug];
    return "Search Results";
  }

  function applyTitle() {
    var title = resolveTitle();
    var section = document.getElementById("idx-results-active-title");
    if (section) section.textContent = title;

    var heading = document.querySelector(".idx-results-total__heading");
    if (heading && slugFromPath()) {
      heading.textContent = title;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTitle);
  } else {
    applyTitle();
  }
})();
