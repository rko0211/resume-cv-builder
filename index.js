let experience_info = document.querySelector(".experience_info");
let add_experience = document.querySelector(".add_experience");
let rem_experience = document.querySelector(".rem_experience");

function saveExperiencesData() {
  let experiences = [];
  document.querySelectorAll('.expgap').forEach((div, index) => {
    let details = [];
    div.querySelectorAll('.experiencedetail').forEach(detailInput => {
      details.push(detailInput.value);
    });

    let experience = {
      name: div.querySelector(`input[name=experienceinput${index + 1}]`).value,
      startDate: div.querySelector(`input[name=experiencestartdate${index + 1}]`).value,
      endDate: div.querySelector(`input[name=experienceenddate${index + 1}]`).value,
      companyName: div.querySelector(`input[name=companyname${index + 1}]`).value,
      city: div.querySelector(`input.city${index + 1}`).value,
      state: div.querySelector(`input.state${index + 1}`).value,
      country: div.querySelector(`input.country${index + 1}`).value,
      remote: div.querySelector(`input[name=remotework${index + 1}]`).checked,
      details: details
    };
    experiences.push(experience);
  });
  localStorage.setItem('experiences', JSON.stringify(experiences));
}

function loadExperiencesData() {
  let experiences = JSON.parse(localStorage.getItem('experiences')) || [];
  experiences.forEach((experience, index) => {
    addExperienceField(experience, index + 1);
  });
}

