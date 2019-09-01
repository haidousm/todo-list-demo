exports.getDate = function () {

    let date = new Date().toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: 'numeric'
    })

    return date;

}