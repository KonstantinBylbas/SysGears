const rule = /^({"unit":")([a-z]{1,3})(","cmIn":)([0-9].{0,5})(})/;

const defaultRules = [
    { unit: 'm', cmIn: 100 },
    { unit: 'cm', cmIn: 1 },
    { unit: 'in', cmIn: 2.54 },
    { unit: 'ft', cmIn: 30.48 }
]

localStorage.setItem('defaultRules', JSON.stringify(defaultRules));

document.querySelectorAll('.list').forEach(list => {
    defaultRules.map(rule => {
        let tmp = document.createElement('p');
        tmp.innerText = rule.unit;
        list.append(tmp);
    })
})

addRule.onsubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    if (form.rule.value.match(rule) !== null) {
        defaultRules.push(JSON.parse(form.rule.value))
        localStorage.setItem('defaultRules', JSON.stringify(defaultRules));
        showToast('success', 'Нове правило успішно додано!');
    }
    else
        showToast('error', 'Помилка!\nВведені дані не відповідають формату {"unit":"m","cmIn":1.3}');
}