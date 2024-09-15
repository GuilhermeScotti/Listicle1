const renderChar = async () => {
  const requestedID = parseInt(window.location.href.split("/").pop());
  const response = await fetch(`/chars`);
  const data = await response.json();
  const charContent = document.getElementById("char-content");
  let char;

  if (data) {
    char = data.find((char) => char.id === requestedID);
  }

  if (char) {
    const img = document.getElementById("image");
    img.src = char.image;

    const name = document.getElementById("name");
    name.textContent = char.name;

    const description = document.getElementById("description");
    description.textContent = char.description;

    const curiosity = document.getElementById("curiosity");
    curiosity.textContent = char.curiosity;
  } else {
    const errorText = document.createElement("h3");
    errorText.textContent = "Mario Friend not found :(";
    charContent.appendChild(errorText);
  }
};

renderChar();