function addExperienceField(experience = {}, exp_no) {
  let div = document.createElement("div");
  div.className = 'expgap';

  let expname = document.createElement('label');
  expname.textContent = 'Enter your internship role: ';
  expname.className = 'ExpName';

  let experienceinput = document.createElement("input");
  experienceinput.name = `experienceinput${exp_no}`;
  experienceinput.className = `experience${exp_no}`;
  experienceinput.classList.add("commonexperienceinput");
  experienceinput.type = "text";
  experienceinput.placeholder = "E.g Software Development Engineer Intern";
  experienceinput.value = experience.name || '';
  experienceinput.required = true;

  let label1 = document.createElement('label');
  label1.textContent = 'Internship Start Date: ';
  let label2 = document.createElement('label');
  label2.textContent = 'Internship End Date: ';

  let dateElement1 = document.createElement('input');
  dateElement1.setAttribute('type', 'date');
  dateElement1.setAttribute('id', `experiencestartdate${exp_no}`);
  dateElement1.setAttribute('name', `experiencestartdate${exp_no}`);
  dateElement1.className = 'expstartdate';
  dateElement1.value = experience.startDate || '';
  dateElement1.required = true;

  let dateElement2 = document.createElement('input');
  dateElement2.setAttribute('type', 'date');
  dateElement2.setAttribute('id', `experienceenddate${exp_no}`);
  dateElement2.setAttribute('name', `experienceenddate${exp_no}`);
  dateElement2.className = 'expenddate';
  dateElement2.value = experience.endDate || '';
  dateElement2.required = true;

  let companyName = document.createElement('label');
  companyName.className = 'companyname';
  companyName.textContent = 'Enter the organization name: ';
  let companyNameinput = document.createElement('input');
  companyNameinput.type = "text";
  companyNameinput.name = `companyname${exp_no}`;
  companyNameinput.className = `companyname${exp_no}`;
  companyNameinput.classList.add("commoncompanyname");
  companyNameinput.placeholder = 'Enter organization name';
  companyNameinput.value = experience.companyName || '';
  companyNameinput.required = true;

  let d1 = document.createElement('div');
  let d2 = document.createElement('div');
  let d3 = document.createElement('div');
  d1.className = 'd1';
  d2.className = 'd2';
  d3.className = 'd3';

  let orgcity = document.createElement("label");
  let orgstate = document.createElement("label");
  let orgcountry = document.createElement("label");
  orgcity.textContent = "Enter organization city name: ";
  orgstate.textContent = "Enter organization state name: ";
  orgcountry.textContent = 'Enter organization country name: ';

  let city = document.createElement('input');
  let state = document.createElement('input');
  let country = document.createElement('input');
  city.className = `city${exp_no}`;
  state.className = `state${exp_no}`;
  country.className = `country${exp_no}`;
  city.classList.add("commonexplocation");
  state.classList.add("commonexplocation");
  country.classList.add("commonexplocation");
  city.value = experience.city || '';
  state.value = experience.state || '';
  country.value = experience.country || '';
  city.required = true;
  state.required = true;
  country.required = true;

  d1.appendChild(orgcity);
  d1.appendChild(city);
  d2.appendChild(orgstate);
  d2.appendChild(state);
  d3.appendChild(orgcountry);
  d3.appendChild(country);

  let remoteLabel = document.createElement('label');
  remoteLabel.textContent = 'Job type Remote: ';
  let remoteCheckbox = document.createElement('input');
  remoteCheckbox.type = 'checkbox';
  remoteCheckbox.name = `remotework${exp_no}`;
  remoteCheckbox.checked = experience.remote || false;
  remoteLabel.className = "remotejob";
  function toggleLocationFields() {
    let disabled = remoteCheckbox.checked;
    city.disabled = disabled;
    state.disabled = disabled;
    country.disabled = disabled;
  }

  remoteCheckbox.addEventListener('change', function () {
    toggleLocationFields();
    saveExperiencesData(); // Save data immediately after changing the remote checkbox
  });
  toggleLocationFields();

  let detailsLabel = document.createElement('label');
  detailsLabel.textContent = 'Add some experience details( *3 to 4 points): ';
  detailsLabel.className = 'detailsLabel';
  let detailsContainer = document.createElement('div');
  detailsContainer.className = 'detailsContainer';

  if (experience.details && experience.details.length > 0) {
    experience.details.forEach(detail => {
      addExperienceDetailField(detailsContainer, detail);
    });
  } else {
    addExperienceDetailField(detailsContainer);
  }

  let addDetailBtn = document.createElement('button');
  addDetailBtn.textContent = 'Add Detail';
  addDetailBtn.className = 'addDetailBtn';
  addDetailBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addExperienceDetailField(detailsContainer);
  });

  let remDetailBtn = document.createElement('button');
  remDetailBtn.textContent = 'Remove Detail';
  remDetailBtn.className = 'remDetailBtn';
  remDetailBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let lastDetail = detailsContainer.lastElementChild;
    if (detailsContainer.childElementCount > 1) {
      lastDetail.remove();
      saveExperiencesData();
    }
  });
  let or = document.createElement('p');
  or.textContent = 'OR';
  or.className = 'or';
  div.appendChild(expname);
  div.appendChild(experienceinput);
  div.appendChild(label1);
  div.appendChild(dateElement1);
  div.appendChild(label2);
  div.appendChild(dateElement2);
  div.appendChild(companyName);
  div.appendChild(companyNameinput);
  div.appendChild(remoteLabel);
  div.appendChild(remoteCheckbox);
  div.appendChild(or);
  div.appendChild(d1);
  div.appendChild(d2);
  div.appendChild(d3);
  div.appendChild(detailsLabel);
  div.appendChild(detailsContainer);
  div.appendChild(addDetailBtn);
  div.appendChild(remDetailBtn);

  experience_info.appendChild(div);
}

function addExperienceDetailField(container, detail = '') {
  let detailInput = document.createElement('input');
  detailInput.type = 'text';
  detailInput.className = 'experiencedetail';
  detailInput.placeholder = 'Experience detail';
  detailInput.value = detail;
  detailInput.required = true;
  container.appendChild(detailInput);
}

function addExperience() {
  let exp_no = experience_info.children.length + 1;
  addExperienceField({}, exp_no);
  saveExperiencesData();
}

add_experience.addEventListener('click', function (e) {
  e.preventDefault();
  addExperience();
});

rem_experience.addEventListener('click', function (e) {
  e.preventDefault();
  let lastExperience = experience_info.lastElementChild;
  if (lastExperience) {
    lastExperience.remove();
    saveExperiencesData();
  }
});

loadExperiencesData();
experience_info.addEventListener("input", saveExperiencesData);


// End of experience section

// Project section

let project_info = document.querySelector(".project_info");
let add_proj = document.querySelector(".add_proj");
let rem_proj = document.querySelector(".rem_proj");

