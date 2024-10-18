// const fname = localStorage.getItem('fname');
// const email = localStorage.getItem('email');

// Local storage store key value pair in which value can be string only

// using local storage
// document.querySelector(".pfname").textContent = fname;
// document.querySelector(".pemail").textContent = email;


// using URLSearchParams() function 
var data = window.location.search;

let param = new URLSearchParams(data);
document.querySelector(".pfname").textContent = param.get("fname");
document.querySelector(".pphone").textContent = param.get("phone");
document.querySelector(".pemail").textContent = param.get("ename");
document.querySelector(".pemail").href = `mailto: ${param.get("ename")}`

document.querySelector(".plinkdin").textContent = `linkedin.com/in/${param.get("fname")}`;
document.querySelector(".plinkdin").href = `${param.get("linkdin")}`;

document.querySelector(".pgithub").textContent = param.get("github");
document.querySelector(".pgithub").href = ` ${param.get("github")}`
document.querySelector(".clgname").textContent = param.get("clgname");

document.querySelector(".dist").textContent = param.get("dist");


document.querySelector(".state").textContent = param.get("state");
document.querySelector(".country").textContent = param.get("country");

document.querySelector(".deg").textContent = param.get("degname");
document.querySelector(".course").textContent = param.get("coursename");
document.querySelector(".ygpaval").textContent = param.get("ygpa")

let coursestartdate = param.get("coursestartdate");
let startyear = "";
let startmonth = "";
for (let i = 0; i < coursestartdate.length; i++) {
  if (coursestartdate[i] === '-') {
    break;
  }
  startyear += coursestartdate[i];
}

for (let i = 5; i < coursestartdate.length; i++) {
  if (coursestartdate[i] === '-') {
    break;
  }
  startmonth += coursestartdate[i];
}



document.querySelector(".c1").textContent = (startmonth + "/" + startyear);
// document.querySelector("coursestartdate2").textContent = startyear;
let courseenddate = param.get("courseenddate");
let endyear = "";
let endmonth = "";
for (let i = 0; i < courseenddate.length; i++) {
  if (courseenddate[i] === '-') {
    break;
  }
  endyear += courseenddate[i];
}

for (let i = 5; i < courseenddate.length; i++) {
  if (courseenddate[i] === '-') {
    break;
  }
  endmonth += courseenddate[i];
}


document.querySelector(".c2").textContent = endmonth + "/" + endyear;

// document.querySelector(".achivtext").innerHTML = param.get("achivtext");

// Experience section
let experienceDataString = localStorage.getItem("experiences");
let experienceDataArray;
if (experienceDataString) {
  experienceDataArray = JSON.parse(experienceDataString);
}
else {
  experienceDataArray = [];
}
// console.log(experienceDataArray);

