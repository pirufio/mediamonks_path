function SliderComponent(data) {


    //private members
    ctx = null;
    var self = this;
    var currentPage;
    var pageSize;
    var context;
    var minBackgroundHeight;
    var backgroundScaledWidth;
    var offsetX;
    var targetPage;
    var changing = false;

    //html elements
    var background;
    var canvas;
    var prev;
    var next;
    var tagline;
    var info;
    var endTagline;
    var endIinfo;
    var app;
    var pagination;
    var loading;

    var targetOffsetX;
    var stepSize;
    var direction;
    var currentOffsetX;


    function init() {
        offsetX = 0;
        currentPage = 0;
        pageSize = data.sections.length;
        minBackgroundHeight = data.minBackgroundHeight;
        new Image();
        background = new Image();
        background.src = data.background;

        prev = document.getElementById("prev");
        next = document.getElementById("next");
        tagline = document.getElementById("tagline");
        info = document.getElementById("info");
        app = document.getElementById("app");
        pagination = document.getElementById("pagination");
        loading = document.getElementById("loading");
        endTagline = document.getElementById("end-tagline");
        endIinfo = document.getElementById("end-info");
        addPaginationElements();

        prev.addEventListener('click', onPrevClick);
        next.addEventListener('click', onNextClick);

        background.addEventListener('load', onBackgroundLoad);
        window.addEventListener('resize', onWindowResize);
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.setAttribute('style', 'min-height:' + minBackgroundHeight + ';');
        backgroundScaledWidth = 0;
    }

    function addPaginationElements(){
        for(var i=0; i< pageSize; i++){
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute('href', '#' + data.sections[i].index );
            a.innerHTML = data.sections[i].label.length > 0 ? data.sections[i].label : '&nbsp';
            a.addEventListener('click',onPaginationClick);
            if(i===0){
                a.className = 'selected';
            }
            li.appendChild(a);
            pagination.appendChild(li);
        }
    }

    function onPaginationClick(event){
        var _page = Number(event.currentTarget.hash.replace('#',''));
        self.changePage(_page);
    }

    function onPrevClick() {

        if (currentPage > 0) {
            self.changePage(currentPage - 1);
        }
    }

    function onNextClick() {
        if (currentPage < pageSize - 1) {
            self.changePage(currentPage + 1);
        }
    }

    function onBackgroundLoad() {
        draw();
        window.setTimeout(function(){
            loading.className="hide";
            app.className = app.className + 'start run';
        },3000);
    }

    function onWindowResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }


    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        backgroundScaledWidth = background.width * (canvas.height / background.height);
        var scaledOffsetX = offsetX * canvas.height / background.height;
        context.drawImage(background, scaledOffsetX, 0, backgroundScaledWidth, canvas.height);
    }

    function update() {
        if (currentOffsetX > 0 && currentOffsetX < background.width) {
            stepSize = Easing.easeInOutQuad(currentOffsetX, 20, 180, targetOffsetX);
            context.clearRect(0, 0, canvas.width, canvas.height);
            offsetX = offsetX + stepSize * direction;
            var scaledOffsetX = offsetX * canvas.height / background.height;
            context.drawImage(background, scaledOffsetX, 0, backgroundScaledWidth, canvas.height);
            window.requestAnimationFrame(update);
            currentOffsetX -= stepSize;
        } else {
            currentPage = targetPage;
            self.onPageChanged(currentPage);
            changing = false;
            app.className = app.className.replace(' hide-text', '');
        }
    }

    //public members
    self.changePage = function (_nextPage) {
        if (!changing && _nextPage !== currentPage && _nextPage <= pageSize) {
            changing = true;
            app.className = app.className + ' hide-text';
            targetPage = _nextPage;
            direction = targetPage > currentPage ? -1 : 1;
            targetOffsetX = Math.abs(data.sections[_nextPage].x - data.sections[currentPage].x);
            currentOffsetX = Util.clone(targetOffsetX);
            window.requestAnimationFrame(update);
        }
    };

    self.getCurrentPage = function () {
        return currentPage;
    };

    self.onPageChanged = function (_page) {
        tagline.innerHTML = data.sections[_page].tagline;
        info.innerHTML = data.sections[_page].info;
        for(var i=0; i<pagination.children.length; i++){
            pagination.children[i].firstChild.className = "";
        }
        pagination.children[_page].firstChild.className="selected";

        switch(_page){
            case 0:
                app.className = "run start";
                break;
            case 1:
            case 6:
            case 7:
            case 8:
                app.className = "run left-text";
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                app.className = "run right-text";
                break;
            case pageSize -1:
                endTagline.innerHTML = data.sections[_page].tagline;
                endIinfo.innerHTML = data.sections[_page].info;
                app.className = "hide-text end";
                break;
        }

    };


    //call initialization
    init();

}