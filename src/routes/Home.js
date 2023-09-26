import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { dbService } from "myBase";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  //console.log(userObj);

  // const getTweets = async () => {
  //   const dbTweets = await getDocs(collection(dbService, "ReactTwitter"));
  //   //dbService를 통해서 firebase DB를 호출하고 "ReactTwitter"라는 컬렉션을 호출한다.
  //   //그리고 getDocs를 통해서 해당 컬렉션의 모든 파일을 가져와 dbTweets라는 객체에 담는다.

  //   dbTweets.forEach((document) => {
  //     const tweetObject = {
  //       //이 tweetObject에 firebase에 담긴 트윗의 정보가 들어간다.
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setTweets((prev) => [tweetObject, ...prev]);
  //   });
  //   //dbTweets 객체에 담긴 정보를 하나씩 읽어와 tweetObject에 넣고
  //   //이를 다시 setTweets useState를 통해서 State에 담도록 한다.
  // };

  useEffect(() => {
    const q = query(
      collection(dbService, "ReactTwitter"),
      orderBy("createdAt", "desc")
      //q는 firebase에 날릴 쿼리를 가지고 있는 변수이다.
      //이 query는 데이터베이스를 호출하는 collection과
      //가져온 데이터를 어떻게 정렬할 지에 대한 것을 가지고 있는 query이다.
    );
    onSnapshot(q, (snapshot) => {
      //onSnapshot함수를 통해서 query를 통해 가져온 데이터 값을 읽어올 수 있다.
      //이때 읽어온 데이터 값을 tweetArr 변수에 넣는 것이다.

      const tweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);
  //getTweets함수는 모든 함수 컴포넌트가 렌더링 될때 마다 실행된다.
  //왜냐하면 의존성 배열에 아무런 값이 들어있지 않기 때문이다.

  const onSubmit = async (event) => {
    event.preventDefault();

    await addDoc(collection(dbService, "ReactTwitter"), {
      //위 코드는 dbService를 통해 만들어놓은 firebase를 호출하고
      //그 안에 ReactTwitter라는 컬렉션(폴더)안에 {}에 정의된 것을 파일로 저장하는 것이다.
      text: tweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    });

    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    //event가 발생한 태그 객체(target)의 value값을 꺼내오는 것이다.

    setTweet(value);
  };
  //console.log(tweets);

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
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
          //map함수를 통해서 tweets 객체에 들어있는 값을 하나씩 읽어온다.
        ))}
      </div>
    </div>
  );
};

export default Home;
