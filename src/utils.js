pageOrintation() {
    if (this.width > this.height - 200) {
      return 'landscape';
    }
    return 'portrait';
  }