function initializeProjects() {
  let projectsData = JSON.parse(localStorage.getItem("projectsData")) || [];
  if (projectsData.length === 0) {
    addProjectField({}, 1); // Ensure at least one project field is present
  } else {
    projectsData.forEach((project, index) => {
      addProjectField(project, index + 1);
    });
  }
}

function addProjectField(project = {}, proj_no) {
  let div = document.createElement("div");
  div.className = 'projgap';
  div.setAttribute('data-id', proj_no);

  let projname = document.createElement('label');
  projname.textContent = 'Enter Project Name: ';
  projname.className = 'ProjName';

  // Create a new project input element
  let projectinput = document.createElement("input");
  projectinput.name = `projectinput${proj_no}`;
  projectinput.className = `project${proj_no}`;
  projectinput.classList.add("commonprojectinput");
  projectinput.type = "text";
  projectinput.required = true;
  projectinput.placeholder = "Your Project Name";
  projectinput.value = project.name || '';

  let label1 = document.createElement('label');
  label1.textContent = 'Project Start Date: ';
  let label2 = document.createElement('label');
  label2.textContent = 'Project End Date: ';

  // Create new input elements for the dates
  let dateElement1 = document.createElement('input');
  dateElement1.setAttribute('type', 'date');
  dateElement1.setAttribute('id', `projectstartdate${proj_no}`);
  dateElement1.setAttribute('name', `projectstartdate${proj_no}`);
  dateElement1.className = 'projstartdate';
  dateElement1.required = true;
  dateElement1.value = project.startDate || '';

  let dateElement2 = document.createElement('input');
  dateElement2.setAttribute('type', 'date');
  dateElement2.setAttribute('id', `projectenddate${proj_no}`);
  dateElement2.setAttribute('name', `projectenddate${proj_no}`);
  dateElement2.className = 'projenddate';
  dateElement2.required = true;
  dateElement2.value = project.endDate || '';

  let projectinfo_text = document.createElement('h4');
  projectinfo_text.className = 'projinfoText';
  projectinfo_text.textContent = 'Enter some details about your project (*3 to 4 points)';

  let project_point_div = document.createElement("div");
  project_point_div.className = `project_point_div project_point_div_${proj_no}`;

  // Add existing points if available
  if (project.points) {
    project.points.forEach((point, index) => {
      addInputField(project_point_div, point.value, index + 1);
    });
  } else {
    addInputField(project_point_div, '', 1); // Ensure at least one point field is present
  }

  let addPoint = document.createElement("button");
  addPoint.textContent = "Add Point";
  addPoint.classList.add("addPoint");
  addPoint.addEventListener("click", (e) => {
    e.preventDefault();
    addInputField(project_point_div, '', project_point_div.children.length + 1);
    saveProjectsData();
  });

  let remPoint = document.createElement("button");
  remPoint.textContent = "Remove Point";
  remPoint.classList.add("remPoint");
  remPoint.addEventListener("click", (e) => {
    e.preventDefault();
    removeProjectPoint(project_point_div);
  });

  // Tech stack elements
  let tech_stack_text = document.createElement('h4');
  tech_stack_text.className = 'techStackText';
  tech_stack_text.textContent = 'Enter the tech stack used in your project';

  let tech_stack_div = document.createElement("div");
  tech_stack_div.className = `tech_stack_div tech_stack_div_${proj_no}`;

  // Add existing tech stacks if available
  if (project.techStacks) {
    project.techStacks.forEach((techStack, index) => {
      addTechStackInputField(tech_stack_div, techStack.value, index + 1);
    });
  } else {
    addTechStackInputField(tech_stack_div, '', 1); // Ensure at least one tech stack field is present
  }

  let addTechStack = document.createElement("button");
  addTechStack.textContent = "Add Tech Stack";
  addTechStack.classList.add("addTechStack");
  addTechStack.addEventListener("click", (e) => {
    e.preventDefault();
    addTechStackInputField(tech_stack_div, '', tech_stack_div.children.length + 1);
    saveProjectsData();
  });

  let remTechStack = document.createElement("button");
  remTechStack.textContent = "Remove Tech Stack";
  remTechStack.classList.add("remTechStack");
  remTechStack.addEventListener("click", (e) => {
    e.preventDefault();
    removeTechStackInputField(tech_stack_div);
  });

  // Project URL elements
  let projUrlLabel = document.createElement('label');
  projUrlLabel.textContent = 'Enter Project URL: ';
  projUrlLabel.className = 'ProjUrlLabel';

  let projUrlInput = document.createElement("input");
  projUrlInput.name = `projecturl${proj_no}`;
  projUrlInput.className = `projecturl${proj_no}`;
  projUrlInput.classList.add("commonprojecturl");
  projUrlInput.type = "url";
  // projUrlInput.required = true;
  projUrlInput.placeholder = "Enter deployed link or GitHub repo URL";
  projUrlInput.value = project.url || '';

  div.appendChild(projname);
  div.appendChild(projectinput);
  div.appendChild(tech_stack_text);
  div.appendChild(tech_stack_div);
  div.appendChild(addTechStack);
  div.appendChild(remTechStack);
  div.appendChild(document.createElement('br'));

  div.appendChild(label1);
  div.appendChild(dateElement1);
  div.appendChild(label2);
  div.appendChild(dateElement2);

  div.appendChild(projectinfo_text);
  div.appendChild(project_point_div);
  div.appendChild(addPoint);
  div.appendChild(remPoint);

  div.appendChild(projUrlLabel);
  div.appendChild(projUrlInput);

  project_info.appendChild(div);
}

