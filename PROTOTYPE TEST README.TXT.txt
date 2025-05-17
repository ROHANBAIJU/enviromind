****************** STEPS TO RUN THE PROTOTYPE *********************



Step 1:  Download the zip file of the entire repository and extract the files into a folder.


Step 2: Install nodejs, python 3.12 or greater, pnpm. (Refer Chatgpt or youtube for tutorials). 
You can install node js and python directly from www.nodejs.org and www.python.org
For installing pnpm, install node js first and then run the command 'npm install pnpm' in a terminal.
After Installing verify their installation by running these commands in a teminal,
python --version
node --version
pnpm --vesion


Step 3: Open your code editor (in this case VS Code) Open the folder where you extracted the zip file of the repository and then open a terminal in vs code and run the command "pnpm install"(this installs all frontend libraries and dependencies from package.json located in '/package.json')


Step 4: For the Backend, open the enviromind_app.py file located in 'Backend/enviromind_app.py', now create a new virtual environment here by using vs code internal venv creation mechanism.
The steps are:
1. After opening enviromind_app.py, at the bottom right corner, there should be some VsCode in built buttons like -- Ln,Col1     Spaces;4    UTF-8   LF    {}Python     3.12.4(version number according to which python you downloaded)
2.Click on 3.12.4 (version number according to python you downloaded)
3.You will see the Select Intrepreter interface box, Click on '+ Create Virtual Environment'.
4.Clcik on Venv(default) or Conda if you have Conda installed and prefer to use it instead, we ll be going with Venv.
5.In the next 'Select a Python Installation interface box' that appears after clicking on Venv, choose the python which you installed right now by clicking on Enter intrepreter path (where you need to copy paste the python installed path) or choose it directly if its listed directly in the same interface box.
6.After choosing the python, in the next interface box where it says Select dependencies to install, Choose the dropdown 'Backend/requirements.txt'
The neccessary Backend libraries will be installed.


Step 5: Now run the enviromind_app.py script to turn on the backend server, you should see the output in the terminal which says that the server is successfully running. The below output should come in the terminal when the server is running successfully. 
*****SOIL Model Input Shape: (None, 128, 128, 3)
 * Serving Flask app 'enviromind_app'
 * Debug mode: on
INFO:werkzeug:WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.**********
INFO:werkzeug:Press CTRL+C to quit
INFO:werkzeug: * Restarting with watchdog (windowsapi)



Step 6: Open another terminal, or in the terminal where you did pnpm install perform "pnpm dev",(the terminal must be in the directory where the frontend files are downloaded). 


Step 7: The step 6 process will give two links in the executing terminal by which the webapp can be accessed can be accessed.
The links will be in the format 
   ▲ Next.js 15.2.4
   - Local:        http://localhost:*****
   - Network:      http://192.*********


Step 8: After Running the Backend Server, a link will be provided in flask depending on system to system. The link will be in the format http//127:*****
This is the backend api end point url, after this link is obtained user must paste the following lines of code in 
 
 http//127:*****/eco_scan     line 199 in "enviromind\Frontend\components\tools\eco-scan.tsx"

 http//127:*****/agrovision/plant_mode line 686 in "components\tools\agro-vision.tsx"

 http//127:*****/agrovision/soil_mode  line 779 in "components\tools\agro-vision.tsx"

 http//127:*****/worldcitiesaqi        line 661 in "components\tools\pollumap.tsx"

 http//127:*****/pollumap              line 874 in "components\tools\pollumap.tsx"

 http//127:*****/get_climate_data      line 952 in "components\tools\pollumap.tsx"

 http//127:*****/get_water_quality_data line 1006 in "components\tools\pollumap.tsx"

 http//127:*****/chatbot               line 159 in "components\tools\dr-r.tsx"

 
The line numbers are based on the code editor Visual Studio Code


Step 9: After successfully changing the above code lines kindly, go to the frontend link (mentioned in step 7) and check whether the tools are working and the website is functional.


@EnviroMind





