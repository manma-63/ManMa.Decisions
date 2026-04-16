import Common "../types/common";
import QuestionTypes "../types/questions";
import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  public type QuestionMap = Map.Map<Common.QuestionId, QuestionInternal>;
  public type VoteMap = Map.Map<Common.QuestionId, Map.Map<Common.UserId, QuestionTypes.Vote>>;
  public type RoomQuestionsMap = Map.Map<Common.RoomCode, List.List<Common.QuestionId>>;

  public type QuestionInternal = {
    id : Common.QuestionId;
    roomCode : Common.RoomCode;
    title : Text;
    description : Text;
    raisedBy : Common.UserId;
    raisedAt : Common.Timestamp;
    selectedSubmission : ?Common.UserId;
    status : QuestionTypes.VoteStatus;
    closedAt : ?Common.Timestamp;
  };

  func toPublicQuestion(q : QuestionInternal) : QuestionTypes.Question {
    {
      id = q.id;
      roomCode = q.roomCode;
      title = q.title;
      description = q.description;
      raisedBy = q.raisedBy;
      raisedAt = q.raisedAt;
      selectedSubmission = q.selectedSubmission;
      status = q.status;
      closedAt = q.closedAt;
    };
  };

  func computeSummary(q : QuestionInternal, votesMap : Map.Map<Common.UserId, QuestionTypes.Vote>, caller : Common.UserId) : QuestionTypes.VoteSummary {
    var yesCount = 0;
    var noCount = 0;
    votesMap.forEach(func(_uid, vote) {
      switch (vote.choice) {
        case (#yes) { yesCount += 1 };
        case (#no) { noCount += 1 };
      };
    });
    let total = yesCount + noCount;
    let yesPercent = if (total == 0) 0 else (yesCount * 100) / total;
    let noPercent = if (total == 0) 0 else (noCount * 100) / total;
    let myVote = switch (votesMap.get(caller)) {
      case (?v) { ?v.choice };
      case null { null };
    };
    {
      questionId = q.id;
      title = q.title;
      description = q.description;
      selectedSubmission = q.selectedSubmission;
      status = q.status;
      yesCount;
      noCount;
      totalVotes = total;
      yesPercent;
      noPercent;
      myVote;
    };
  };

  public func selectRandomMember(members : [Common.UserId], seed : Nat) : ?Common.UserId {
    let n = members.size();
    if (n == 0) { null } else {
      ?members[seed % n];
    };
  };

  public func raiseQuestion(
    questions : QuestionMap,
    roomQuestions : RoomQuestionsMap,
    votesByQuestion : VoteMap,
    nextId : Nat,
    caller : Common.UserId,
    roomCode : Common.RoomCode,
    title : Text,
    description : Text,
    members : [Common.UserId],
    seed : Nat,
    now : Common.Timestamp,
  ) : QuestionTypes.RaiseResult {
    let selected = selectRandomMember(members, seed);
    let q : QuestionInternal = {
      id = nextId;
      roomCode;
      title;
      description;
      raisedBy = caller;
      raisedAt = now;
      selectedSubmission = selected;
      status = #open;
      closedAt = null;
    };
    questions.add(nextId, q);
    // Register empty vote map for this question
    votesByQuestion.add(nextId, Map.empty<Common.UserId, QuestionTypes.Vote>());
    // Append to room's question list
    switch (roomQuestions.get(roomCode)) {
      case (?idList) { idList.add(nextId) };
      case null {
        let idList = List.empty<Common.QuestionId>();
        idList.add(nextId);
        roomQuestions.add(roomCode, idList);
      };
    };
    #ok(toPublicQuestion(q));
  };

  public func castVote(
    questions : QuestionMap,
    votesByQuestion : VoteMap,
    caller : Common.UserId,
    questionId : Common.QuestionId,
    choice : QuestionTypes.VoteChoice,
    now : Common.Timestamp,
  ) : QuestionTypes.VoteResult {
    switch (questions.get(questionId)) {
      case null { #notFound };
      case (?q) {
        switch (q.status) {
          case (#closed) { #votingClosed };
          case (#open) {
            let vote : QuestionTypes.Vote = { voter = caller; choice; votedAt = now };
            switch (votesByQuestion.get(questionId)) {
              case (?votesMap) { votesMap.add(caller, vote) };
              case null {
                let votesMap = Map.empty<Common.UserId, QuestionTypes.Vote>();
                votesMap.add(caller, vote);
                votesByQuestion.add(questionId, votesMap);
              };
            };
            #ok;
          };
        };
      };
    };
  };

  public func closeVoting(
    questions : QuestionMap,
    caller : Common.UserId,
    questionId : Common.QuestionId,
    now : Common.Timestamp,
  ) : QuestionTypes.QuestionResult {
    switch (questions.get(questionId)) {
      case null { #notFound };
      case (?q) {
        if (not Principal.equal(q.raisedBy, caller)) {
          #unauthorized;
        } else {
          let updated : QuestionInternal = { q with status = #closed; closedAt = ?now };
          questions.add(questionId, updated);
          #ok(toPublicQuestion(updated));
        };
      };
    };
  };

  public func getVoteSummary(
    questions : QuestionMap,
    votesByQuestion : VoteMap,
    caller : Common.UserId,
    questionId : Common.QuestionId,
  ) : ?QuestionTypes.VoteSummary {
    switch (questions.get(questionId)) {
      case null { null };
      case (?q) {
        let votesMap = switch (votesByQuestion.get(questionId)) {
          case (?m) { m };
          case null { Map.empty<Common.UserId, QuestionTypes.Vote>() };
        };
        ?computeSummary(q, votesMap, caller);
      };
    };
  };

  public func listRoomQuestions(
    questions : QuestionMap,
    roomQuestions : RoomQuestionsMap,
    votesByQuestion : VoteMap,
    caller : Common.UserId,
    roomCode : Common.RoomCode,
  ) : [QuestionTypes.VoteSummary] {
    switch (roomQuestions.get(roomCode)) {
      case null { [] };
      case (?idList) {
        let results = List.empty<QuestionTypes.VoteSummary>();
        idList.forEach(func(qId) {
          switch (questions.get(qId)) {
            case (?q) {
              let votesMap = switch (votesByQuestion.get(qId)) {
                case (?m) { m };
                case null { Map.empty<Common.UserId, QuestionTypes.Vote>() };
              };
              results.add(computeSummary(q, votesMap, caller));
            };
            case null {};
          };
        });
        results.toArray();
      };
    };
  };
};
