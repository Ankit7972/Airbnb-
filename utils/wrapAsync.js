/*
//method-1
function WrapAsync(fn){
      return function(req, res, next){
        fn(req, res, next).catch(next);
      }
    }
*/

//method-2 (direct export)
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
