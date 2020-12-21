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
    if (isChecked) {
      if (attendee.className !== "responded") {
        attendee.style.display = "none";
      }
    } else {
      attendee.style.display = "block";
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
  if (input.value !== "") {
    const text = input.value;
    input.value = "";
    const li = createListItem(text);
    ul.appendChild(li);
  } else {
    input.placeholder = "Please enter a guest's name";
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
