function sleep(times) {
    return new Promise((resolve) => setTimeout(resolve, times))
}

(() => {
    sleep(2000)
    console.log('do a===',new Date());
})()