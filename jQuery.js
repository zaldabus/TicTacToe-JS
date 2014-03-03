(function (root) {

  var TTT = root.TTT = (root.TTT || {});

  $(document).ready(function() {
    var myGame = new root.TTT.Game($('ul'));
     $('li').each(function(index, li){
        $(li).on("click", myGame.makeMove.bind(myGame, $(li)));
     })

  });

})(this);

