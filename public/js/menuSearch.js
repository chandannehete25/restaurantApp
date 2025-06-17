document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchInput");
    const tableBody = document.getElementById("menuBody");
  
    let timer;
  
    input.addEventListener("input", function () {
      const query = this.value;
  
      // Debounce: Wait 300ms after typing stops
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetch(`/menu/search?search=${encodeURIComponent(query)}`)
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newBody = doc.getElementById("menuBody");
            tableBody.innerHTML = newBody.innerHTML;
          })
          .catch(err => {
            console.error("Search error:", err);
            tableBody.innerHTML = `<tr><td colspan="6">Error fetching results</td></tr>`;
          });
      }, 300); // Delay in milliseconds
    });
  });
  