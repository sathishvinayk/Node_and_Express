var fortunes=[
  "conquer",
  "Life",
  "No Fear",
  "Pleasant",
  "Be water"
];

exports.getfortune=function(){
  var idx=Math.floor(Math.random()*fortunes.length);
  return fortunes[idx];
}
