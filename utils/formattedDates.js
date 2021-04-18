function GetFormattedDate(fm, browserType) {

    const format = !fm ?  '' : fm;
    const date = new Date();
    
    const getChromeDates = function() {
        
        const options = {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        
        const d = date.toLocaleDateString('ko-KR', options);
        const dateArr = d.split(".");
        let resultArr = [];

        for (var i = 0 ; i < dateArr.length ; i++ ) {
            let data = dateArr[i] ? dateArr[i].replace(/\s/ig, '') : '';
            if (data) {
                resultArr.push(data.length < 2 ? '0'+ data : data);
            }
        }
        return resultArr.join(format);
    };
    
    const getIEDates = function() {
        
        let year = date.getYear() + 1900;
        let month = date.getMonth() + 1;
        
        
    }
    
}


function GetFormattedTime(fm, browserType) {

    const format = !fm ?  ':' : fm;
    const date = new Date();
    const options = {
        timeZone: 'Asia/Seoul',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const d = date.toLocaleTimeString('ko-KR', options);
    const dateArr = d.split(":");
    let resultArr = [];

    for (let i = 0 ; i < dateArr.length ; i++ ) {
        let data = dateArr[i] ? dateArr[i].replace(/\s/ig, '') : '';
        if (data) {
            resultArr.push(data.length < 2 ? '0'+ data : data);
        }
    }
    return resultArr.join(format);
}
