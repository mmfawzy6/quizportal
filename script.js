document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const questions = XLSX.utils.sheet_to_json(sheet);

        displayQuestions(questions);
    }

    reader.readAsArrayBuffer(file);
}

function displayQuestions(questions) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <h3>Question ${index + 1}</h3>
            <p>${question.question}</p>
            <ul>
                <li>${question.option1}</li>
                <li>${question.option2}</li>
                <li>${question.option3}</li>
                <li>${question.option4}</li>
            </ul>
            <p>Correct Answer: ${question.correct}</p>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}
