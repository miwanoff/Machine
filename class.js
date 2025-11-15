class Machine {
  constructor() {
    this.state = "stopped";
    this.time = 2000;
    this.timer = null;
    this.interval = null;
  }

  run() {
    this.state = "started";
    document.writeln(`${this.state} Починаю роботу...`);
    document.writeln(`Час приготування - ${this.time}`);
    this.interval = setInterval(() => {
      document.writeln(" | ");
    }, 1000);
    this.timer = setTimeout(this.onReady.bind(this), this.time);
  }

  onReady = () => {
    clearInterval(this.interval);
    this.state = "stopped";
    document.writeln(`Готово! ${this.state}`);
  };

  stop = () => {
    if (this.state === "started") {
      clearInterval(this.interval);
      this.state = "stopped";
      document.writeln(`Примусове вимкнення! ${this.state}`);
    }
  };
}
let machine = new Machine();
machine.run();