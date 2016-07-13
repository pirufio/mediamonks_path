

document.addEventListener('DOMContentLoaded', function(){

    window.mediaMonksPath = new MediaMonksPath();
    window.mediaMonksPath.onPageChanged = function(page){
      console.log('page changed: new page' + page);
    };

});