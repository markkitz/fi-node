  export default class EventLogListCtrl {
    constructor() {
      this.name = 'World';
      console.log('event log')
    }

    changeName() {
      this.name = 'angular-tips';
    }
  }
