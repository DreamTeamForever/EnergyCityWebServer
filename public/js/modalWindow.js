var x = document.getElementById("input_sol_model");
var arrModel = ['Модель_солнца_123234','Модель_солнца_234234','Модель_солнца_345234','Модель_солнца_456234'];
for (var i = 0; i < arrModel.length; i++) {
  var option = document.createElement("option");
  option.text = arrModel[i];
  x.add(option, x[i]);
}