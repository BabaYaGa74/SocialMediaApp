import "./userFollowInfo.scss";

const UserFollowInfo = ({ followers, following }) => {
  return (
    <div className="userFollowInfo">
      <div className="follow-section">
        <h2>Followers</h2>
        <ul>
          {followers.length > 0 ? (
            followers.map((user) => (
              <li key={user._id}>
                <img src={user.picture} alt="user" />
                {user.username}
              </li>
            ))
          ) : (
            <p>No followers available</p>
          )}
        </ul>
      </div>
      <div className="follow-section">
        <h2>Following</h2>
        <ul>
          {following.length > 0 ? (
            following.map((user) => (
              <li key={user._id}>
                <img src={user.picture} alt="user" />
                {user.username}
              </li>
            ))
          ) : (
            <p>No following available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserFollowInfo;
