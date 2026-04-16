import type { backendInterface } from "../backend";
import { VoteChoice, VoteResult, VoteStatus } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = { toText: () => "aaaaa-aa", compareTo: () => 0, isAnonymous: () => false } as unknown as Principal;

const mockRoomView = {
  creator: mockPrincipal,
  members: [mockPrincipal],
  code: "ROOM42",
  createdAt: BigInt(Date.now()),
  memberCount: BigInt(3),
};

const mockQuestion = {
  id: BigInt(1),
  status: VoteStatus.open,
  title: "Should we add a dark mode toggle?",
  description: "Adding a toggle would let users switch between dark and light themes based on their preference.",
  raisedAt: BigInt(Date.now() - 60000),
  raisedBy: mockPrincipal,
  roomCode: "ROOM42",
};

const mockVoteSummary = {
  status: VoteStatus.open,
  title: "Should we add a dark mode toggle?",
  description: "Adding a toggle would let users switch between dark and light themes based on their preference.",
  yesPercent: BigInt(67),
  noPercent: BigInt(33),
  yesCount: BigInt(4),
  noCount: BigInt(2),
  totalVotes: BigInt(6),
  questionId: BigInt(1),
};

const mockClosedSummary = {
  status: VoteStatus.closed,
  title: "Should we launch the beta next week?",
  description: "The beta is mostly ready. Launching next week gives us time to gather feedback early.",
  yesPercent: BigInt(80),
  noPercent: BigInt(20),
  yesCount: BigInt(8),
  noCount: BigInt(2),
  totalVotes: BigInt(10),
  questionId: BigInt(2),
  myVote: VoteChoice.yes,
};

export const mockBackend: backendInterface = {
  castVote: async (_questionId, _choice) => VoteResult.ok,
  closeVoting: async (_questionId) => ({ __kind__: "ok", ok: { ...mockQuestion, status: VoteStatus.closed, closedAt: BigInt(Date.now()) } }),
  createRoom: async () => ({ ...mockRoomView, code: "NEW01" }),
  getRoom: async (_code) => mockRoomView,
  getVoteSummary: async (_questionId) => mockVoteSummary,
  joinRoom: async (_code) => mockRoomView,
  listMyRooms: async () => [
    mockRoomView,
    { ...mockRoomView, code: "ROOM99", memberCount: BigInt(7), createdAt: BigInt(Date.now() - 3600000) },
  ],
  listRoomQuestions: async (_roomCode) => [mockVoteSummary, mockClosedSummary],
  raiseQuestion: async (_roomCode, title, description) => ({
    __kind__: "ok",
    ok: { ...mockQuestion, title, description },
  }),
};
