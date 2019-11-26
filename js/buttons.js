$(function() {
  let canvas = document.getElementById("main-canvas");
  sort.drawBorder(canvas);
  let mainArr = null;
  $("#start").click(function() {
    if (mainArr !== null) mainArr.stop();
    let arrSize = parseInt($("#arrSize").val());
    let interval = parseInt($("#interval").val());
    let alg = $("#algoSelect").val();
    let sortFunction = sort.getAlgo(alg);
    let arr = [];
    for (let i = 0; i < arrSize; i++) {
      arr.push(Math.random());
    }
    let explain = sort.getExplaination(alg);
    $("#explanationPara").text(explain);
    let code = sort.getCode(alg);
    $("#codeSnippet").text(code);
    mainArr = new sort.animateArr(arr, canvas, interval);
    sortFunction(mainArr);
    let timing = setInterval(timer, interval);
  });
  function timer() {
    let timer = document.getElementById("timer");
    let time = sort.getTime();
    time = time / 1000;
    $("#timer").text("Timer: " + time + "\t s");
    if (sort.getStillTiming() === false) {
      $("#timer").css("color", "#008000");
    } else {
      $("#timer").css("color", "black");
    }
  }
});
