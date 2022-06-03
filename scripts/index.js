const content = document.querySelector('main.gallerie_recipies');
const infoPage = document.querySelector('.page_info');
const arrayRecipies = new Array();
const btns = coloredBtn();
let recipiesDatas; 
let preciseArrayRecipies;
let dict = new Array();
let applianceDict = new Array();

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

function initRecipes(recipiesDatas) {

    const setRecipiesArray = async (recipie) => {
        const card = new RecipiesCardFactory(recipie);

        if (card !== null) {    
            arrayRecipies.push(card.buildCard);
        }
    }

    for (let i = 0; i < recipiesDatas.length; i++) {
        const recipeIndex = recipiesDatas.indexOf(recipiesDatas[i]);
        const nameAppliance = recipiesDatas[i].appliance.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
        const matchAppliance = applianceDict.filter(a => a['appliance'].match(nameAppliance));
        const words = recipiesDatas[i]['name'].toLowerCase().split(' ');

        if (applianceDict.length > 0 && matchAppliance.length > 0) {
            applianceDict[applianceDict.indexOf(matchAppliance[0])]['indexes'].push(recipeIndex);
        }else{
            const indexes = new Array();

            indexes.push(recipeIndex);
            applianceDict.push({appliance: nameAppliance, indexes: indexes});
        }
        
        for (let z = 0; z < words.length; z++) {
            const word = words[z].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
            const matchArray = dict.filter(a => a['name'].match(word));
            const baseSensitive = dict.filter(a => a['name'].localeCompare(word, 'fr', {sensitivity:'base'}));

            if (dict.length > 0 && matchArray.length > 0 /*&& baseSensitive === 0*/) {
                dict[dict.indexOf(matchArray[0])]['indexes'].push(recipeIndex);
            }
            else if (word.length > 2) {
                const indexes = new Array();

                indexes.push(recipeIndex);
                dict.push({name: word, indexes: indexes});
            }
        }        
    }

    dict.sort((a,b) => a['name'].localeCompare(
        b['name'], 'fr', 
        {sensitivity:'base', ignorePonctuation:true}
    ))
    
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
    btns.setValuesInArray(arrayRecipies);
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
