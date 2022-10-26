const sorting = /^{"data":\[(,{0,49}{"user":"[A-z0-9@_.]{3,30}","rating":[0-9]{1,5},"disabled":[a-z]{4,5}}){1,50}\],"condition":{"[A-z_]{0,20}":[a-z0-9"_:,\[\]{}]{0,200}}{1,10}}/;
let tmp, result, _arr = [];

sort.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.data.value.match(sorting) !== null) {
        condition = JSON.parse(form.data.value).condition;
        result = Object.values(JSON.parse(form.data.value).data);

        Object.keys(condition).forEach((_condition, i = 0) => {
            if (Object.values(_condition)[i])
                operations(_condition, Object.values(condition)[i]);
        });

        showToast('success', `Результат:\n ${JSON.stringify(result)}`);
    }
    else
        showToast('error', 'Помилка!\nВведені дані не відповідають формату ...');
}

function operations(type, parameters) {
    _arr = [];

    switch (type) {
        case 'include':
            //  {"data":[{"user":"1qw@mail","rating":20,"disabled":true},{"user":"058qw@mail","rating":20,"disabled":false},{"user":"q345wer@test.com","rating":5,"disabled":true},{"user":"qwerty@test.com","rating":100,"disabled":true},{"user":"name321@test.com","rating":50,"disabled":true},{"user":"123www@outlook","rating":37,"disabled":false}],"condition":{"include":{"disabled":true},"sort_by":["rating"]}}

            Object.keys(parameters).forEach((parameter, i = 0) => {
                result.forEach((user, n = 0) => {
                    Object.keys(user).forEach((userParameter, k = 0) => {
                        if (parameter === userParameter && Object.values(parameters)[i] === Object.values(user)[k])
                            _arr.push(result[n]);
                    })
                })
            })

            if (_arr) {
                tmp = result;
                result = [];
            }

            tmp.forEach(user => {
                if (_arr.filter(_user => _user.user === user.user).length === Object.keys(parameters).length)
                    result.push(user);
            });
            break;

        case 'exclude':
            //  {"data":[{"user":"1qw@mail","rating":20,"disabled":true},{"user":"058qw@mail","rating":20,"disabled":false},{"user":"q345wer@test.com","rating":5,"disabled":true},{"user":"qwerty@test.com","rating":100,"disabled":true},{"user":"name321@test.com","rating":50,"disabled":true},{"user":"123www@outlook","rating":37,"disabled":false}],"condition":{"exclude":{"rating":20,"rating":100},"sort_by":["rating"]}}

            Object.keys(parameters).forEach((parameter, i = 0) => {
                result.forEach((user, n = 0) => {
                    Object.keys(user).forEach((userParameter, k = 0) => {
                        if (parameter === userParameter && Object.values(parameters)[i] === Object.values(user)[k])
                            _arr.push(result[n]);
                    })
                })
            })

            if (_arr) {
                tmp = result;
                result = [];
            }

            tmp.forEach(user => {
                if (!_arr.find(_user => _user === user))
                    result.push(user);
            });

            break;

        case 'sort_by':
            //  {"data":[{"user":"1qw@mail","rating":20,"disabled":true},{"user":"058qw@mail","rating":20,"disabled":false},{"user":"q345wer@test.com","rating":5,"disabled":true},{"user":"qwerty@test.com","rating":100,"disabled":true},{"user":"name321@test.com","rating":50,"disabled":true},{"user":"123www@outlook","rating":37,"disabled":false}],"condition":{"include":{"disabled":true},"sort_by":["rating","disabled"]}}

            result.sort((a, b) => {
                let sp = parameters.find(parameter => a[parameter] - b[parameter]);
                return a[sp] - b[sp];
            });
            break;
    }
}