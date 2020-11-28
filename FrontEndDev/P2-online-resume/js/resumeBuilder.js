/*
This is empty on purpose! Your code to build the resume will go here.
 */

// Bio obj
var bio =  {
  'name' : 'Prateek Pandey',
  'role' : 'Senior Software Developer',
  'contacts' : {
    'mobile' : '+918861410904',
    'email' : 'pratmbic@gmail.com',
    'github' : 'https://github.com/Maverick13727',
    'twitter' : 'https://twitter.com/Assault13727',
    'location' : ['Bangalore']
  },
  'welcomeMessage' : 'Buiding beautiful,responsive,optimized and secure userExperiences',
  'skills' :  ['HTML', 'CSS' , 'JavaScript', 'HTML5', 'Python' , 'OOPs', 'Git&GitHub'],
  'biopic' : 'images/profilePic.jpg'
};

/**
 * Responsible for displaying the biographical information of the resume.The
 * function is encapsulated in the .display property of the bio object
 * @funtion
 * @param - none
 * @return - none
 */
bio.display = function () {
  // Adding name to the resume
  var formattedName = HTMLheaderName.replace('%data%',bio.name);
  $('#topContacts, #footerContacts').before(formattedName);
  //Role
  var formattedRole = HTMLheaderRole.replace('%data%',bio.role);
  $('#topContacts, #footerContacts').before(formattedRole);

  //Contact Info
  var formattedMobile = HTMLmobile.replace('%data%',bio.contacts.mobile);
  $('#topContacts, #footerContacts').append(formattedMobile);
  var formattedEmail = HTMLemail.replace('%data%',bio.contacts.email);
  $('#topContacts, #footerContacts').append(formattedEmail);
  var formattedGithub = HTMLgithub.replace('%data%',bio.contacts.github);
  $('#topContacts, #footerContacts').append(formattedGithub);
  var formattedTwitter = HTMLtwitter.replace('%data%',bio.contacts.twitter);
  $('#topContacts, #footerContacts').append(formattedTwitter);
  var formattedLocation = HTMLlocation.replace('%data%',bio.contacts.location);
  $('#topContacts, #footerContacts').append(formattedLocation);

  //Adding bio picture
  var formattedPic = HTMLbioPic.replace('%data%',bio.biopic);
  $('#header').append(formattedPic);

  // Welcome Message
  var formattedMessage = HTMLwelcomeMsg.replace('%data%',bio.welcomeMessage);
    $('#header').append(formattedMessage);

  // Adding skills to the resume
  if (bio.skills.length > 0) {
    var i = 0;
    $('#header').append(HTMLskillsStart);
    bio.skills.forEach(function(skill){
      var formattedSkills = HTMLskills.replace ('%data%',skill);
      $('#skills').append(formattedSkills);
    });
  }
};

// Education object
var education = {
  'schools' : [
      {
        'name' : 'Mahangar Boys Inter College',
        'location' : 'Lucknow,Uttar-Pradesh',
        'degree' : 'Secondary School',
        'majors' : ['Maths','Science','Social-Science','Computers'],
        'dates' : '2008',
        'url' : 'http://www.montfortlucknow.org/'
      },
      {
        'name' : 'Rani Lakshmi Bai Senior Secondary School',
        'location' : 'Lucknow,Uttar-Pradesh',
        'degree' : 'Matricultion',
        'majors' : ['Physics', 'Chemistry', 'Maths','Computers'],
        'dates' : '2010',
        'url' : 'http://www.rlbschools.org/'
      },
      {
        'name' : 'Vellore Institute of technology',
        'location' : 'Vellore,Tamil-Nadu',
        'degree' : 'B-Tech',
        'majors' : 'Mechanical',
        'dates' : '2014',
        'url' : 'http://www.vit.ac.in/'
      }
    ],
    'onlineCourses' : [
    {
      'title' :  'Front-End Web Developer Nanodegree',
      'school': 'Udacity',
      'dates' : 'August-2016 - Present',
      'url' : 'www.udacity.com'
    },
    {
      'title' :  'Foundations of Programming: Object-Oriented Design',
      'school': 'Lynda',
      'dates' : 'April-2016',
      'url' : 'www.lynda.com'
    }
  ]
};

/**
 * Responsible for displaying the education related information of the resume.The
 * function is encapsulated in the .display property of the education object
 * @funtion
 * @param - none
 * @return - none
 */
