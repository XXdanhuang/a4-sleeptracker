--Readme document for Ida Li & Yan Jin, Tianyl33@uci.edu & yjin23@uci.edu, 23166291 & 44288860--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
Approximately 28 hours across both team members, including implementation, interface design, integration, testing, and documentation.


3. What online resources did you consult when completing this assignment? (list specific URLs)
Ionic Framework Documentation: https://ionicframework.com/docs

Ionic Angular Documentation: https://ionicframework.com/docs/angular/overview

Angular Documentation: https://angular.dev/

MDN Web Docs – Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

Ionicons: https://ionic.io/ionicons

ChatGPT: https://chatgpt.com/ (used for coding guidance, debugging assistance, and UI refinement)


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
We collaborated as a two-person team to coordinate feature development, integrate our code through GitHub, resolve merge conflicts, and test the completed application. We discussed interface consistency, navigation between pages, sleep logging functionality, and local data persistence.


5. Is there anything special we need to know in order to run your code?
The application uses Ionic with Angular and can be run in a web browser. From the sleeptracker directory, run npm install followed by ionic serve, then open http://localhost:8100; no API keys or external database configuration are required.


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
We designed Moonly primarily for college students and young adults who want a simple way to monitor their sleep schedules and daytime alertness. The calming watercolor illustrations and straightforward interactions aim to make daily sleep tracking feel less stressful.


7. Did you design your app specifically for iOS or Android, or both?
We designed the app with responsive, cross-platform mobile interfaces in mind rather than targeting one operating system exclusively. Ionic components allow the interface to adapt to different screen sizes and mobile environments.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
Users open the Overnight page, select their bedtime and wake-up time using date and time pickers, review the calculated sleep duration, and save the record. We chose this approach because it supports logging a completed night's sleep without requiring users to interact with the app while falling asleep.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
Users open the Sleepiness page, choose a rating from 1 to 7 on the Stanford Sleepiness Scale, select the date and time, and save their check-in. Clearly labeled rating options make the scale understandable and allow users to record their alertness multiple times throughout the day.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
Users can open the History page to view overnight sleep and daytime sleepiness records, including their dates, durations, and ratings, and filter records by category. We included summary counts and separate filters to help users quickly review their sleep habits without navigating through multiple screens.


11. Which feature choose--using a native device resource, backing up logged data, or both?
We chose to back up logged data using browser Local Storage. This allows users to retain their sleep records after refreshing or reopening the application.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
Not applicable. We implemented the data backup option rather than a native device resource.


13. If you backed up logged data, where does it back up to?
Overnight sleep records and daytime sleepiness records are saved in the browser's Local Storage. The application retrieves saved records so they remain available after a page refresh.

14. How does your app implement or follow principles of good mobile design?
Moonly provides a useful initial view through clear sleep-logging pages and three-tab navigation, prevents errors by validating user inputs, and follows mobile conventions through Ionic components and touch-friendly controls. Users can navigate away from an input without saving, while consistent typography, lavender colors, watercolor illustrations, and confirmation messages make the experience approachable and visually cohesive.