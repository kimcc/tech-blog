module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}.${new Date(date).getDate()}.${new Date(
      date
    ).getFullYear()}`;
  },

  // Properly pluralize word
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    } 
    return word;
  },

  truncate_string: (string) => {
    if (string.length > 300) {
      return string.slice(0, 300) + "...";
    } else {
      return string;
    }
  }
}