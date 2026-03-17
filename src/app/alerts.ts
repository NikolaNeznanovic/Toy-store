export class Alerts {
  
  static error(msg: string) {
    alert('❌ ' + msg); 
  }


  static success(msg: string) {
    alert('✅ ' + msg); 
  }

  
  static confirm(msg: string, callback: () => void) {
    if (confirm(msg)) {
      callback();
    }
  }
}