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
            let midIndex = Math.floor(arrayToDivide.length/2);

            let wordsArrayToDivide = arrayToDivide[midIndex][key].split(' ');
            let wordsArrayToDivideLength = wordsArrayToDivide.length;

            for(let index = 0; index < wordsArrayToDivideLength; index ++) {
                const word = wordsArrayToDivide[index];
                const currentWordBoolean = sentence.localeCompare(
                    word, 'fr',
                    {sensitivity:'base', ignorePonctuation:true}
                )

                if (currentWordBoolean === 0) { return true; }
                
                if (currentWordBoolean < 0) { 
                    return begin(arrayToDivide, start, midIndex - 1, sentence);
                }else{ 
                    return begin(arrayToDivide, midIndex + 1, end, sentence); 
                }
            }
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
        let count = 0;
        //console.log('strArray '+ strArray)
        strArray.forEach(str => {
            //console.log('str '+ str)
            lowSent.split(' ').forEach(word => {
                if (str.split(' ').includes(word)) {
                    count ++;
                }
                if (count === lowSent.split(' ').length) {
                    newArrayRecipes.push(recipe);
                    count = 0;
                }
            })
        })
    }

    function isInclude(strArray, recipe, lowSent) {
        strArray.forEach(str => {
            const array = str.split(' ');
            if (array.includes(lowSent)) {
                newArrayRecipes.push(recipe);
            }
        })        
    }

    function launchSearch(type = null, lowSent) {
        //console.log('type => '+ type) 
        arrayRecipies.forEach(recipes =>{
            const title = recipes.childNodes[1].childNodes[0]
            .childNodes[0].textContent.toLowerCase();
            const ingredients = recipes.childNodes[1].childNodes[0]
                .childNodes[1].textContent.toLowerCase();
            const desc = recipes.childNodes[1].childNodes[1]
                .childNodes[1].textContent.toLowerCase();
            const appliance = recipes.childNodes[2].childNodes[0]
                .textContent.toLowerCase();
            const ustensil = recipes.childNodes[2].childNodes[1].childNodes;
            
            const strArray = new Array();
            if(type === 'ingredient'){
                strArray.push(ingredients);
            } else if(type === 'appliance'){
                strArray.push(appliance);
            } else if(type === 'ustensil'){
                ustensil.forEach(span => {
                    strArray.push(span.textContent);
                })
            }else{
                strArray.push(title, ingredients, desc);
            }
            
            searchIn(strArray, recipes, lowSent);
            isInclude(strArray, recipes, lowSent);
        })

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

const btns = coloredBtn();
const specificInput = document.querySelectorAll('.list_nav input[type=search]');
specificInput.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.length > 2) {
            btns.searchInBtns(input.value, input.className);
        }
        else if(input.value.length < 3){
            btns.setValuesInArray(arrayRecipies);
        }
    })
});