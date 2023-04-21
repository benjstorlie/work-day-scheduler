let startHour = 8; // 8am
let endHour = 18; // 6pm (the schedule goes up to but does not include 6pm)

let currentDay = dayjs();
let currentHour = currentDay.hour(); // currentHour type is Number.


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

$(function () {

  // Define the DOM elements as JQuery objects
  const currentDayEl = $("#currentDay");
  const mainEl = $("#main");

  // Do a for-loop to create the elements #hour-08 to #hour-17
  for (let h=startHour; h<endHour; h++) {
    //add to main element addTimeBlock(h);
    mainEl.append(addTimeBlock(h));
  }

  // Display the current day.  currentDay is defined as dayjs() at the top
  currentDayEl.text(currentDay.format("dddd, MMMM D"))

});

function addTimeBlock(h) {
  // returns a <div> element for a time block at hour h.

  // create day.js object for hour h.
  let hour = dayjs().hour(h);

  let timeBlock = $('<div>')
    .addClass("row time-block")
    .attr("data-hour",h)
    .attr("id","hour-"+h);

  // Add appropriate class to timeBlock depending on whether time h is in the past, present, or future.
  // currentHour is defined as dayjs().hour() at the top.
  if (h == currentHour) {
    timeBlock.addClass("present");
  } else if (h < currentHour) {
    timeBlock.addClass("past");
  } else if (h > currentHour) {
    timeBlock.addClass("future");
  } else {
    // This should only happen if h or currentHour are not Number types, which shouldn't happen.
    console.log("Error. h=" + h + ", currentHour="+currentHour)
  }

  // Define and append to the time block the other various html elements
  let hourEl = $('<div>')
    .addClass("col-2 col-md-1 hour text-center py-3")
    .text(hour.format("hA"));  // This displays the time formatted like 9AM or 4PM
  hourEl.appendTo(timeBlock); 

  // This is the part you write in
  let description = $('<textarea>')
    .addClass("col-8 col-md-10 description")
    .attr("rows","3");
  description.appendTo(timeBlock);

  // This is the save button
  let saveBtn = $("<button>")
    .addClass("btn saveBtn col-2 col-md-1")
    .attr("aria-label","save")
    .html("<i class='fas fa-save' aria-hidden='true'></i>");
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