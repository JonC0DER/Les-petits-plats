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

    // fonction principal de recherche binaire (branche binarysearch)
    function divideAndConquer(key, initSentence) {
        let initStart = 0;
        let initEnd = dict.length -1;
        resetArray();

        function begin(arrayToDivide, start, end, sentence){
            if(start > end) return false;
            //const transformArray = arrayToDivide.slice(start, end);
            const transformArray = arrayToDivide;
            const midIndex = Math.floor((start + end)/2);
            const wordSelected = transformArray[midIndex][key];
            
            const currentWordPos = sentence.localeCompare( wordSelected, 'fr', {sensitivity:'base'});
            console.log(`${sentence} ${wordSelected}`)
            
            if (currentWordPos === 0) { 
                transformArray[midIndex]['indexes'].forEach(index => {
                    newArrayRecipes.push(arrayRecipies[index]);
                })
                initUpdate();
                return true; 
            }
            else if (currentWordPos < 0) { 
                return begin(transformArray, start, midIndex - 1, sentence);
            }else{ 
                return begin(transformArray, midIndex + 1, end, sentence); 
            }
        }
        
        console.log(begin(dict, initStart, initEnd, initSentence));
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
    
    return {searchSentence, displayArray, divideAndConquer, getPreciseArray, removeSentence}
}

const search_input = document.querySelector('input.search_recipes');
const searchForRecepies = searchRecipes();
search_input.addEventListener('input', function (evt) {
    if (this.value.length > 2) {   
        //searchForRecepies.searchSentence(this.value);
        searchForRecepies.divideAndConquer('name', this.value);
    }
    else if(this.value.length < 3){
        pagination.newArray(arrayRecipies);
        update();
    }
});

const search_btn = document.querySelector('div.search');
search_btn.addEventListener('click', function(){
    //searchForRecepies.searchSentence(search_input.value);
    searchForRecepies.divideAndConquer('name',search_input.value);
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