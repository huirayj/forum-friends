module.exports = {
    format_time: date => {
      return `${new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  |  ${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}
      `;
    }
};