function saveData() {
  const name = document.getElementById("nameInput").value;
  const age = document.getElementById("ageInput").value;

  fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerHTML = `<p style="color:green;">${data.message}</p>`;
  });
}

function searchData() {
  const searchName = document.getElementById("searchInput").value;

  fetch(`/api/search?name=${searchName}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        document.getElementById("result").innerHTML = 
          `<p style="color:blue;">Found: ${data[0].name}, Age: ${data[0].age}</p>`;
      } else {
        document.getElementById("result").innerHTML = `<p style="color:red;">No user found</p>`;
      }
    });
}

