const tagsContainer = document.querySelector('div.tags');
function launchEvent(evt) {
    const text = this.textContent;
    const parent = this.parentElement.classList[0];
    console.log(`span textContent => ${text} \n parent first className => ${parent}`);
    searchForRecepies.searchSentence(text, parent);
    createTag(parent, text);
}

function createTag(type, value) {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const closeIcon = document.createElement('i');
    //console.log(type);
    if (type === 'ingredient') {
        div.classList.add('tag_ingredient');
    }
    else if (type === 'appliance') {
        div.classList.add('tag_appliance');
    }
    else if (type === 'ustensil') {
        div.classList.add('tag_ustensil');
    }

    span.classList.add('old-search');
    span.textContent = value;
    closeIcon.classList.add('far', 'fa-times-circle');
    closeIcon.setAttribute('onclick', 'tagRemove(this)');
    div.appendChild(span);
    div.appendChild(closeIcon);
    tagsContainer.appendChild(div);
}

function tagRemove(evt) {
    console.log(evt);
    evt.parentElement.parentElement.removeChild(evt.parentElement);
}