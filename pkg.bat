@echo off
if "%~1" == "u" (
    call npm init -y
    call npm update express
    call npm update nodemon
    call npm update fs
) else if "%~1" == "i" (
    call npm init -y
    call npm i express
    call npm i nodemon
    call npm i fs
) else (
    call npm ls
)