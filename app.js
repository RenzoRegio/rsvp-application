const form = document.querySelector("form");
const input = form.querySelector("input");
const mainDiv = document.querySelector(".main");
const ul = document.querySelector("#invitedList");

const filterDiv = document.createElement("div");
const filterLabel = document.createElement("label");
const filterCheckbox = document.createElement("input");

filterCheckbox.type = "checkbox";
filterLabel.textContent = "Hide those who haven't responded";
filterDiv.appendChild(filterLabel);
filterDiv.appendChild(filterCheckbox);
mainDiv.insertBefore(filterDiv, ul);

filterCheckbox.addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  const attendees = ul.children;
  for (let i = 0; i < attendees.length; i++) {
    let attendee = attendees[i];
    const label = attendee.children[1];
    if (isChecked) {
      label.style.display = "none";
      if (attendee.className !== "responded") {
        attendee.style.display = "none";
        label.style.display = "block";
      }
    } else {
      attendee.style.display = "block";
      label.style.display = "block";
    }
  }
});

function createListItem(text) {
  function createElement(elementName, property, value) {
    let element = document.createElement(elementName);
    element[property] = value;
    return element;
  }

  function appendToLI(elementName, property, value) {
    const element = createElement(elementName, property, value);
    li.appendChild(element);
    return element;
  }

  const li = document.createElement("li");
  appendToLI("span", "textContent", text);
  appendToLI("label", "textContent", "Confirmed").appendChild(
    createElement("input", "type", "checkbox")
  );
  appendToLI("button", "textContent", "Edit");
  appendToLI("button", "textContent", "Remove");
  return li;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  if (text !== "" && isNaN(text)) {
    //if user submits a string
    const liArray = document.querySelectorAll("li"); // selecting all the li and placing it into an array
    if (liArray.length === 0) {
      // if the array's length is 0 (starting point - will only happen at the start) then run createListItem()
      const li = createListItem(text);
      ul.appendChild(li);
    } else {
      // if the array's length is not equal to 0 (happens after the first li has been created) then run a for loop
      for (let i = 0; i < liArray.length; i++) {
        const span = liArray[i].firstElementChild; // selects the span element of each li in the for loop
        if (span.textContent === text) {
          // if the for loop finds the span's textContent to be the same as the text's value, stop the function
          return;
        }
      }
      const li = createListItem(text); // if the for loop does not find any span that is equal to the text then for loop will stop and proceed to run createListItem function
      ul.appendChild(li);
    }
  } else {
    // if user submits an empty string or integer
    alert("Please enter a guest's name");
  }
});

ul.addEventListener("change", (e) => {
  const checkbox = e.target;
  const li = checkbox.parentNode.parentNode;
  if (checkbox.checked) {
    li.className = "responded";
  } else {
    li.className = "";
  }
});

ul.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const action = button.textContent;
    const nameActions = {
      Remove: () => {
        ul.removeChild(li);
      },
      Edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = "Save";
      },
      Save: () => {
        const input = li.firstElementChild;
        const span = document.createElement("span");
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = "Edit";
      },
    };
    // select and run the action in button's name
    nameActions[action]();
  }
});
