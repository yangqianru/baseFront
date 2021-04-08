require(['./myPromise'], () => {
    // console.log('start--');

    // let promise = new myPromise(function (resolve, reject) {
    //     console.log('step-');
    //     resolve(123);
    // });

    // promise.then(function (value) {
    //     console.log('value1', value);
    //     return value
    // }, function (reason) {
    //     console.log('reason1', reason);
    // }).then(res=>{
    //     console.log('value2', res);
    //     a.b = 2;
    //     return res;
    // }).then(res=>{
    //     console.log('value3', res);
    // });

    // console.log('end--');
    // let promise1 = new myPromise((resolve, reject) => {
    //     console.log('aaaa');
    //     setTimeout(() => {
    //         resolve(1111);
    //         console.log(1111);
    //     }, 1000);
    // });

    // let promise2 = new myPromise((resolve, reject) => {
    //     console.log('bbbb');
    //     setTimeout(() => {
    //         reject(2222);
    //         console.log(2222);
    //     }, 2000);
    // });

    // let promise3 = new myPromise((resolve, reject) => {
    //     console.log('cccc');
    //     setTimeout(() => {
    //         resolve(3333);
    //         console.log(3333);
    //     }, 3000);
    // });

    // myPromise.all([promise1, promise2, promise3]).then(res => {
    //     console.log('ONE VALUE', res);
    // }).catch(reason => {
    //     console.log('ONE REASON', reason);
    // })

    // myPromise.resolve(1111).then((value) => {
    //     console.log('value1', value);
    //     return new myPromise((resolve, reject) => {
    //       resolve(2222);
    //     })
    //   }).then((value) => {
    //     console.log('value2', value);
    //   });


})