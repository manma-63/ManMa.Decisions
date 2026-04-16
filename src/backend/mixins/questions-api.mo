import Common "../types/common";
import QuestionTypes "../types/questions";
import QuestionLib "../lib/questions";
import RoomLib "../lib/rooms";
import Time "mo:core/Time";

mixin (
  questions : QuestionLib.QuestionMap,
  roomQuestions : QuestionLib.RoomQuestionsMap,
  votesByQuestion : QuestionLib.VoteMap,
  rooms : RoomLib.RoomMap,
  nextQuestionId : { var value : Nat },
  questionSeedCounter : { var value : Nat },
) {
  /// Creator raises a new question in a room; randomly selects a member's submission to display.
  public shared ({ caller }) func raiseQuestion(
    roomCode : Common.RoomCode,
    title : Text,
    description : Text,
  ) : async QuestionTypes.RaiseResult {
    if (not RoomLib.isCreator(rooms, caller, roomCode)) {
      return #unauthorized;
    };
    let members = RoomLib.getMembers(rooms, roomCode);
    questionSeedCounter.value += 1;
    let seed = questionSeedCounter.value;
    let id = nextQuestionId.value;
    nextQuestionId.value += 1;
    QuestionLib.raiseQuestion(questions, roomQuestions, votesByQuestion, id, caller, roomCode, title, description, members, seed, Time.now());
  };

  /// Cast or change a Yes/No vote on the currently displayed submission.
  public shared ({ caller }) func castVote(
    questionId : Common.QuestionId,
    choice : QuestionTypes.VoteChoice,
  ) : async QuestionTypes.VoteResult {
    QuestionLib.castVote(questions, votesByQuestion, caller, questionId, choice, Time.now());
  };

  /// Creator closes voting on a question.
  public shared ({ caller }) func closeVoting(questionId : Common.QuestionId) : async QuestionTypes.QuestionResult {
    QuestionLib.closeVoting(questions, caller, questionId, Time.now());
  };

  /// Get live vote summary for a question (yes/no counts, percentages, caller's vote).
  public shared query ({ caller }) func getVoteSummary(questionId : Common.QuestionId) : async ?QuestionTypes.VoteSummary {
    QuestionLib.getVoteSummary(questions, votesByQuestion, caller, questionId);
  };

  /// List all questions and their summaries for a room.
  public shared query ({ caller }) func listRoomQuestions(roomCode : Common.RoomCode) : async [QuestionTypes.VoteSummary] {
    QuestionLib.listRoomQuestions(questions, roomQuestions, votesByQuestion, caller, roomCode);
  };
};
