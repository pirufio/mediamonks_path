function MediaMonksPath(options) {


    //private members
    ctx = null;
    var self = this;
    var currentPage;
    var pageSize;
    var background;
    var canvas;
    var context;
    var minBackgroundHeight;
    var backgroundScaledWidth;
    var offsetX;
    var targetPage;

    function init() {
        offsetX = 0;
        options = options || {};
        currentPage = 1;
        pageSize = options.pageSize || 8;
        minBackgroundHeight = options.minBackgroundHeight || '580px';
        new Image();
        background = new Image();
        background.src = options.backgroundSource || 'assets/images/background.jpg';
        background.addEventListener('load', onBackgroundLoad);
        window.addEventListener('resize', onWindowResize);
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.setAttribute('style', 'min-height:' + minBackgroundHeight + ';');
        backgroundScaledWidth = 0;
    };


    function onBackgroundLoad() {
        draw();
    };

    function onWindowResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    };

    var targetOffsetX;
    var stepSize;
    var direction;
    var currentOffsetX

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        backgroundScaledWidth = background.width * (canvas.height / background.height);
        var scaledOffsetX = offsetX * canvas.height / background.height;
        context.drawImage(background, scaledOffsetX, 0, backgroundScaledWidth, canvas.height);
    }

    function update() {
        if(currentOffsetX > 0 && currentOffsetX < background.width) {
            stepSize = Easing.easeInOutQuad(currentOffsetX, 40, 120, targetOffsetX);
            context.clearRect(0, 0, canvas.width, canvas.height);
            offsetX = offsetX + stepSize * direction;
            var scaledOffsetX = offsetX * canvas.height / background.height;
            context.drawImage(background, scaledOffsetX, 0, backgroundScaledWidth, canvas.height);
            window.requestAnimationFrame(update);
            currentOffsetX -= stepSize;
        }else{
            currentPage = targetPage;
            self.onPageChanged(currentPage);
        }
    }

    //public members
    self.changePage = function (_nextPage) {
        if (_nextPage && _nextPage !== currentPage && _nextPage <= pageSize) {
            targetPage = _nextPage;
            direction = targetPage > currentPage ? -1 : 1;
            var pageOffset = Math.abs(targetPage - currentPage);
            var pageWidth = background.width / pageSize;
            targetOffsetX = pageWidth * pageOffset;
            currentOffsetX =  Util.clone(targetOffsetX);
            window.requestAnimationFrame(update);
        }
    };

    self.getCurrentPage = function () {
        return currentPage;
    };

    self.onPageChanged = function(){};


    //call initialization
    init();

}