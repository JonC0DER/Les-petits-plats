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
            //console.log('elem has children !')
            parentElem.removeChild(parentElem.firstChild);
        }
    }

    function displayAppliance(applianceA) {
        const ul = document.querySelector('ul.appliance');
        removeChildren(ul);
        if (applianceA) {
            applianceA.forEach(app =>{
                const appliance = document.createElement('span');
                appliance.textContent = app;
                ul.appendChild(appliance);
            })
        }
    }

    function displayIngredient(ingredientA) {
        const ul = document.querySelector('ul.ingredient');
        removeChildren(ul);
        //console.log('display ingredients')
        //console.log(ingredientA)
        if (ingredientA) {
            ingredientA.forEach(ingredient => {
                //console.log(`ecrit ${ingredient}`)
                const ingr = document.createElement('span');
                ingr.textContent = ingredient;
                ul.appendChild(ingr);
            })
        }
    }

    function displayUstensils(ustensilsA) {
        const ul = document.querySelector('ul.ustensil');
        removeChildren(ul);
        if (ustensilsA) {
            ustensilsA.forEach(ustensil =>{
                const ustensils = document.createElement('span');
                ustensils.textContent = ustensil;
                ul.appendChild(ustensils);
            })
        }
    }

    function searchInBtns(sentence, type) {
        const newSpanArray = new Array();
        const sentenceArray = sentence.toLowerCase().split(' ');
        const ul = document.querySelector(`ul.${type}.list_options`);

        ul.childNodes.forEach(span => {
            const lowSpan = span.textContent.toLowerCase();

            sentenceArray.forEach(word =>{
                if (lowSpan.split(' ').includes(word)) {
                    newSpanArray.push(span.textContent);
                }
            })
            //console.log('lower sentece ' + sentence.toLowerCase())
            //console.log('lowspan '+lowSpan)
            if ( lowSpan.search( sentence.toLowerCase() ) >= 0 ) {
                newSpanArray.push(span.textContent);
            }
        })

        const uniqSpanArray = uniqValue(newSpanArray);
        if (uniqSpanArray.length > 0) {
            if(type === 'ingredient'){
                //console.log('here we are')
                //console.log(newSpanArray)
                displayIngredient(uniqSpanArray);
            }
            if(type === 'appliance'){
                displayAppliance(uniqSpanArray);
            }
            if(type === 'ustensil'){
                displayUstensils(uniqSpanArray);
            }
        }
    }
    
    function setValuesInArray(contentArray = null) {
        if (!contentArray) {
            contentArray = content.childNodes;
        }

        if(applianceArray.length > 0){ applianceArray.splice(0, applianceArray.length) }
        if(ustensilsArray.length > 0){ ustensilsArray.splice(0, ustensilsArray.length) }
        if(ingredientArray.length > 0){ ingredientArray.splice(0, ingredientArray.length) }

        contentArray.forEach(article =>  {
            if (article.children[2]) {
                applianceArray.push(article.children[2].children[0].textContent);

                article.children[2].children[1].childNodes.forEach(ustensil =>{
                    ustensilsArray.push(ustensil.textContent);
                })
            }

            if (article.children[1]) {
                article.children[1].children[0].children[1].childNodes.forEach(ing =>{
                    if (ing.localName === 'strong') {
                        ingredientArray.push(ing.textContent);
                    }
                })
            }
        })

        const uniqIngA = checkInArray(ingredientArray);
        const uniqAppA = checkInArray(applianceArray);
        const uniqUstA = checkInArray(ustensilsArray);

        displayUstensils( uniqUstA );
        displayAppliance( uniqAppA );
        displayIngredient( uniqIngA );
    }

    return {setValuesInArray, searchInBtns, getAppliances, getIngredients, getUstensils}
}