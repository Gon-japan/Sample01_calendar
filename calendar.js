window.onload = Main;

function Main() {
    let year = 2021;
    let month = 6;
    console.log(get_month_calendear(year, month));
}

function get_month_calendar(year, month) {
    let firstDate = new Date(year, (month - 1), 1);// 指定した年月の初日の情報
    let lastDay = new Date(year, (firstDate.getMonth() + 1, 0).getDate());// 指定した年月の末日
    let weekday = firstDate.getDay();// 指定した年月の初日の曜日

    let calendarDate = [];// カレンダー情報を格納
    let weekdayCount = weekday;// 曜日のカウント用;
    for (let i = 0; i < lastDay; i++) {
        calendarDate[i] = {
            day: i + 1,
            weekday: weekdayCount
        }
        if(weekdayCount >= 6) {// 曜日のカウントが6（土曜日）まできたら0（日曜日）に戻す
            weekdayCount = 0;
        } else {
            weekdayCount++;
        }
    }
    return　calendarData;
}