function addInputField(container, value = '', point_no) {
  let proj_points = document.createElement("input");
  proj_points.type = "text";
  proj_points.className = `pointNo${point_no}`;
  proj_points.classList.add("commonprojpoint");
  proj_points.name = `projinputpoint${point_no}`;
  proj_points.placeholder = "Enter point details";
  proj_points.required = true;
  proj_points.value = value;
  container.appendChild(proj_points);
}

function addTechStackInputField(container, value = '', stack_no) {
  let tech_stack = document.createElement("input");
  tech_stack.type = "text";
  tech_stack.className = `techStackNo${stack_no}`;
  tech_stack.classList.add("commonTechStack");
  tech_stack.name = `techstackinput${stack_no}`;
  tech_stack.placeholder = "Enter tech stack (E.g: Java)";
  tech_stack.required = true;
  tech_stack.value = value;
  container.appendChild(tech_stack);
}

function addProject() {
  let proj_no = project_info.children.length + 1;
  addProjectField({}, proj_no);
  saveProjectsData();
}

function removeProject() {
  if (project_info.children.length > 1) {
    let lastProject = project_info.lastChild;
    let proj_no = lastProject.getAttribute('data-id');
    project_info.removeChild(lastProject);
    localStorage.removeItem(`projectinput${proj_no}`);
    localStorage.removeItem(`projectstartdate${proj_no}`);
    localStorage.removeItem(`projectenddate${proj_no}`);
    localStorage.removeItem(`projecturl${proj_no}`);
    saveProjectsData();
  } else {
    alert("At least one project must remain.");
  }
}

function removeProjectPoint(container) {
  if (container.children.length > 1) {
    container.removeChild(container.lastChild);
    saveProjectsData();
  } else {
    alert("At least one input field must remain.");
  }
}

function removeTechStackInputField(container) {
  if (container.children.length > 1) {
    container.removeChild(container.lastChild);
    saveProjectsData();
  } else {
    alert("At least one input field must remain.");
  }
}

function saveProjectsData() {
  let projects = [];
  let projectElements = Array.from(document.querySelectorAll(".projgap"));
  projectElements.forEach((projectElement, index) => {
    let proj_no = index + 1;
    let name = projectElement.querySelector(`input[name=projectinput${proj_no}]`).value;
    let startDate = projectElement.querySelector(`#projectstartdate${proj_no}`).value;
    let endDate = projectElement.querySelector(`#projectenddate${proj_no}`).value;
    let url = projectElement.querySelector(`input[name=projecturl${proj_no}]`).value;

    let points = Array.from(projectElement.querySelectorAll(".commonprojpoint")).map(input => ({
      value: input.value
    }));

    let techStacks = Array.from(projectElement.querySelectorAll(".commonTechStack")).map(input => ({
      value: input.value
    }));

    projects.push({
      name: name,
      startDate: startDate,
      endDate: endDate,
      url: url,
      points: points,
      techStacks: techStacks
    });
  });
  localStorage.setItem("projectsData", JSON.stringify(projects));
}

