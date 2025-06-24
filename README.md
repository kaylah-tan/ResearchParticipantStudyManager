# How to run the program:

1. Install Node - go to nodejs.org/en/download and follow the instructions.
2. Open the repository, and open two terminal windows. In one, cd to BackEnd, and in the other, cd into FrontEnd.
3. In the backend, run the command "npx prisma generate" (if this doesn't work, you may need to run "npm i" first) and then "npm run dev". This will start to run the local server for the backend.
4. In the frontend, run the command "npm i" and then "npm run dev". This will run the frontend webpage.
5. Open the localhost link provided! Ctrl-Alt-Elite works primarily in the BackEnd folder, and in FrontEnd/src/Researcher_Interface. Byte Me works primarily in FrontEnd/src/Participant_Interface.

Please see Jason Ralston or John Stratton for project goals: especially the ongoing process of upkeep and FERPA regulations, the IRB status of the project, and the evolving requirements for the project. We have a framework, but it is far from complete. 


- Google cloud API integration: a lot of this is done, but if you're picking this 
project up you'll need to integrate a new client ID to access the login credentials and 
email notifications. (the current client ID, and the place where you would replace it, 
is in FrontEnd/main.tsx)
I followed this tutorial to implement most of it, and then troubleshot a few things afterwards, but the interface has been updated since I first went through it so you may find your own that is more up to date https://www.youtube.com/watch?v=UUJfTsn6S_Y
I'll try to sum it up here though
(you access this by making a project, going to the API's and Services section, the Oauth consent screen tab, and filling out the sections listed below)

The big things to look out for: 
- Authorized JavaScript Origins and Authorized Redirect URLs: (These are different from 
the App domain under the branding page) I find those under the Clients tab after hitting 
edit on our current ID, I don't know what it looks like when you're first generating the 
ID under the new UI. For testing, you'll need to add (http://localhost:5173) and (http://localhost), for release you'll need to replace this with a domain I believe but we didn't get that far so I don't know. 
- Scopes: You can edit scopes under the Data Access tab. the scope that is important to login was the ../auth/userinfo.email scope, which gives you access to the users email after they have been authenticated with the google login (see LoginPage.tsx for the login/auth examples).
- Test users: under the audience tab you can list the emails of registered test users. I don't know what happens if the site is still under construction and a non-registered test user tries to log in, but if you're having errors with specific people logging in this would be a good thing to check. 

What should work:
- Login/logout functionality through google api

- prototype styling and frontend work for the pages you'd need to access as a researcher

- backend server that will be able to create and edit studies and connect them to student accounts


TODO: 
- It looks like we have a bug with who gets saved as the primary researcher when a sudy is created, we tried solving this by passing user ID based on login but that is throwing a query error for some reason

- We have not gotten to testing on deleting studies, so presumably that does not work. 

- we still have to differentiate admin level (professors) from student researchers, and have a way to validate admin users

- There was a lot of discussion of recording the completion of surveys on the participant end (probably a qualtrics api or something)

Here are some notes from professors other than Ralston: 
Psych (Matt Prull)
-Would like a way to record participation for Qualtrics studies for psych credit.
-Participant should also be able to link themselves to a particular Psych instructor for Psych 101
-Studies done for Psych 101 credit should have a special designation as such
-Studies for Psych 101 should have a variable for credits tied to them that the researcher designates in advance
-Some kind of progress bar for participants who are Psych 101 students that shows progress toward the total of 4 credits
-There should be a type of study (called "Paper") that Psych 101 students can use to submit papers to their instructors so that the student can get credit in a way other than participating in studies.
--The paper basically serves as an alternative way to earn research credit for Psych 101 students.
-We should talk to Wally Herbranson about his needs from a recruitment system, since he would be the Psych researcher most likely to use it outside of class credit.

Sociology (Michelle Janning and Gilbert Mireles)
-Want to see a mock email that would be sent to participants
-Participants need to report if they are also workers for the school or not for tax purposes
-When creating a project, researchers need customization options when describing method (experiment, survey, other:______) and should be able to select more than 1.
-We should be talking with AITAG about the recruitment software
-We should also talk to WCTS and admin about info collected from students
-Seek assistance from Neal Christopherson/Peter Shultz when designing ways to record attendance for online surveys
-HCD has 3 visiting mentors that could help with any UI questions we might have.
