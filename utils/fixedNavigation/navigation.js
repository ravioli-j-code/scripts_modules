/**
 * 우측 고정 네비게이션을 위한 함수 jQuery 3.3
 */
function FIXED_NAVIGATION() {

    $( window ).off('scroll', scrollEvt);
    $( window ).on('scroll', scrollEvt);

    // sideNav 초기값 설정
    var $sideNav = $('.sideNav');
    var tPos = Number($sideNav.css('top').replace('px', ''));
    var hPos = $sideNav.height();
    var iFoot = $("footer").offset().top;
    var iHeight = $( window ).height();

    var minTop = 240; // 최소 상단값
    var anySS = 550; // 애니메이션 지연값
    var iPadFoot = iHeight * 0.01; // 하단 푸터와의 여백

    if ( iFoot < iHeight) {
        tPos = iHeight - hPos - iPadFoot;
    }

    $sideNav.css('top', tPos + 'px');

    function scrollEvt() {

        var minBottom = $("footer").offset().top ;
        var cHeight = $( window ).height();
        var cPadFoot = cHeight * 0.02;

        if ( iHeight !== cHeight ) { // 창크기가 바뀌는 경우 반영
            tPos = tPos + (cHeight - iHeight);
            iHeight = $( window ).height();
        }

        var navPos = tPos + $( window ).scrollTop(); // init

        if ( navPos < minTop ) { // 상단 제한
            navPos = minTop;
        } else if (hPos + navPos > minBottom) { // 하단 제한
            navPos = minBottom - hPos - cPadFoot;
        }

        $(".sideNav").stop().animate({
            "top": navPos  + "px"
        }, anySS);

    }
}
