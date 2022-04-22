"use strict"

$(function () {

    let startBtn = $("#startBtn");
    let startPanel = $("#startPanel");
    let questionPanel = $("#questionPanel");
    let progressBar = $(".progress-bar");

    startBtn.on("click", function () {
        startPanel.addClass("d-none");
        questionPanel.css("display", "block");
    })


    class questionGame {
        questionNum = $("#questionNum");
        point = $("#point");
        questionText = $("#questionText");
        variantSection = $(".variant-section");
        letter = ["A", "B", "C"];
        count = 0;
        answerCount = 0;
        currentQuestion = '';
        correctAnswer = 0;
        percent = 0;
        questions = [
            {
                question: "What color is the sky?",
                answer: ["red", "black", "blue"],
                correct: "C",
            },
            {
                question: "What do you call people who are 18+?",
                answer: ["baby", "adult", "person"],
                correct: "B",
            },
            {
                question: "What color is the tree?",
                answer: ["purple", "brown", "green"],
                correct: "C",
            },
            {
                question: "Which is the most us level in English??",
                answer: ["C2", "A1", "B2"],
                correct: "A",
            },
            {
                question: "How many planets are our solar system",
                answer: ["8", "9", "7"],
                correct: "A",
            },
        ];

        showQuestion() {
            if (this.count < this.questions.length) {
                this.questionText.html(this.questions[this.count].question);
                this.currentQuestion = this.questions[this.count];

                this.count = this.count + 1;
                this.questionNum.html(this.count);
                for (let j = 0; j < this.letter.length; j++) {
                    var variant = $("<div>").addClass("col-4 variant-item").html(`
                <h4 class="variant${this.letter[j]}">${this.letter[j]})</h4>
                <p>${this.currentQuestion.answer[j]}</p>`);
                    this.variantSection.append(variant);
                }
            }
        }

        clearAnswer() {
            this.variantSection.html('');
        }

        verifyAnswer(userVariant) {
            this.answerCount = this.answerCount + 1;
            if (this.currentQuestion.correct === userVariant) {
                $(`.variant${userVariant}`).css({ "background-image": "linear-gradient(#00AB08, #00C301,  #26D701, #4DED30, #95F985, #B7FFBF)" });
                this.correctAnswer = this.correctAnswer + 1;
            } else {
                $(`.variant${userVariant}`).css({ "background-image": "linear-gradient(#8B0001, #9E1711, #B12E21, #C34632, #D65D42, #E97452)" })
            }
        }

        totalPoint() {
            if (this.answerCount === this.questions.length) {
                this.percent = this.correctAnswer / this.questions.length * 100;
                this.point.html(this.percent);
                startPanel.removeClass("d-none");
                questionPanel.css("display", "none");
                this.count = 0;
                this.answerCount = 0;
                this.correctAnswer = 0;
                progressBar.css({ width: "0px" });
            }
        }
    }


    let myGame = new questionGame();

    myGame.showQuestion();

    myGame.variantSection.on("click", () => alert('Please click one of the "A", "B" or "C" from the keyboard'))

    window.onkeypress = e => {
        var userVariant = e.key.toUpperCase();
        if (myGame.letter.indexOf(userVariant) === -1) {
            alert('Please click one of the "A", "B" or "C" from the keyboard');
        } else {
            var progressPercent = ($(".progress").width()) / myGame.questions.length;
            progressBar.animate({ width: `+=${progressPercent}` });
            myGame.verifyAnswer(userVariant);
            setTimeout(() => myGame.totalPoint(), 1000);
            setTimeout(() => {
                myGame.clearAnswer();
                myGame.showQuestion();
            }, 1000);
        }
    }
})