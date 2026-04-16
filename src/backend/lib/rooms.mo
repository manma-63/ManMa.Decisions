import Common "../types/common";
import RoomTypes "../types/rooms";
import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
  public type RoomMap = Map.Map<Common.RoomCode, RoomInternal>;
  public type MembershipMap = Map.Map<Common.UserId, Set.Set<Common.RoomCode>>;

  public type RoomInternal = {
    code : Common.RoomCode;
    creator : Common.UserId;
    members : Set.Set<Common.UserId>;
    createdAt : Common.Timestamp;
  };

  // Characters used for code generation (uppercase alphanumeric, no ambiguous chars)
  let codeChars : [Char] = ['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','2','3','4','5','6','7','8','9'];
  let codeLen = 6;

  public func generateCode(seed : Nat) : Common.RoomCode {
    let base = codeChars.size();
    var s = seed;
    var result = "";
    var i = 0;
    while (i < codeLen) {
      let idx = s % base;
      result := result # Text.fromChar(codeChars[idx]);
      s := (s / base) + (seed * (i + 1) * 31);
      i += 1;
    };
    result;
  };

  func toRoomView(r : RoomInternal) : RoomTypes.RoomView {
    let membersArr = r.members.toArray();
    {
      code = r.code;
      creator = r.creator;
      members = membersArr;
      createdAt = r.createdAt;
      memberCount = membersArr.size();
    };
  };

  func addMembership(memberships : MembershipMap, user : Common.UserId, code : Common.RoomCode) {
    switch (memberships.get(user)) {
      case (?codes) { codes.add(code) };
      case null {
        let codes = Set.empty<Common.RoomCode>();
        codes.add(code);
        memberships.add(user, codes);
      };
    };
  };

  public func createRoom(
    rooms : RoomMap,
    memberships : MembershipMap,
    caller : Common.UserId,
    code : Common.RoomCode,
    now : Common.Timestamp,
  ) : RoomTypes.RoomView {
    let members = Set.empty<Common.UserId>();
    members.add(caller);
    let room : RoomInternal = {
      code;
      creator = caller;
      members;
      createdAt = now;
    };
    rooms.add(code, room);
    addMembership(memberships, caller, code);
    toRoomView(room);
  };

  public func joinRoom(
    rooms : RoomMap,
    memberships : MembershipMap,
    caller : Common.UserId,
    code : Common.RoomCode,
  ) : ?RoomTypes.RoomView {
    switch (rooms.get(code)) {
      case (?room) {
        room.members.add(caller);
        addMembership(memberships, caller, code);
        ?toRoomView(room);
      };
      case null { null };
    };
  };

  public func getRoom(
    rooms : RoomMap,
    caller : Common.UserId,
    code : Common.RoomCode,
  ) : ?RoomTypes.RoomView {
    switch (rooms.get(code)) {
      case (?room) {
        if (room.members.contains(caller)) {
          ?toRoomView(room);
        } else {
          null;
        };
      };
      case null { null };
    };
  };

  public func listMyRooms(
    memberships : MembershipMap,
    rooms : RoomMap,
    caller : Common.UserId,
  ) : [RoomTypes.RoomView] {
    switch (memberships.get(caller)) {
      case (?codes) {
        let results = List.empty<RoomTypes.RoomView>();
        codes.forEach(func(code) {
          switch (rooms.get(code)) {
            case (?room) { results.add(toRoomView(room)) };
            case null {};
          };
        });
        results.toArray();
      };
      case null { [] };
    };
  };

  public func isMember(
    rooms : RoomMap,
    caller : Common.UserId,
    code : Common.RoomCode,
  ) : Bool {
    switch (rooms.get(code)) {
      case (?room) { room.members.contains(caller) };
      case null { false };
    };
  };

  public func isCreator(
    rooms : RoomMap,
    caller : Common.UserId,
    code : Common.RoomCode,
  ) : Bool {
    switch (rooms.get(code)) {
      case (?room) { Principal.equal(room.creator, caller) };
      case null { false };
    };
  };

  public func getMembers(
    rooms : RoomMap,
    code : Common.RoomCode,
  ) : [Common.UserId] {
    switch (rooms.get(code)) {
      case (?room) { room.members.toArray() };
      case null { [] };
    };
  };
};
