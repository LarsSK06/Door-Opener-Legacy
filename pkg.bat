@echo off
if "%~1" == "u" (
    call npm init -y
    call npm update express
    call npm update nodemon
    call npm update fs
    call npm update dotenv
    call npm update cors
) else if "%~1" == "i" (
    call npm init -y
    call npm i express
    call npm i nodemon --save-dev
    call npm i fs
    call npm i dotenv
    call npm i cors --save
) else (
    call npm ls
)