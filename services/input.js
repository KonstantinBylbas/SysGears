document.querySelectorAll('input[type="text"]').forEach(input => input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9A-z{}@\[\]:",._]/g, '');
}))