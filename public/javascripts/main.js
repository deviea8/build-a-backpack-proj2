$(function() {

$('.button-plus').on('click', checkIncrementItemType)
$('.button-minus').on('click', checkDecrementItemType)
$('.green-backpack').on('click', greenBackpackSelected)
$('.blue-backpack').on('click', blueBackpackSelected)
$('.purple-backpack').on('click', purpleBackpackSelected)
$('.red-backpack').on('click', redBackpackSelected)

})



var greenBackpackSelected = function() {
  $('#backpack-image').css('background-image', 'url(http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=37069638)');
  $('#tag').text('Green');
  $('#backpack-type').text('Green Backpack');
}

var blueBackpackSelected = function() {
  $('#backpack-image').css('background-image', 'url(https://s-media-cache-ak0.pinimg.com/736x/6f/0d/a4/6f0da48be5de51944ddc044cbff469cc.jpg)');
  $('#tag').text('Blue');
  $('#backpack-type').text('Blue Backpack');
}

var purpleBackpackSelected = function() {
  $('#backpack-image').css('background-image', 'url(http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=68056220)');
  $('#tag').text('Purple');
  $('#backpack-type').text('Purple Backpack');
}

var redBackpackSelected = function() {
  $('#backpack-image').css('background-image', 'url(http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=72028988)');
  $('#tag').text('Red');
  $('#backpack-type').text('Red Backpack');
}


var checkIncrementItemType = function() {
  incrementValue(this.value);
  updateOrderSummaryList(this.value);
}

var incrementValue = function(itemType) {
  switch (itemType) {
    case 'pencils':
      $('.pencil-value').val((++itemCounts.pencils));
      break;
    case 'folders':
      $('.folder-value').val((++itemCounts.folders));
      break;
    case 'notebooks':
      $('.notebook-value').val((++itemCounts.notebooks));
      break;
    case 'scissors':
      $('.scissors-value').val((++itemCounts.scissors));
      break;
    case 'erasers':
      $('.erasers-value').val((++itemCounts.erasers));
      break;
    case 'colored-pencils':
      $('.colored-pencils-value').val((++itemCounts.coloredPencils));
      break;
    case 'markers':
      $('.markers-value').val((++itemCounts.markers));
      console.log(itemCounts.markers)
      break;
    case 'glue-sticks':
      $('.glue-sticks-value').val((++itemCounts.glueSticks));
  }
}


var checkDecrementItemType = function() {
  decrementValue(this.value);
  console.log(this.value);
  updateOrderSummaryList(this.value);
}

var decrementValue = function(itemType) {
  switch (itemType) {
    case 'pencils':
    if (itemCounts.pencils > 0) {
      $('.pencil-value').val((--itemCounts.pencils));
      }
      else {
      console.log("Can't decrement below 0");
      }
      break;
    case 'folders':
      if (itemCounts.folders > 0) {
      $('.folder-value').val((--itemCounts.folders));
      }
      else {
      console.log("Can't decrement below 0");
      }
      break;
    case 'notebooks':
      if (itemCounts.notebooks > 0) {
      $('.notebook-value').val((--itemCounts.notebooks));
      }
      else {
      console.log("Can't decrement below 0");
      }
      break;
    case 'scissors':
      if (itemCounts.scissors > 0) {
      $('.scissors-value').val((--itemCounts.scissors));
      }
      else {
      console.log("Can't decrement below 0");
      }
      break;
    case 'erasers':
      if (itemCounts.erasers > 0) {
      $('.erasers-value').val((--itemCounts.erasers));
      }
      else {
      console.log("Can't decrement below 0");
      }
      break;
    case 'colored-pencils':
      if (itemCounts.coloredPencils > 0) {
      $('.colored-pencils-value').val((--itemCounts.coloredPencils));
      }
      else {
      console.log("Can't decrement below 0");
      }
      break;
    case 'markers':
      if (itemCounts.markers > 0) {
      $('.markers-value').val((--itemCounts.markers));
      }
      else {
      console.log("Can't decrement below 0");
      }
      break;
    case 'glue-sticks':
      if (itemCounts.glueSticks > 0) {
      $('.glue-sticks-value').val((--itemCounts.glueSticks));
      }
      else {
      console.log("Can't decrement below 0");
      }
  }
}


var getItemQty = function(itemType) {
  switch (itemType) {
    case 'pencils':
      return itemCounts.pencils;
      break
    case 'folders':
      return itemCounts.folders;
      break
    case 'notebooks':
      return itemCounts.notebooks;
      break
    case 'scissors':
      return itemCounts.scissors;
      break
    case 'erasers':
      return itemCounts.erasers;
      break
    case 'colored-pencils':
      return itemCounts.coloredPencils;
      break
    case 'markers':
      return itemCounts.markers;
      break
    case 'glue-sticks':
      return itemCounts.glueSticks;
  }
}

var getItemCost = function(itemType) {
  switch (itemType) {
    case 'pencils':
      return (itemCounts.pencils * 1.5);
      break
    case 'folders':
      return (itemCounts.folders * 2.5);
      break
    case 'notebooks':
      return (itemCounts.notebooks * 2);
      break
    case 'scissors':
      return (itemCounts.scissors * 3);
      break
    case 'erasers':
      return (itemCounts.erasers * 0.5);
      break
    case 'colored-pencils':
      return (itemCounts.coloredPencils * 4);
      break
    case 'markers':
      return (itemCounts.markers * 3);
      break
    case 'glue-sticks':
      return (itemCounts.glueSticks * 1);
  }
}


var itemCost = 2;

var updateOrderSummaryList = function(itemType) {
  var currentItemQty = getItemQty(itemType);
  var itemQtyId = document.getElementById(itemType + '-qty');
  itemQtyId.innerHTML = getItemQty(itemType);
  var itemCostId = document.getElementById(itemType + '-cost');
  itemCostId.innerHTML = getItemCost(itemType);
  updateTotalCost();
};

var totalCost = 0;


//Need to update this

var updateTotalCost = function() {
  totalCost = 0;
  for (var i = 0; i < 9; i++) {
    totalCost += parseFloat(document.getElementsByClassName('cost')[i].innerHTML);
  }
  $('.total-cost').text('$' + totalCost);
}



var itemCounts = {
  pencils: 0,
  folders: 0,
  notebooks: 0,
  scissors: 0,
  erasers: 0,
  coloredPencils: 0,
  markers: 0,
  glueSticks: 0
};

