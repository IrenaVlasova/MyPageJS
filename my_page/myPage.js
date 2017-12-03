var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6I' +
    'mE1NjRhYmVhZWM1ZTkzOWM4NWQ0YTNkYzAwNjE2YmYwNGM0OWZiODg2NTkyNmU2NmUxYTU0ODA' +
    'zYzU1M2VkNmQ2ZDIwZGFiZDk5OTY1NWYwIn0.eyJhdWQiOiIxMCIsImp0aSI6ImE1NjRhYmVhZWM1' +
    'ZTkzOWM4NWQ0YTNkYzAwNjE2YmYwNGM0OWZiODg2NTkyNmU2NmUxYTU0ODAzYzU1M2VkNmQ2ZDIwZGFi' +
    'ZDk5OTY1NWYwIiwiaWF0IjoxNTEwMjQ1OTI3LCJuYmYiOjE1MTAyNDU5MjcsImV4cCI6MTgyNTc3ODcyNy' +
    'wic3ViIjoiNzMxIiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ2' +
    '91cnNlSW5mbyJdfQ.78naDDBGF1VhUArEeRR8nkzAmFvCVt33ZOfCiJKu5xapPSKWxVrZBFPSCCc770LkKll' +
    'iGc482KF1YZjwCTH6zrE7onW9mT09ZBNKur_Ar_AVGWc0LVAiXvf7XEE4t-qsNwms_-w0JBO1sy2TDkjTXqkj' +
    'oOp8hhoCLO3uIajbm8OPc2YrC6sOkIOXTG9sVKQLpq7iOV6GN1ZI5Qhan2mcaeE4a-xf8mAWT_pgWziofvaskOGh' +
    'UnzyueXzMJ9bgkWgdlb0FKqpxS2oi5T2BUUzBo-7g4KIK9xtXL4Xyq4tdJCIkQFRYs1udn14c1t0Eim-yNzcKXBbm0' +
    'T_e7G9mLOD9HvzVpX79l2_Awa3Yw3gRK_RpxP5HvtH29wx5w4n5NBq5AadRxttIKPWToEBPl7_uBl8kxG7O5VbLNSqmR' +
    'RKqosF9YpsQY3U0i7Kkls7btGeYQ4Pbl5Jx7qtj1ds5t08CJuLAJ2rGu0fzBEfRSIrzLrTuJVnJkU4OVLHUlYkYGF4nTM' +
    '_FBLQdT5HCrg7ux_LFabCH7Q7Zs8F4-KJzizxtgPZog-0feh0BH7SOee3djCesxYuS17SPpfbI5f5XLduYGfgN7w0A2y0' +
    'Tt53AjKJN-UHQYJf6vnxLUvq8yh7qietZH-q8nh8Kgn5FR19pBxMOKG7dWaAmELIVPIjo6NfMh0';

var client = new INTITAClient({ key: API_KEY });

client.getUserDetails(function (error,userData) {
    var elAvatar = document.getElementById('avatar');
    elAvatar.setAttribute("src", userData.avatar);

    var elName = document.getElementById('firstName');
    elName.innerText = userData.firstName;

    var elSecName = document.getElementById('secondName');
    elSecName.innerText = userData.secondName;

    var elCity = document.getElementById('city');
    elCity.innerText = userData.city;

    var elAboutMy = document.getElementById('aboutMy');
    elAboutMy.innerText = userData.aboutMy;

    var elInterests = document.getElementById('interests');
    elInterests.innerText = userData.interests;

    var elPhone = document.getElementById('phone');
    elPhone.innerText = userData.phone;

    var elEmail = document.getElementById('email');
    elEmail.innerText = userData.email;

    var elFacebook = document.getElementById('facebook');
    elFacebook.innerText = userData.facebook;

    var trainers = document.getElementById("trainers");
    for (var i = 0; i < userData.trainers.length; i++) {
        var trainerName = document.createElement("div");
        trainerName.innerText = userData.trainers[i].secondName + " " + userData.trainers[i].firstName;
        trainers.appendChild(trainerName);
    }
} );

client.getUserCoursesAndModules(function(error,userData){
    var course_id = userData.courses[0].id;

    client.getCourseInfo(course_id,function(error,courseData) {

        var courses = document.getElementById('courses-container');

        var rootElement = document.createElement("div");
        rootElement.setAttribute("id", "course-root");
        courses.appendChild(rootElement);

        var isCourseExpanded = document.createElement("div");
        isCourseExpanded.setAttribute("class", "is-expanded");
        isCourseExpanded.innerText = "+";
        rootElement.appendChild(isCourseExpanded);

        var courseTitle = document.createElement("div");
        courseTitle.innerText = courseData.title_ua;
        courseTitle.addEventListener("click", onCourseClick);

        var ul = document.createElement("ul");
        ul.setAttribute("class", "el-hidden");
        rootElement.appendChild(courseTitle);
        rootElement.appendChild(ul);

        FillModules(course_id, ul);
    });
});

function FillModules(courseId, ul) {
    client.getCourseModules(courseId, function (error, moduleData) {

        for (var i = 0; i < moduleData.length; i++) {
            var modules = document.getElementById('modules');

            var moduleTitle = document.createElement("li");
            moduleTitle.innerText = moduleData[i].title;
            ul.appendChild(moduleTitle);

            var module_id = moduleData[i].id;
            var elementId = "module-id-" + module_id;
            moduleTitle.setAttribute("id", elementId);

            FillLectures(module_id);
        }
    });
}

function FillLectures(moduleId) {
    client.getModuleLectures(moduleId, function(error, lecturesData) {
        for(var j in lecturesData){
            var lecture = document.createElement("ul");
            var lectureTitle = document.createElement("li");
            lectureTitle.innerText = lecturesData[j].title;
            lecture.appendChild(lectureTitle);
            var moduleNode = document.getElementById("module-id-" + moduleId);
            moduleNode.appendChild(lecture);
        }
    });
}

function onCourseClick() {
    var courseRoot = this.parentElement;
    var isExpanded = courseRoot.querySelector(".is-expanded");
    var ul = courseRoot.getElementsByTagName("ul")[0];
    var isHidden = ul.getAttribute("class") ==="el-hidden";
    if(isHidden) {
        isExpanded.innerText = "-";
        ul.setAttribute("class", "el-shown");
    }
    else {
        isExpanded.innerText = "+";
        ul.setAttribute("class", "el-hidden");
    }
}

