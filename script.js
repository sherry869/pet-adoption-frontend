const pets = [
  {name:"Luna", type:"cat", img:"cat1.jpeg", desc:"Orange kitten"},
  {name:"Milo", type:"cat", img:"cat2.jpeg", desc:"Calico kitten"},
  {name:"Loki", type:"cat", img:"cat3.jpeg", desc:"Calico kitten-2 wk"},
  {name:"leo", type:"cat", img:"cat4.jpeg", desc:"Tabby kitten"},
  {name:"Raven", type:"dog", img:"dog1.jpeg", desc:"Doberman pup"},
  {name:"Bruno", type:"dog", img:"dog2.jpeg", desc:"Lab pup"},
  {name:"Charlie", type:"dog", img:"dog3.jpeg", desc:"Lab pup"}
];

let currentFilter = "all";

/* DISPLAY */
function displayPets() {
  let container = document.getElementById("petContainer");
  container.innerHTML = "";

  let search = document.getElementById("search").value.toLowerCase();

  pets.forEach(pet => {
    if ((currentFilter === "all" || pet.type === currentFilter) &&
        pet.name.toLowerCase().includes(search)) {

      container.innerHTML += `
        <div class="card">
          <img src="${pet.img}">
          <div class="card-content">
            <h3>${pet.name}</h3>
            <p>${pet.desc}</p>
            <button onclick="openPopup('${pet.name}','${pet.desc}')">Adopt</button>
          </div>
        </div>
      `;
    }
  });
}

/* FILTER */
function filterPets(type) {
  currentFilter = type;
  displayPets();
}

/* SEARCH */
document.getElementById("search").addEventListener("input", displayPets);

/* POPUP */
function openPopup(name, desc) {
  document.getElementById("popup").style.display = "block";
  document.getElementById("popupTitle").innerText = name + " 🐾";
  document.getElementById("popupDesc").innerText = desc;
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* FORM */
document.getElementById("adoptForm").addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("userName").value.trim();
  let email = document.getElementById("userEmail").value.trim();
  let reason = document.getElementById("reason").value.trim();
  let msg = document.getElementById("msg");

  if(!name || !email || !reason){
    msg.innerText = "Fill all fields!";
    msg.style.color = "red";
    return;
  }

  msg.innerText = "Adoption request sent 🐾";
  msg.style.color = "green";

  setTimeout(()=>{
    this.reset();
    closePopup();
  },1500);
});

  

/* DARK MODE */
document.getElementById("darkBtn").onclick = () => {
  document.body.classList.toggle("dark");
};

/* INITIAL LOAD */
displayPets();
function closePopup() {
  document.getElementById("popup").style.display = "none";
}
window.onclick = function(e) {
  let popup = document.getElementById("popup");
  if (e.target === popup) {
    popup.style.display = "none";
  }
}