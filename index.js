var state = 0 // 0: Wating to start, 1: Running Test, 2: Test Finished
var isGreen = false
var startTime, endTime
var testsRan = 0
var timeout = 0
var testsToRun = 5
var max = 5
var min = 2
var score = []

function turnGreen() {
    startTime = performance.now()
    isGreen = true
    $("body").addClass("bg-green");
    $("body").removeClass("bg-red");
}

function reset() {
    state = 0
    isGreen = false
}

$(document).ready(function() {
    $("#mainButton").on("click", function() {
        switch (state) {
            case 0:
                $("body").addClass("bg-red");
                $("body").removeClass("bg-green");
                $("#title").text("Wait Until Green")
                $("#info").text("Click any key when the screen turns green.")
                $("#mainButton").text("Click Me!")
                state = 1
                timeout = setTimeout(turnGreen, Math.floor(Math.random() * (max - min) + min) * 1000)
                break;
            case 1:
                if (isGreen) {
                    endTime = performance.now()
                    score[testsRan] = endTime - startTime
                    $("#title").text(score[testsRan] + "ms")
                    testsRan++
                    $("#info").html("Click any key to continue. <b>" + testsRan + " / " + testsToRun + " </b>")
                    if (testsRan == testsToRun) {
                        $("#mainButton").text("Finish!")
                        state = 2
                    } else {
                        $("#mainButton").text("Continue!")
                        reset()
                    }

                } else {
                    clearTimeout(timeout)
                    $("#title").text("Whoa, Slow Down")
                    $("#info").text("Wait until the screen turns green before clicking.")
                    $("#mainButton").text("Try Again!")
                    reset()
                }
                break;
            case 2:
                state = 0
                $("body").removeClass("bg-green")
                $("#title").text("You Finished! avg: " + Math.round(score.reduce((a, b) => a + b) / score.length) + "ms")
                $("#info").html("Min: " + Math.min.apply(null, score) + "ms & Max: " + Math.max.apply(null, score) + "ms <br>" + score.join("<br>"))
                $("#mainButton").text("Again?")
                break;
        }
    });
    $('#timesToRun').on('input', function(e) {
        testsToRun = parseInt($('#timesToRun').val()) || 5
    });

});