// Source Code Management & CI/CD Pipeline Creation

Source code management is all about managing the source code that we are writing on a day-to-day basis. 

There are specially designed source code management tools we are going to use to maintain the code that we are writing on a day-to-day basis. 

Ex: github , bitbucket & Azure Repo


Git Lifecycle ( Step-by-step process to push the code from local computer to cloud service )
============================================================================================

1. Creating the local workspace 

We need to create a project folder to maintain all our changes related to our automation. Within this folder, we are going to add all our day-to-day changes. 

2. Initialize the local working directory. 
Installing the git libraries within the local workspace to monitor the changes added by the user on a day-to-day basis 

git commands : 

git init  => to initialize
git status => to review the changes

3. Move working files into staging area. 
Separate the working files from all the files modified by the user. Once we are going to separate, we are going to store all these files which we modified and which were ready to push. We are going to store it in a separate space within the local computer only, called staging area. 

git commands : 

git add <file_path>  => If we want to move an individual file to the staging area 
git add . => If we want to move all the files at a time into the staging area 

4. Commit the changes. 
Make all the files moved into the staging area as a single package. And add comments on top of that. 

git commands : 

git commit -m "message"  => Commit the changes and add the message on top of that about why we are making changes. 

5. Push the changes into the specific branch. 
Upload the code or push the code that is currently available on the local computer into the Cloud Repository. Within the Cloud Repository, we are going to push the code into a specific branch. 

git commans :

git remote add origin <git_repo_url>  => To add the cloud repository details to share the changes from the local computer 
git push origin master => To push the code into a specific branch. In this command, master is the branch name. 



Branching Strategy 
=================
Branching strategy is all about maintaining multiple branches or multiple copies of the code to avoid the conflicts and also to maintain the code quality by reviewing the changes every time before we are going to update in the main copy of the code. 