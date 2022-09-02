var state = 0 // 0: Wating to start, 1: Running Test, 2: Test Finished
var isGreen = false
var output = ""
var testsRan = 0
var testsToRun = 5
var value = 0
var length = 5
var score = [],
    incorrectAnwsers = []

function randomBinary(binaryLength) {
    binary = "";
    for (let i = 0; i < binaryLength; ++i) {
        binary += Math.floor(Math.random() * Math.floor(2));;
    }
    return binary;
}

$(document).ready(function() {
    $("#mainButton").on("click", function() {
        switch (state) {
            case 0:
                $("body").removeClass("bg-red")
                $("body").removeClass("bg-green")
                value = randomBinary(length)
                $("#title").text(value)
                $("#info").html("<input type='text' class='form-control' id='anwser' placeholder='Decimal Value'>")
                $("#mainButton").text("Submit!")
                state = 1
                break;
            case 1:
                testsRan++

                anwser = parseInt(value, 2) == parseInt($("#anwser").val())
                if (anwser) {
                    $("body").addClass("bg-green")
                    $("#title").text("Correct")
                    $("#info").text(value + " == " + parseInt(value, 2))
                } else {
                    $("body").addClass("bg-red")
                    $("#title").text("Incorrect")
                    incorrectAnwsers.push(`Question ${testsRan}: ${value} = ${parseInt(value, 2)}. Your anwser: ${$("#anwser").val()}`)
                    $("#info").text("Anwser: " + parseInt(value, 2))
                }
                console.log(anwser);
                score.push(anwser)
                if (testsRan == testsToRun) {
                    $("#mainButton").text("Finish!")
                    state = 2
                } else {
                    $("#mainButton").text("Next!")
                    state = 0
                }
                break;
            case 2:
                state = 0
                $("body").removeClass("bg-green")
                $("body").removeClass("bg-red")
                $("#title").text("You Finished: " + Math.round(score.filter(value => value === true).length * 100 / score.length) + "% Correct")
                $("#info").html(incorrectAnwsers.join("<br>"))
                $("#mainButton").text("Again?")
                testsRan = 0
                break;
        }
    });
    length = parseInt($("#length").val()) || 5
    testsToRun = parseInt($("#timesToRun").val()) || 5
    $("#timesToRun").on("input", function(e) {
        testsToRun = parseInt($("#timesToRun").val()) || 5
    });
    $("#length").on("input", function(e) {
        length = parseInt($("#length").val()) || 5
    });
    $("body").keyup(function(e) {
        if (e.which == 13) {
            $("#mainButton").click()
        }
    });

});