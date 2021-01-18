function CSPaging(pagingid, displaycntid, currentpageid, searchfn, totalcnt){
    this.pagesize =10;
    this.pagingElement = document.getElementById(pagingid); 
    this.displayObj = document.getElementById(displaycntid); 
    this.currentPageObj = document.getElementById(currentpageid); 
    this.totalcnt = Number(totalcnt);
    this.callback = searchfn;
}

CSPaging.prototype.move_page_function = function(pagingNum, currentPageObj, callback) {
    return function move_page(e) {
        if ( typeof(pagingNum) === 'undefined') {
            return false;
        }
        currentPageObj.value = pagingNum;
        return callback();
    }
}

CSPaging.prototype.init = function() {
    this.generatePaging();
};

CSPaging.prototype.regenerator = function(totalCnt) {
    this.totalcnt = Number(totalCnt);
    if (this.totalcnt < 1) {
        this.remove();
    } else {
        this.generatePaging();
    }
}
CSPaging.prototype.remove = function() {
    this.pagingElement.innerHTML = '';
}

CSPaging.prototype.generatePaging = function() {
    this.pagingElement.innerHTML = '';
    let displayCnt = Number(this.displayObj.value);
    let currentPage = Number(this.currentPageObj.value);
    let totalPage = Math.ceil(this.totalcnt / displayCnt); // total page

    if(currentPage < 1) {
        currentPage = 1;
    } else if ( currentPage > totalPage ){
        currentPage = totalPage;
    }

    let minpage = 1;
    let maxpage = 1;

    if(totalPage <= this.pagesize) {
        maxpage = totalPage;
    } else {

        let possibleMin;
        let possibleMax;

        if (currentPage % this.pagesize === 0) {
            possibleMin = (Math.floor(currentPage/this.pagesize) - 1) * this.pagesize + 1;
            possibleMax = Math.floor(currentPage/this.pagesize) * this.pagesize;
        } else {
            possibleMin = Math.floor(currentPage/this.pagesize) * this.pagesize + 1;
            possibleMax = (Math.floor(currentPage/this.pagesize) + 1) * this.pagesize;
        }

        if(possibleMax < this.pagesize) {
            minpage = 1;
            maxpage = this.pagesize;
        } else if (possibleMax > totalPage){
            minpage = possibleMin;
            maxpage = totalPage;
        } else {
            minpage = possibleMin;
            maxpage = possibleMax;
        }
    }

    let beforeCurrentPage = (minpage - this.pagesize < 1) ? 1 : minpage - this.pagesize;
    let afterCurrentPage = (maxpage + 1 >= totalPage) ? totalPage : maxpage + 1;

    let firstElement = document.createElement('button');
    firstElement.classList.add('pageFirst');
    firstElement.addEventListener('click', this.move_page_function(1, this.currentPageObj, this.callback), false);
    firstElement.innerText = 'First';
    this.pagingElement.appendChild(firstElement);

    let prevElement = document.createElement('button');
    prevElement.classList.add('pageBefore');
    prevElement.addEventListener('click', this.move_page_function(beforeCurrentPage, this.currentPageObj, this.callback), false);
    prevElement.innerText = 'Previous';
    this.pagingElement.appendChild(prevElement);

    for(let i=minpage; i <= maxpage; i++){
        let pageElement = document.createElement('button');
        pageElement.addEventListener('click', this.move_page_function(i, this.currentPageObj, this.callback), false);
        if ( i === currentPage) {
            pageElement = document.createElement('strong');
        }
        pageElement.innerText = i;
        this.pagingElement.appendChild(pageElement);
    }
    let nextElement = document.createElement('button');
    nextElement.classList.add('pageNext');
    nextElement.addEventListener('click', this.move_page_function(afterCurrentPage, this.currentPageObj, this.callback), false);
    nextElement.innerText = 'Next';
    this.pagingElement.appendChild(nextElement);

    let lastElement = document.createElement('button');
    lastElement.classList.add('pageLast');
    lastElement.addEventListener('click', this.move_page_function(totalPage, this.currentPageObj, this.callback), false);
    lastElement.innerText = 'Last';
    this.pagingElement.appendChild(lastElement);
}