add_proj.addEventListener('click', function (e) {
  e.preventDefault();
  addProject();
});

rem_proj.addEventListener('click', function (e) {
  e.preventDefault();
  removeProject();
});

initializeProjects();
project_info.addEventListener("input", saveProjectsData);



// End project section











// Achievement Section

let achivcontainer = document.querySelector(".achivcontainer");
let add = document.querySelector(".add");
let remove = document.querySelector(".remove");


// Load the HTML from local storage or default to empty
// achivcontainer.innerHTML = localStorage.getItem(`achivcontainer`);



// Function to add a new achievement
function addAchievement() {
  let val = Number(localStorage.getItem("num")) || 1;
  val++;

  // Save the new value of "num" in localStorage
  localStorage.setItem("num", val);

  // Create a new achievement element
  let achievementDiv = document.createElement("div");
  achievementDiv.className = "achievement";

  let textarea = document.createElement('input');
  textarea.name = `achivtext${val}`;
  textarea.className = `cls${val}`;
  textarea.classList.add('textarea');
  // textarea.rows = "5";
  // textarea.cols = "40";
  textarea.placeholder = "Achieved rank 1 in opensourse event organized by xyz";
  textarea.required = true;

  // Restore the text content of the textarea from localStorage, if available
  let savedText = localStorage.getItem(`achivtext${val}`);
  if (savedText) {
    textarea.value = savedText;
  }

  let input = document.createElement('input');
  input.type = "url";
  input.name = `achivurl${val}`;
  input.className = "common gp";
  input.id = `achivurl${val}`;
  input.placeholder = "E.g: Certification, Publication URL";

  // Restore the value of the input from localStorage, if available
  let savedInputValue = localStorage.getItem(`achivurl${val}`);
  if (savedInputValue) {
    input.value = savedInputValue;
  }

  let label = document.createElement('p');
  label.textContent = "Provide link related to this Achievement";

  // Append elements to the achievement div
  achievementDiv.appendChild(textarea);
  achievementDiv.appendChild(label);
  achievementDiv.appendChild(input);

  // Append the achievement div to the container
  let container = document.querySelector('.achivcontainer');
  container.appendChild(achievementDiv);
}

// Function to load achievements from localStorage
function loadAchievements() {
  let val = Number(localStorage.getItem("num")) || 1;

  for (let i = 1; i <= val; i++) {
    let achievementDiv = document.createElement("div");
    achievementDiv.className = "achievement";

    let textarea = document.createElement('input');
    textarea.name = `achivtext${i}`;
    textarea.className = `cls${i}`;
    textarea.classList.add('textarea');
    // textarea.rows = "5";
    // textarea.cols = "40";
    textarea.placeholder = "Achieved rank 1 in opensourse event organized by xyz";
    textarea.required = true;

    // Restore the text content of the textarea from localStorage, if available
    let savedText = localStorage.getItem(`achivtext${i}`);
    if (savedText) {
      textarea.value = savedText;
    }

    let input = document.createElement('input');
    input.type = "url";
    input.name = `achivurl${i}`;
    input.className = "common gp";
    input.id = `achivurl${i}`;
    input.placeholder = "E.g: Certification, Publication URL";

    // Restore the value of the input from localStorage, if available
    let savedInputValue = localStorage.getItem(`achivurl${i}`);
    if (savedInputValue) {
      input.value = savedInputValue;
    }

    let label = document.createElement('p');
    label.textContent = "Provide link related to this Achievement";

    // Append elements to the achievement div
    achievementDiv.appendChild(textarea);
    achievementDiv.appendChild(label);
    achievementDiv.appendChild(input);

    // Append the achievement div to the container
    let container = document.querySelector('.achivcontainer');
    container.appendChild(achievementDiv);
  }
}

// Call loadAchievements when the page loads
document.addEventListener("DOMContentLoaded", loadAchievements);

// Save the text content of the textarea and the value of the input to localStorage when they change
document.addEventListener("input", function (event) {
  if (event.target.tagName === "TEXTAREA" || event.target.tagName === "INPUT") {
    localStorage.setItem(event.target.name, event.target.value);
  }
});

