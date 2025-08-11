// 📐 Keep resize logic separate — it works after everything is rendered
function setTopPad() {
  const navHeight = document.querySelector(".fixed-top")?.offsetHeight || 0;
  document.querySelector(".content-wrapper").style.paddingTop =
    navHeight + "px";
}
window.addEventListener("resize", setTopPad);

document.addEventListener("DOMContentLoaded", function () {
  // --- Load Header ---
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;
      setTopPad();

      // --- Active Nav Link Logic ---
      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = document.querySelectorAll("#main-nav .nav-link");
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        }
      });

      // --- Set Place Name in Header ---
      const title = document.title;
      const parts = title.split(" - ");
      if (parts.length > 1) {
        const placeName = parts[1];
        const placeNameElement = document.getElementById("place-name");
        if (placeNameElement) {
          // Use a template literal for better readability and handle potential null/undefined values.
          placeNameElement.textContent = `\u00A0\u00A0\u00A0\u00A0${
            placeName || ""
          }`;
        }
      }
    });

  // --- Load Footer ---
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
});
