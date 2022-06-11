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

function getDictWordPos(word) {
    let i = 0;
    const dictLen = dict.length;
    for (; i < dictLen; i++) {
        const elem = dict[i];
        
        if (elem['name'].match(word)) {
            return elem;
        }
    }
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
            const lastCharIndex = word.length - 1;
            const dictLen = dict.length;
            const matchArray = getDictWordPos(word);
            //console.log(matchArray)
            let compareWord = false;
            let singulierPluriel = false;
            let a = 0;
            let dictElem = null;
            
            for (; a < dictLen; a++) {
                if(dict[a]['name'].localeCompare(word, 'fr', {sensitivity:'base'}) === 0){
                    compareWord = true;
                    break;
                }
            }

            dict.filter(dictWord => {
                const lastChar = [word.slice(-1), dictWord['name'].slice(-1)];

                if (lastChar.includes('s')) {
                    const wordLen = word.length;
                    const dLen = dictWord['name'].length;
                    const dwordSing = dictWord['name'].slice(0, -1);
                    const wordSing = word.slice(0, -1);
                    
                    if ((dLen === wordLen + 1 && dwordSing === word) 
                    || (dLen + 1 === wordLen && dictWord['name'] === wordSing)){
                        //console.log(`${dictWord['name']} ${wordSing} :: ${dwordSing} ${word}`)
                        singulierPluriel = true;
                        dictElem = dictWord;
                    }
                }
            });
            
            if (singulierPluriel) {
                //console.log(dictElem)
                dict[dict.indexOf(dictElem)]['indexes'].push(recipeIndex);
            }
            else if (dictLen > 0 && compareWord){
                //console.log(`${dict[a]['name']} ${word} ${dict.indexOf(dict[a])}`)
                dict[dict.indexOf(dict[a])]['indexes'].push(recipeIndex);
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