function removeAchievement() {
  let val = Number(localStorage.getItem("num")) || 1;
  if (val > 1) {
    // Remove the last dynamically added element from the page
    let container = document.querySelector('.achivcontainer');
    let lastElement = container.lastElementChild;
    container.removeChild(lastElement);

    // Remove the corresponding data from localStorage
    localStorage.removeItem(`achivtext${val}`);
    localStorage.removeItem(`achivurl${val}`);

    // Decrement the value in localStorage
    val--;
    localStorage.setItem("num", val);
  }
}


// Add event listeners
add.addEventListener('click', function (e) {
  e.preventDefault();
  addAchievement();
});

remove.addEventListener('click', function (e) {
  e.preventDefault();
  removeAchievement();
});


// End of achievement

let inp = document.querySelector(".inp");
function addlanguage() {

  let lang = Number(localStorage.getItem("lang_no")) || 1;
  lang++;
  // Save the new value of "num" in localStorage
  localStorage.setItem("lang_no", lang);

  // Create a new achievement element
  let langinput = document.createElement("input");
  langinput.name = `langinput${lang}`;
  langinput.className = `lang${lang}`;
  langinput.classList.add("commonlanginput");
  langinput.type = "text";
  langinput.required = true;
  langinput.placeholder = "Python";
  // Restore the text content of the textarea from localStorage, if available
  let savedText = localStorage.getItem(`langinput${lang}`);
  if (savedText) {
    langinput.value = savedText;
  }
  inp.appendChild(document.createTextNode(" "));
  inp.appendChild(langinput);
}

function loadLanguages() {
  let lang = Number(localStorage.getItem("lang_no")) || 1;
  for (let i = 1; i <= lang; i++) {

    // Create a new achievement element
    let langinput = document.createElement("input");
    langinput.name = `langinput${i}`;
    langinput.className = `lang${i}`;
    langinput.classList.add("commonlanginput");
    langinput.type = "text";
    langinput.required = true;
    langinput.placeholder = "Python";
    // Restore the text content of the textarea from localStorage, if available
    let savedText = localStorage.getItem(`langinput${i}`);
    if (savedText) {
      langinput.value = savedText;
    }
    inp.appendChild(document.createTextNode(" "));
    inp.appendChild(langinput);
  }
}

function remLanguages() {
  let val = Number(localStorage.getItem("lang_no")) || 1;
  if (val > 1) {
    // Remove the last dynamically added element from the page
    let container = document.querySelector('.inp');
    let lastElement = container.lastElementChild;
    container.removeChild(lastElement);

    // Remove the corresponding data from localStorage
    localStorage.removeItem(`langinput${val}`);
    // Decrement the value in localStorage
    val--;
    localStorage.setItem("lang_no", val);
  }
}

// Call loadAchievements when the page loads
document.addEventListener("DOMContentLoaded", loadLanguages);

// Save the text content of the textarea and the value of the input to localStorage when they change
document.addEventListener("input", function (event) {
  if (event.target.tagName === "INPUT") {
    localStorage.setItem(event.target.name, event.target.value);
  }
});


let add_lang = document.querySelector(".add_lang");
let rem_lang = document.querySelector(".rem_lang");
add_lang.addEventListener('click', function (e) {
  e.preventDefault();
  addlanguage();
});

rem_lang.addEventListener('click', function (e) {
  e.preventDefault();
  remLanguages();
});

let Frameworks_container = document.querySelector(".Frameworks_container");
function addFrameworks() {
  let frame = Number(localStorage.getItem("frame_no")) || 1;
  frame++;
  // Save the new value of "num" in localStorage
  localStorage.setItem("frame_no", frame);

  // Create a new achievement element
  let frameinput = document.createElement("input");
  frameinput.name = `frameinput${frame}`;
  frameinput.className = `frame${frame}`;
  frameinput.classList.add("commonframeinput");
  frameinput.type = "text";
  frameinput.required = true;
  frameinput.placeholder = "React/Bootstrap";
  // Restore the text content of the textarea from localStorage, if available
  let savedText = localStorage.getItem(`frameinput${frame}`);
  if (savedText) {
    frameinput.value = savedText;
  }
  Frameworks_container.appendChild(document.createTextNode(" "));
  Frameworks_container.appendChild(frameinput);
}

