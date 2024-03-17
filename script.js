(() => {
    // TODO: Make this dynamic
    const answerCount = 5;

    setTimeout(() => {
        const questions = [];
        const answers = [];

        document.querySelectorAll('[role="heading"]').forEach((el) => {
            const elementId = el.id;
            const question = el.querySelector('span');
            if (question) {
                questions.push({id: elementId, question: question.innerText});
            }
        });

        document.querySelectorAll('.docssharedWizToggleLabeledContainer').forEach((el) => {
            const answer = el.querySelector('span');
            if (answer) {
                answers.push(answer.innerText);
            }
        });

        const questionAnswers = [];
        let questionIndex = 0;
        let answerIndex = 0;

        for (let i = 0; i < questions.length * answerCount; i++) {
            if (answerIndex === answerCount) {
                answers.splice(0, answerCount);
                questionIndex++;
                answerIndex = 0;
            }

            if (!questionAnswers[questionIndex]) {
                questionAnswers[questionIndex] = {
                    question: questions[questionIndex].question,
                    answers: []
                }
            }

            questionAnswers[questionIndex].answers.push(answers[answerIndex]);

            answerIndex++;
        }

        if (questionAnswers.length < 15) {
            return;
        }

        // Download the JSON file
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questionAnswers));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "answers.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }, 500);
})();
