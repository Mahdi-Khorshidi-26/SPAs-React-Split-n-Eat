import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    img: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    img: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    img: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [addFriendFormShown, setAddFriendFormShown] = useState(false);
  const [friend, setFriend] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleAddFriendFormShown() {
    setAddFriendFormShown((show) => !show);
  }
  function handleFriendAdding(gottenFriend) {
    setFriend((friend) => [...friend, gottenFriend]);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((selectedFriend) =>
      selectedFriend?.id === friend.id ? null : friend
    );
    setAddFriendFormShown(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friend={friend}
          selectedFriend={selectedFriend}
          onClickSelectBtn={handleSelectedFriend}
        />
        {addFriendFormShown && (
          <FormAddFriend onAddFriend={handleFriendAdding} />
        )}
        <Button onClick={handleAddFriendFormShown}>
          {addFriendFormShown ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friend, selectedFriend, onClickSelectBtn }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onClickSelectBtn={onClickSelectBtn}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onClickSelectBtn }) {
  let isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.img} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          Your friend {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && (
        <p>You and your friend {friend.name} , are even</p>
      )}
      <Button onClick={() => onClickSelectBtn(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name && !img) return;
    let id = crypto.randomUUID();
    let newFriend = {
      id,
      name,
      img: `${img}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImg("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image URL</label>
      <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill value</label>
      <input type="text" />
      <label>Your expense</label>
      <input type="text" />
      <label>{selectedFriend.name}'s expense</label>
      <input type="text" disabled />
      <label>who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill </Button>
    </form>
  );
}
