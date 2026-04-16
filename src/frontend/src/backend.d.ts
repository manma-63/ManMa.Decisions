import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type QuestionResult = {
    __kind__: "ok";
    ok: Question;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "unauthorized";
    unauthorized: null;
};
export type UserId = Principal;
export type Timestamp = bigint;
export type QuestionId = bigint;
export interface RoomView {
    creator: UserId;
    members: Array<UserId>;
    code: RoomCode;
    createdAt: Timestamp;
    memberCount: bigint;
}
export type RoomCode = string;
export interface Question {
    id: QuestionId;
    status: VoteStatus;
    title: string;
    description: string;
    closedAt?: Timestamp;
    raisedAt: Timestamp;
    raisedBy: UserId;
    selectedSubmission?: UserId;
    roomCode: RoomCode;
}
export interface VoteSummary {
    status: VoteStatus;
    title: string;
    yesPercent: bigint;
    noCount: bigint;
    totalVotes: bigint;
    yesCount: bigint;
    description: string;
    myVote?: VoteChoice;
    questionId: QuestionId;
    noPercent: bigint;
    selectedSubmission?: UserId;
}
export type RaiseResult = {
    __kind__: "ok";
    ok: Question;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "unauthorized";
    unauthorized: null;
};
export enum VoteChoice {
    no = "no",
    yes = "yes"
}
export enum VoteResult {
    ok = "ok",
    votingClosed = "votingClosed",
    notFound = "notFound",
    unauthorized = "unauthorized"
}
export enum VoteStatus {
    closed = "closed",
    open = "open"
}
export interface backendInterface {
    castVote(questionId: QuestionId, choice: VoteChoice): Promise<VoteResult>;
    closeVoting(questionId: QuestionId): Promise<QuestionResult>;
    createRoom(): Promise<RoomView>;
    getRoom(code: RoomCode): Promise<RoomView | null>;
    getVoteSummary(questionId: QuestionId): Promise<VoteSummary | null>;
    joinRoom(code: RoomCode): Promise<RoomView | null>;
    listMyRooms(): Promise<Array<RoomView>>;
    listRoomQuestions(roomCode: RoomCode): Promise<Array<VoteSummary>>;
    raiseQuestion(roomCode: RoomCode, title: string, description: string): Promise<RaiseResult>;
}
