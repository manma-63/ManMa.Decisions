import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  QuestionResult,
  RaiseResult,
  RoomView,
  VoteChoice,
  VoteResult,
  VoteSummary,
} from "../types";

// ─── Rooms ──────────────────────────────────────────────────────────────────

export function useMyRooms() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RoomView[]>({
    queryKey: ["rooms", "mine"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as ActorWithBackend).listMyRooms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRoom(code: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RoomView | undefined>({
    queryKey: ["rooms", code],
    queryFn: async () => {
      if (!actor || !code) return undefined;
      const result = await (actor as unknown as ActorWithBackend).getRoom(code);
      return result ?? undefined;
    },
    enabled: !!actor && !isFetching && !!code,
    refetchInterval: 8000,
  });
}

export function useCreateRoom() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<RoomView, Error>({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ActorWithBackend).createRoom();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms", "mine"] });
    },
  });
}

export function useJoinRoom() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<RoomView | undefined, Error, string>({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await (actor as unknown as ActorWithBackend).joinRoom(
        code,
      );
      return result ?? undefined;
    },
    onSuccess: (_data, code) => {
      qc.invalidateQueries({ queryKey: ["rooms", code] });
      qc.invalidateQueries({ queryKey: ["rooms", "mine"] });
    },
  });
}

// ─── Questions ───────────────────────────────────────────────────────────────

export function useRoomQuestions(roomCode: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VoteSummary[]>({
    queryKey: ["questions", roomCode],
    queryFn: async () => {
      if (!actor || !roomCode) return [];
      return (actor as unknown as ActorWithBackend).listRoomQuestions(roomCode);
    },
    enabled: !!actor && !isFetching && !!roomCode,
    refetchInterval: 5000,
  });
}

export function useRaiseQuestion() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    RaiseResult,
    Error,
    { roomCode: string; title: string; description: string }
  >({
    mutationFn: async ({ roomCode, title, description }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ActorWithBackend).raiseQuestion(
        roomCode,
        title,
        description,
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["questions", vars.roomCode] });
    },
  });
}

export function useCastVote() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    VoteResult,
    Error,
    { questionId: bigint; choice: VoteChoice; roomCode: string }
  >({
    mutationFn: async ({ questionId, choice }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ActorWithBackend).castVote(
        questionId,
        choice,
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["questions", vars.roomCode] });
    },
  });
}

export function useCloseVoting() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    QuestionResult,
    Error,
    { questionId: bigint; roomCode: string }
  >({
    mutationFn: async ({ questionId }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ActorWithBackend).closeVoting(questionId);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["questions", vars.roomCode] });
    },
  });
}

// ─── Internal actor shape ────────────────────────────────────────────────────
interface ActorWithBackend {
  createRoom(): Promise<RoomView>;
  joinRoom(code: string): Promise<RoomView | null>;
  getRoom(code: string): Promise<RoomView | null>;
  listMyRooms(): Promise<RoomView[]>;
  raiseQuestion(
    roomCode: string,
    title: string,
    description: string,
  ): Promise<RaiseResult>;
  castVote(questionId: bigint, choice: VoteChoice): Promise<VoteResult>;
  closeVoting(questionId: bigint): Promise<QuestionResult>;
  listRoomQuestions(roomCode: string): Promise<VoteSummary[]>;
}
