$("#submit").click(function () {
  let customerName = $("#customerName").val();
  let dateVisited = $("#dateVisited").val();
  let mainDish = $("#mainDish").val();
  let score = $("#score").val();
  let reccomend = $("#reccomend").val();
  clickSubmitWrite(customerName, dateVisited, mainDish, score, reccomend);
});

$("#clear").click(function () {
  $("#customerName").val("");
  $("#dateVisited").val("");
  $("#mainDish").val("");
  $("#score").val("");
  $("#reccomend").val("");
});

function clickSubmitWrite(
  customerName,
  dateVisited,
  mainDish,
  score,
  reccomend
) {
  $.ajax({
    url: "http://localhost:4000/write-record",
    type: "post",
    data: {
      name: customerName,
      dateV: dateVisited,
      main: mainDish,
      score: score,
      recs: reccomend,
    },
    success: function (response) {
      let data = JSON.parse(response);
      console.log(data);
    },
    error: function (response) {
      console.log("error");
    },
  });
}
