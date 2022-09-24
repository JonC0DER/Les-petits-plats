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
    function divideAndConquer(key, initSentence, dictionnary) {
        let initStart = 0;
        let initEnd = dictionnary.length -1;
        resetArray();
        
        function begin(arrayToDivide, start, end, sentences){
            if(start > end) return false;
            // const transformArray = arrayToDivide.slice(start, end);
            const transformArray = arrayToDivide;
            const midIndex = Math.floor((start + end)/2);
            const wordSelected = transformArray[midIndex][key];
            let currentWordPos;
            const sentencesLen = sentences.length;
            for (let sentI = 0; sentI < sentencesLen; sentI++) {
                const sentence = sentences[sentI];
                currentWordPos = sentence.localeCompare( wordSelected, 'fr', {sensitivity:'base'});
                if (currentWordPos === 0) { 
                    transformArray[midIndex]['indexes'].forEach(index => {
                        newArrayRecipes.push(arrayRecipies[index]);
                    })
                }
                newArrayRecipes.forEach(elem => {
                    const stringArray = elem.children[1].children[0].children[0].textContent.toLowerCase().split(' ');
                    if (!stringArray.includes(sentence)) {
                        newArrayRecipes.splice(newArrayRecipes.indexOf(elem), 1);
                    }
                })
            }
            console.log(newArrayRecipes);
            // console.log(`${sentence} ${wordSelected}`)
            initUpdate();
            
            if (currentWordPos < 0) { 
                return begin(transformArray, start, midIndex - 1, sentences);
            }else{ 
                return begin(transformArray, midIndex + 1, end, sentences); 
            }
        }
        
        begin(dictionnary, initStart, initEnd, initSentence);
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

    function searchInLib(input, lib){
        for (const key in lib) {
            if (lib.hasOwnProperty(input)) {
                return lib[input];
            }
        }
    }
    
    function searchSentence(sentence, type = null, precise = false) {
        resetArray();
        const lib = {name: dict, ingredient: ingredientDict, appliance: applianceDict, ustensil: ustensilDict};    
        const lowSent = sentence.trim().toLowerCase().split(' ');
        const libItem = searchInLib(type, lib);
        divideAndConquer(type, lowSent, libItem);
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
            btns.reloadAll();
        }
        update();
    }
    
    return {searchSentence, displayArray, divideAndConquer, getPreciseArray, removeSentence}
}

const search_input = document.querySelector('input.search_recipes');
const searchForRecepies = searchRecipes();
search_input.addEventListener('input', function (evt) {
    if (this.value.length > 2) {   
        //searchForRecepies.divideAndConquer('name', this.value);
        searchForRecepies.searchSentence(this.value, 'name');
    }
    else if(this.value.length < 3){
        pagination.newArray(arrayRecipies);
        update();
    }
});

const search_btn = document.querySelector('div.search');
search_btn.addEventListener('click', function(){
    //searchForRecepies.divideAndConquer('name',search_input.value);
    searchForRecepies.searchSentence(search_input.value, 'name');
});

const tags = document.querySelector('div.tags');
const specificInput = document.querySelectorAll('.list_nav input[type=search]');
const specInputLen = specificInput.length;

for(let i = 0; i < specInputLen; ++i){
    const input = specificInput[i];
    input.addEventListener('input', function (evt) {
        if (this.value.length >= 3) {
            btns.searchInBtns(this.value, this.className);
        }
        else if(this.value.length < 3){
            btns.reloadAll();
            pagination.newArray(arrayRecipies);
            update();
        }
    })
}