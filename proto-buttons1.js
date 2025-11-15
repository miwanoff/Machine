function Machine(info) {
  this.info = info;
  this.state = "stopped";
  this.time = 2000;
  this.timer = null;
  this.interval = null;
}

Machine.prototype.run = function () {
  try {
    if (this.state == "started") {
      throw new Error("Машина зайнята!");
    } else {
      this.state = "started";
      this.info.innerHTML = "Починаю роботу...";
      this.info.innerHTML += "Час приготування - " + this.time + " ";
      this.interval = setInterval(
        function () {
          this.info.innerHTML += " | ";
        }.bind(this),
        1000
      );
      this.timer = setTimeout(this.onReady.bind(this), this.time);
      this.info.innerHTML += this.state;
    }
  } catch (ex) {
    this.info.innerHTML += espresso.message;
  }
};

Machine.prototype.onReady = function () {
  clearInterval(this.interval);
  clearTimeout(this.timer);
  this.info.innerHTML += "Готово! ";
  this.state = "stopped";
  this.info.innerHTML += this.state;
};

Machine.prototype.stop = function () {
  clearInterval(this.interval);
  clearTimeout(this.timer);
  this.info.innerHTML += "Примусове вимикання! ";
  this.state = "stopped";
  this.info.innerHTML += this.state;
};

// CoffeeMachine

function CoffeeMachine(info) {
  this.drink = "вода";
  Machine.call(this, info);
}

CoffeeMachine.prototype = Object.create(Machine.prototype);
CoffeeMachine.prototype.constructor = CoffeeMachine;

CoffeeMachine.prototype.run = function (drink) {
  try {
    if (this.state == "started") {
      throw new Error("Машина зайнята!");
    } else {
      if (drink != undefined) this.drink = drink;
      this.info.innerHTML += "Приготування - " + this.drink + " ";
      if (this.drink == "латте") {
        this.time = 5000;
      }
      if (this.drink == "espresso") {
        this.time = 3000;
      }
      Machine.prototype.run.apply(this);
    }
  } catch (ex) {
    this.info.innerHTML += ex.message;
  }
};
//----------------------------------------------------------
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
