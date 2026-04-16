import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";

import RoomLib "lib/rooms";
import QuestionLib "lib/questions";
import RoomsApi "mixins/rooms-api";
import QuestionsApi "mixins/questions-api";

actor {
  // --- Room state ---
  let rooms : RoomLib.RoomMap = Map.empty();
  let memberships : RoomLib.MembershipMap = Map.empty();
  let roomCodeCounter = { var value : Nat = 0 };

  // --- Question state ---
  let questions : QuestionLib.QuestionMap = Map.empty();
  let roomQuestions : QuestionLib.RoomQuestionsMap = Map.empty();
  let votesByQuestion : QuestionLib.VoteMap = Map.empty();
  let nextQuestionId = { var value : Nat = 0 };
  let questionSeedCounter = { var value : Nat = 0 };

  // --- Mixins ---
  include RoomsApi(rooms, memberships, roomCodeCounter);
  include QuestionsApi(questions, roomQuestions, votesByQuestion, rooms, nextQuestionId, questionSeedCounter);
};
