const content = document.querySelector('main.gallerie_recipies');
const infoPage = document.querySelector('.page_info');
const arrayRecipies = new Array();
const btns = coloredBtn();
let recipiesDatas;

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
