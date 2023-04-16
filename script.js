let startHour = 8; // 8am
let endHour = 18; // 6pm (the schedule goes up to but does not include 6pm)

let currentDay = dayjs();
let currentHour = currentDay.hour(); // currentHour type is Number.


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// **Does this actually call the function as it is defined?
$(function () {


  const currentDayEl = $("#currentDay");
  const mainEl = $("#main");


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // **Do a for-loop to create the elements #hour-08 to #hour-17
  for (let h=startHour; h<endHour; h++) {
    //add to main element addTimeBlock(h);
    mainEl.append(addTimeBlock(h));
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //



  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  currentDayEl.text(currentDay.format("dddd, MMMM D"))

});

function addTimeBlock(h) {
  // returns a <div> element for a time block at hour h.

  // create day.js object for hour h.
  let hour = dayjs().hour(h);

  let timeBlock = $('<div>');
  timeBlock.addClass("row time-block");
  timeBlock.attr("id","hour-"+h);

  if (h == currentHour) {
    timeBlock.addClass("present");
  } else if (h < currentHour) {
    timeBlock.addClass("past");
  } else if (h > currentHour) {
    timeBlock.addClass("future");
  } else {console.log("Error. h="+ h + ", currentHour="+currentHour)}

  let hourEl = $('<div>');
  hourEl.addClass("col-2 col-md-1 hour text-center py-3");
  hourEl.text(hour.format("hA")); 
  hourEl.appendTo(timeBlock); 

  let description = $('<textarea>');
  description.addClass("col-8 col-md-10 description");
  description.attr("rows","3");
  description.appendTo(timeBlock);

  let saveBtn = $("<button>");
  saveBtn.addClass("btn saveBtn col-2 col-md-1")
  saveBtn.attr("aria-label","save");
  saveBtn.html("<i class='fas fa-save' aria-hidden='true'></i>");
  saveBtn.appendTo(timeBlock);

  let storedText = localStorage.getItem(h)
  if (storedText) {description.val(storedText)};

  // One option: add event handler here and use variable h.

  saveBtn.click(function() {
    let textToStore = description.val();
    if (textToStore) {localStorage.setItem(h,description.val())};
    console.log(description.val());
  });

  return timeBlock;
}

// function saveEvent()