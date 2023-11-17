function showTable(jsonObject) {
  let htmlString = "";
  console.log(jsonObject);

  for (let i = 0; i < jsonObject.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + jsonObject[i].customerName + "</td>";
    htmlString += "<td>" + jsonObject[i].dateVisited + "</td>";
    htmlString += "<td>" + jsonObject[i].mainDish + "</td>";
    htmlString += "<td>" + jsonObject[i].score + "</td>";
    htmlString += "<td>" + jsonObject[i].reccomend + "</td>";
    htmlString +=
      "<td>" +
      "<button id= " +
      jsonObject[i].id +
      " class = 'btn'>DELETE</button>" +
      "</td>";
    htmlString += "</tr>";
  }

  $("#restaurantTable").html(htmlString);
}

function getRestaurantData() {
  $.ajax({
    url: "http://localhost:4000/read-records",
    type: "get",
    success: function (response) {
      let data = JSON.parse(response);
      data = JSON.parse(data.restaurantData);
      console.log(data);
      showTable(data);
    },
    error: function (response) {
      console.log("error");
    },
  });
}

function deleteRestaurantData(id) {
  $.ajax({
    url: "http://localhost:4000/delete-records/:" + id,
    type: "delete",
    success: function (response) {
      console.log(id + " was deleted.");
    },
    error: function (err) {
      console.log(err);
    },
  });
}

getRestaurantData();

//delete button click
setTimeout(function () {
  $(".btn").click(function () {
    console.log("im here");
    let deleteId = this.getAttribute("id");
    deleteRestaurantData(deleteId);
  });
}, 100);
