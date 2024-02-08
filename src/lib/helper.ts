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

export const getSummaryName = (name: string) => {
  const isSpaceName = name.split(" ")[1]; // Minh Trí => ["Minh", "Trí"]

  if (isSpaceName !== undefined) {
    const arr = name.split(" ");
    const lastName = arr[arr.length - 1];
    return lastName.charAt(0);
  }

  return name.charAt(0); // Kyle => K
};

export const formatDateStr = (dateStr: string) => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const formattedDateTime = formattedDate + " " + formattedTime;
  return formattedDateTime;
};
