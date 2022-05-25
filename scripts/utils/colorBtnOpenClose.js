const btnsColoed = document.querySelectorAll('div.list_nav');
const spanTime = 200;
const btnTime = 200;

function closeAllcoloredBtn() {
    let count = 0;
    btnsColoed.forEach(async btn => {
        const spanElem = btn.children[0];
        const formElem = btn.children[1];
        const listFloat = btn.children[2];
        const ulElem = listFloat.children[0];
        const spanElem2 = listFloat.children[1];

        if (btn.classList.contains('deploy')) {
            ulElem.childNodes.forEach(span => {
                span.classList.add('reversetrans');
            })
            await sleep(spanTime);
            ulElem.childNodes.forEach(span => {
                span.classList.remove('reversetrans');
            })
            await sleep(spanTime);
            btn.classList.add('colorbtn-anim-close');
            ulElem.classList.add('colorbtn-anim-close');
            btn.classList.remove('deploy');
            formElem.classList.add('hide-elem');
            await sleep(btnTime);
            ulElem.classList.remove('colorbtn-anim-close');
            btn.classList.remove('colorbtn-anim-close');
            ulElem.classList.remove('deploy-content');
            btn.classList.remove('deploy_radius');
            spanElem.classList.remove('hide-elem');
            listFloat.classList.add('hide-elem');
        }
        count ++;
    })
    return btnsColoed.length === count;
}

btnsColoed.forEach(btn => {
    const spanElem = btn.children[0];
    const formElem = btn.children[1];
    const listFloat = btn.children[2];
    const ulElem = listFloat.children[0];
    const spanElem2 = listFloat.children[1];
    
    spanElem.addEventListener('click', async function() {
        
        closeAllcoloredBtn();
        
        if (!btn.classList.contains('deploy')) { 
            // OPEN !
            listFloat.classList.remove('hide-elem');
            ulElem.classList.add('colorbtn-anim-open');
            spanElem.classList.add('hide-elem');
            btn.classList.add('colorbtn-anim-open');
            btn.classList.add('deploy');
            btn.classList.add('deploy_radius');
            ulElem.classList.add('deploy-content');
            formElem.classList.remove('hide-elem');
            await sleep(btnTime);
            ulElem.childNodes.forEach(span => {
                span.classList.add('animtrans');
            })
            await sleep(spanTime);
            ulElem.childNodes.forEach(span => {
                span.classList.remove('animtrans');
            })
            await sleep(spanTime);
            btn.classList.remove('colorbtn-anim-open');
            ulElem.classList.remove('colorbtn-anim-open');
        }
        
        //spanEvent();
    })

    spanElem2.addEventListener('click',function(){ 
        // CLOSE !
        closeAllcoloredBtn();
    })
})

function spanEvent() {
    const spansOpt = document.querySelectorAll('.list_options span');
    spansOpt.forEach(span => {
        span.addEventListener('click', launchEvent);
        //span.removeEventListener('click', launchEvent(this));
    })
}

