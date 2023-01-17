export const datetime = (dt) => {
  // Time format
  const now = new Date();
  const postDate = new Date(dt);
  const difference = now - postDate;
  const hours = Math.floor(difference / 3600000);
  const minutes = Math.floor(difference / 60000);
  const days = Math.floor(difference / 86400000);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date =
    minutes < 6
      ? `${minutes} m.`
      : hours < 24
      ? `${hours} h.`
      : days < 30
      ? `${days} d.`
      : postDate.toLocaleDateString("en-GB", options) + ".";
  return date;
};
