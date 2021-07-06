module.exports = {
  format_time: date => {
    const d = new Date(date);
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const yy = d.getFullYear();
    const options = { hour: '2-digit', minute: '2-digit' };
    const time = d.toLocaleTimeString([], options);

    return `${time}  |  ${mm}/${dd}/${yy}`;
  },
  format_plural: (num, word) => {
    return (num !== 1) ? `${num} ${word}s` : `${num} ${word}`;
  }
};