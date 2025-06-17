function fetchAndDisplayCategories(search = "") {
    fetch(`/api/Category/search?search=${encodeURIComponent(search)}`)
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById("categoryTableBody");
        tbody.innerHTML = "";
  
        if (data.length === 0) {
          tbody.innerHTML = `<tr><td colspan="3">No categories found.</td></tr>`;
          return;
        }
  
        data.forEach(cat => {
          tbody.innerHTML += `
            <tr>
              <td>${cat.id}</td>
              <td>${cat.name}</td>
              <td>
                <a href="/editCategory/${cat.id}" class="btn btn-warning btn-sm me-1">Edit</a>
                <a href="/deleteCategory/${cat.id}" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this category?');">Delete</a>
              </td>
            </tr>
          `;
        });
      })
      .catch(err => console.error("Fetch error:", err));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayCategories();
  
    document.getElementById("searchInput").addEventListener("input", function () {
      const query = this.value;
      fetchAndDisplayCategories(query);
    });
  });
  