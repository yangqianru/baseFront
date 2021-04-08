const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function myPromise(executer) {
    let self = this;

    self.state = PENDING;
    self.value = null;
    self.reason = null;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
        if (self.state === PENDING) {
            self.state = FULFILLED;
            self.value = value;
        }

        self.onFulfilledCallbacks.forEach((itemFn) => {
            itemFn()
        })
    }
    function reject(reason) {
        if (self.state === PENDING) {
            self.state = REJECTED;
            self.reason = reason;
        }
        self.onRejectedCallbacks.forEach((itemFn) => {
            itemFn()
        })
    }
    try {
        executer(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let self = this;
    let promise2 = null;

    promise2 = new myPromise((resolve, reject) => {
        if (self.state === PENDING) {
            self.onFulfilledCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        self.resolvePromise(promise2, x, resolve, reject)
                    } catch (reason) {
                        reject(reason);
                    }
                }, 0);
            })
            self.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        self.resolvePromise(promise2, x, resolve, reject)
                    } catch (reason) {
                        reject(reason);
                    }
                }, 0);
            })
        }

        if (self.state === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    self.resolvePromise(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            }, 0);
        }

        if (self.state === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    self.resolvePromise(promise2, x, resolve, reject);
                } catch (reason) {
                    reject(reason);
                }
            }, 0);
        }
    })

    return promise2;

}

myPromise.prototype.resolvePromise = function (promise2, x, resolve, reject) {
    let self = this;
    let called = false; // called防止多次调用
    if (promise2 === x) {
        return reject(new TypeError('循环引用'))
    }

    // x为对象或者函数
    if (x != null && (Object.prototype.toString.call(x) === '[object Object]' || Object.prototype.toString.call(x) === '[object Function]')) {
        try {
            let then = x.then;

            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return;
                    called = true;
                    self.resolvePromise(promise2, y, resolve, reject);
                }, (reason) => {
                    if (called) return;
                    called = true;
                    reject(reason);
                })
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch (reason) {
            if (called) return;
            called = true;
            reject(reason);
        }
    } else {
        resolve(x);
    }
}

myPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

myPromise.prototype.finally = function (fn) {
    return this.then(value => {
        fn();
        return value;
    }, (reason) => {
        fn();
        throw reason;
    })
}

myPromise.prototype.done = function () {
    this.catch(reason => {
        console.log('done', reason)
        throw reason;
    })
}

myPromise.all = function (promiseArr) {
    return new myPromise((resolve, reject) => {
        if (!Array.isArray(promiseArr)) {
            return reject(new TypeError('arguments must be an array'));
        }
        let result = [];
        let resultCounter = 0;
        promiseArr.forEach((itemPromise, index) => {
            itemPromise.then((value) => {
                result[index] = value;
                resultCounter++;
                if (resultCounter === promiseArr.length) {
                    resolve(result);
                }
            }, (reason) => {
                reject(reason)
            })
        })
    })
}

myPromise.resolve = function (value) {
    let promise;
    promise = new myPromise((resolve, reject) => {
        this.prototype.resolvePromise(promise, value, resolve, reject);
    })
    return promise;
}

myPromise.reject = function (reason) {
    let promise;
    promise = new myPromise((resolve, reject) => {
        reject(reason)
    })
    return promise;
}

// myPromise.race = function (promiseArr) {
//     return new myPromise((resolve, reject) => {
//         if (!Array.isArray(promiseArr)) {
//             return reject(new TypeError('arguments must be an array'));
//         }
//         promiseArr.forEach((itemPromise) => {
//             itemPromise.then((value) => {
//                 resolve(value);
//             }, (reason) => {
//                 reject(reason)
//             })
//         })
//     })
// }