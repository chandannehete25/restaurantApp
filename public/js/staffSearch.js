document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("staffSearchInput");
    const tableBody = document.getElementById("staffTableBody");
  
    let timer;
    input.addEventListener("input", () => {
      clearTimeout(timer);
      const query = input.value.trim();
  
      timer = setTimeout(() => {
        fetch(`/staffs/view?search=${encodeURIComponent(query)}`)
          .then(res => res.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newBody = doc.getElementById("staffTableBody");
            tableBody.innerHTML = newBody.innerHTML;
          })
          .catch(err => {
            console.error("Error in live search:", err);
          });
      }, 300); // debounce delay
    });
  });
  