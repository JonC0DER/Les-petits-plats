const content = document.querySelector('main.gallerie_recipies');
const infoPage = document.querySelector('.page_info');
const arrayRecipies = new Array();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRecipes() {
    const datas = new GetData('initFirst');
    const recipiesDatas = datas.recipes;
    
    return initRecipes(recipiesDatas);
}

function initRecipes(recipiesDatas) {
    recipiesDatas.forEach(async (recipie) => {
        const card = new RecipiesCardFactory(recipie);
        if (card !== null) {    
            arrayRecipies.push(card.buildCard);
        }
    });
    
    return arrayRecipies.length <= 0 ? false : true;
}

loadedRecipes = false;
setTimeout(function() {
    getRecipes();
    console.log('first')
    update()
},1000)
document.addEventListener('DOMContentLoaded', function(){
    getRecipes();
    console.log('second')
})

const pagination = new Pagination(arrayRecipies);    
function update() {    
    pagination.displayRecipies();
    content.innerHTML = pagination.pageContent;
    infoPage.textContent = pagination.pageInfo;
    console.log('third')
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


const btnsColoed = document.querySelectorAll('div.list_nav');
const spanTime = 200;
const btnTime = 200;
function closeAllcoloredBtn() {
    let count = 0;
    btnsColoed.forEach(async btn => {
        if (btn.classList.contains('deploy')) {
            btn.children[1].childNodes.forEach(span => {
                span.classList.add('reversetrans');
            })
            await sleep(spanTime);
            btn.children[1].childNodes.forEach(span => {
                span.classList.remove('reversetrans');
            })
            await sleep(spanTime);
            btn.classList.add('colorbtn-anim-close');
            btn.children[1].classList.add('colorbtn-anim-close');
            btn.classList.remove('deploy');
            await sleep(btnTime);
            btn.children[1].classList.remove('colorbtn-anim-close');
            btn.classList.remove('colorbtn-anim-close');
            btn.children[1].classList.remove('deploy-content');
            btn.classList.remove('deploy_radius');
            btn.children[1].classList.add('hide-elem');
        }
        count ++;
    })
    return btnsColoed.length === count;
}

btnsColoed.forEach(btn => {
    btn.addEventListener('click', async function() {
        closeAllcoloredBtn();
        if (!btn.classList.contains('deploy')) { 
            // OPEN !
            btn.children[1].classList.remove('hide-elem');
            btn.children[1].classList.add('colorbtn-anim-open');
            btn.classList.add('colorbtn-anim-open');
            btn.classList.add('deploy');
            btn.classList.add('deploy_radius');
            btn.children[1].classList.add('deploy-content');
            await sleep(btnTime);
            btn.children[1].childNodes.forEach(span => {
                span.classList.add('animtrans');
            })
            await sleep(spanTime);
            btn.children[1].childNodes.forEach(span => {
                span.classList.remove('animtrans');
            })
            await sleep(spanTime);
            btn.classList.remove('colorbtn-anim-open');
            btn.children[1].classList.remove('colorbtn-anim-open');
        }else{ 
            // CLOSE !
            closeAllcoloredBtn();
        }
        
    })
})