var func1 = function Cfunc1 (x) {
    console.log(this)
    this.mynum = x +100
    return x + 1
}

func1(2)
console.log(Cfunc1.mynum)