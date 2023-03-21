// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    waitASec: function() {
        this.wait(1);
    },

    clearAndType: function(text: string) {
        this.pressKey(['Control', 'a', 'Backspace'])
        for (let i of text) {
            this.pressKey(i);
            this.waitASec();
        }
    }
  });
}
