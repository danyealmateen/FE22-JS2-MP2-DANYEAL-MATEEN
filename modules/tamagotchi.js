class Tamagotchi {
  #hunger;
  #happiness;
  #hungrynessInterval;
  #feedButton;
  #tamaContainer;
  #errorMessage;
  #select;
  #inputText;
  #tamaTitle;
  #currentHappiness;
  #currentHungryness;
  #statsForHappiness;
  #statsForHungryness;
  #happinessButton;
  #interactWithTama;
  #happinessInterval;
  #dead;

  constructor(hunger, happiness) {
    this.#hunger = hunger;
    this.#happiness = happiness;
  }
  setHungerStat(newHungerStat) {
    return (this.#hunger = newHungerStat);
  }
  setHappinessStat(newHappinessStat) {
    return (this.#happiness = newHappinessStat);
  }
  getHappinessStat() {
    return this.#happiness;
  }
  getHungrynessStat() {
    return this.#hunger;
  }
  renderTama() {
    this.#tamaContainer = document.createElement("div");
    this.#tamaContainer.setAttribute("id", "tamaContainer");

    this.#errorMessage = document.getElementById("errorMessage");

    this.#select = document.getElementById("select").value;

    this.#inputText = document.getElementById("inputText").value;

    if (this.#select === "The Fabolous") {
      this.#tamaContainer.style.backgroundColor = "hotpink";
    } else if (this.#select === "The Insane") {
      this.#tamaContainer.style.backgroundColor = "burlywood";
    } else if (this.#select === "The Seeker") {
      this.#tamaContainer.style.backgroundColor = "orange";
    } else if (this.#select === "The Dreamer") {
      this.#tamaContainer.style.backgroundColor = "purple";
    }

    if (this.#inputText === "") {
      this.#errorMessage.innerHTML = "Fill in your name!";
      return;
    }

    this.#tamaTitle = document.createElement("p");
    this.#tamaTitle.innerText = `${this.#inputText} ${this.#select} `;

    this.#currentHappiness = this.getHappinessStat();
    this.#currentHungryness = this.getHungrynessStat();

    this.#statsForHappiness = document.createElement("p");
    this.#statsForHungryness = document.createElement("p");

    this.#statsForHappiness.innerHTML = `Happiness: ${this.#currentHappiness}`;
    this.#statsForHungryness.innerHTML = `Hungryness: ${
      this.#currentHungryness
    }`;

    this.#feedButton = document.createElement("button");
    this.#feedButton.setAttribute("id", "feedButton");
    this.#feedButton.innerText = `Feed`;

    this.#happinessButton = document.createElement("button");
    this.#happinessButton.setAttribute("id", "happinessButton");
    this.#happinessButton.innerText = `Play`;

    this.#interactWithTama = (stat) => {
      if (stat === "happiness") {
        this.#currentHappiness = this.getHappinessStat();
        if (this.#currentHappiness < 10) {
          this.setHappinessStat(this.#currentHappiness + 1);
        }
      }
      if (stat === "hungryness") {
        this.#currentHungryness = this.getHungrynessStat();
        if (this.#currentHungryness < 10) {
          this.setHungerStat(this.#currentHungryness + 1);
        }
      }
    };

    this.#feedButton.addEventListener("click", () =>
      this.#interactWithTama("hungryness")
    );

    this.#happinessButton.addEventListener("click", () =>
      this.#interactWithTama("happiness")
    );

    this.#happinessInterval = setInterval(() => {
      this.#currentHappiness = this.getHappinessStat();
      this.setHappinessStat(this.#currentHappiness - 1);

      this.#statsForHappiness.innerHTML = `Happiness : ${
        this.#currentHappiness
      }`;

      if (this.#currentHappiness === 0) {
        this.#dead = document.createElement("h1");
        this.#dead.innerHTML = `Happiness reached 0. Pet is dead.`;
        this.#tamaContainer.append(this.#dead);
        this.#feedButton.disabled = true;
        this.#happinessButton.disabled = true;
        this.setHungerStat((this.#currentHungryness = 0));
        this.#tamaContainer.style.backgroundColor = "red";
        clearInterval(this.#happinessInterval);
      }
    }, 1000);

    this.#hungrynessInterval = setInterval(() => {
      this.#currentHungryness = this.getHungrynessStat();
      this.setHungerStat(this.#currentHungryness - 1);

      this.#statsForHungryness.innerHTML = `Hungryness : ${
        this.#currentHungryness
      }`;

      if (this.#currentHungryness === 0) {
        this.#dead = document.createElement("h1");
        this.#dead.innerHTML = `Hungryness reached 0. Pet is dead.`;
        this.#tamaContainer.append(this.#dead);
        this.#feedButton.disabled = true;
        this.#happinessButton.disabled = true;
        this.setHappinessStat((this.#currentHappiness = 0));
        this.#tamaContainer.style.backgroundColor = "red";
        clearInterval(this.#hungrynessInterval);
      }
    }, 2000);

    this.#tamaContainer.append(this.#tamaTitle);
    this.#tamaContainer.append(this.#tamaTitle);
    this.#tamaContainer.appendChild(this.#feedButton);
    this.#tamaContainer.appendChild(this.#happinessButton);
    this.#tamaContainer.append(this.#statsForHappiness);
    this.#tamaContainer.append(this.#statsForHungryness);
    document.body.append(this.#tamaContainer);
  }
}

export { Tamagotchi };
