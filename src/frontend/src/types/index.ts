import type { Principal } from "@icp-sdk/core/principal";

// ─── Primitives ────────────────────────────────────────────────────────────
export type UserId = Principal;
export type RoomCode = string;
export type QuestionId = bigint;
export type Timestamp = bigint;

// ─── Room ──────────────────────────────────────────────────────────────────
export interface RoomView {
  code: RoomCode;
  creator: UserId;
  members: UserId[];
  createdAt: Timestamp;
  memberCount: bigint;
}

// ─── Voting ────────────────────────────────────────────────────────────────
export type VoteChoice = { "#yes": null } | { "#no": null };
export type VoteStatus = { "#open": null } | { "#closed": null };

export interface VoteSummary {
  questionId: QuestionId;
  title: string;
  description: string;
  selectedSubmission: UserId | undefined;
  status: VoteStatus;
  yesCount: bigint;
  noCount: bigint;
  totalVotes: bigint;
  yesPercent: bigint;
  noPercent: bigint;
  myVote: VoteChoice | undefined;
}

// ─── Result types ──────────────────────────────────────────────────────────
export type RaiseResult = { ok: VoteSummary } | { err: string };

export type VoteResult = { ok: VoteSummary } | { err: string };

export type QuestionResult = { ok: VoteSummary } | { err: string };

// ─── Helpers ───────────────────────────────────────────────────────────────
export function isVoteOpen(status: VoteStatus): boolean {
  return "#open" in status;
}

export function isVoteClosed(status: VoteStatus): boolean {
  return "#closed" in status;
}

export function hasVotedYes(choice: VoteChoice | undefined): boolean {
  return choice !== undefined && "#yes" in choice;
}

export function hasVotedNo(choice: VoteChoice | undefined): boolean {
  return choice !== undefined && "#no" in choice;
}
