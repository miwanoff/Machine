class Machine {
  constructor() {
    this.state = "stopped";
    this.time = 2000;
    this.timer = null;
    this.interval = null;
  }

  run() {
    this.state = "started";
    document.write("Починаю роботу...");
    document.write("Час приготування - " + this.time + " ");
    this.interval = setInterval(() => {
      document.write(" | ");
    }, 1000);
    this.timer = setTimeout(this.onReady, this.time);
    document.write(this.state);
  }

  onReady = () => {
    clearInterval(this.interval);
    clearTimeout(this.timer);
    document.write("Готово! ");
    this.state = "stopped";
    document.write(this.state);
  };

  stop() {
    clearInterval(this.interval);
    clearTimeout(this.timer);
    document.write("Примусове вимикання! ");
    this.state = "stopped";
    document.write(this.state);
  }
}

// let machine = new Machine();
// machine.run();

class CoffeeMachine extends Machine {
  constructor() {
    super();
    // вызов конструктора родительского класса Machine
    this.drink = "вода";

  }
  run(drink) {
    if (drink != undefined) this.drink = drink;
    document.write("Приготування - " + this.drink + " ");
    if (this.drink == "латте") {
      this.time = 5000;
    }
    if (this.drink == "espresso") {
      this.time = 3000;
    }

    // вызов метода родительского класса run()
    super.run();
  }
}

let coffeeMachine = new CoffeeMachine();

coffeeMachine.run("латте");