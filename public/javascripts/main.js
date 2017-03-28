$(function() {

// Click listeners
$('.button-plus').on('click', checkIncrementItemType)
$('.button-minus').on('click', checkDecrementItemType)
$('.green-backpack').on('click', greenBackpackSelected)
$('.blue-backpack').on('click', blueBackpackSelected)
$('.purple-backpack').on('click', purpleBackpackSelected)
$('.red-backpack').on('click', redBackpackSelected)
$(document).ready(checkBackpackColor);
$(document).ready(displayBackpackImage);
})


// Change backpack image based on user selection
var greenBackpackSelected = function() {
  $('#backpack-image').css('background-image', 'url(/images/green-sm.png)');
  $('#tag').text('Green');
  $('#backpack-type').text('Green Backpack');
  $('.backpack-color-input').attr('value','Green');
}

var blueBackpackSelected = function() {
  $('#backpack-image').css('background-image', 'url(/images/blue-sm.png)');
  $('#tag').text('Blue');
  $('#backpack-type').text('Blue Backpack');
  $('.backpack-color-input').attr('value','Blue');
}

var purpleBackpackSelected = function() {
  $('#backpack-image').css('background-image', 'url(/images/purple-sm.png)');
  $('#tag').text('Purple');
  $('#backpack-type').text('Purple Backpack');
  $('.backpack-color-input').attr('value','Purple');
}

var redBackpackSelected = function() {
  $('#backpack-image').css('background-image', 'url(/images/red-sm.png)');
  $('#tag').text('Red');
  $('#backpack-type').text('Red Backpack');
  $('.backpack-color-input').attr('value','Red');
};


// Increment or decrement value based on current
var checkIncrementItemType = function() {
  incrementValue(this.value);
  updateOrderSummaryList(this.value);
};

var checkDecrementItemType = function() {
  decrementValue(this.value);
  console.log(this.value);
  updateOrderSummaryList(this.value);
};


// Increment value for item when user clicks + button
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
  };
};


// Decrement value for item when user clicks - button
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
    };
  };
};


// Check current quantity for each item
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
  };
};


// Update quantity for each item in order summary
var updateOrderSummaryList = function(itemType) {
  var currentItemQty = getItemQty(itemType);
  var itemQtyId = document.getElementById(itemType + '-qty');
  itemQtyId.innerHTML = getItemQty(itemType);
};


// Item counters
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


// Pull in backpack image into index page
var checkBackpackColor = function() {
  backpackCards = $('.backpack-color')
  for (var i=0; i<backpackCards.length; i++) {
    var backpackColor = backpackCards[i].innerHTML;
    var image = checkColor(backpackColor).clone();
    backpackCards[i].append(image[0]);
  };
};


// Backpack images
var blueBackpackImage = $("<div class='bp-image'><img src='/images/blue-sm.png'></div>");
var greenBackpackImage = $("<div class='bp-image'><img src='/images/green-sm.png'></div>");
var redBackpackImage = $("<div class='bp-image'><img src='/images/red-sm.png'></div>");
var purpleBackpackImage = $("<div class='bp-image'><img src='/images/purple-sm.png'></div>");


var checkColor = function(backpackColor) {
      switch(backpackColor) {
        case 'Backpack Color: Blue':
          return blueBackpackImage;
          break;
        case 'Backpack Color: Green':
          return greenBackpackImage;
          break;
        case 'Backpack Color: Red':
          return redBackpackImage;
          break;
        case 'Backpack Color: Purple':
          return purpleBackpackImage;
          break;
      };
  };


// Display backpack image on show page
var displayBackpackImage = function() {
  var backpackColorMention = $('.backpack-color-show');
  var backpackColor = backpackColorMention[0].outerText;
  var image = checkColor(backpackColor);
  backpackColorMention.append(image[0]);
};
