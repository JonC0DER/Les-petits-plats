function searchRecipes(){
    const newArrayRecipes = new Array();
    
    function displayArray() {
        return ([... new Set(newArrayRecipes)]);
    }

    function resetArray() {
        if(newArrayRecipes.length > 0){
            newArrayRecipes.splice(0, newArrayRecipes.length);
        }
    }

    function divideAndConquer(key, sentence) {
        let start = 0;
        let end = recipiesDatas.length -1;

        function begin(arrayToDivide, start, end, sentence){
            const midIndex = Math.floor(arrayToDivide.length/2);
            const wordsToDivide = arrayToDivide[midIndex][key].toLowerCase();
            const wordsArrayToDivide = wordsToDivide.split(' ');
            const ifInclude = wordsArrayToDivide.includes(sentence);
            
            let index = 0;
            do{
                const currentWordBoolean = sentence.localeCompare(
                    wordsArrayToDivide[index], 'fr', {sensitivity:'base', ignorePonctuation:true}
                );
                
                if (currentWordBoolean === 0 || ifInclude) { return true; }
                
                if (currentWordBoolean < 0) { 
                    return begin(arrayToDivide, start, midIndex - 1, sentence);
                }else{ 
                    return begin(arrayToDivide, midIndex + 1, end, sentence); 
                }
                
                index ++;
            }while (index <= wordsArrayToDivide.length);
        }
        
        begin(recipiesDatas, start, end, sentence);
    }

    function searchSentence(sentence, type = null) {
        resetArray();
        const lowSent = sentence.toLowerCase();
        launchSearch(type, lowSent);
    }

    function initUpdate() {
        let uniqArrayRecipes = [];
        if (newArrayRecipes.length <= 0) {
            uniqArrayRecipes = arrayRecipies;
        }else{
            uniqArrayRecipes = displayArray();
            pagination.newArray(uniqArrayRecipes);
            const btns = coloredBtn();
            btns.setValuesInArray();
        }
        update();
    }
    
    function searchIn(strArray, recipe, lowSent) {
        
        console.log(`${strArray}, ${lowSent}`)
        const strALen = strArray.length;
        const lowSentArray = lowSent.split(' ');
        const lowSentALen = lowSentArray.length;
        let count = 0 ;

        for (let i = 0; i < strALen; i++) {
            const str = strArray[i].split(' ');
            
            if(strArray[i].match(lowSent)) {
                newArrayRecipes.push(recipe);
            }
            
            if (str.includes(lowSent)) {
                newArrayRecipes.push(recipe);
            }

            for (let z = 0; z < lowSentALen; z++) {
                const word = lowSentArray[z];
                if (str.includes(word)){
                    ++ count;
                }
            }
                
            if (count === lowSentALen) {
                newArrayRecipes.push(recipe);
                count = 0;
            }
        }
    }

    function launchSearch(type = null, lowSent) {
        let i = 0;
        const recepiesLen = arrayRecipies.length;
        
        for (; i < recepiesLen; i++) {
            const recipes = arrayRecipies[i];
            
            const title = recipes.childNodes[1].childNodes[0]
            .childNodes[0].textContent.toLowerCase();
            const ingredients = recipes.childNodes[1].childNodes[0]
            .childNodes[1].childNodes[0].textContent.toLowerCase();
            const desc = recipes.childNodes[1].childNodes[1]
            .childNodes[1].textContent.toLowerCase();
            const appliance = recipes.childNodes[2].childNodes[0]
            .textContent.toLowerCase();
            const ustensil = recipes.childNodes[2].childNodes[1].childNodes;
            const ustensilALen = ustensil.length;
            
            const strArray = new Array();
            if(type === 'ingredient'){
                console.log('ing '+ingredients)
                searchIn(['', ingredients], recipes, lowSent);
            } else if(type === 'appliance'){
                searchIn(['', appliance], recipes, lowSent);
            } else if(type === 'ustensil'){
                let z = 0;
                for (; z < ustensilALen; z++) {
                    const span = ustensil[z];
                    strArray.push(span.textContent);
                }
                searchIn(strArray, recipes, lowSent);    
            }else{
                strArray.push(title, ingredients, desc);
                searchIn(strArray, recipes, lowSent);
            }
        }
        initUpdate();
    }

    return {searchSentence, displayArray, divideAndConquer}
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