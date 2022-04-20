function coloredBtn(){
    const ingredientArray = new Array();
    const applianceArray = new Array();
    const ustensilsArray = new Array();
   
    function uniqValue(setArray){
        return newArray = [...new Set(setArray)];
    }

    function checkInArray(array) {
        if (array.length > 0) {
            const newArrayElems = uniqValue(array); 
            return (newArrayElems);
        }
    }

    function removeChildren(parent) {
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild);
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
        const ul = document.querySelector('ul.ingredients');
        removeChildren(ul);
        if (ingredientA) {
            ingredientA.forEach(ingredient => {
                const ingr = document.createElement('span');
                ingr.textContent = ingredient;
                ul.appendChild(ingr);
            })
        }
    }

    function displayUstensils(ustensilsA) {
        const ul = document.querySelector('ul.ustensils');
        removeChildren(ul);
        if (ustensilsA) {
            ustensilsA.forEach(ustensil =>{
                const ustensils = document.createElement('span');
                ustensils.textContent = ustensil;
                ul.appendChild(ustensils);
            })
        }
        
    }

    function setValuesInArray() {            
        content.childNodes.forEach(article =>  {
            applianceArray.push(article.children[2].children[0].textContent);

            article.children[1].children[0].children[1].childNodes.forEach(ing =>{
                if (ing.localName === 'strong') {
                    ingredientArray.push(ing.textContent);
                }
            })

            article.children[2].children[1].childNodes.forEach(ustensil =>{
                ustensilsArray.push(ustensil.textContent);
            })
        })
        
        const uniqAppA = checkInArray(applianceArray);
        const uniqIngA = checkInArray(ingredientArray);
        const uniqUstA = checkInArray(ustensilsArray);
        displayAppliance( uniqAppA );
        displayIngredient( uniqIngA );
        displayUstensils( uniqUstA );
    }

    return {setValuesInArray}
}