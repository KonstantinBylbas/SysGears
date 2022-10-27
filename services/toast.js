toast.addEventListener('click', () => hideToast());

function showToast(type, txt) {
    hideToast();
    
    toast.classList.add('show');
    toast.classList.add(type);
    toast.innerText = txt;

    setTimeout(() => {
        hideToast();
    }, 10000)
}

function hideToast() {
    ['show', 'success', 'error'].forEach(cls => toast.classList.remove(cls));
}