import Common "common";

module {
  public type Room = {
    code : Common.RoomCode;
    creator : Common.UserId;
    members : [Common.UserId];
    createdAt : Common.Timestamp;
  };

  public type RoomView = {
    code : Common.RoomCode;
    creator : Common.UserId;
    members : [Common.UserId];
    createdAt : Common.Timestamp;
    memberCount : Nat;
  };
};
