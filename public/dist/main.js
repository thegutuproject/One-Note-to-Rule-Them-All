document.addEventListener( "DOMContentLoaded", () => {

  // let wrapper = document.getElementsByClassName( "ellipsis" );

  let options = {
    ellipsis: "\u2026 ",
    height: null,
    truncate: "word",
    watch: true,
  };

  $( ".ellipsis" ).dotdotdot({
    ellipsis: "\u2026 ",
    height: null,
    truncate: "word",
    watch: true,
  });

  // let dots = [];
  // for (let note of wrapper) {
  //   dots.push(new Dotdotdot( wrapper, options ));
  // }

  // let dot = new Dotdotdot( wrapper, options );
  // dot.truncate();

});