if (experienceDataArray.length > 0) {
  let outerexperiencediv = document.querySelector(".outerexperiencediv");


  let gp = document.createElement('div');
  gp.className = 'gp';
  let expheading = document.createElement('h2');
  expheading.textContent = "EXPERIENCE";
  expheading.className = 'exp';
  let h_r = document.createElement('hr');
  let explist = document.createElement('div');
  explist.className = 'experiencelist';
  outerexperiencediv.appendChild(gp);
  outerexperiencediv.appendChild(expheading);
  outerexperiencediv.appendChild(h_r);
  outerexperiencediv.appendChild(explist);

  for (let i = 0; i < experienceDataArray.length; i++) {
    let experiencelist = document.querySelector('.experiencelist');
    let expHeadingDate = document.createElement('div');
    expHeadingDate.className = 'expHeadingDate';
    let expheading = document.createElement('div');
    let expname = document.createElement('span');
    expname.className = 'expname';
    expname.textContent = experienceDataArray[i].name;
    expheading.appendChild(expname);
    expheading.className = 'expheading';

    let expdate = document.createElement('div');
    expdate.className = 'expdate';

    let startdate = document.createElement('span');
    let enddate = document.createElement('span');
    let expstartyear = "";
    let expstartmonth = "";
    let date1 = experienceDataArray[i].startDate;


    let t = 0;
    for (t = 0; t < date1.length; t++) {
      if (date1[t] === '-') {
        break;
      }
      else {
        expstartyear += date1[t];
      }
    }

    for (let x = t + 1; x < date1.length; x++) {
      if (date1[x] === '-') {
        break;
      }
      else {
        expstartmonth += date1[x];
      }
    }


    startdate.textContent = (expstartmonth + "/" + expstartyear);;

    startdate.className = 'expdate1';

    let expendmonth = "";
    let expendyear = "";
    let date2 = experienceDataArray[i].endDate;
    let p = 0;
    for (p = 0; p < date2.length; p++) {
      if (date2[p] === '-') {
        break;
      }
      else {
        expendyear += date2[p];
      }
    }

    for (p = p + 1; p < date2.length; p++) {
      if (date2[p] === '-') {
        break;
      }
      else {
        expendmonth += date2[p];
      }
    }

    enddate.textContent = (expendmonth + "/" + expendyear);
    enddate.className = 'expdate1';

    expdate.appendChild(startdate);
    expdate.appendChild(document.createTextNode(" - "));
    expdate.appendChild(enddate);

    expHeadingDate.appendChild(expheading);
    expHeadingDate.appendChild(expdate);
    experiencelist.appendChild(expHeadingDate);

    let orgnamelocation = document.createElement('div')
    orgnamelocation.className = 'orgnamelocation';
    let orgnamediv = document.createElement('div');
    let orgnameheading = document.createElement('span');
    orgnameheading.className = 'orgnameheading';
    orgnameheading.textContent = experienceDataArray[i].companyName;
    orgnamediv.appendChild(orgnameheading);
    orgnamediv.className = 'orgnamediv';
    orgnamelocation.appendChild(orgnamediv);
    let orglocation = document.createElement('div');
    orglocation.className = 'orglocation';
    if (experienceDataArray[i].remote === false) {
      let orgcity = document.createElement('span');
      let orgstate = document.createElement('span');
      let orgcountry = document.createElement('span');
      orgcity.className = 'orgcity';
      orgstate.className = 'orgstate';
      orgcountry.className = 'orgcountry';
      orgcity.textContent = experienceDataArray[i].city;
      orgstate.textContent = experienceDataArray[i].state;
      orgcountry.textContent = experienceDataArray[i].country;
      orglocation.appendChild(orgcity);
      orglocation.appendChild(document.createTextNode(', '));
      orglocation.appendChild(orgstate);
      orglocation.appendChild(document.createTextNode(', '));
      orglocation.appendChild(orgcountry);
    }
    else {
      let orgremote = document.createElement('span');
      orgremote.textContent = "Remote";
      orglocation.appendChild(orgremote);
    }
    orgnamelocation.appendChild(orglocation);
    experiencelist.appendChild(orgnamelocation);

    let expdetailsdiv = document.createElement('ul');
    expdetailsdiv.className = 'expdetailsdiv';
    let pointdetails = experienceDataArray[i].details;
    for (let j = 0; j < pointdetails.length; j++) {
      let point = document.createElement('li');
      point.className = 'point';
      point.textContent = pointdetails[j];
      expdetailsdiv.appendChild(point);
    }
    experiencelist.appendChild(expdetailsdiv);
  }

}


// Experience section end


// Project Section 


let projectsDataString = localStorage.getItem("projectsData");
let projectsDataArray;

if (projectsDataString) {
  projectsDataArray = JSON.parse(projectsDataString);
} else {
  projectsDataArray = []; // Initialize with an empty array if no data is found
}

// console.log(projectsDataArray);

for (let i = 0; i < projectsDataArray.length; i++) {
  let projectlist = document.querySelector(".projectlist");
  let projheadingDate = document.createElement('div');
  let projheading = document.createElement('div');
  let projname = document.createElement('span');
  projname.className = 'projname';
  projheadingDate.className = 'projheadingDate';
  projname.textContent = projectsDataArray[i].name;
  projheading.appendChild(projname);
  projheading.appendChild(document.createTextNode(" | "));

  let projtechstack = projectsDataArray[i].techStacks;
  for (let j = 0; j < projtechstack.length; j++) {
    let stack = document.createElement('span');
    stack.className = 'satck';
    stack.textContent = projtechstack[j].value;
    projheading.appendChild(stack);
    if (j != projtechstack.length - 1) {
      projheading.appendChild(document.createTextNode(", "))
    }
  }

  let projdate = document.createElement('div');
  let startdate = document.createElement('span');
  let enddate = document.createElement('span');
  let projstartyear = "";
  let projstartmonth = "";
  let date1 = projectsDataArray[i].startDate;


  let t = 0;
  for (t = 0; t < date1.length; t++) {
    if (date1[t] === '-') {
      break;
    }
    else {
      projstartyear += date1[t];
    }
  }

  for (let x = t + 1; x < date1.length; x++) {
    if (date1[x] === '-') {
      break;
    }
    else {
      projstartmonth += date1[x];
    }
  }


  startdate.textContent = (projstartmonth + "/" + projstartyear);;

  startdate.className = 'projdate';

  let projendmonth = "";
  let projendyear = "";
  let date2 = projectsDataArray[i].endDate;
  let p = 0;
  for (p = 0; p < date2.length; p++) {
    if (date2[p] === '-') {
      break;
    }
    else {
      projendyear += date2[p];
    }
  }

  for (p = p + 1; p < date2.length; p++) {
    if (date2[p] === '-') {
      break;
    }
    else {
      projendmonth += date2[p];
    }
  }

  enddate.textContent = (projendmonth + "/" + projendyear);
  enddate.className = 'projdate';

  projdate.appendChild(startdate);
  projdate.appendChild(document.createTextNode(" - "));
  projdate.appendChild(enddate);


  projheadingDate.appendChild(projheading);
  projheadingDate.appendChild(projdate);
  projectlist.appendChild(projheadingDate);


  let projpointarr = projectsDataArray[i].points;
  let projpointDiv = document.createElement('ul');
  projpointDiv.className = 'projpointDiv';
  for (let k = 0; k < projpointarr.length; k++) {
    let projpoint = document.createElement('li');
    projpoint.classList = 'projpoint';
    projpoint.textContent = projpointarr[k].value
    projpointDiv.appendChild(projpoint);
  }
  if (projectsDataArray[i].url.length > 0) {
    let projpoint = document.createElement('li');
    let projlink = document.createElement('a');
    projlink.className = 'projlink';
    projlink.href = projectsDataArray[i].url;
    projlink.textContent = projectsDataArray[i].url;

    projpoint.textContent = `[Live : `;
    projpoint.appendChild(projlink);
    projpoint.appendChild(document.createTextNode(']'));

    projpointDiv.appendChild(projpoint)
  }
  projectlist.appendChild(projpointDiv);

}







