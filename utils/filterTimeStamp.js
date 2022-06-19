const timeStampAreOnSameDay = (timeStamp1, timeStamp2) => {
  var d1 = new Date(parseInt(timeStamp1));
  var d2 = new Date(parseInt(timeStamp2));

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
export default timeStampAreOnSameDay;
