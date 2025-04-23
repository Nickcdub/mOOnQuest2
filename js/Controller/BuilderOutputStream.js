/**
 * BuilderOutputStream class - Helper class to redirect console output to a string builder
 * In JavaScript, we can't directly replace system output like in Java,
 * so this is a simplified implementation
 */
class BuilderOutputStream {
  /**
   * Create a new BuilderOutputStream
   * @param {Object} stringBuilder - The string builder to append output to
   */
  constructor(stringBuilder) {
    this.stringBuilder = stringBuilder;
  }

  /**
   * Write content to the string builder
   * @param {string} content - The content to append
   */
  write(content) {
    if (this.stringBuilder && this.stringBuilder.append) {
      this.stringBuilder.append(content);
    } else {
      console.log(content);
    }
  }

  /**
   * Create a mock PrintStream that uses this output stream
   * @returns {Object} - A mock PrintStream object
   */
  createPrintStream() {
    const self = this;
    return {
      println: function(content) {
        self.write(content + '\n');
      },
      print: function(content) {
        self.write(content);
      }
    };
  }
}

module.exports = BuilderOutputStream; 