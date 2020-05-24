
function throwError(error) {
    if (error === undefined || error == null) {
        return
    }
    document.getElementById("error").innerHTML = error
}
