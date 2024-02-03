export const censorPassword = (password: string) => {
  if (password === undefined) return password;
  else {
    var censorLength = Math.floor(password.length * 0.7);
    var start = Math.floor(
      Math.random() * (password.length - censorLength + 1)
    );
    var end = start + censorLength;
    return (
      password.substring(0, start) +
      "*".repeat(censorLength) +
      password.substring(end)
    );
  }
};
