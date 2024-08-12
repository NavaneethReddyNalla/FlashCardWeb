import axios from "axios";

function synchronizeCards(userId, dispatch, update) {
  const res = axios.get(`${process.env.REACT_APP_HOST_URL}/cards/${userId}`);
  res
    .then((data) => {
      if (data.data.length) {
        dispatch(update(data.data));
      } else {
        dispatch(
          update([
            {
              id: 0,
              user_id: null,
              question: "Did you create any cards?",
              answer: "No. Create some cards from the create cards menu.",
              category: "No Cards",
            },
          ])
        );
      }
    })
    .catch((err) => console.log(err));
}

export default synchronizeCards;
