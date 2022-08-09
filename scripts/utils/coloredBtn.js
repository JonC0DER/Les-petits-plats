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
        displayAppliance();
        displayIngredient();
        displayUstensils();
    }

    function displayAppliance() {
        const ul = document.querySelector('ul.appliance');
        removeChildren(ul);
        const appALen = applianceDict.length;
        for (let i = 0; i < appALen; i++) {
            const app = applianceDict[i].appliance;
            const appliance = document.createElement('span');
            appliance.setAttribute('onclick', 'launchEvent(this)');
            appliance.textContent = app;
            ul.appendChild(appliance);
        }
    }

    function displayIngredient() {
        const ul = document.querySelector('ul.ingredient');
        removeChildren(ul);
        const ingALen = ingredientDict.length;

        for (let i = 0; i < ingALen; i++) {
            const ingredient = ingredientDict[i].ingredient;
            const ingr = document.createElement('span');
            ingr.setAttribute('onclick', 'launchEvent(this)');
            ingr.textContent = ingredient;
            ul.appendChild(ingr);
        }
    }

    function displayUstensils() {
        const ul = document.querySelector('ul.ustensil');
        removeChildren(ul);
        const ustensilALen = ustensilDict.length;
        for (let i = 0; i < ustensilALen; i++) {
            const ustensil = ustensilDict[i].ustensil;
            const ustensils = document.createElement('span');
            ustensils.setAttribute('onclick', 'launchEvent(this)');
            ustensils.textContent = ustensil;
            ul.appendChild(ustensils);
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
            if(type === 'ingredient'){ displayIngredient(uniqSpanArray); }
            if(type === 'appliance'){ displayAppliance(uniqSpanArray); }
            if(type === 'ustensil'){ displayUstensils(uniqSpanArray); }
        }
    }

    return {reloadAll, searchInBtns, getAppliances, getIngredients, getUstensils}
}