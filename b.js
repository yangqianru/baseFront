// (async () => {
//     await (()=>new Promise((resolve) => setTimeout(() => {
//         console.log('b')
//         resolve('b')
//     }, 2000)))()
// })()

function sleep(times) {
    return new Promise((resolve) => setTimeout(resolve, times))
}

(() => {
    sleep(2000)
    console.log('do b',new Date());
})()