const pets = [
  { name: "Luna", type: "cat", img: "cat1.jpeg", desc: "Orange kitten, loves to play.", age: "2 months" },
  { name: "Milo", type: "cat", img: "cat2.jpeg", desc: "Calico kitten, very sleepy.", age: "3 months" },
  { name: "Loki", type: "cat", img: "cat3.jpeg", desc: "Calico kitten, curious and active.", age: "2 weeks" },
  { name: "Leo", type: "cat", img: "cat4.jpeg", desc: "Tabby kitten, friendly.", age: "4 months" },
  { name: "Raven", type: "dog", img: "dog1.jpeg", desc: "Doberman pup, energetic and loyal.", age: "6 months" },
  { name: "Bruno", type: "dog", img: "dog2.jpeg", desc: "Lab pup, loves treats.", age: "4 months" },
  { name: "Charlie", type: "dog", img: "dog3.jpeg", desc: "Lab pup, very snuggly.", age: "5 months" },
  { name: "Jake", type: "dog", img: "dog4.jpeg", desc: "Bulldog mix, calm and sweet.", age: "3 months" }
];

let currentFilter = "all";

/* DISPLAY PETS */
function displayPets() {
  let container = document.getElementById("petContainer");
  container.innerHTML = "";

  let searchInput = document.getElementById("search");
  let search = searchInput ? searchInput.value.toLowerCase() : "";

  pets.forEach(pet => {
    if ((currentFilter === "all" || pet.type === currentFilter) &&
      pet.name.toLowerCase().includes(search)) {

      // To pass objects via onclick without escaping issues, we'll build DOM elements or encode
      // We encode the pet object to base64 or pass fields
      // For simplicity here, we pass name, desc, img, type, age directly

      let html = `
        <div class="card" onclick="openPopup('${pet.name}', '${pet.desc}', '${pet.img}', '${pet.type}', '${pet.age}')">
          <img src="${pet.img}" alt="${pet.name}">
          <div class="card-content">
            <h3>${pet.name}</h3>
          </div>
        </div>
      `;
      container.innerHTML += html;
    }
  });
}

/* FILTER */
function filterPets(type, btnElement) {
  currentFilter = type;

  // Highlight active button
  let buttons = document.querySelectorAll(".btn-filter");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  displayPets();
}

/* SEARCH */
let searchBox = document.getElementById("search");
if (searchBox) {
  searchBox.addEventListener("input", displayPets);
}

/* POPUP - Matches Image 1 UI */
function openPopup(name, desc, img, type, age) {
  document.getElementById("popup").style.display = "block";
  document.getElementById("popupNameStr").innerText = name.toUpperCase();
  document.getElementById("popupImg").src = img;
  document.getElementById("popupTitle").innerText = name;
  document.getElementById("popupAge").innerText = age;

  let detailsHtml = `
    <li>• <strong>Type:</strong> ${type === 'cat' ? 'Feline' : 'Canine'}</li>
    <li>• <strong>About:</strong> ${desc}</li>
    <li>• <strong>Status:</strong> Available</li>
  `;
  document.getElementById("popupDescList").innerHTML = detailsHtml;

  // Reset form message
  let msg = document.getElementById("msg");
  msg.innerText = "";
  msg.style.display = "none";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Close when clicking outside of popup-box
window.onclick = function (e) {
  let popup = document.getElementById("popup");
  if (e.target === popup) {
    closePopup();
  }
}

/* FORM SUBMISSION */
let form = document.getElementById("adoptForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("userName").value.trim();
    let email = document.getElementById("userEmail").value.trim();
    let reason = document.getElementById("reason").value.trim();
    let msg = document.getElementById("msg");

    if (!name || !email || !reason) {
      msg.innerText = "Please fill all fields!";
      msg.style.color = "#d9534f";
      msg.style.background = "#f2dede";
      msg.style.display = "block";
      return;
    }

    msg.innerText = "Adoption request sent successfully 🐾";
    msg.style.color = "#3c763d";
    msg.style.background = "#dff0d8";
    msg.style.display = "block";

    setTimeout(() => {
      this.reset();
      closePopup();
    }, 2000);
  });
}

/* DARK MODE */
let darkBtn = document.getElementById("darkBtn");
if (darkBtn) {
  darkBtn.onclick = () => {
    document.body.classList.toggle("dark");
    // Toggle icon
    let icon = darkBtn.querySelector("i");
    if (document.body.classList.contains("dark")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  };
}

/* INITIAL LOAD */
displayPets();