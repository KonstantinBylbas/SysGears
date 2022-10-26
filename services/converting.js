const convertingPattern = /^({"distance":{"unit":")([A-z]{1,3})(","value":)([0-9].{0,5})(},"convert_to":")([A-z]{1,3})("})/;

convert.onsubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    if (form.data.value.match(convertingPattern) !== null) {
        let result = 0, data, from, to, rules;

        data = JSON.parse(form.data.value);
        rules = JSON.parse(localStorage.getItem('defaultRules'));
        from = rules.find(rule => rule.unit === data.distance.unit).cmIn;
        to = rules.find(rule => rule.unit === data.convert_to).cmIn;

        result = data.distance.value * from / to;
        showToast('success', `Результат:\n ${result}`);
    }
    else
        showToast('error', 'Помилка!\nВведені дані не відповідають формату {"distance":{"unit":"m","value":1.5},"convert_to":"ft"}');
}