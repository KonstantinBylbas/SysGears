function showToast(type, txt){
    toast.classList.add('show');
    toast.classList.add(type);
    toast.innerText = txt;

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.remove(type);
    },7000)
}