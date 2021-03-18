# Workana Hiring challenge Solution
## _Issues List_
![Demo Interface 1](https://github.com/edgar294/scrum-planing-poker-laravel-vue/blob/master/public/img/image0.png?raw=true)
## _Poker Room_
![Demo Interface 2](https://github.com/edgar294/scrum-planing-poker-laravel-vue/blob/master/public/img/image1.png?raw=true)

## About this project

This projects is a solution of the [planning poker excercise](https://github.com/Workana/dev_challenges#workana-hiring-challenge) of the Workana Hiring Challenge

Thecnologys used for made this solution:
- Backend
     - [Php 7.3 (server langage)](https://www.php.net/manual/es/intro-whatis.php)
     - [Laravel 8 (framework)](https://laravel.com/)
     - [MySql (database)](https://www.mysql.com/)
     - [Redis (Queue works)](https://redislabs.com/)
- Frontend
     - Html
     - Css
     - Javascript
     - [Vue Js 3](https://vuejs.org/)

## Get up and running

To run this code you need:
  - [Php 7.3 ](https://www.php.net/manual/es/intro-whatis.php) installed
  - [MySql](https://www.mysql.com/) installed
  - [Redis](https://redislabs.com/) installed

Then:
  - Clone this repo: `git clone https://github.com/edgar294/scrum-planing-poker-laravel-vue.git`.
  - Rename file .env-example to .env
  - Set Mysql Credentials and database
  - Run 'composer install'
  - Run 'php artisan key:generate'
  - Run 'php artisan migrate'
  - Start Redis Service
  - Open 3
    - Terminal 1: Run 'php artisan queue:work'
    - Terminal 2: Run 'php artisan serve'
    - Terminal 3: Run 'laravel-echo-server start

Open the application in the browser
  - [localhost:8000](localhost:8000)
