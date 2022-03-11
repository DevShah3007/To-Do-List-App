exports.getDate = function(){
  const today = new Date();
  const options ={
    weekday : "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US",options);
};

exports.getDay = function(){
  const today = new Date();
  const options ={
    weekday : "long",
  };

  return today.toLocaleDateString("en-US",options);
};





// module.exports.getDate = getDate;
//
// function getDate(){
//   let today = new Date();
//   let options ={
//     weekday : "long",
//     day: "numeric",
//     month: "long"
//   };
//
//   let date = today.toLocaleDateString("en-US",options);
//   return date;
// }
//
// module.exports.getDay = getDay;
//
// function getDay(){
//   let today = new Date();
//   let options ={
//     weekday : "long",
//   };
//
//   let day = today.toLocaleDateString("en-US",options);
//   return day;
// }




//course
//jshint esversion:6
// exports.getDate = function() {
//
//   const today = new Date();
//
//   const options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   };
//
//   return today.toLocaleDateString("en-US", options);
//
// };
//
// exports.getDay = function () {
//
//   const today = new Date();
//
//   const options = {
//     weekday: "long"
//   };
//
//   return today.toLocaleDateString("en-US", options);
//
// };
