var state = 0 // 0: Wating to start, 1 && 2: Running Test, 3: Test Finished
var isGreen = false
var binaryIsValid = false
var output = ""
var testsRan = 0
var type = 0
var testsToRun = 5
var value = 0
var length = 5
var lastValue = ""
var score = [],
    incorrectAnswers = []

function randomBinary(binaryLength) {
    while (!binaryIsValid) {
        binary = "";
        for (let i = 0; i < binaryLength; ++i) {
            binary += Math.floor(Math.random() * Math.floor(2));
        }
        console.log(`Last: ${lastValue} : New: ${binary}`)
        if (lastValue != binary) binaryIsValid = true
    }
    binaryIsValid = false
    lastValue = binary
    return binary;
}

function click () {
    switch (state) {
        case 0:
            $("#title").text("Learn Binary")
            $("#info").html(`Click the button below to start. The test will use values: <input type='number' id='length' min='2' value='${length}' style='width:40px; background: none;border: none;color: white;''> bits long<br> And Will run: <input type='number' id='timesToRun' min='2' value='${testsToRun}' style='width:40px; background: none;border: none;color: white;'> Times`)
            $("#mainButton").text("Start!")
            $("#switchBox").show()
            $("#timesToRun").on("input", function() {
                testsToRun = parseInt($("#timesToRun").val()) || 5
            });
            $("#length").on("input", function() {
                length = parseInt($("#length").val()) || 5
            });
            incorrectAnswers = []
            score = []
            state=1
            break;
        case 1:
            $("body").removeClass("bg-red")
            $("body").removeClass("bg-green")
            value = randomBinary(length)
            if (type == 0) {
                $("#title").text(value)
                $("#info").html("<input type='text' class='form-control' id='Answer' placeholder='Decimal Value'>")
            }else{
                $("#title").text(parseInt(value, 2))
                $("#info").html("<input type='text' class='form-control' id='Answer' placeholder='Binary Value'>")  
            }
            $("#Answer").focus()
            $("#mainButton").text("Submit!")
            $("#switchBox").hide()
            state = 2
            break;
        case 2:
            testsRan++
            if (type == 0) {
                answer = parseInt(value, 2) == parseInt($("#Answer").val())
            }else{
                console.log("Your:" + ($("#Answer").val()>>>0).toString(10))
                console.log("Anwser: " + parseInt(value));
                answer = parseInt(value) == ($("#Answer").val()>>>0).toString(10); 
            }
            if (answer) {
                $("body").addClass("bg-green")
                $("#title").text("Correct")
                $("#info").text(value + " == " + parseInt(value, 2))
            } else {
                $("body").addClass("bg-red")
                $("#title").text("Incorrect")
                if (type == 0) {
                    incorrectAnswers.push(`Question ${testsRan}: ${value} = ${parseInt(value, 2)}. Your Answer: ${$("#Answer").val()}`)
                }else{
                    incorrectAnswers.push(`Question ${testsRan}: ${parseInt(value, 2)} = ${value}. Your Answer: ${$("#Answer").val()}`)
                }
                $("#info").text("Answer: " + parseInt(value, 2))
            }
            score.push(answer)
            if (testsRan == testsToRun) {
                $("#mainButton").text("Finish!")
                state = 3
            } else {
                $("#mainButton").text("Next!")
                state = 1
            }
            break;
        case 3:
            state = 0
            $("body").removeClass("bg-green")
            $("body").removeClass("bg-red")
            $("#title").text("You Finished: " + Math.round(score.filter(value => value === true).length * 100 / score.length) + "% Correct")
            $("#info").html(incorrectAnswers.join("<br>"))
            $("#mainButton").text("Again?")
            testsRan = 0
            break;
    }
}

$(document).ready(function() {
    click()
    $("#mainButton").on("click", function() {
        click()
    });
        $("body").keyup(function(e) {
        if (e.which == 13) {
            click()
        }
    });
    $("#switch").on("input", function (e) {
        type = e.target.checked ? 1 : 0
        $("#switchLabel").text(e.target.checked ? "Decimal To Binary" : "Binary To Decmial")
    })
});
