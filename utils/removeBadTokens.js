//returns false for troll and promotion tokens
const filterBadTokens = (token) => {
  var Regex = new RegExp("[a-zA-Z]+");

  if (Regex.test(token) && token.length < 7) {
    console.log(token);
    return true;
  }
  return false;
};

export default filterBadTokens;
