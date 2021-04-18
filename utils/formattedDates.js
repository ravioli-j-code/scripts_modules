/**
 * return matched browser formatted date
 * 
 * @param {"seperator"} fm 
 * @param {"IE, CHROME"} browserType 
 * @returns ex) 2021-03-18
 */
const GetFormattedDate = function (fm, browserType) {

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
        let dates = [];

        for (var i = 0 ; i < dateArr.length ; i++ ) {
            let data = dateArr[i] ? dateArr[i].replace(/\s/ig, '') : '';
            if (data) {
                dates.push(data.length < 2 ? '0'+ data : data);
            }
        }
        return dates.join(format);
    };
    
    const getIEDates = function() {
        
        let dates = [];
        dates.push(date.getYear() < 1900 ? date.getYear() + 1900 : date.getYear());
        dates.push(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        dates.push(date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return dates.join(format);
        
    }

    return  function() {
        if ('CHROME' === browserType) {
            return getChromeDates();
        } else if ('IE' === browserType) {
            return getIEDates();
        }
    }();
    
}

/**
 * return matched browser formatted time
 * @param {"seperator"} fm 
 * @param {"IE, CHROME"} browserType 
 * @returns ex) 14:14:02
 */
const GetFormattedTime = function(fm, browserType) {

    const format = !fm ?  '' : fm;
    const date = new Date();

    const getChromeTime = function() {
        const options = {
            timeZone: 'Asia/Seoul',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const d = date.toLocaleTimeString('ko-KR', options);
        const dateArr = d.split(":");
        let times = [];
    
        for (let i = 0 ; i < dateArr.length ; i++ ) {
            let data = dateArr[i] ? dateArr[i].replace(/\s/ig, '') : '';
            if (data) {
                times.push(data.length < 2 ? '0'+ data : data);
            }
        }
        return times.join(format);
    }

    const getIETime = function() {

        let times = [];
        times.push(date.getHours() < 10 ? '0' + date.getHours(): date.getHours());
        times.push(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        times.push(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return times.join(format);

    }


    return  function() {
        if ('CHROME' === browserType) {
            return getChromeTime();
        } else if ('IE' === browserType) {
            return getIETime();
        }
    }();

}
