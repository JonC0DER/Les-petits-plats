const tagsContainer = document.querySelector('div.tags');
function launchEvent(evt) {
    const text = evt.textContent;
    //console.log(`span textContent => ${text}`);
    const parent = evt.parentElement.classList[0];
    //console.log(`parent first className => ${parent}`);
    searchForRecepies.searchSentence(text, parent, true);
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
    //console.log(evt);
    const sentence = evt.parentElement.textContent;
    //console.log(`textContent => ${sentence}`);
    const type = evt.parentElement.classList[0].split('_')[1];
    console.log(`type => ${type}`);
    //searchForRecepies.removeSentence(sentence, type);
    evt.parentElement.parentElement.removeChild(evt.parentElement);
    
    if (tagsContainer.children.length >= 1) {
        tagsContainer.childNodes.forEach((tag, i) => {
            if(i > 0){
                const typeTag = tag.classList[0].split('_')[1];
                //console.log(`tag type => ${typeTag}`)
                searchForRecepies.searchSentence(tag.textContent, typeTag);
            }
        })
    }else{
        pagination.newArray(arrayRecipies);
        update();
    }
}