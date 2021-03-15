(async ()=>await new Promise((resolve)=>setTimeout(() => {
    console.log('a',new Date())
    resolve('a')
}, 2000)))()