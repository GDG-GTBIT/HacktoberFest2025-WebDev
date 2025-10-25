const saveBtn = document.getElementById("saveBtn");
const messageInput = document.getElementById("message");
const dateTimeInput = document.getElementById("unlockDateTime");
const capsuleList = document.getElementById("capsuleList");
window.addEventListener("load", () => {
  showCapsules();
  setInterval(showCapsules, 1000); 
});

saveBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  const unlockDateTime = dateTimeInput.value;

  if (!message || !unlockDateTime) {
    alert("Please enter both message and date/time!");
    return;
  }

  const capsules = JSON.parse(localStorage.getItem("capsules")) || [];
  if (saveBtn.dataset.editIndex) {
    const index = saveBtn.dataset.editIndex;
    capsules[index] = {
      ...capsules[index],
      message,
      unlockDateTime,
    };
    delete saveBtn.dataset.editIndex;
    saveBtn.textContent = "Lock Message 🔒";
  } else {
    capsules.push({ message, unlockDateTime, createdAt: new Date().toISOString() });
  }

  localStorage.setItem("capsules", JSON.stringify(capsules));
  messageInput.value = "";
  dateTimeInput.value = "";
  showCapsules();
});
function showCapsules() {
  capsuleList.innerHTML = "";
  const capsules = JSON.parse(localStorage.getItem("capsules")) || [];
  capsules.forEach((capsule, index) => {
    if (capsule.stopped) return; 
    const now = new Date();
    const unlockTime = new Date(capsule.unlockDateTime);
    const capsuleDiv = document.createElement("div");
    capsuleDiv.classList.add("capsule");
    if (now >= unlockTime) {
      capsuleDiv.classList.add("unlocked");
      capsuleDiv.innerHTML = `
        <div>
          <p>📜 ${capsule.message}</p>
          <small>Unlocked on ${unlockTime.toLocaleString()}</small>
        </div>
        <div class="capsule-buttons">
          <button onclick="editCapsule(${index})">✏️ Edit</button>
          <button onclick="deleteCapsule(${index})">🗑️ Discard</button>
          <button onclick="stopCapsule(${index})">⏹️ Stop</button>
        </div>
      `;
    } else {
      capsuleDiv.classList.add("locked");
      const diff = unlockTime - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      capsuleDiv.innerHTML = `
        <div>
          <p>🔒 Locked Message</p>
          <small>Unlocks on ${unlockTime.toLocaleString()}</small>
        </div>
        <div class="countdown">
          ${days}d ${hours}h ${minutes}m ${seconds}s
        </div>
        <div class="capsule-buttons">
          <button onclick="editCapsule(${index})">✏️ Edit</button>
          <button onclick="deleteCapsule(${index})">🗑️ Discard</button>
          <button onclick="stopCapsule(${index})">⏹️ Stop</button>
        </div>
      `;
    }

    capsuleList.appendChild(capsuleDiv);
  });
}
function editCapsule(index) {
  const capsules = JSON.parse(localStorage.getItem("capsules"));
  messageInput.value = capsules[index].message;
  dateTimeInput.value = capsules[index].unlockDateTime;
  saveBtn.dataset.editIndex = index;
  saveBtn.textContent = "Save Changes 💾";
}
function deleteCapsule(index) {
  const capsules = JSON.parse(localStorage.getItem("capsules"));
  capsules.splice(index, 1);
  localStorage.setItem("capsules", JSON.stringify(capsules));
  showCapsules();
}

function stopCapsule(index) {
  const capsules = JSON.parse(localStorage.getItem("capsules"));
  capsules[index].stopped = true; 
  localStorage.setItem("capsules", JSON.stringify(capsules));
  showCapsules(); 
}
