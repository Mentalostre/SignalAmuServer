const generate_key = ()=>{
    return Math.round((Math.random() * 100000) * 72);
}

console.log(generate_key())