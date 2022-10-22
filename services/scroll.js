let pageHeight = window.innerHeight, currTask = 0, tasks = 3;
// let buttonTop = document.querySelector('[data-scroll="-"]');
// let buttonBottom = document.querySelector('[data-scroll="+"]');

function changeStatus(type) {
    let button = document.querySelector(`[data-scroll="${type}"]`);
    let max = type === '+' ? 3 : 0;

    if (currTask === max) {
        button.classList.add('disabled');
        button.setAttribute('disabled', 'disabled');
    }
    else {
        button.classList.remove('disabled');
        button.removeAttribute('disabled', 'disabled');
    }
}

document.querySelectorAll('.arrow').forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('disabled') !== 'disabled') {
        currTask += Number(`${button.dataset.scroll}1`);
        changeStatus(button.dataset.scroll);
    }

    window.scrollTo(0, (currTask * pageHeight));
}))