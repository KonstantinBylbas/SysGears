const allSelects = document.querySelectorAll('.select');

allSelects.forEach(select => select.addEventListener('click', () => {
    let tmp = false;
    if (!select.classList.value.includes('open'))
        tmp = true;

    allSelects.forEach(select => select.classList.remove('open'));
    if (tmp)
        select.classList.add('open');
}));

document.querySelectorAll('.list p').forEach(elem => elem.addEventListener('click', () =>
    elem.parentElement.parentElement.children[0].innerText = elem.innerText
));