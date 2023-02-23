import { Tamagotchi } from "./modules/tamagotchi.js";

let addTamaButton = document.getElementById("addTamaButton");

addTamaButton.addEventListener("click", (event) => {
  event.preventDefault(event);
  const a = new Tamagotchi();
  
  a.setHappinessStat(10);
  a.setHungerStat(10);
  a.renderTama();
});
