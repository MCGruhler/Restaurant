let jsonObject = [
  {
    customerName: "Jessica R",
    dateVisited: "05/15/2023",
    mainDish: "Grilled Chicken Salad",
    score: "4",
    reccomend: "Yes",
  },
  {
    customerName: "Mitchell K",
    dateVisited: "06/02/2023",
    mainDish: "Tuna Steak",
    score: "5",
    reccomend: "Yes",
  },
  {
    customerName: "Arnold P",
    dateVisited: "08/01/2023",
    mainDish: "Ribeye Steak",
    score: "3",
    reccomend: "No",
  },
  {
    customerName: "Mary W",
    dateVisited: "08/29/2023",
    mainDish: "Keto Burger",
    score: "4",
    reccomend: "Yes",
  },
  {
    customerName: "William S",
    dateVisited: "09/13/2023",
    mainDish: "Grilled Chicken Salad",
    score: "2",
    reccomend: "No",
  },
];

/*function showTable() {
  let htmlString = "";
  for (let i = 0; i < jsonObject.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + jsonObject[i].customerName + "</td>";
    htmlString += "<td>" + jsonObject[i].dateVisited + "</td>";
    htmlString += "<td>" + jsonObject[i].mainDish + "</td>";
    htmlString += "<td>" + jsonObject[i].score + "</td>";
    htmlString += "<td>" + jsonObject[i].reccomend + "</td>";
    htmlString += "<td>" + "<button>DELETE</button>" + "</td>";
    htmlString += "</tr>";
  }

  $("#restaurantTable").html(htmlString);
}

showTable();
*/

function getTable() {
  $.ajax({
    url: "http://localhost:4000/read-records",
    type: "get",
    success: function (response) {
      let data = JSON.parse(response);
      let htmlString = "";
      for (let i = 0; i < data.length; i++) {
        htmlString += "<tr>";
        htmlString += "<td>" + data[i].customerName + "</td>";
        htmlString += "<td>" + data[i].dateVisited + "</td>";
        htmlString += "<td>" + data[i].mainDish + "</td>";
        htmlString += "<td>" + data[i].score + "</td>";
        htmlString += "<td>" + data[i].reccomend + "</td>";
        htmlString += "<td>" + "<button>DELETE</button>" + "</td>";
        htmlString += "</tr>";
      }

      $("#restaurantTable").html(htmlString);
    },
    error: function (response) {
      console.log("error");
    },
  });
}

getTable();
