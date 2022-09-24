// new factorie by joncoder
const content = document.querySelector('main.gallerie_recipies');
const infoPage = document.querySelector('.page_info');
const arrayRecipies = new Array();
const btns = coloredBtn();
let recipiesDatas, preciseArrayRecipies;
let dict = [], applianceDict = [], ustensilDict = [], ingredientDict = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRecipes() {

    const datas = new GetData('initFirst');
    recipiesDatasUnsorted = datas.recipes;

    recipiesDatas = recipiesDatasUnsorted.sort(
        (a, b) => a.name.localeCompare(
            b.name, 'fr', 
            {sensitivity: 'base', ignorePonctuation:true}
        )
    );

    return initRecipes(recipiesDatas);
}

function getDictWordPos(word, dictionnary, key) {
    let i = 0;
    const dictLen = dictionnary.length;
    for (; i < dictLen; i++) {
        const elem = dictionnary[i];
        
        if (elem[key].match(word)) {
            return elem;
        }
    }
}

function singulierPlurielFilter(paramsArray){
    const dictionnary = paramsArray[0];
    const recipieWordInSentence = paramsArray[1]; 
    const dictionnaryIndex = paramsArray[2]; 
    const recipeIndexSet = paramsArray[3];
    const boolCompare = paramsArray[4];

    const dictionnaryLen = dictionnary.length;
    let singulierPluriel = false;
    let dictElem = null;
    
    dictionnary.filter(dictWord => {
        const lastChar = [recipieWordInSentence.slice(-1), dictWord['name'].slice(-1)];
    
        if (lastChar.includes('s')) {
            const wordLen = recipieWordInSentence.length;
            const dLen = dictWord['name'].length;
            const dwordSing = dictWord['name'].slice(0, -1);
            const wordSing = recipieWordInSentence.slice(0, -1);
            
            if ((dLen === wordLen + 1 && dwordSing === recipieWordInSentence) 
            || (dLen + 1 === wordLen && dictWord['name'] === wordSing)){
                //console.log(`${dictWord['name']} ${wordSing} :: ${dwordSing} ${word}`)
                singulierPluriel = true;
                dictElem = dictWord;
            }
        }
    });
    
    if (singulierPluriel) {
        //console.log(dictElem)
        dictionnary[dictionnary.indexOf(dictElem)]['indexes'].push(recipeIndexSet);
    }
    else if (dictionnaryLen > 0 && boolCompare){
        //console.log(`${dict[a]['name']} ${word} ${dict.indexOf(dict[a])}`)
        dictionnary[dictionnary.indexOf(dictionnary[dictionnaryIndex])]['indexes'].push(recipeIndexSet);
    }
    else if (recipieWordInSentence.length > 2) {
        const indexes = new Array();
        
        indexes.push(recipeIndexSet);                 
        dictionnary.push({name: recipieWordInSentence, indexes: indexes});         
    }

    //return dictionnary;
}
                    
