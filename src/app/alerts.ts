export class Alerts {
  // crveni alert
  static error(msg: string) {
    alert('❌ ' + msg); // možeš kasnije zameniti sa nekom lepom snackbar komponentom
  }

  // zeleni alert
  static success(msg: string) {
    alert('✅ ' + msg); // isto, možeš koristiti snackbar
  }

  // confirm dialog sa callback funkcijom
  static confirm(msg: string, callback: () => void) {
    if (confirm(msg)) {
      callback();
    }
  }
}