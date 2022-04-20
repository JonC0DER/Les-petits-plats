class RecipiesCardFactory {

    constructor(recipesCard){
        this._recipesCard = recipesCard;
    }
//function RecipiesCardFactory(recipesCard){
    
    get randomItem(){
    //function randomItem() {
        const Items = [
            'https://img.cuisineaz.com/610x610/2016-02-09/i8552-curry-rouge-thai-aux-crevettes.jpeg',
            'https://i.pinimg.com/originals/83/c8/51/83c851d0cdd992995c077a1a85577b31.jpg',
            'https://img.mesrecettesfaciles.fr/2020-12/cocktail-de-noel-1.jpg',
            'https://i.pinimg.com/736x/e2/33/06/e23306b49a85da8ea8fdd53a574a26dc.jpg',
            'https://recettes-light.fr/wp-content/uploads/2010/06/Fotolia_10194783_XS.jpg',
            'http://www.cuisineetsentiments.com/images/recette-aubergine_9.jpg',
            'https://www.recette-de-salade.com/wp-content/uploads/2012/01/salade-au-chevre-chaud.jpg',
            'https://youcookcuisine.com/wp-content/uploads/2019/01/piemontaise-revisitee-4-400x400.jpg',
            'https://media.houra.fr/images/widget/recette/gd_recette_filet_boeuf.jpg',
            'https://www.toques2cuisine.com/wp-content/uploads/2012/11/CANETTE-AU-CIDRE-089.jpg',
            'http://www.cuisineetsentiments.com/images/recette-cuisse-de-poulet_2.jpg'
        ];
        return Items[Math.floor(Math.random()*Items.length)];
    }

    get buildCard(){
    //function buildCard() {
        const article = document.createElement('article');
        article.classList.add('recipe_card','card');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = this.randomItem;
        //img.src = randomItem();
        figure.appendChild(img);

        const divRecipe = document.createElement('div');
        divRecipe.classList.add('recipe', 'card-body');

        const divNameIng = document.createElement('div');
        divNameIng.classList.add('name_ingredients');
        const h4Name = document.createElement('h4');
        h4Name.classList.add('name','card-title');
        h4Name.textContent = this._recipesCard['name'];
        //h4Name.textContent = recipesCard['name'];
        const pIngredients = document.createElement('p');
        pIngredients.classList.add('ingredients', 'card-text');
        
        this._recipesCard['ingredients'].forEach(ingredient =>{
        //recipesCard['ingredients'].forEach(ingredient =>{
            const br = document.createElement('br');
            const strong = document.createElement('strong');
            strong.textContent = ingredient['ingredient'];
            const span = document.createElement('span');

            if (ingredient['quantity']) {
                let qtyUnit = ingredient['quantity'];
                if (ingredient['unit']) {
                    qtyUnit += ' ' + ingredient['unit'];
                }
                span.textContent = qtyUnit;
            }
            pIngredients.appendChild(strong);
            pIngredients.appendChild(span);
            pIngredients.appendChild(br);
        })

        divNameIng.appendChild(h4Name);
        divNameIng.appendChild(pIngredients);

        const divTimeDesc = document.createElement('div');
        divTimeDesc.classList.add('time_description');
        const h4Time = document.createElement('h4');
        h4Time.classList.add('time');
        const iconTime = document.createElement('i');
        iconTime.classList.add('far', 'fa-clock');
        const minutes = document.createElement('span');
        minutes.classList.add('minutes');
        minutes.textContent = this._recipesCard['time'] + ' min';
        //minutes.textContent = recipesCard['time'] + ' min';
        h4Time.appendChild(iconTime);
        h4Time.appendChild(minutes);
        const pDesc = document.createElement('p');
        pDesc.classList.add('description', 'card-text');
        pDesc.textContent = this._recipesCard['description'];
        //pDesc.textContent = recipesCard['description'];

        const appliance = document.createElement('div');
        appliance.classList.add('appliance', 'hide-elem');
        appliance.textContent = this._recipesCard['appliance'];

        const ustensils = document.createElement('div');
        ustensils.classList.add('ustensils', 'hide-elem');
        this._recipesCard['ustensils'].forEach(ustensil => {
            const spanUstensil = document.createElement('span');
            spanUstensil.textContent = ustensil;
            ustensils.appendChild(spanUstensil);
        })

        const utilApp = document.createElement('div');
        utilApp.classList.add('utilApp');
        utilApp.appendChild(appliance);
        utilApp.appendChild(ustensils);

        divTimeDesc.appendChild(h4Time);
        divTimeDesc.appendChild(pDesc);

        divRecipe.appendChild(divNameIng);
        divRecipe.appendChild(divTimeDesc);

        article.appendChild(figure);
        article.appendChild(divRecipe);
        article.appendChild(utilApp);

        return (article);
    }

    //return {buildCard}
}