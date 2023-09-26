import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "myBase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); //이 useState는 edit모드인지 아닌지를 받는다.
  const [newTweet, setNewTweet] = useState(tweetObj.text); //이 useState는 바뀌는 트윗 값을 받는다.

  const TweetTextRef = doc(dbService, "ReactTwitter", tweetObj.id);
  //firebase에서 ReactTwitter 컬렉션 내부의 props로 받은 id값에 해당하는 것을 찾아
  //TweetTextRef에 그 값을 저장하도록 한다.

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    //이 window.confirm을 통해서 최종 선택 팝업창을 띄울 수 있다.

    //console.log(ok);

    if (ok) {
      await deleteDoc(TweetTextRef);
      //이 TweetTextRef에 특정 id에 대한 데이터 위치, 값 등에 대한 정보가 저장되어있으므로
      //deleteDoc을 통해서 쉽게 삭제할 수 있다. 다만 비동기적으로 처리해야한다.
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  //이 toggleEditing은 edit을 해야하는 상태인지 아닌지를 설정하는 함수이다.

  const onSubmit = async (event) => {
    event.preventDefault();
    //console.log(tweetObj, newTweet);

    await updateDoc(TweetTextRef, {
      text: newTweet,
    });
    //TweetTextRef에 저장된 id와 경로를 찾아 들어가
    //그 안의 text에 해당하는 값을 newTweet으로 바꾼다.

    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    //event 객체를 console.log로 찍어보면 target: {value}형태의 값이 들어있는데
    //이 값을 위의 객체 형태로 따로 떼어내서 받아내는 것이다.
    //그리고 그 안의 value값만 따로 value라는 변수에 넣어 useState의 함수에 넣도록 한다.

    //console.log(event);
    setNewTweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              onChange={onChange}
            />
          </form>
          <input type="submit" value="Update Tweet" />
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Tweet</button>
              <button onClick={onDeleteClick}>Delete Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
