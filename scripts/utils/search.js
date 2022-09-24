function searchRecipes(){
    const newArrayRecipes = new Array();
    
    function displayArray() {
        return ([... new Set(newArrayRecipes)]);
    }
    
    function getPreciseArray() {
        preciseArrayRecipies = newArrayRecipes.slice();
        return ([... new Set(preciseArrayRecipies)]);
    }

    function resetArray() {
        if(newArrayRecipes.length > 0){
            newArrayRecipes.splice(0, newArrayRecipes.length);
        }
    }

    function removeSentence(sentence, type) {
        const restructuringArray = getPreciseArray();
        const rALength = restructuringArray.length;
        let i = 0; let elem;
        for (; i < rALength; ++ i) {
            const recipes = restructuringArray[i];
            if (type === 'ingredient') {
                elem = recipes.childNodes[1].childNodes[0].childNodes[1].childNodes[0].textContent.toLowerCase();
            }
            if (type === 'appliance') {
                elem = recipes.childNodes[2].childNodes[0].textContent.toLowerCase();
            }
            if (type === 'ustensil') {
                elem = recipes.childNodes[2].childNodes[1].childNodes;
            }

            if (elem instanceof Array) {
                const elemLen = elem.length;
                for(let z = 0; z < elemLen; z ++) {
                    if (elem[z].toLowerCase() === sentence.toLowerCase()) {
                        restructuringArray.splice(restructuringArray.indexOf(recipes, 1));
                    }
                }
            }else{
                const elemLow = elem.toLowerCase();
                const sentenceLow = sentence.toLowerCase();
                const words = sentenceLow.split(' ');
                const elems = elemLow.split(' ');

                if (elemLow === sentenceLow) {
                    restructuringArray.splice(restructuringArray.indexOf(recipes, 1));
                }

                const wordsLen = words.length;
                for (let x = 0; x < wordsLen ; x++) {
                    const word = words[x];
                    if (elems.includes(word)) {
                        restructuringArray.splice(restructuringArray.indexOf(recipes, 1));
                    }
                }
            }
        }
        initUpdate(true);
    }

    function searchSentence(sentence, type = null, precise = false) {
        resetArray();
        const lowSent = sentence.trim().toLowerCase();
        launchSearch(lowSent, type, precise);
    }

    function initUpdate(precise = false) {
        let uniqArrayRecipes = [];
        if (newArrayRecipes.length <= 0) {
            uniqArrayRecipes = arrayRecipies;
        }else{
            if(precise && getPreciseArray().length >= 1){
                uniqArrayRecipes = getPreciseArray();
            }else{ 
                uniqArrayRecipes = displayArray();
            }
            pagination.newArray(uniqArrayRecipes);
            const btns = coloredBtn();
            btns.setValuesInArray();
        }
        update();
    }
    
    function searchIn(strArray, recipe, lowSent) {
        const strALen = strArray.length;
        const lowSentArray = lowSent.split(' ');
        const lowSentALen = lowSentArray.length;

        for (let i = 0; i < strALen; i++) {
            if (/*Array.isArray(strArray[i]) ||*/ strArray[i] == '[object NodeList]') {
                strArray[i].forEach(ing => {
                    searchEngage(ing.textContent);
                });
            }else{
                searchEngage(strArray[i]);
            }
        }

        function searchEngage(textInput) {
            const text = textInput.toLowerCase();
            const str = text.split(' ');
            let count = 0;
            
            if(text.search(lowSent) >= 0) {
                newArrayRecipes.push(recipe);
            }

            /*if(str.includes(lowSent)) {
                newArrayRecipes.push(recipe);
            }*/
            
            for (let z = 0; z < lowSentALen; z++) {
                const word = lowSentArray[z];

                str.forEach(strWord => {
                    if(strWord.includes(word)){
                        count ++;//newArrayRecipes.push(recipe);
                    }
                })

                /*if (str.includes(word)) {
                    count ++;
                }*/
            }

            if (count === lowSentALen) {
                newArrayRecipes.push(recipe);
                count = 0;
            }
        }
    }

    function launchSearch(lowSent, type = null, precise = false) {
        let i = 0;
        let currentArray, recepiesLen;

        if (precise && (preciseArrayRecipies instanceof Array && preciseArrayRecipies.length >= 1)) {
            recepiesLen = preciseArrayRecipies.length;
            currentArray = preciseArrayRecipies;
        } else {    
            recepiesLen = arrayRecipies.length;
            currentArray = arrayRecipies;
        }
        
        for (; i < recepiesLen; i++) {
            const recipes = currentArray[i];
            
            const title = recipes.children[1].children[0].children[0].textContent.toLowerCase();
            const desc = recipes.children[1].children[1].children[1].textContent.toLowerCase();
            const ingredients = recipes.children[1].children[0].children[1].childNodes;
            const ingredientsLen = ingredients.length;
            const appliance = recipes.children[2].children[0].textContent.toLowerCase();
            const ustensil = recipes.children[2].children[1].childNodes;
            const ustensilALen = ustensil.length;
            
            const strArray = new Array();
            if(type === 'ingredient'){
                let x = 0;
                for (; x < ingredientsLen; x++) {
                    const elem = ingredients[x];
                    if(elem.localName === 'strong'){
                        strArray.push(elem.textContent);
                    }
                }
                searchIn(strArray, recipes, lowSent);
            } else if(type === 'appliance'){
                strArray.push(appliance);
                searchIn(strArray, recipes, lowSent);
            } else if(type === 'ustensil'){
                let z = 0;
                for (; z < ustensilALen; z++) {
                    const span = ustensil[z];
                    strArray.push(span.textContent);
                }
                searchIn(strArray, recipes, lowSent);    
            }else{
                const ingrArray = ingredients;
                strArray.push(title, ingrArray, desc);
                searchIn(strArray, recipes, lowSent);
            }
        }
        initUpdate(precise);
    }

    return {searchSentence, displayArray, getPreciseArray, removeSentence}
}

const search_input = document.querySelector('input.search_recipes');
const searchForRecepies = searchRecipes();
search_input.addEventListener('input', function (evt) {
    if (this.value.length > 2) {   
        searchForRecepies.searchSentence(this.value);
    }
    else if(this.value.length < 3){
        pagination.newArray(arrayRecipies);
        update();
    }
});

const search_btn = document.querySelector('div.search');
search_btn.addEventListener('click', function(){
    searchForRecepies.searchSentence(search_input.value);
});

const tags = document.querySelector('div.tags');
const specificInput = document.querySelectorAll('.list_nav input[type=search]');
const specInputLen = specificInput.length;

for(let i = 0; i < specInputLen; ++i){
    const input = specificInput[i];
    input.addEventListener('input', () => {
        if (input.value.length > 2) {
            btns.searchInBtns(input.value, input.className);
        }
        else if(input.value.length < 3){
            btns.setValuesInArray(arrayRecipies);
        }
    })
}