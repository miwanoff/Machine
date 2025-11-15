function Machine(info) {
  this.info = info;
  this.state = "stopped";
  this.time = 2000;
  this.timer = null;
  this.interval = null;
}

Machine.prototype.run = function () {
  this.state = "started";
  this.info.innerHTML = `${this.state} Починаю роботу... `;
  this.info.innerHTML += `Час приготування - ${this.time}`;
  this.interval = setInterval(() => {
    this.info.innerHTML += " | ";
  }, 1000);
  this.timer = setTimeout(this.onReady.bind(this), this.time);
};

Machine.prototype.onReady = function () {
  clearInterval(this.interval);
  this.state = "stopped";
  this.info.innerHTML += `Готово! ${this.state}`;
};

Machine.prototype.stop = function () {
  if (this.state === "started") {
    clearInterval(this.interval);
    this.state = "stopped";
    this.info.innerHTML += `Примусове вимкнення! ${this.state}`;
  }
};

// let machine = new Machine();
// machine.run();

function CoffeeMachine(info) {
  this.drink = "вода";
  Machine.apply(this, info);
}

CoffeeMachine.prototype = Object.create(Machine.prototype);
CoffeeMachine.prototype.constructor = CoffeeMachine;

CoffeeMachine.prototype.run = function (drink) {
  if (drink != undefined) this.drink = drink;
  this.info.innerHTML += "Приготування: " + this.drink + " ";
  if (this.drink == "латте") {
    this.time = 5000;
  }
  if (this.drink == "espresso") {
    this.time = 3000;
  }

  Machine.prototype.run.apply(this);
};

// let CoffeeMachine = new CoffeeMachine();
// CoffeeMachine.run("латте");

//---------------Tests------------------
let info = document.getElementById("info");
let latte = document.getElementById("latte");
let espresso = document.getElementById("espresso");
let stop = document.getElementById("stop");

let coffeeMachine = new CoffeeMachine(info);

latte.addEventListener("click", function () {
  coffeeMachine.run("латте");
});

espresso.addEventListener("click", function () {
  coffeeMachine.run("espresso");
});

stop.addEventListener("click", function () {
  coffeeMachine.stop();
});
