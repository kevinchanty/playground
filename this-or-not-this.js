function hello() {
    console.log(this)
}

const bye = () => {
    this.set = "set"
    console.log(this.set)
}

bye()