education.display = function () {
  if (education.schools.length > 0) {
    education.schools.forEach(function(school){
      $('#education').append(HTMLschoolStart);
      var formattedSchoolName = HTMLschoolName.replace ('%data%',school.name).replace('#',school.url);
      var formattedDegree = HTMLschoolDegree.replace ('%data%',school.degree);
      var formattedSchoolNameDegree = formattedSchoolName + formattedDegree;
      $('.education-entry:last').append(formattedSchoolNameDegree);
      var formattedDuration = HTMLschoolDates.replace ('%data%',school.dates);
      $('.education-entry:last').append(formattedDuration);
      var formattedLocation = HTMLschoolLocation.replace ('%data%',school.location);
      $('.education-entry:last').append(formattedLocation);
      var formattedMajors = HTMLschoolMajor.replace ('%data%',school.majors);
      $('.education-entry:last').append(formattedMajors);
    });
  }
  if (education.onlineCourses.length > 0) {
    $('#education').append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(onlineCourse){
      $('#education').append(HTMLschoolStart);
      var formattedTitle = HTMLonlineTitle.replace ('%data%',onlineCourse.title);
      var formattedOnlineCourseName =  HTMLonlineSchool.replace ('%data%',onlineCourse.school);
      var titleSchoolFromatted = formattedTitle + formattedOnlineCourseName;
      $('.education-entry:last').append(titleSchoolFromatted);
      var formattedDates = HTMLonlineDates.replace ('%data%',onlineCourse.dates);
      $('.education-entry:last').append(formattedDates);
      var formattedUrl = HTMLonlineURL.replace ('%data%',onlineCourse.url);
      $('.education-entry:last').append(formattedUrl);
    });
  }
};

//Work object
var work = {
  'jobs' : [
    {
      'title' : 'Student Web Developer',
      'dates' : 'August2016 - Present',
      'employer' : 'Udacity Front End Nano Degree Program',
      'location' : 'Bangalore,Karnataka',
      'description' : 'An online tech degree course for learning fundamentals of front-end development'
    },
    {
      'title' : 'Senior Software Developer',
      'dates' : 'June2014 - Present',
      'employer' : 'Altair Engineering',
      'location' : 'Bangalore,Karnataka',
      'description' : 'Lead developer for modularization of automation solutions to Object Oriented Framework'
    },
    {
      'title' : 'Student Intern',
      'dates' : 'Jan2014 - May2014',
      'employer' : 'Altair Engineering',
      'location' : 'Bangalore,Karnataka',
      'description' : 'Development of Packaged and Custom Solutions for process automation'
    },
  ]
};

/**
 * Responsible for displaying the work related  information of the resume.The
 * function is encapsulated in the .display property of the work object
 * @funtion
 * @param - none
 * @return - none
 */
work.display = function() {
  // Adding job experience to the resume
  for (var indexCount = 0; indexCount < work.jobs.length; indexCount++) {
    $('#workExperience').append(HTMLworkStart);
    var employerFormatted =  HTMLworkEmployer.replace('%data%',work.jobs[indexCount].employer);
    var titleFormatted = HTMLworkTitle.replace('%data%',work.jobs[indexCount].title);
    var employerTitleFromatted = employerFormatted + titleFormatted;
    $('.work-entry:last').append(employerTitleFromatted);
    var workDatesFormatted = HTMLworkDates.replace('%data%',work.jobs[indexCount].dates);
    $('.work-entry:last').append(workDatesFormatted);
    var descriptionFormatted = HTMLworkDescription.replace('%data%',work.jobs[indexCount].description);
    $('.work-entry:last').append(descriptionFormatted);
    var locationFormatted = HTMLworkLocation.replace('%data%',work.jobs[indexCount].location);
    $('.work-entry:last').append(locationFormatted);
  }
};

//Project object
var projects = {
  'projects' : [
    {
      'title' : 'Udacity Front End Development Nanodegree',
      'dates' : 'August2016 - Present',
      'description' : 'A front end degree program which requires the student to submit 6 projects (the prjects should meet the given specifications) each involving unique front end development skills',
      'images' : ['images/udacity.png']
    },
    {
      'title' : 'Modularization of Automation Solutions ',
      'dates' : 'August2015 - Present',
      'description' : 'Migration of automation Solutions to Object-Oriented framework using MVP architecture enabling better reusability and efficient customization.',
      'images' : ['images/automate.png']
    }
  ]
};

/**
 * Responsible for displaying the project related information of the resume.The
 * function is encapsulated in the .display property of the project object
 * @funtion
 * @param - none
 * @return - none
 */
projects.display = function () {
  for (var indexCount = 0; indexCount < projects.projects.length; indexCount++) {
    $('#projects').append(HTMLprojectStart);
    var titleFormatted = HTMLprojectTitle.replace('%data%',projects.projects[indexCount].title);
    $('.project-entry:last').append(titleFormatted);
    var datesFormatted = HTMLprojectDates.replace('%data%',projects.projects[indexCount].dates);
    $('.project-entry:last').append(datesFormatted);
    var descriptionFormatted = HTMLprojectDescription.replace('%data%',projects.projects[indexCount].description);
    $('.project-entry:last').append(descriptionFormatted);
    projects.projects[indexCount].images.forEach(function(image){
      var imageFormatted = HTMLprojectImage.replace('%data%',image);
      $('.project-entry:last').append(imageFormatted);
    });
  }
};

// bio.display function call; Diplays Bio Data
bio.display();
// education.display function call; Display Education History
education.display();
// work.display function call; Display Work Information
work.display();
// project.display function call; Display Project related Information
projects.display();
//Display Location Map
$('#mapDiv').append(googleMap);
