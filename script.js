function Machine() {
  this.state = "stopped";
  this.time = 2000;
  this.timer = null;
  this.interval = null;
}

Machine.prototype.run = function () {
  this.state = "started";
  document.writeln(`${this.state} Починаю роботу...`);
  document.writeln(`Час приготування - ${this.time}`);
  this.interval = setInterval(() => {
    document.writeln(" | ");
  }, 1000);
  this.timer = setTimeout(this.onReady.bind(this), this.time);
};

Machine.prototype.onReady = function () {
  clearInterval(this.interval);
  this.state = "stopped";
  document.writeln(`Готово! ${this.state}`);
};

Machine.prototype.stop = function () {
  if (this.state === "started") {
    clearInterval(this.interval);
    this.state = "stopped";
    document.writeln(`Примусове вимкнення! ${this.state}`);
  }
};

// let machine = new Machine();
// machine.run();

function CofeeMachine() {
  this.drink = "вода";
  Machine.apply(this);
}

CofeeMachine.prototype = Object.create(Machine.prototype);
CofeeMachine.prototype.constructor = CofeeMachine;

CofeeMachine.prototype.run = function (drink) {
  if (drink != undefined) this.drink = drink;
  document.writeln("Приготування: " + this.drink + " ");
  if (this.drink == "латте") {
    this.time = 5000;
  }
  if (this.drink == "espresso") {
    this.time = 3000;
  }

  Machine.prototype.run.apply(this);
};

let cofeeMachine = new CofeeMachine();
cofeeMachine.run("латте");