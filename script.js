const bearFile = 'bears.json'
const cols = document.getElementsByClassName('col')

fetch(bearFile).then(function(response) {
    return response.json()
}).then(function(bearJSON) {
    bearJSON = bearJSON.reverse();
    addBears(bearJSON)
});
// fetch(bearFile)
// .then(function(response) {
//     addBears(response.json());
// }).then(function(json) {
//     console.log(json)
// })

function addBears(bearJSON) {
    for (var i = 0; i < bearJSON.length; i++) {
        var currentTemplate = createBearElement(bearJSON[i], bearJSON.length - i - 1)
        cols[i % cols.length].append(currentTemplate)
    }
}

function createBearElement(bearInfo, bearNumber) {
    /*
        bearInfo: {
            bearImage,
            bearDescription,
            bearLink,
            bearAuthor,
            bearAuthorLink
        }
    */

    var template = document.getElementById('bear-template').cloneNode(true)
    template = template.content

    template.querySelector('.bear').id = "bear-" + (bearNumber + 1)
    
    template.querySelector('.bear-pic').src = bearInfo.bearImage
    template.querySelector('.bear-description').textContent = bearInfo.bearDescription || ""
    template.querySelector('.bear-link').href = bearInfo.bearLink || "#"
    template.querySelector('.bear-number').textContent = (bearNumber + 1)

    if (bearInfo.bearAuthor) {
        template.querySelector('.by').textContent = 'By '
        template.querySelector('.bear-author').textContent = bearInfo.bearAuthor
        template.querySelector('.bear-author').href = bearInfo.bearAuthorLink
    }

    if (bearInfo.bearEvent) {
        template.querySelector('.for').textContent = 'Seen at '
        template.querySelector('.bear-event').textContent = bearInfo.bearEvent
        template.querySelector('.bear-event').href = bearInfo.bearEventLink
    }
    

    return template
}