window.onload = Main;

function Main() {
    // 現在の年月の取得
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMounth() + 1;// date.getMounth()の値が5の場合、6月。数字が本来の月より１つズレている。

    // カレンダーの表示
    let wrapper = document.getElementById('calendar');
    add_calendar(wrapper, year, month);
}

function add_calendar(wrapper, year, month) {// カレンダーのページを作る関数
    // 現在カレンダーが追加されている場合は一旦削除する。
    wrapper.textContent = null;

    // カレンダーに表示する内容を取得
    let headData = generate_calendar_header(wrapper, year, month);
    let bodyData = generate_month_calendar(year, month);

    // カレンダーの要素を追加
    wrapper.appendChild(headData);
    wrapper.appendChild(bodyData);
}
function generate_calendar_header(wrapper, year, month) {// 前月と翌月へと遷移する関数
    // 前月と翌月を取得
    let prevMonth = new Data(year, (month - 1));
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    let nextMonth = new Data(year, (month - 1));
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // ヘッダー要素
    let cHeader = document.createElement('div');
    cHeader.className = 'calendar-header';

    // 見出しの追加
    let cTitle = document.createElement('div');
    cTitle.className = 'calendar-header title';
    let cTitleText = document.createTextNode(year + '年' + month + '月');
    cTitle.appendChild(cTitleText);
    cHeader.appendChild(cTitle);

    //前月ボタンの追加
    var cPrev = document.createElement('button');
    cPrev.className = 'calendar-header prev';
    let cPrevText = document.createTextNode('prev');
    cPrev.appendChild(cPrevText);
    // 前月ボタンをクリックした時のイベント設定
    cPrev.addEventListener('click', function() {
        add_calendar(wrapper, prevMonth.getFullYear(), (prevMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cPrev);

    //翌月ボタンの追加
    var cNext = document.createElement('button');
    cNext.className = 'calendar-header next';
    let cNextText = document.createTextNode('next');
    cNext.appendChild(cNextText);
    // 翌月ボタンをクリックした時のイベント設定
    cNext.addEventListener('click', function() {
        add_calendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cNext);

    return cHeader;
}
function generate_month_calendar(year, month) {// カレンダーの月テーブルを作成する関数
    let weekdayData = ['日', '月', '火', '水', '木', '金', '土'];
    // カレンダーの情報を取得
    let calendarData = get_month_calendar(year, month);

    let i = calendarData[0]['weekday'];// 初日の曜日を取得
    //カレンダー上の初日より前を埋める（日付は記載されていない空きマスを作る）。
    while (i > 0) {
        i --;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    let i = calendarData[calendarData.length - 1]['weekday'];// 末日の曜日を取得
    // カレンダー上の末日よりあとを埋める（日付は記載されていない空きマスを作る）。
    while (i < 6) {
        i ++;
        calendarData.push({
            day: '',
            weekday: i
        });
    }

    // カレンダーの要素を生成
    let cTable = document.createElement('table');
    cTable.className = 'calendar-table';

    let insertData ='';
    // 曜日部分の生成
    insertData += '<thead>';
    insertData += '<tr>';
    for (let i = 0; i < weekdayData.length; i++) {
        insertData += '<th>';
        insertData += weekdayData[i];
        insertData += '</th>';
    }
    insertData += '</tr>';
    insertData += '</thead>';

    // 日付部分の生成
    insertData += '<tbody>';
    for (let i = 0; i < calendarData.length; i++) {
        if (calendarData[i]['weekday'] <= 0) {
            insertData += '<tr>';
        }
        insertData += '<td>';
        insertData += calendarData[i]['day'];
        insertData += '</td>';
        if (calendarData[i]['weekday'] >= 6) {
            insertData += '</tr>';
        }
    }
    insertData += '</tbody>';

    cTable.innerHTML = insertData;
    return cTable;
}

function get_month_calendar(year, month) {// カレンダーのデータを取得する関数
    let firstDate = new Date(year, (month - 1), 1);// 指定した年月の初日の情報
    let lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate();// 指定した年月の次の月の0日目（繰り上げると、指定した年月の末日）
    let weekday = firstDate.getDay();// 指定した年月の初日の曜日

    let calendarData = [];// カレンダー情報の格納
    let weekdayCount = weekday;// 曜日のカウント用
    for (let i = 0; i < lastDay; i++) {
        calendarData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }
        // 曜日のカウントが6（土曜日）まできたら0（日曜日）に戻す
        if (weekdayCount >= 6) {
            weekdayCount = 0;
        } else {
            weekdayCount ++;
        }
    }
    return calendarData;
}