function loadFrameworks() {
  let frame = Number(localStorage.getItem("frame_no")) || 1;
  for (let i = 1; i <= frame; i++) {
    // Create a new achievement element
    let frameinput = document.createElement("input");
    frameinput.name = `frameinput${i}`;
    frameinput.className = `frame${i}`;
    frameinput.classList.add("commonframeinput");
    frameinput.type = "text";
    frameinput.required = true;
    frameinput.placeholder = "React/Bootstrap";
    // Restore the text content of the textarea from localStorage, if available
    let savedText = localStorage.getItem(`frameinput${i}`);
    if (savedText) {
      frameinput.value = savedText;
    }
    Frameworks_container.appendChild(document.createTextNode(" "));
    Frameworks_container.appendChild(frameinput);
  }
}


function remFrameworks() {
  let val = Number(localStorage.getItem("frame_no")) || 1;
  if (val > 1) {
    // Remove the last dynamically added element from the page
    let container = document.querySelector('.Frameworks_container');
    let lastElement = container.lastElementChild;
    container.removeChild(lastElement);

    // Remove the corresponding data from localStorage
    localStorage.removeItem(`frameinput${val}`);
    // Decrement the value in localStorage
    val--;
    localStorage.setItem("frame_no", val);
  }
}




// Call loadAchievements when the page loads
document.addEventListener("DOMContentLoaded", loadFrameworks);

// Save the text content of the textarea and the value of the input to localStorage when they change
document.addEventListener("input", function (event) {
  if (event.target.tagName === "INPUT") {
    localStorage.setItem(event.target.name, event.target.value);
  }
});

let add_frameworks = document.querySelector(".add_frameworks");

let rem_frameworks = document.querySelector(".rem_frameworks");

add_frameworks.addEventListener('click', function (e) {
  e.preventDefault();
  addFrameworks();
});
rem_frameworks.addEventListener('click', function (e) {
  e.preventDefault();
  remFrameworks();
});

let Tools_container = document.querySelector(".Tools_container");

function addTools() {
  let tool = Number(localStorage.getItem("tool_no")) || 1;
  tool++;
  // Save the new value of "num" in localStorage
  localStorage.setItem("tool_no", tool);

  // Create a new achievement element
  let toolinput = document.createElement("input");
  toolinput.name = `toolinput${tool}`;
  toolinput.className = `tool${tool}`;
  toolinput.classList.add("commontoolinput");
  toolinput.type = "text";
  toolinput.required = true;
  toolinput.placeholder = "Git/Github";
  // Restore the text content of the textarea from localStorage, if available
  let savedText = localStorage.getItem(`toolinput${tool}`);
  if (savedText) {
    toolinput.value = savedText;
  }
  Tools_container.appendChild(document.createTextNode(" "));
  Tools_container.appendChild(toolinput);
}

function loadTools() {
  let tool = Number(localStorage.getItem("tool_no")) || 1;

  for (let i = 1; i <= tool; i++) {
    // Create a new achievement element
    let toolinput = document.createElement("input");
    toolinput.name = `toolinput${i}`;
    toolinput.className = `tool${i}`;
    toolinput.classList.add("commontoolinput");
    toolinput.type = "text";
    toolinput.required = true;
    toolinput.placeholder = "Git/Github";
    // Restore the text content of the textarea from localStorage, if available
    let savedText = localStorage.getItem(`toolinput${i}`);
    if (savedText) {
      toolinput.value = savedText;
    }
    Tools_container.appendChild(document.createTextNode(" "));
    Tools_container.appendChild(toolinput);
  }
}

function remTools() {
  let tool = Number(localStorage.getItem("tool_no")) || 1;
  if (tool > 1) {
    let container = document.querySelector(".Tools_container");
    let lastElement = container.lastElementChild;
    container.removeChild(lastElement);

    localStorage.removeItem(`toolinput${tool}`);
    tool--;
    localStorage.setItem("tool_no", tool);
  }
}



// Call loadAchievements when the page loads
document.addEventListener("DOMContentLoaded", loadTools);

// Save the text content of the textarea and the value of the input to localStorage when they change
document.addEventListener("input", function (event) {
  if (event.target.tagName === "INPUT") {
    localStorage.setItem(event.target.name, event.target.value);
  }
});

let add_tools = document.querySelector(".add_tools");
let rem_tools = document.querySelector(".rem_tools");

