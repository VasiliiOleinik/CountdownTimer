window.addEventListener("DOMContentLoaded", () => {

    'use scrict';
    let deadLine = '2019-05-03', // Конечная дата
        youDate = document.querySelector(".you_date");

    youDate.textContent = deadLine;

    getTimeRemaining = (endtime) => {
        let dateDifference = Date.parse(endtime) - Date.parse(new Date()), // Разница между датами
            seconds = Math.floor((dateDifference / 1000) % 60), // Секунды
            minutes = Math.floor((dateDifference / 1000 / 60) % 60), // Минуты
            hours = Math.floor((dateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // Часы
            days = Math.floor(dateDifference / (1000 * 60 * 60 * 24)); // Дни

        return {
            'total': dateDifference,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'days': days
        };
    };

    setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            days = timer.querySelector('.days'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {
            let t = getTimeRemaining(endtime);
            // Проверка на единицы. Если цифра одна то добавлять 0 перед ней
            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                };
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            days.textContent = addZero(t.days);


            // Заполняющаяся полоса
            let dashLen = (75 - 8 / 2) * Math.PI * 2,
                dashOffsetSeconds = dashLen - t.seconds / 60 * dashLen,
                dashOffsetMinutes = dashLen - t.minutes / 60 * dashLen,
                dashOffsetHours = dashLen - t.hours / 60 * dashLen,
                dashOffsetDays = dashLen - t.days / 60 * dashLen,
                secondsIcon = document.querySelector(".seconds-icon");
            minutesIcon = document.querySelector(".minutes-icon");
            hoursIcon = document.querySelector(".hours-icon");
            daysIcon = document.querySelector(".days-icon");

            secondsIcon.style.strokeDasharray = dashLen;
            secondsIcon.style.strokeDashoffset = Math.floor(dashOffsetSeconds);

            minutesIcon.style.strokeDasharray = dashLen;
            minutesIcon.style.strokeDashoffset = Math.floor(dashOffsetMinutes);

            hoursIcon.style.strokeDasharray = dashLen;
            hoursIcon.style.strokeDashoffset = Math.floor(dashOffsetHours);

            daysIcon.style.strokeDasharray = dashLen;
            daysIcon.style.strokeDashoffset = Math.floor(dashOffsetDays);

            // Если время вышло или введена прошедшая дата
            if (t.total <= 0) {
                let timeAction = document.querySelector(".timer-action");
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                timeAction.textContent = "Акция закончилась!";
            };
        };
    };

    setClock('timer', deadLine);
});