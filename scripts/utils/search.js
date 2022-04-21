function searchRecipes(sentence){
    const lowSent = sentence.toLowerCase()
    const newArrayRecipes = new Array();

    function searchIn(strArray, recipe) {
        strArray.forEach(str => {
            if (str.search(lowSent) > 0) {
                newArrayRecipes.push(recipe);
            }
        })
    }

    function isInclude(strArray, recipe) {
        strArray.forEach(str => {
            const array = str.split(' ');
            if (array.includes(lowSent)) {
                newArrayRecipes.push(recipe);
            }
        })        
    }

    arrayRecipies.forEach(recipes =>{
        const title = recipes.childNodes[1].childNodes[0]
            .childNodes[0].textContent.toLowerCase();
        const ingredients = recipes.childNodes[1].childNodes[0]
            .childNodes[1].textContent.toLowerCase();
        const desc = recipes.childNodes[1].childNodes[1]
            .childNodes[1].textContent.toLowerCase();
        
        const strArray = [title, ingredients, desc];

        searchIn(strArray, recipes);
        isInclude(strArray, recipes);
    })

    let uniqArrayRecipes = [];
    if (newArrayRecipes.length <= 0) {
        uniqArrayRecipes = arrayRecipies;
    }else{
        uniqArrayRecipes = [... new Set(newArrayRecipes)];
        pagination.newArray(uniqArrayRecipes);
        const btns = coloredBtn();
        btns.setValuesInArray()
    }
    update();
}

const search_input = document.querySelector('input.search_recipes');
search_input.addEventListener('input', function (evt) {
    if (this.value.length >= 3) {   
        searchRecipes(this.value);
    }
});

const search_btn = document.querySelector('div.search');
search_btn.addEventListener('click', function(){
    searchRecipes(search_input.value);
})