function initRecipes(recipiesDatas) {

    const setRecipiesArray = async (recipie) => {
        const card = new RecipiesCardFactory(recipie);

        if (card !== null) {    
            arrayRecipies.push(card.buildCard);
        }
    }

    for (let i = 0; i < recipiesDatas.length; i++) {
        // index des recettes dans le tableau recipiesDatas
        const recipeIndex = recipiesDatas.indexOf(recipiesDatas[i]);
        //tableau de mots comosant le titre de la recette
        const words = recipiesDatas[i]['name'].toLowerCase().split(' ');
        
        // ingredient
        const arrayIngredient = recipiesDatas[i].ingredients;
        const arIngrLen = arrayIngredient.length;

        for (let indexIngrObj = 0; indexIngrObj < arIngrLen; indexIngrObj++) {
            const nameIngr = arrayIngredient[indexIngrObj]['ingredient'].toLowerCase();
            const nameIngrA = nameIngr.split(' ');
            const matchIngr = ingredientDict.filter(a => a['ingredient'].match(nameIngr));
            //const matchIngr = getDictWordPos(nameIngr, arrayIngredient, 'ingredient');
            let compareIngr = false;
            
            for(newIIngrObj = 0; newIIngrObj < arIngrLen; newIIngrObj++){
                const ingr = arrayIngredient[newIIngrObj]['ingredient'].toLowerCase();
                const ingrA = ingr.split(' ');
                if(ingr.localeCompare(nameIngr, 'fr', {sensitivity: 'base', ignorePonctuation: true}) === 0){
                    compareIngr = true;
                    break;
                } 
                /*ingrA.forEach(ingrWord => {
                    if (nameIngrA.includes(ingrWord)) {
                        //newSpanArray.push(span.textContent);
                        if (compareIngr && (ingredientDict.length > 0 && matchIngr.length > 0)) {
                            ingredientDict[ingredientDict.indexOf(matchIngr[0])]['indexes'].push(recipeIndex);
                        }else{
                            const indexes = new Array();
                            
                            indexes.push(recipeIndex);
                            ingredientDict.push({ingredient: nameIngr, indexes: indexes});
                        }
                    }
                });*/
                
                /*if ( nameIngr.search( ingr.toLowerCase() ) >= 0 ) {
                        if (compareIngr && (ingredientDict.length > 0 && matchIngr.length > 0)) {
                            ingredientDict[ingredientDict.indexOf(matchIngr[0])]['indexes'].push(recipeIndex);
                        }else{
                            const indexes = new Array();
                            
                            indexes.push(recipeIndex);
                            ingredientDict.push({ingredient: nameIngr, indexes: indexes});
                        }
                }*/
            }

            if (compareIngr && (ingredientDict.length > 0 && matchIngr.length > 0)) {
                ingredientDict[ingredientDict.indexOf(matchIngr[0])]['indexes'].push(recipeIndex);
            }else{
                const indexes = new Array();

                indexes.push(recipeIndex);
                ingredientDict.push({ingredient: nameIngr, indexes: indexes});
            }
        }
        // appliances
        //noms des appareil + filtre de charactères spéciaux
        const nameAppliance = recipiesDatas[i].appliance.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
        const matchAppliance = applianceDict.filter(a => a['appliance'].match(nameAppliance));
        
        //console.log('nameAppliance', matchAppliance);
        if (applianceDict.length > 0 && matchAppliance.length > 0) {
            applianceDict[applianceDict.indexOf(matchAppliance[0])]['indexes'].push(recipeIndex);
        }else{
            const indexes = new Array();
            
            indexes.push(recipeIndex);
            applianceDict.push({appliance: nameAppliance, indexes: indexes});
        }
        
        //ustensils
        const arrayUstensil = recipiesDatas[i].ustensils;
        const arUstLen = arrayUstensil.length;

        for (let ustIndex = 0; ustIndex < arUstLen; ustIndex++) {
            const nameUstensil = arrayUstensil[ustIndex];
            const matchUstensil = ustensilDict.filter(a => a['ustensil'].match(nameUstensil));

            let uDictIndex = 0;
            let compareUstensil = false;
            const uDLen = ustensilDict.length;

            for (; uDictIndex < uDLen; uDictIndex++) {
                const uElem = ustensilDict[uDictIndex];
                
                if(uElem['ustensil'].localeCompare(nameUstensil, 'fr', {sensitivity:'base'}) === 0){
                    compareUstensil = true;
                    break;
                }
            }

            if (compareUstensil || (ustensilDict.length > 0 && matchUstensil.length > 0)) {
                const ustensilIndex = ustensilDict.indexOf(ustensilDict[uDictIndex]);
                if(ustensilIndex > -1){
                    ustensilDict[ustensilDict.indexOf(ustensilDict[uDictIndex])]['indexes'].push(recipeIndex);
                }
            }else{
                const indexes = new Array();

                indexes.push(recipeIndex);
                ustensilDict.push({ustensil: nameUstensil, indexes: indexes});
            }
        }

        // titre de recette
        // dict
        for (let z = 0; z < words.length; z++) {
            const word = words[z].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
            const dictLen = dict.length;
            let a = 0;
            let compareWord = false;
            
            for (; a < dictLen; a++) {
                if(dict[a]['name'].localeCompare(word, 'fr', {sensitivity:'base'}) === 0){
                    compareWord = true;
                    break;
                }
            }

            singulierPlurielFilter([dict, word, a, recipeIndex, compareWord]);            
        }        
    }
    
    function sortClean(dictionnary, key) {
        dictionnary = [... new Set(dictionnary)];
        dictionnary.sort((a, b) => a[key].localeCompare(
            b[key], 'fr', {sensitivity: 'base', ignorePonctuation: true}
        ))
        return dictionnary;
    }

    dict = sortClean(dict, 'name');
    ingredientDict = sortClean(ingredientDict, 'ingredient');         
    applianceDict = sortClean(applianceDict, 'appliance');
    ustensilDict = sortClean(ustensilDict, 'ustensil');

    const recipiesDatasLen = recipiesDatas.length;

    for (let i = 0; i < recipiesDatasLen; i++) {
        const recipe = recipiesDatas[i];
        setRecipiesArray(recipe);
    }
    
    return arrayRecipies.length <= 0 ? false : true;
}

loadedRecipes = false;
setTimeout(function() {
    getRecipes();
    btns.reloadAll();
    //console.log('first')
    update()
},1000)
document.addEventListener('DOMContentLoaded', function(){
    getRecipes();
    //console.log('second')
})

const pagination = new Pagination(arrayRecipies);    
function update() {    
    pagination.displayRecipies();
    content.innerHTML = pagination.pageContent;
    infoPage.textContent = pagination.pageInfo;
    //console.log('third')
}

function firstPageRecipes() {
    pagination.firstPageRecipes()
    update()
}

function previousPage() {
    pagination.previousPage()
    update()
}

function nextPage() {
    pagination.nextPage()
    update()
}

function lastPageRecipes() {
   pagination.lastPageRecipes()
   update() 
}
