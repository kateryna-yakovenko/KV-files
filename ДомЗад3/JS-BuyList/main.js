function renderProduct(name) {
  var productNumber = 1;
  var clone = $("#product_template").clone();
  var itemclone = $("#item_template").clone();
  var boughtitemclone = $("#bought-item_template").clone();

  itemclone.removeAttr("id");
  itemclone.removeAttr("style");
  itemclone.text(name + " ");
  itemclone.append('<span class="orange-button">1</span>');

  boughtitemclone.removeAttr("id");
  boughtitemclone.text(name + " ");
  boughtitemclone.append(
    '<span class="orange-button" style="text-decoration: line-through">1</span>'
  );

  clone.attr("id", name);
  clone.find(".label").text(name);

  //============================== CHANGE NAME ON CLICK ===============================
  clone.find(".label").click(function() {
    clone.find(".new-name").attr("placeholder", name);
    clone.find(".new-name").css("display", "initial");
    clone.find(".new-name").focus();
    clone.find(".label").css("display", "none");
    clone.find(".new-name").blur(function() {
      var text = clone.find(".new-name").val();
      if (!!text) {
        name = text;
        clone.attr("id", name);
        clone.find(".label").text(name);
        itemclone.text(name + " ");
        itemclone.append('<span class="orange-button">1</span>');
        boughtitemclone.text(name + " ");
        boughtitemclone.append(
          '<span class="orange-button" style="text-decoration: line-through">1</span>'
        );
      }
      clone.find(".new-name").css("display", "none");
      clone.find(".new-name").val("");
      clone.find(".label").css("display", "initial");
    });
  });

  //========================== INCREMENT AND DECREMENT ==============================
  clone.find(".round_button.tooltip").click(function() {
    productNumber++;
    clone.find(".numlabel").text(productNumber);
    itemclone.find(".orange-button").text(productNumber);
  });
  clone.find(".round_button.tooltip.cancel").click(function() {
    if (productNumber > 2) {
      productNumber -= 2;
    } else {
      productNumber--;
    }
    clone.find(".numlabel").text(productNumber);
    itemclone.find(".orange-button").text(productNumber);
  });

  //============================== BUY AND UNBUY ==============================
  clone.find(".button.tooltip:contains('Купленo')").click(function() {
    clone.find(".label").css("text-decoration", "line-through");
    clone.find(".round_button").hide();
    clone.find(".button.tooltip").hide();
    notBoughtButton(clone);
    clone.find(".button.tooltip:contains('Не купленo')").click(function() {
      clone.find(".label").css("text-decoration", "none");
      clone.find(".round_button").show();
      clone.find(".button.tooltip").show();
      $(".button.tooltip:contains('Не купленo')").remove();
      itemclone.show();
      boughtitemclone.hide();
      clone.find(".buttons").css("padding-right", "1rem");
    });
    itemclone.hide();
    boughtitemclone.find(".orange-button").text(productNumber);
    boughtitemclone.show();
  });

  //=============================== DELETE PRODUCT =================================
  clone.find(".button.tooltip.cancel").click(function() {
    clone.remove();
    itemclone.remove();
    boughtitemclone.remove();
  });

  //============================== LET THE SHOW BEGIN =============================
  clone.show();
  $("#leftcont").append(clone);

  itemclone.show();
  $("#left").append(itemclone);

  boughtitemclone.hide();
  $("#cart").append(boughtitemclone);
}

$("#product_template").hide();
$("#item_template").hide();
$("#bought-item_template").hide();
renderProduct("Помідори");
renderProduct("Печиво");
renderProduct("Сир");

// RUNS FROM HTML
function insertNewProduct(name) {
  if (name == "" || document.getElementById(name) != null) return;
  renderProduct(name);
  $("#myInput").focus();
  $("#myInput").val("");
}

// DRAWING "NOT BOUGHT" BUTTON
function notBoughtButton(clone) {
  clone.find(".buttons").append('<button class="button tooltip"></button >');
  clone.find(".buttons .button.tooltip:last-child").text("Не купленo");
  clone
    .find(".button.tooltip:contains('Не купленo')")
    .append('<span class= "tooltiptext"> Not bought</span>');
  clone.find(".buttons").css("padding-right", "2rem");
}
