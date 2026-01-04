export function random (len : number) {
    let options = "adiqbpq9nijpsbupbewu8bfshbfjbjasbfu9bau9wq9bjqfb";
    let length = options.length;

    let ans = "";

    for ( let i=0 ; i < len; i++){
        ans  += options[(Math.floor(Math.random() * length))]
    }

    return ans;
}
