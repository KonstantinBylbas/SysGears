const re = /^({"distance": {"unit": "{1})/;

const defaultRules = [
    {unit: 'm', cmIn: 100},
    {unit: 'cm', cmIn: 1},
    {unit: 'in', cmIn: 2.54},
    {unit: 'ft', cmIn: 30.48}
]

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
    console.log(form.rule.value.match(re) !== null);
}