// Project section end


let val = Number(localStorage.getItem("num")) || 1;

for (let i = 1; i <= val; i++) {
  let achivlist = document.querySelector(".achivlist");
  let li = document.createElement("li");
  li.className = `achivitem${i}`;
  li.classList.add("commonachivitem");

  // Set the text content of the li element
  let text = localStorage.getItem(`achivtext${i}`);
  let text1 = localStorage.getItem(`achivurl${i}`);

  if (text) {
    li.textContent = text;
  }

  if (text1) {
    let a = document.createElement('a');
    a.href = text1;
    a.className = "achivlink";
    // Add a space between the text and the link
    li.appendChild(document.createTextNode(" "));

    a.textContent = "[View Here]"; // Set the text content of the anchor element

    // Append the anchor element to the list item
    li.appendChild(a);
  }

  achivlist.appendChild(li);
}

let lang = Number(localStorage.getItem("lang_no")) || 1;

for (let i = 1; i <= lang; i++) {
  let languages = document.querySelector(".languages");
  let span = document.createElement("span");
  span.className = `langitem${i}`;
  span.classList.add("commonlangitem");
  let text = localStorage.getItem(`langinput${i}`);
  if (text) {
    span.textContent = text;
  }
  if (i != lang) {
    span.appendChild(document.createTextNode(", "));
  }
  languages.appendChild(span);
}


let frame = Number(localStorage.getItem("frame_no")) || 1;

for (let i = 1; i <= frame; i++) {
  let frameworks = document.querySelector(".frameworks");
  let span = document.createElement("span");
  span.className = `frameitem${i}`;
  span.classList.add("commonframeitem");
  let text = localStorage.getItem(`frameinput${i}`);
  if (text) {
    span.textContent = text;
  }
  if (i != frame) {
    span.appendChild(document.createTextNode(", "));
  }
  frameworks.appendChild(span);
}


let tool = Number(localStorage.getItem("tool_no")) || 1;

for (let i = 1; i <= tool; i++) {
  let Tools = document.querySelector(".Tools");
  let span = document.createElement("span");
  span.className = `toolitem${i}`;
  span.classList.add("commontoolitem");
  let text = localStorage.getItem(`toolinput${i}`);
  if (text) {
    span.textContent = text;
  }
  if (i != tool) {
    span.appendChild(document.createTextNode(", "));
  }
  Tools.appendChild(span);
}

// Certificate section

let certificatesDataString = localStorage.getItem("certificates");
let certificatesDataArray;

if (certificatesDataString) {
  certificatesDataArray = JSON.parse(certificatesDataString);
} else {
  certificatesDataArray = []; // Initialize with an empty array if no data is found
}