add_tools.addEventListener('click', function (e) {
  e.preventDefault();
  addTools();
});

rem_tools.addEventListener('click', function (e) {
  e.preventDefault();
  remTools();

});



// Certificate 

const container = document.querySelector(".certificatecontainer");
const addBtn = document.querySelector(".certiadd");
const removeBtn = document.querySelector(".certiremove");

// Load existing certificates from local storage
loadCertificates();

// Add new certificate input fields
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addCertificate("", "");
});

// Remove the last certificate input fields
removeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const certificates = container.querySelectorAll(".certificate");
  if (certificates.length > 0) {
    container.removeChild(certificates[certificates.length - 1]);
    saveCertificates();
  }
});

// Save certificate data to local storage
function saveCertificates() {
  const certificates = container.querySelectorAll(".certificate");
  const data = Array.from(certificates).map(certificate => {
    return {
      name: certificate.querySelector("input[type='text']").value,
      url: certificate.querySelector("input[type='url']").value
    };
  });
  localStorage.setItem("certificates", JSON.stringify(data));
}

// Load certificate data from local storage
function loadCertificates() {
  const data = JSON.parse(localStorage.getItem("certificates")) || [];
  data.forEach(item => {
    addCertificate(item.name, item.url);
  });
}

// Add certificate input fields
function addCertificate(name, url) {
  const certificateDiv = document.createElement("div");
  certificateDiv.classList.add("certificate");

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Enter certificate name";
  certificateDiv.appendChild(nameLabel);

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.required = true;
  nameInput.value = name;
  certificateDiv.appendChild(nameInput);

  const urlLabel = document.createElement("label");
  urlLabel.textContent = "Enter url of certificate";
  certificateDiv.appendChild(urlLabel);

  const urlInput = document.createElement("input");
  urlInput.type = "url";
  urlInput.value = url;
  urlInput.required = true;
  certificateDiv.appendChild(urlInput);

  // Save certificates whenever input fields change
  nameInput.addEventListener("input", saveCertificates);
  urlInput.addEventListener("input", saveCertificates);

  container.appendChild(certificateDiv);
}

// Coding profiles

const profileContainer = document.querySelector(".codingprofilescontainer");
const addProfileBtn = document.querySelector(".profileadd");
const removeProfileBtn = document.querySelector(".profileremove");

// Load existing coding profiles from local storage
loadProfiles();

// Add new coding profile input fields
addProfileBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addProfile("", "");
});

// Remove the last coding profile input fields
removeProfileBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const profiles = profileContainer.querySelectorAll(".codingprofile");
  if (profiles.length > 0) {
    profileContainer.removeChild(profiles[profiles.length - 1]);
    saveProfiles();
  }
});

// Save coding profile data to local storage
function saveProfiles() {
  const profiles = profileContainer.querySelectorAll(".codingprofile");
  const data = Array.from(profiles).map(profile => {
    return {
      platform: profile.querySelector("input[type='text']").value,
      url: profile.querySelector("input[type='url']").value
    };
  });
  localStorage.setItem("codingProfiles", JSON.stringify(data));
}

// Load coding profile data from local storage
function loadProfiles() {
  const data = JSON.parse(localStorage.getItem("codingProfiles")) || [];
  data.forEach(item => {
    addProfile(item.platform, item.url);
  });
}

// Add coding profile input fields
function addProfile(platform, url) {
  const profileDiv = document.createElement("div");
  profileDiv.classList.add("codingprofile");

  const platformLabel = document.createElement("label");
  platformLabel.textContent = "Enter Coding Platform Name";
  profileDiv.appendChild(platformLabel);

  const platformInput = document.createElement("input");
  platformInput.type = "text";
  platformInput.required = true;
  platformInput.value = platform;
  profileDiv.appendChild(platformInput);

  const urlLabel = document.createElement("label");
  urlLabel.textContent = "Enter Profile URL";
  profileDiv.appendChild(urlLabel);

  const urlInput = document.createElement("input");
  urlInput.type = "url";
  urlInput.value = url;
  urlInput.required = true;
  profileDiv.appendChild(urlInput);

  // Save profiles whenever input fields change
  platformInput.addEventListener("input", saveProfiles);
  urlInput.addEventListener("input", saveProfiles);

  profileContainer.appendChild(profileDiv);
}
