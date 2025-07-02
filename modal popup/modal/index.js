const btn = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const clsBtn = document.querySelector('.close-btn');

function toggleModal (){
    return modal.classList.toggle('show-modal');
}

function windowOnClick(event){
    if(event.target === modal){
        toggleModal();
    }
}

btn.addEventListener('click', toggleModal);
clsBtn.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);