if (certificatesDataArray.length > 0) {
  let outercertificatediv = document.querySelector(".outercertificatediv");

  let divh = document.createElement('div');
  divh.className = 'gp';
  let certificate = document.createElement('h2');
  certificate.className = "edu";
  certificate.textContent = "CERTIFICATES";
  let _hr = document.createElement('hr');
  let gphr = document.createElement('div');
  gphr.className = 'gphr';
  let certilist = document.createElement('ul');
  certilist.className = 'achivlist';

  outercertificatediv.appendChild(divh);
  outercertificatediv.appendChild(certificate);
  outercertificatediv.appendChild(_hr);
  outercertificatediv.appendChild(gphr);
  outercertificatediv.appendChild(certilist);

  for (let i = 0; i < certificatesDataArray.length; i++) {
    let certipoint = document.createElement('li');
    certipoint.className = 'certipoint';
    certipoint.textContent = certificatesDataArray[i].name;
    certipoint.appendChild(document.createTextNode(" "));
    if (certificatesDataArray[i].url !== " ") {
      let a = document.createElement('a');
      a.className = 'certiurl';
      a.href = certificatesDataArray[i].url;
      a.textContent = "[Click Here]";
      certipoint.appendChild(a);
    }
    certilist.appendChild(certipoint);

  }

}

// Coding profiles


let profilesDataString = localStorage.getItem("codingProfiles");
let profilesDataArray;

if (profilesDataString) {
  profilesDataArray = JSON.parse(profilesDataString);
} else {
  profilesDataArray = []; // Initialize with an empty array if no data is found
}

if (profilesDataArray.length > 0) {
  let outerProfilesDiv = document.querySelector(".outerprofilesdiv");

  let divh = document.createElement('div');
  divh.className = 'gp';
  let profilesTitle = document.createElement('h2');
  profilesTitle.className = "edu";
  profilesTitle.textContent = "CODING PROFILES";
  let _hr = document.createElement('hr');
  let gphr = document.createElement('div');
  gphr.className = 'gphr';
  let profilesList = document.createElement('ul');
  profilesList.className = 'achivlist';

  outerProfilesDiv.appendChild(divh);
  outerProfilesDiv.appendChild(profilesTitle);
  outerProfilesDiv.appendChild(_hr);
  outerProfilesDiv.appendChild(gphr);
  outerProfilesDiv.appendChild(profilesList);

  for (let i = 0; i < profilesDataArray.length; i++) {
    let profilePoint = document.createElement('li');
    profilePoint.className = 'profilepoint';
    profilePoint.textContent = profilesDataArray[i].platform;
    profilePoint.appendChild(document.createTextNode(" : "));
    if (profilesDataArray[i].url !== "") {
      let a = document.createElement('a');
      a.className = 'profileurl';
      a.href = profilesDataArray[i].url;
      a.textContent = profilesDataArray[i].url;
      profilePoint.appendChild(a);
    }
    profilesList.appendChild(profilePoint);
  }
}

// Core subjects
let outerspecializedskills = document.querySelector(".outerspecializedskills");
let specializedskills = document.createElement('p');
specializedskills.className = "specializedskills";
let coresubjectsDataString = localStorage.getItem("coreSubjects");
let coresubjectsDataArray;

if (coresubjectsDataString) {
  coresubjectsDataArray = JSON.parse(coresubjectsDataString);
} else {
  coresubjectsDataArray = []; // Initialize with an empty array if no data is found
}

if (coresubjectsDataArray.length > 0) {
  let div = document.createElement('div');
  div.style.height = "6px";
  let span = document.createElement('span');
  span.textContent = "Specialized Knowledge:";
  span.className = "sk";
  specializedskills.appendChild(div);
  specializedskills.appendChild(span);
  specializedskills.appendChild(document.createTextNode(" "));
  for (let i = 0; i < coresubjectsDataArray.length; i++) {
    let itm = document.createElement('span');
    itm.className = "commoncoresub";
    itm.textContent = coresubjectsDataArray[i].name;
    if (i !== coresubjectsDataArray.length - 1)
      itm.appendChild(document.createTextNode(", "));

    specializedskills.appendChild(itm);
  }
  outerspecializedskills.appendChild(specializedskills);
}

// END of core subject






function downloadCV() {

  let body = document.getElementById("body").innerHTML;

  document.querySelector('.boldcntr').classList.add('hidden');
  document.querySelector('.boldcntr2').classList.add('hidden2');
  document.querySelector('.hidden').classList.remove('boldcntr');
  document.querySelector('.hidden2').classList.remove('boldcntr2');

  let content = document.getElementById("content").innerHTML;
  document.getElementById("body").innerHTML = content;
  window.print();

  document.querySelector('.hidden').classList.add('boldcntr');
  document.querySelector('.boldcntr').classList.remove('hidden');
  document.querySelector('.hidden2').classList.add('boldcntr2');
  document.querySelector('.boldcntr2').classList.remove('hidden2');
  document.getElementById("body").innerHTML = body;



}