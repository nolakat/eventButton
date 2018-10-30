
$( document ).ready(function() {
  console.log( "ready!" );
  Barba.Pjax.start();
  initPointer();

});

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      console.log('pjax running');
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};


/**
 *  SvgPointer
 */

function initPointer(){
var container = document.getElementById('event-btn');
document.body.addEventListener("mousemove", function(event){
  moveCursor(event);  
});
var svgPointer = document.getElementById('svg-pointer');
var pth = document.getElementById('svg-pointer').firstElementChild;
function moveCursor(e){
  svgPointer.style.transform = 'translate(' + e.clientX +'px,' + e.clientY + 'px)';
}
container.onmouseover = function(){
  pth.style.transform = 'scale(4)';
  pth.style.fill= 'transparent';
  pth.style.stroke="#fff";
}
container.onmouseout = function(){
  pth.style.transform = 'scale(1)';
  pth.style.fill= 'lightcoral';
  pth.style.stroke='lightcoral';
}
};

