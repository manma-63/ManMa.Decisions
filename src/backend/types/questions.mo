import Common "common";

module {
  public type VoteChoice = { #yes; #no };

  public type VoteStatus = { #open; #closed };

  public type Vote = {
    voter : Common.UserId;
    choice : VoteChoice;
    votedAt : Common.Timestamp;
  };

  public type Question = {
    id : Common.QuestionId;
    roomCode : Common.RoomCode;
    title : Text;
    description : Text;
    raisedBy : Common.UserId;
    raisedAt : Common.Timestamp;
    selectedSubmission : ?Common.UserId;
    status : VoteStatus;
    closedAt : ?Common.Timestamp;
  };

  public type VoteSummary = {
    questionId : Common.QuestionId;
    title : Text;
    description : Text;
    selectedSubmission : ?Common.UserId;
    status : VoteStatus;
    yesCount : Nat;
    noCount : Nat;
    totalVotes : Nat;
    yesPercent : Nat;
    noPercent : Nat;
    myVote : ?VoteChoice;
  };

  public type QuestionResult = { #ok : Question; #notFound; #unauthorized };
  public type VoteResult = { #ok; #votingClosed; #notFound; #unauthorized };
  public type RaiseResult = { #ok : Question; #notFound; #unauthorized };
};
