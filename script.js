// Change between pages

function showPage(page) {

    document.getElementById("home").classList.add("hidden");
    document.getElementById("about").classList.add("hidden");
    document.getElementById("contact").classList.add("hidden");

    document.getElementById(page).classList.remove("hidden");


    let buttons = document.querySelectorAll("nav button");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });


    if (page === "home") {
        buttons[0].classList.add("active");
    }

    if (page === "about") {
        buttons[1].classList.add("active");
    }

    if (page === "contact") {
        buttons[2].classList.add("active");
    }

}



// Send question

function sendQuestion() {

    let question =
        document.getElementById("question").value.trim();


    if (question === "") {

        alert("Please enter your question.");

        return;

    }


    let answer =
        document.getElementById("answer");


    answer.innerHTML = `
        <div class="message">

            <b>Your Question:</b>

            <p>${question}</p>

            <br>

            <b>MediKiosk:</b>

            <p>
                Your answer will appear here
                after the AI backend is connected.
            </p>

        </div>
    `;


    document.getElementById("question").value = "";

}



// Enter key

document
    .getElementById("question")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            sendQuestion();

        }

    });



// Upload file

function uploadFile() {

    document
        .getElementById("fileInput")
        .click();

}


document
    .getElementById("fileInput")
    .addEventListener("change", function() {

        let file = this.files[0];

        if (file) {

            alert(
                "File selected: " + file.name
            );

        }

    });



// Voice recognition

let SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    let recognition =
        new SpeechRecognition();


    recognition.lang = "en-IN";


    function startListening() {

        recognition.start();

    }


    recognition.onstart = function() {

        document
            .getElementById("mic")
            .classList.add("listening");


        document
            .getElementById("title")
            .innerText = "Listening...";


        document
            .getElementById("status")
            .innerText =
                "Speak your question";

    };


    recognition.onresult = function(event) {

        let text =
            event.results[0][0].transcript;


        document
            .getElementById("question")
            .value = text;


        document
            .getElementById("title")
            .innerText = "Got it!";


        document
            .getElementById("status")
            .innerText =
                "Press send to continue";

    };


    recognition.onend = function() {

        document
            .getElementById("mic")
            .classList.remove("listening");

    };


    recognition.onerror = function() {

        document
            .getElementById("title")
            .innerText = "Tap to Speak";


        document
            .getElementById("status")
            .innerText =
                "Try speaking again";

    };

}


else {

    function startListening() {

        alert(
            "Voice recognition is not supported by this browser."
        );

    }

}