import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    //event가 발생한 태그 객체(target)의 value값을 꺼내오는 것이다.

    setTweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="React tweet" />
      </form>
    </div>
  );
};

export default Home;
