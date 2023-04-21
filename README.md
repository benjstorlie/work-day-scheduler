# Work-Day-Scheduler
A simple calendar app for scheduling your work day.

## Installation and Use

This web application can be found at [benjstorlie.github.io/work-day-scheduler/](https://benjstorlie.github.io/work-day-scheduler/).

Enter a task or event in the appropriate hour and click the save button.  Now you can find the information later, as long as you open the page on the same computer and browser!

## Comments

1. I started on this project outside away from Wi-Fi, and forgot that I could initialize the local repository with the command `git init`, instead of starting with the repository already connected to my account online.

  And then I ended up doing most of the project before connecting it to my account, and so I have barely any commits.  

2. I made the entirety of each time block in the for-loop, adding classes and event handlers one at a time.  This way, I could use the variable for the time of day to adjust the classes and events.
  However, since the classes and events are all almost identical save for one number, I could add those to to all the time blocks a the same time.  For example, in the following code, each element with the class `time-block` gets a description box.

  ```$(".time-block").append(
      $('<textarea>')
        .addClass("col-8 col-md-10 description")
        .attr("rows","3")
    );```

  For all parts that need to know the time of day, I can use `.parent()` to extract the value, either by defining an html attribute `data-hour=h`, or by getting the time from the time-blocks' ids, `id="hour-"+h`

  I had started re-writing the code in this fashion, if only to practice the skill.  But I'm not sure if it actually saves any time or space, and extracting the time from the time blocks' attributes seems more cumbersome than just defining everything with the same time together.