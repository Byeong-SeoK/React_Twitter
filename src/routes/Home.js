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
  const [attachment, setAttachment] = useState();
  //이 state는 받아온 이미지 URL을 담는 state이다.
  //state의 default값을 부여하지 않으면 undefined가 default값이 된다.

  //console.log(attachment);

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

  const onFileChange = (event) => {
    //console.log(event.target.files);
    //사용자로 부터 받은 파일은 event.target.files를 통해 확인 가능하다.

    const {
      target: { files },
    } = event;
    //위 코드는 event에 들어가서 target.files에 해당하는 부분의 데이터 값을
    //이 const {}라는 객체 안에 넣으라는 의미의 코드이다.

    const theFile = files[0]; //files[0]에 파일의 정보가 다 담겨있다.
    //console.log(theFile);

    const reader = new FileReader();
    //이 reader 변수는 FileReader API를 이용하는 것으로
    //해당 API를 사용하기 위해서는 FileReader라는 객체를 생성해야한다.

    reader.onloadend = (finishedEvent) => {
      //이 onloadend함수는 아래의 readAsDataURL함수를 통해
      //파일을 완전히 다 읽어와야 실행되는 함수로
      //그때 읽어온 결과를 finishedEvent에 담게 된다.
      console.log(finishedEvent);

      const {
        target: { result },
      } = finishedEvent;

      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
    //그리고 이 FileReader 객체의 메소드인 readAsDataURL을 통해 파일을 읽는다.
    //이때 파라미터로는 파일을 담은 객체의 이름이 들어간다.
    //이 readAsDataURL함수는 이미지 파일과 같은 바이너리 데이터를 읽어와
    //Base64로 인코딩된 데이터 URL로 변환한다. 이러한 과정이 필요한 이유는
    //이미지를 미리보기로 표시하거나 업로드된 이미지를 서버로 전송하기 전에
    //클라이언트 측에서 미리 처리하는 기능을 제공하기 위함이다.
    //또 URL로 변환되었기 때문에 동적으로 이미지를 로드하거나
    //HTML 파일 안에 이미지를 삽입하는 것도 가능하다.

    //또 다른 함수로는 readAsText(blob, encoding)과 readAsArrayBuffer(blob)이 있다.
    //readAsText함수는 blob(이진 데이터를 나타내는 객체, 하나의 파일처럼 처리된다.
    //그렇기 때문에 FileReader API로 읽거나 XMLHTTPRequest을 통해 서버로 전송된다.)
    //이나 file의 내용을 텍스트로 읽어오는 함수이다.
    //readAsrrayBuffer는 blob이나 file의 내용을 ArrayBuffer로 읽어온다.
    //이 ArrayBuffer는 일반적인 크기의 바이너리 데이터 버퍼를 의미한다.
  };

  const onClearAttachmentClick = () => setAttachment(null);
  //이 함수는 미리보기 되어있던 사진을 null로 바꾼다.

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="React tweet" />
        {attachment && (
          <div>
            <img alt="thumnails" src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
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
