# Project Plan
This section will provide a basic rundown plan of this project including Code Base, Components, and Pages


### Code Base:
Remix - Indie Stack
Database: SQLLite DB for content
Authentication: Firebase with Email and Password or Local DB, undecided. 

### Components:
Header Component - Logo Image
Nav Component - Links to /Login if not signed in, and links to other pages after logged in
Call to Action COmponent: Three Div Box Grid Component with Heading Image and Description 
Home Page Description Component

### Pages:
- Home page
- Login Page
--	Register Page
--	Forgot Password Page
- Logged in Landing Page (Hub)
- Worksheet Content Page - Contains markdown examples with screenshots of - Worksheets -> The initial page is done, need to format to ensure that code blocks will function correctly, and allow images to be uploaded and displayed. Also need to edit the database and add a description box. 
- KB Content Page - Contains markdown samples or PDFS of knowledgebase articles
- SQL Content Page - Contains helpful scripts, content for S

1. Worksheet Examples and Code Snippets
2. SQL Server Maintenance and Scripts
3. Crystal Reports
4. Documentation
5. Policies and Procedures 

### Project 5/27/2022
Picking back up on this project. 
Running NPM Update breaks this project due to remix dependencies 

Work done 5/27/2022
Created Components Folder
Created 2 components to create consistency without retyping these components each time. 
1. The title header for each page - PageHeaderComponent
2. The Home and Logout Button for each page - PageHeaderButtonComponent. The home button allows the user to switch between Notes and Worksheets pages. 