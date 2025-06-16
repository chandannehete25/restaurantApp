document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
  
    searchInput.addEventListener("input", () => {
      const query = searchInput.value;
  
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/menu/search?q=" + encodeURIComponent(query), true);
  
      xhr.onload = function () {
        if (xhr.status === 200) {
          document.getElementById("menuTable").innerHTML = xhr.responseText;
        }
      };
  
      xhr.send();
    });
  });
  