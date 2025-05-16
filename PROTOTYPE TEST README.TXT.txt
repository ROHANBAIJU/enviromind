****************** STEPS TO RUN THE PROTOTYPE *********************



Step 1:  Download the zip file of the entire repository along with all the files and open the folder in a code editor.


Step 2: Install nodejs, python 3.12 or greater, pnpm. (Refer Chatgpt or youtube for tutorials).


Step 3: Open a terminal and navigate to the Frontend directory where the frontend files are installed, and run the command "pnpm install"(this installs all frontend libraries and dependencies from packages.json)


Step 4: For the Backend, first open another terminal and navigate to the python directory which you are using as an interpreter and run the pip install command in your python installed directory to install the neccessary libraries for the backend. 
The neccessary libraries will be available from Requirements.txt which is present in the Backend Folder.


Step 5: Open enviromind_app.py in Backend Directory and run the script to turn on the backend server, you should see the output in the terminal which says that the server is successfully running.


Step 6: Open another terminal, or in the terminal where you did pnpm install perform "pnpm dev",(the terminal must be in the Frontend directory where the frontend files are downloaded). 
The links will be in the format http//192:***


Step 7: The step 6 process will give two links in the executing terminal by which the webapp can be accessed can be accessed.


Step 8: Use the links and go to the website and start using.


Step 9: After Running the Backend Server, a link will be provided in flask depending on system to system. The link will be in the format http//127:*****
This is the backend api end point url, after this link is obtained user must paste the following lines of code in 
 
 http//127:*****/eco_scan     line 199 in "enviromind\Frontend\components\tools\eco-scan.tsx"

 http//127:*****/agrovision/plant_mode line 686 in "enviromind\Frontend\components\tools\agro-vision.tsx"

 http//127:*****/agrovision/soil_mode  line 779 in "enviromind\Frontend\components\tools\agro-vision.tsx"

 http//127:*****/worldcitiesaqi        line 661 in "enviromind\Frontend\components\tools\pollumap.tsx"

 http//127:*****/pollumap              line 874 in "enviromind\Frontend\components\tools\pollumap.tsx"

 http//127:*****/get_climate_data      line 952 in "enviromind\Frontend\components\tools\pollumap.tsx"

 http//127:*****/get_water_quality_data line 1006 in "enviromind\Frontend\components\tools\pollumap.tsx"

 http//127:*****/chatbot               line 159 in "enviromind\Frontend\components\tools\dr-r.tsx"

 
The line numbers are based on the code editor Visual Studio Code








