import React from "react";

export default function VideoCard({ video }) {
  const timeString = video.snippet.publishedAt;
  const MAX_TITLE_LEN = 60;
  const time = {
    year: parseInt(timeString.slice(0, 4)),
    month: parseInt(timeString.slice(5, 7)),
    day: parseInt(timeString.slice(8, 10)),
    hour: parseInt(timeString.slice(11, 13)),
    minute: parseInt(timeString.slice(14, 16)),
    second: parseInt(timeString.slice(17, 19)),
  };

  const timeCalc = (time) => {
    const today = new Date();
    const todayTime = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
      hour: today.getHours(),
      minute: today.getMinutes(),
      second: today.getSeconds(),
    };
    const calculatedTime = {
      year: todayTime.year - time.year,
      month: todayTime.month - time.month,
      day: todayTime.day - time.day,
      hour: todayTime.hour - time.hour,
      minute: todayTime.minute - time.minute,
      second: todayTime.second - time.second,
    };
    if (calculatedTime.year > 0) {
      return { time: calculatedTime.year, type: "year" };
    }
    if (calculatedTime.month > 0) {
      return { time: calculatedTime.month, type: "month" };
    }
    if (calculatedTime.day > 0) {
      return { time: calculatedTime.day, type: "day" };
    }
    if (calculatedTime.hour > 0) {
      return { time: calculatedTime.hour, type: "hour" };
    }
    if (calculatedTime.minute > 0) {
      return { time: calculatedTime.minute, type: "minute" };
    }
    if (calculatedTime.second > 0) {
      return { time: calculatedTime.second, type: "second" };
    }
    return { time: null, type: "null" };
  };
  const calTime = timeCalc(time);
  return (
    <div
      style={{
        height: "100%",
        margin: "10px",
      }}
    >
      <img
        src={video.snippet.thumbnails.medium.url}
        style={{
          width: "100%",
          borderRadius: "10px",
          marginBottom: "5px",
        }}
      />
      <div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "25px",
            marginBottom: "10px",
          }}
        >
          {video.snippet.title.length > MAX_TITLE_LEN
            ? video.snippet.title.slice(0, MAX_TITLE_LEN + 1) + "..."
            : video.snippet.title}
        </div>
        <div
          style={{
            fontSize: "15px",
          }}
        >
          {video.snippet.channelTitle}
        </div>
        <div
          style={{
            fontSize: "15px",
          }}
        >{`${calTime.time} ${calTime.type}${
          calTime.time > 1 ? "s" : ""
        } ago`}</div>
      </div>
    </div>
  );
}
