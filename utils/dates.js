function GetFormatedDay(fm) {

    let format = !fm ?  '' : fm;
    let date = new Date();
    let options = {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    let d = date.toLocaleDateString('ko-KR', options);
    let dateArr = d.split(".");
    let resultArr = [];

    for (var i = 0 ; i < dateArr.length ; i++ ) {
        let data = dateArr[i] ? dateArr[i].replace(/\s/ig, '') : '';
        if (data) {
            resultArr.push(data.length < 2 ? '0'+ data : data);
        }
    }
    return resultArr.join(format);
}


function GetFormattedDay(fm) {

    let format = !fm ?  ':' : fm;
    let date = new Date();
    let options = {
        timeZone: 'Asia/Seoul',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    let d = date.toLocaleTimeString('ko-KR', options);
    let dateArr = d.split(":");
    let resultArr = [];

    for (let i = 0 ; i < dateArr.length ; i++ ) {
        let data = dateArr[i] ? dateArr[i].replace(/\s/ig, '') : '';
        if (data) {
            resultArr.push(data.length < 2 ? '0'+ data : data);
        }
    }
    return resultArr.join(format);
}
