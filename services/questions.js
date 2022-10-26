const questionsPattern = /^\[({"id":[0-9]{1,3},"question":"[A-z ?]{5,99}","answers":\[[A-z ",]{2,50}\],"nextQuestionsId":\[[0-9,]{0,7}\]},{0,99}){1,99}\]/;
let task4result, task4data;

questions.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    //  [{"id":0,"question":"What is your marital status?","answers":["Single","Married"],"nextQuestionsId":[1,2]},{"id":1,"question":"Are you planning on getting married next year?","answers":["Yes","No"],"nextQuestionsId":[]},{"id":2,"question":"How long have you been married?","answers":["Less than a year","More than a year"],"nextQuestionsId":[0,3]},{"id":3,"question":"Have you celebrated your one year anniversary?","answers":["Yes","No"],"nextQuestionsId":[]}]

    if (form.data.value.match(questionsPattern) !== null) {
        task4result = [];
        task4data = JSON.parse(form.data.value);

        createPath(task4data[0]);
        console.log(task4result);

        showToast('success', `Результат:\n ${JSON.stringify(task4result)}`);
    }
    else
        showToast('error', 'Помилка!\nВведені дані не відповідають формату ');
}

function createPath(elem) {
    elem.answers.forEach((answer, i = 0) => {
        task4result.push({ question: elem.question, answer: answer });
        if (elem.nextQuestionsId.length) {
            

            if (elem.nextQuestionsId[i] !== 0)
                createPath(task4data[elem.nextQuestionsId[i]]);
        }
        else {
            // elem.answers.forEach(_answer => task4result.push({ question: elem.question, _answer: _answer }));
        }
    })
}