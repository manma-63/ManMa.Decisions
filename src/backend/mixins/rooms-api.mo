import Common "../types/common";
import RoomTypes "../types/rooms";
import RoomLib "../lib/rooms";
import Time "mo:core/Time";

mixin (
  rooms : RoomLib.RoomMap,
  memberships : RoomLib.MembershipMap,
  roomCodeCounter : { var value : Nat },
) {
  /// Create a new room; returns the generated 6-character room code and room details.
  public shared ({ caller }) func createRoom() : async RoomTypes.RoomView {
    roomCodeCounter.value += 1;
    let code = RoomLib.generateCode(roomCodeCounter.value);
    RoomLib.createRoom(rooms, memberships, caller, code, Time.now());
  };

  /// Join an existing room by its 6-character code.
  public shared ({ caller }) func joinRoom(code : Common.RoomCode) : async ?RoomTypes.RoomView {
    RoomLib.joinRoom(rooms, memberships, caller, code);
  };

  /// Get details of a room (only accessible to members).
  public shared query ({ caller }) func getRoom(code : Common.RoomCode) : async ?RoomTypes.RoomView {
    RoomLib.getRoom(rooms, caller, code);
  };

  /// List all rooms the caller is a member of.
  public shared query ({ caller }) func listMyRooms() : async [RoomTypes.RoomView] {
    RoomLib.listMyRooms(memberships, rooms, caller);
  };
};
