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

    function displayAppliance(applianceA) {
        const ul = document.querySelector('ul.appliance');
        removeChildren(ul);
        if (applianceA) {
            const appALen = applianceA.length;

            for (let i = 0; i < appALen; i++) {
                const app = applianceA[i];
                const appliance = document.createElement('span');
                appliance.textContent = app;
                ul.appendChild(appliance);
            }
            
        }
    }

    function displayIngredient(ingredientA) {
        const ul = document.querySelector('ul.ingredient');
        removeChildren(ul);
        if (ingredientA) {
            const ingALen = ingredientA.length;

            for (let i = 0; i < ingALen; i++) {
                const ingredient = ingredientA[i];
                const ingr = document.createElement('span');
                ingr.textContent = ingredient;
                ul.appendChild(ingr);
            }
        }
    }

    function displayUstensils(ustensilsA) {
        const ul = document.querySelector('ul.ustensil');
        removeChildren(ul);
        if (ustensilsA) {
            const ustensilALen = ustensilsA.length;

            for (let i = 0; i < ustensilALen; i++) {
                const ustensil = ustensilsA[i];
                const ustensils = document.createElement('span');
                ustensils.textContent = ustensil;
                ul.appendChild(ustensils);
            }
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
    
    function setValuesInArray(contentArray = null) {
        if (!contentArray) {
            contentArray = content.childNodes;
        }

        if(applianceArray.length > 0){ applianceArray.splice(0, applianceArray.length) }
        if(ustensilsArray.length > 0){ ustensilsArray.splice(0, ustensilsArray.length) }
        if(ingredientArray.length > 0){ ingredientArray.splice(0, ingredientArray.length) }

        const contentALen = contentArray.length;

        for (let i = 0; i < contentALen; i++) {
            const article = contentArray[i];

            if (article.children[2]) {
                applianceArray.push(article.children[2].children[0].textContent);

                const ustensilA = article.children[2].children[1].childNodes;
                const ustensilALen = ustensilA.length;

                for (let z = 0; z < ustensilALen; z++) {
                    const ustensil = ustensilA[z];
                    ustensilsArray.push(ustensil.textContent);
                }
            }

            if (article.children[1]) {
                const ingredientsA = article.children[1].children[0].children[1].childNodes;
                const ingsALen = ingredientsA.length;

                for (let b = 0; b < ingsALen; b++) {
                    const ing = ingredientsA[b];
                    
                    if (ing.localName === 'strong') {
                        ingredientArray.push(ing.textContent);
                    }
                }
            }
        }

        const uniqIngA = checkInArray(ingredientArray);
        const uniqAppA = checkInArray(applianceArray);
        const uniqUstA = checkInArray(ustensilsArray);

        displayIngredient( uniqIngA );
        displayAppliance( uniqAppA );
        displayUstensils( uniqUstA );
    }

    return {setValuesInArray, searchInBtns, getAppliances, getIngredients, getUstensils}
}