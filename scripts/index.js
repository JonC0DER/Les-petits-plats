function initRecipes() {
    const content = document.querySelector('main.gallerie_recipies');
    const datas = new GetData('initFirst');
    const recipiesDatas = datas.recipes;

    recipiesDatas.forEach(recipie => {
        const card = new RecipiesCardFactory(recipie);
        //console.log(card.buildCard);
        content.appendChild(card.buildCard);
    });
}
initRecipes();