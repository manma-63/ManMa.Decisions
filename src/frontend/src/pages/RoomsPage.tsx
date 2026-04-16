import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Copy,
  Crown,
  DoorOpen,
  Hash,
  Plus,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useCreateRoom, useJoinRoom, useMyRooms } from "../hooks/useBackend";
import type { RoomView } from "../types";

// ─── Room Code Display ───────────────────────────────────────────────────────
function RoomCodeBadge({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast.success("Room code copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border hover:border-accent/50 transition-smooth group"
      aria-label={`Copy room code ${code}`}
    >
      <span className="font-mono text-sm font-semibold text-foreground tracking-widest">
        {code}
      </span>
      <span className="text-muted-foreground group-hover:text-accent transition-smooth">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-accent" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </span>
    </button>
  );
}

// ─── Room Card ───────────────────────────────────────────────────────────────
function RoomCard({
  room,
  isCreator,
  index,
}: { room: RoomView; isCreator: boolean; index: number }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07, ease: "easeOut" }}
      className="group relative"
    >
      <button
        type="button"
        onClick={() =>
          navigate({ to: "/rooms/$code", params: { code: room.code } })
        }
        className="w-full text-left block"
        data-ocid={`rooms.item.${index + 1}`}
      >
        <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-accent/40 hover:bg-card/80 transition-smooth shadow-subtle hover:shadow-elevated cursor-pointer">
          {/* Accent bar */}
          {isCreator && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/80 via-accent to-accent/20" />
          )}

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              {/* Left: code + meta */}
              <div className="flex flex-col gap-3 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <RoomCodeBadge code={room.code} />
                  {isCreator && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-semibold border border-accent/25">
                      <Crown className="w-3 h-3" />
                      Creator
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {Number(room.memberCount)} member
                      {Number(room.memberCount) !== 1 ? "s" : ""}
                    </span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-xs">
                    {new Date(
                      Number(room.createdAt) / 1_000_000,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Right: arrow */}
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted/60 group-hover:bg-accent/15 group-hover:text-accent text-muted-foreground transition-smooth mt-1">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-smooth" />
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

// ─── New Room Banner ─────────────────────────────────────────────────────────
function NewRoomBanner({
  code,
  onDismiss,
}: { code: string; onDismiss: () => void }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-xl border border-accent/40 bg-card shadow-elevated"
      data-ocid="rooms.new_room_banner"
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/80 to-primary/60" />

      <div className="relative px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
              Room Created!
            </p>
            <p className="text-sm text-muted-foreground">
              Share this code with others to invite them:
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background/60 border border-border backdrop-blur-sm">
              <Hash className="w-4 h-4 text-accent shrink-0" />
              <span className="font-mono text-xl font-bold text-foreground tracking-[0.2em]">
                {code}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="gap-1.5 border-accent/30 hover:border-accent hover:bg-accent/10 hover:text-accent transition-smooth"
              data-ocid="rooms.copy_room_code_button"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              size="sm"
              onClick={() => navigate({ to: "/rooms/$code", params: { code } })}
              className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
              data-ocid="rooms.go_to_room_button"
            >
              Enter Room
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-smooth text-xs"
          aria-label="Dismiss"
          data-ocid="rooms.dismiss_banner_button"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState({ onCreateRoom }: { onCreateRoom: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="rooms.empty_state"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mb-5 shadow-subtle">
        <DoorOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        No rooms yet
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        Create a room to start raising questions, or join one with a code from a
        friend.
      </p>
      <Button
        onClick={onCreateRoom}
        className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
        data-ocid="rooms.empty_create_button"
      >
        <Plus className="w-4 h-4" />
        Create your first room
      </Button>
    </motion.div>
  );
}

// ─── Loading Skeletons ────────────────────────────────────────────────────────
function RoomCardSkeleton() {
  return (
    <div
      className="rounded-xl border border-border bg-card p-5"
      data-ocid="rooms.loading_state"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-3 flex-1">
          <Skeleton className="h-7 w-28 rounded-md" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full shrink-0" />
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function RoomsPage() {
  const { principal } = useAuth();
  const { data: rooms, isLoading } = useMyRooms();
  const createRoom = useCreateRoom();
  const joinRoom = useJoinRoom();
  const navigate = useNavigate();

  const [joinCode, setJoinCode] = useState("");
  const [newRoomCode, setNewRoomCode] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const myPrincipalText = principal?.toText() ?? "";

  const handleCreate = async () => {
    try {
      const room = await createRoom.mutateAsync();
      setNewRoomCode(room.code);
      toast.success("Room created!");
    } catch {
      toast.error("Failed to create room. Please try again.");
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = joinCode.trim().toUpperCase();
    if (!trimmed) return;
    setJoinError(null);
    try {
      const room = await joinRoom.mutateAsync(trimmed);
      if (room) {
        toast.success(`Joined room ${room.code}!`);
        navigate({ to: "/rooms/$code", params: { code: room.code } });
      } else {
        setJoinError("Room not found. Double-check the code and try again.");
      }
    } catch {
      setJoinError("Could not join room. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          My Rooms
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Create or join a room to start raising questions and voting.
        </p>
      </motion.div>

      {/* New room banner */}
      <AnimatePresence>
        {newRoomCode && (
          <NewRoomBanner
            code={newRoomCode}
            onDismiss={() => setNewRoomCode(null)}
          />
        )}
      </AnimatePresence>

      {/* Actions row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid sm:grid-cols-2 gap-4"
      >
        {/* Create room */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <div>
            <h2 className="font-display font-semibold text-foreground text-base">
              Create a Room
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Get a unique code to share with others.
            </p>
          </div>
          <Button
            onClick={handleCreate}
            disabled={createRoom.isPending}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth w-full font-semibold"
            data-ocid="rooms.create_room_button"
          >
            {createRoom.isPending ? (
              <span className="w-4 h-4 rounded-full border-2 border-accent-foreground border-t-transparent animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {createRoom.isPending ? "Creating…" : "Create Room"}
          </Button>
        </div>

        {/* Join room */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <div>
            <h2 className="font-display font-semibold text-foreground text-base">
              Join a Room
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Enter a code to join an existing room.
            </p>
          </div>
          <form onSubmit={handleJoin} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                value={joinCode}
                onChange={(e) => {
                  setJoinCode(e.target.value.toUpperCase());
                  setJoinError(null);
                }}
                placeholder="e.g. ABC123"
                maxLength={10}
                className="font-mono tracking-widest uppercase placeholder:normal-case placeholder:tracking-normal flex-1 bg-background border-input focus:border-accent transition-smooth"
                data-ocid="rooms.join_code_input"
              />
              <Button
                type="submit"
                disabled={joinRoom.isPending || !joinCode.trim()}
                variant="outline"
                className="border-border hover:border-accent hover:bg-accent/10 hover:text-accent transition-smooth shrink-0"
                data-ocid="rooms.join_room_button"
              >
                {joinRoom.isPending ? (
                  <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </div>
            <AnimatePresence>
              {joinError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-destructive"
                  data-ocid="rooms.join_error_state"
                >
                  {joinError}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Rooms list */}
      <section>
        <h2 className="font-display font-semibold text-foreground text-base mb-4">
          {isLoading
            ? "Loading rooms…"
            : rooms && rooms.length > 0
              ? `${rooms.length} Room${rooms.length !== 1 ? "s" : ""}`
              : "Your Rooms"}
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <RoomCardSkeleton key={i} />
            ))}
          </div>
        ) : rooms && rooms.length > 0 ? (
          <div className="space-y-3" data-ocid="rooms.list">
            {rooms.map((room, i) => (
              <RoomCard
                key={room.code}
                room={room}
                isCreator={room.creator.toText() === myPrincipalText}
                index={i}
              />
            ))}
          </div>
        ) : (
          <EmptyState onCreateRoom={handleCreate} />
        )}
      </section>
    </div>
  );
}
