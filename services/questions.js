const questionsPattern = /^\[({"id":[0-9]{1,3},"question":"[A-z ?]{5,99}","answers":\[[A-z ",]{2,50}\],"nextQuestionsId":\[[0-9,]{0,7}\]},{0,99}){1,99}\]/;
let task4_result, task4_data;

// [{"id":0,"question":"What is your marital status?","answers":["Single","Married"],"nextQuestionsId":[1,2]},{"id":1,"question":"Are you planning on getting married next year?","answers":["Yes","No"],"nextQuestionsId":[]},{"id":2,"question":"How long have you been married?","answers":["Less than a year","More than a year"],"nextQuestionsId":[0,3]},{"id":3,"question":"Have you celebrated your one year anniversary?","answers":["Yes","No"],"nextQuestionsId":[]}]

questions.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.data.value.match(questionsPattern) !== null) {
        task4_result = [];
        task4_data = JSON.parse(form.data.value);

        createPath(task4_data[0]);
        task4_result = {paths: {number: task4_result.filter(elem => elem.question === task4_data[0].question).length, list:task4_result}}
        console.log(task4_result);

        showToast('success', `Завдання №4. Результат:\n ${JSON.stringify(task4_result)}`);
    }
    else
        showToast('error', 'Помилка!\nВведені дані не відповідають формату [\n{"id":0,"question":"What is your marital status?","answers":["Single","Married"],"nextQuestionsId":[1,2]},\n{"id":1,"question":"Are you planning on getting married next year?","answers":["Yes","No"],"nextQuestionsId":[]}\n]');
}

function createPath(elem, prevQuestion) {
    elem.answers.forEach((answer, i = 0) => {
        if (elem.nextQuestionsId.length) {

            if (prevQuestion && (elem.nextQuestionsId[i] !== 0 || !task4_data[elem.nextQuestionsId[i]].nextQuestionsId.length)) {
                task4_result.push(prevQuestion);
                task4_result.push({ question: elem.question, answer: answer });
            }
            else
                task4_result.push({ question: elem.question, answer: answer });

            if (elem.nextQuestionsId[i] !== 0)
                createPath(task4_data[elem.nextQuestionsId[i]], !prevQuestion ? { question: elem.question, answer: answer } : '');

            if (!task4_data[elem.nextQuestionsId[i]].nextQuestionsId.length)
                task4_result.push({ question: task4_data[elem.nextQuestionsId[i]].question, answer: `${task4_data[elem.nextQuestionsId[i]].answers[0]}/${task4_data[elem.nextQuestionsId[i]].answers[1]}` });
        }
    })
}