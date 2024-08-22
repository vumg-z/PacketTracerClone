// Observable.js
export class Observable {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(message, data) {
        this.observers.forEach(observer => observer.update(message, data));
    }
}
