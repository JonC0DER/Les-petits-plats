function coloredBtn(){
    const ingredientArray = new Array();
    const applianceArray = new Array();
    const ustensilsArray = new Array();
   
    function getIngredients() { return (ingredientArray); }

    function getAppliances() { return (applianceArray); }

    function getUstensils() { return (ustensilsArray); }

    function uniqValue(setArray){
        return newArray = [...new Set(setArray)];
    }

    function checkInArray(array) {
        if (array.length > 0) {
            const newArrayElems = uniqValue(array); 
            return (newArrayElems.sort());
        }
    }

    function removeChildren(parentElem) {
        while (parentElem.hasChildNodes()) {
            parentElem.removeChild(parentElem.firstChild);
        }
    }

    function reloadAll() {
        displayBtns(ingredientDict, 'ul.ingredient', 'ingredient');
        displayBtns(applianceDict, 'ul.appliance', 'appliance');
        displayBtns(ustensilDict, 'ul.ustensil', 'ustensil');
    }

    function displayBtns(dictionnary, selector, key, simple = false){
        const ul = document.querySelector(selector);
        removeChildren(ul);
        const elemALen = dictionnary.length;
        for (let i = 0; i < elemALen; i++) {
            const elem = simple == true ? dictionnary[i] : dictionnary[i][key];
            const spanElem = document.createElement('span');
            spanElem.setAttribute('onclick', 'launchEvent(this)');
            spanElem.textContent = elem;
            ul.appendChild(spanElem);
        }
    }

    function searchInBtns(sentence, type) {
        const newSpanArray = new Array();
        const sentenceArray = sentence.toLowerCase().split(' ');
        const sentenceALen = sentenceArray.length;
        const ul = document.querySelector(`ul.${type}.list_options`);
        const ulA = ul.childNodes;
        const ulALen = ulA.length;

        for (let i = 0; i < ulALen; i++) {
            const span = ulA[i];
            const lowSpan = span.textContent.toLowerCase();

            for (let z = 0; z < sentenceALen; z++) {
                const word = sentenceArray[z];
                if (lowSpan.split(' ').includes(word)) {
                    newSpanArray.push(span.textContent);
                }
            }
            
            if ( lowSpan.search( sentence.toLowerCase() ) >= 0 ) {
                newSpanArray.push(span.textContent);
            }
        }

        const uniqSpanArray = uniqValue(newSpanArray);
        if (uniqSpanArray.length > 0) {
            if(type === 'ingredient'){ displayBtns(uniqSpanArray, 'ul.ingredient', 'ingredient', true); }
            if(type === 'appliance'){ displayBtns(uniqSpanArray, 'ul.appliance', 'appliance', true); }
            if(type === 'ustensil'){ displayBtns(uniqSpanArray, 'ul.ustensil', 'ustensil', true); }
        }
    }

    return {reloadAll, searchInBtns, getAppliances, getIngredients, getUstensils}
}