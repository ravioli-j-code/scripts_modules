/**
 * 우측 고정 네비게이션을 위한 함수 jQuery 3.3
 */
function fixedNavigation() {

    // sideNav 초기값 설정
    let $sideNav = $('.sideNav');
    let tPos = Number($sideNav.css('top').replace('px', ''));
    
    const minBottom = 100;
    const hPos = $sideNav.height();
    const iFoot = $("footer").offset() ? $("footer").offset().top : minBottom;
    const iHeight = $( window ).height();

    const minTop = 240; // 최소 상단값
    const anySS = 550; // 애니메이션 지연값
    const iPadFoot = iHeight * 0.01; // 하단 푸터와의 여백


    init : function() {

        if ( iFoot < iHeight) {
            tPos = iHeight - hPos - iPadFoot;
        }
    
        $sideNav.css('top', tPos + 'px');
    
        $( window ).off('scroll', scrollEvt);
        $( window ).on('scroll', scrollEvt);
        
    }
    
    scrollEvt : function() {

        const cFoot = $("footer").offset() ? $("footer").offset().top : minBottom;
        const cHeight = $( window ).height();
        const cPadFoot = cHeight * 0.02;

        if ( iHeight !== cHeight ) { // 창크기가 바뀌는 경우 반영
            tPos = tPos + (cHeight - iHeight);
            iHeight = $( window ).height();
        }

        let navPos = tPos + $( window ).scrollTop(); // init

        if ( navPos < minTop ) { // 상단 제한
            navPos = minTop;
        } else if (hPos + navPos > cFoot) { // 하단 제한
            navPos = cFoot - hPos - cPadFoot;
        }

        $(".sideNav").stop().animate({
            "top": navPos  + "px"
        }, anySS);

    }
}
