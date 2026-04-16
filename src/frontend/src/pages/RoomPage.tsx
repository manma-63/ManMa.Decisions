import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Lock,
  MessageSquarePlus,
  ShieldOff,
  ThumbsDown,
  ThumbsUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import {
  useCastVote,
  useCloseVoting,
  useRaiseQuestion,
  useRoom,
  useRoomQuestions,
} from "../hooks/useBackend";
import {
  type VoteChoice,
  type VoteSummary,
  hasVotedNo,
  hasVotedYes,
  isVoteOpen,
} from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function truncatePrincipal(id: string): string {
  return id.length > 10 ? `${id.slice(0, 8)}…` : id;
}

function formatCount(n: bigint): string {
  return n.toString();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface VoteBarProps {
  yesPercent: bigint;
  noPercent: bigint;
}
function VoteBar({ yesPercent, noPercent }: VoteBarProps) {
  const yes = Number(yesPercent);
  const no = Number(noPercent);
  return (
    <div
      className="flex h-2.5 w-full rounded-full overflow-hidden bg-muted"
      role="progressbar"
      aria-label="Vote distribution"
      aria-valuenow={yes}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
    >
      {yes > 0 && (
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${yes}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
      {no > 0 && (
        <motion.div
          className="h-full bg-muted-foreground/40"
          initial={{ width: 0 }}
          animate={{ width: `${no}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        />
      )}
    </div>
  );
}

interface QuestionCardProps {
  question: VoteSummary;
  isCreator: boolean;
  roomCode: string;
  myPrincipalText: string | undefined;
  index: number;
}
function QuestionCard({
  question,
  isCreator,
  roomCode,
  myPrincipalText,
  index,
}: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const castVote = useCastVote();
  const closeVoting = useCloseVoting();
  const open = isVoteOpen(question.status);
  const isSelected =
    question.selectedSubmission !== undefined &&
    myPrincipalText !== undefined &&
    question.selectedSubmission.toText() === myPrincipalText;

  function handleVote(choice: VoteChoice) {
    castVote.mutate(
      { questionId: question.questionId, choice, roomCode },
      {
        onError: (e) => toast.error(e.message ?? "Failed to cast vote"),
      },
    );
  }

  function handleClose() {
    closeVoting.mutate(
      { questionId: question.questionId, roomCode },
      {
        onSuccess: () => toast.success("Voting closed"),
        onError: (e) => toast.error(e.message ?? "Failed to close voting"),
      },
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      data-ocid={`question_list.item.${index + 1}`}
      className="bg-card border border-border rounded-xl overflow-hidden transition-smooth hover:border-primary/40"
    >
      {/* Card header (always visible) */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start gap-3 p-4 text-left"
        aria-expanded={expanded}
        data-ocid={`question_list.item.${index + 1}.toggle`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-display font-semibold text-foreground text-sm truncate">
              {question.title}
            </span>
            {open ? (
              <Badge
                variant="default"
                className="bg-accent text-accent-foreground text-[10px] shrink-0"
              >
                OPEN
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-[10px] shrink-0">
                CLOSED
              </Badge>
            )}
          </div>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" /> {formatCount(question.yesCount)}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsDown className="w-3 h-3" /> {formatCount(question.noCount)}
            </span>
            <span>{formatCount(question.totalVotes)} votes</span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.description}
              </p>

              {/* Selected submitter */}
              {question.selectedSubmission && (
                <div className="flex items-center gap-2 text-xs bg-muted rounded-lg px-3 py-2">
                  <span className="text-muted-foreground">Selected voter:</span>
                  <span className="font-mono text-foreground">
                    {truncatePrincipal(question.selectedSubmission.toText())}
                  </span>
                  {isSelected && (
                    <Badge
                      variant="outline"
                      className="text-accent border-accent text-[10px]"
                    >
                      You
                    </Badge>
                  )}
                </div>
              )}

              {/* Vote bar */}
              {Number(question.totalVotes) > 0 && (
                <div className="space-y-1.5">
                  <VoteBar
                    yesPercent={question.yesPercent}
                    noPercent={question.noPercent}
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span className="text-accent font-medium">
                      Yes {formatCount(question.yesPercent)}%
                    </span>
                    <span>No {formatCount(question.noPercent)}%</span>
                  </div>
                </div>
              )}

              {/* Vote actions (open only) */}
              {open && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={
                      hasVotedYes(question.myVote) ? "default" : "outline"
                    }
                    className={
                      hasVotedYes(question.myVote)
                        ? "bg-accent text-accent-foreground hover:bg-accent/90 glow-accent"
                        : "border-accent/50 text-accent hover:bg-accent/10 transition-smooth"
                    }
                    onClick={() => handleVote({ "#yes": null })}
                    disabled={castVote.isPending}
                    data-ocid={`question_list.item.${index + 1}.yes_button`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5 mr-1.5" />
                    Yes
                    {hasVotedYes(question.myVote) && (
                      <CheckCircle2 className="w-3 h-3 ml-1.5" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      hasVotedNo(question.myVote) ? "secondary" : "outline"
                    }
                    className={
                      hasVotedNo(question.myVote)
                        ? "bg-secondary text-secondary-foreground"
                        : "border-border text-muted-foreground hover:bg-muted transition-smooth"
                    }
                    onClick={() => handleVote({ "#no": null })}
                    disabled={castVote.isPending}
                    data-ocid={`question_list.item.${index + 1}.no_button`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5 mr-1.5" />
                    No
                    {hasVotedNo(question.myVote) && (
                      <CheckCircle2 className="w-3 h-3 ml-1.5" />
                    )}
                  </Button>

                  {isCreator && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10 ml-auto"
                      onClick={handleClose}
                      disabled={closeVoting.isPending}
                      data-ocid={`question_list.item.${index + 1}.close_voting_button`}
                    >
                      <Lock className="w-3.5 h-3.5 mr-1.5" />
                      Close Voting
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Raise Question Modal ─────────────────────────────────────────────────────
interface RaiseQuestionModalProps {
  roomCode: string;
  onClose: () => void;
}
function RaiseQuestionModal({ roomCode, onClose }: RaiseQuestionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const raiseQuestion = useRaiseQuestion();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    raiseQuestion.mutate(
      { roomCode, title: title.trim(), description: description.trim() },
      {
        onSuccess: (result) => {
          if ("err" in result) {
            toast.error(result.err);
          } else {
            toast.success("Question raised! Voting is now open.");
            onClose();
          }
        },
        onError: (e) => toast.error(e.message ?? "Failed to raise question"),
      },
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="raise_question.dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        className="relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md p-6 z-10"
        initial={{ scale: 0.95, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 16, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Raise a Question
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Close"
            data-ocid="raise_question.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="question-title" className="text-sm text-foreground">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="question-title"
              placeholder="e.g. Should we extend the deadline?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              required
              data-ocid="raise_question.title_input"
              className="bg-background border-input focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="question-desc" className="text-sm text-foreground">
              Description
            </Label>
            <Textarea
              id="question-desc"
              placeholder="Add context, options, or any details that help members decide…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={600}
              data-ocid="raise_question.description_textarea"
              className="bg-background border-input focus:ring-2 focus:ring-primary/40 resize-none"
            />
            <p className="text-[11px] text-muted-foreground text-right">
              {description.length}/600
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1"
              data-ocid="raise_question.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || raiseQuestion.isPending}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 glow-accent"
              data-ocid="raise_question.submit_button"
            >
              {raiseQuestion.isPending ? "Raising…" : "Raise Question"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Active Question Banner ───────────────────────────────────────────────────
interface ActiveQuestionProps {
  question: VoteSummary;
  isCreator: boolean;
  roomCode: string;
  myPrincipalText: string | undefined;
}
function ActiveQuestion({
  question,
  isCreator,
  roomCode,
  myPrincipalText,
}: ActiveQuestionProps) {
  const castVote = useCastVote();
  const closeVoting = useCloseVoting();

  const isSelected =
    question.selectedSubmission !== undefined &&
    myPrincipalText !== undefined &&
    question.selectedSubmission.toText() === myPrincipalText;

  function handleVote(choice: VoteChoice) {
    castVote.mutate(
      { questionId: question.questionId, choice, roomCode },
      {
        onError: (e) => toast.error(e.message ?? "Failed to cast vote"),
        onSuccess: () => toast.success("Vote cast!"),
      },
    );
  }

  function handleClose() {
    closeVoting.mutate(
      { questionId: question.questionId, roomCode },
      {
        onSuccess: () => toast.success("Voting closed"),
        onError: (e) => toast.error(e.message ?? "Failed to close voting"),
      },
    );
  }

  return (
    <motion.div
      className="bg-card border border-primary/40 rounded-2xl overflow-hidden shadow-elevated glow-primary"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      data-ocid="active_question.section"
    >
      {/* Active label strip */}
      <div className="bg-primary/10 border-b border-primary/20 px-5 py-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-mono font-semibold text-primary tracking-widest uppercase">
          Active Vote
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Question title & description */}
        <div>
          <h2
            className="font-display text-xl font-bold text-foreground leading-snug"
            data-ocid="active_question.title"
          >
            {question.title}
          </h2>
          {question.description && (
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              {question.description}
            </p>
          )}
        </div>

        {/* Selected submission display */}
        {question.selectedSubmission && (
          <div className="flex items-center gap-3 bg-muted/60 border border-border rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
                Randomly selected member
              </p>
              <p
                className="font-mono text-sm text-foreground truncate"
                data-ocid="active_question.selected_member"
              >
                {question.selectedSubmission.toText()}
              </p>
            </div>
            {isSelected && (
              <Badge className="bg-accent text-accent-foreground ml-auto shrink-0 text-xs">
                You!
              </Badge>
            )}
          </div>
        )}

        {/* Live vote counts */}
        <div className="space-y-3">
          <VoteBar
            yesPercent={question.yesPercent}
            noPercent={question.noPercent}
          />
          <div className="grid grid-cols-3 text-center gap-2">
            <div className="bg-muted/50 rounded-lg py-2 px-1">
              <p
                className="text-lg font-display font-bold text-accent"
                data-ocid="active_question.yes_count"
              >
                {formatCount(question.yesCount)}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                Yes
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg py-2 px-1">
              <p
                className="text-lg font-display font-bold text-foreground"
                data-ocid="active_question.total_count"
              >
                {formatCount(question.totalVotes)}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                Total
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg py-2 px-1">
              <p
                className="text-lg font-display font-bold text-muted-foreground"
                data-ocid="active_question.no_count"
              >
                {formatCount(question.noCount)}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                No
              </p>
            </div>
          </div>
        </div>

        {/* Vote buttons */}
        <div className="flex gap-3">
          <Button
            className={`flex-1 h-11 text-sm font-semibold transition-smooth ${
              hasVotedYes(question.myVote)
                ? "bg-accent text-accent-foreground hover:bg-accent/90 glow-accent"
                : "bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20"
            }`}
            onClick={() => handleVote({ "#yes": null })}
            disabled={castVote.isPending}
            data-ocid="active_question.yes_button"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Yes
            {hasVotedYes(question.myVote) && (
              <CheckCircle2 className="w-3.5 h-3.5 ml-2 opacity-80" />
            )}
          </Button>
          <Button
            className={`flex-1 h-11 text-sm font-semibold transition-smooth ${
              hasVotedNo(question.myVote)
                ? "bg-secondary text-secondary-foreground border border-border"
                : "bg-muted/50 border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            onClick={() => handleVote({ "#no": null })}
            disabled={castVote.isPending}
            data-ocid="active_question.no_button"
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            No
            {hasVotedNo(question.myVote) && (
              <CheckCircle2 className="w-3.5 h-3.5 ml-2 opacity-80" />
            )}
          </Button>
        </div>

        {/* Creator close button */}
        {isCreator && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-destructive hover:bg-destructive/10 border border-destructive/20"
            onClick={handleClose}
            disabled={closeVoting.isPending}
            data-ocid="active_question.close_voting_button"
          >
            <Lock className="w-4 h-4 mr-2" />
            {closeVoting.isPending ? "Closing…" : "Close Voting"}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RoomPage() {
  const { code } = useParams({ from: "/rooms/$code" });
  const { principal } = useAuth();
  const myPrincipalText = principal?.toText();

  const [copied, setCopied] = useState(false);
  const [showRaiseModal, setShowRaiseModal] = useState(false);

  const {
    data: room,
    isLoading: roomLoading,
    isError: roomError,
  } = useRoom(code);
  const { data: questions = [], isLoading: questionsLoading } =
    useRoomQuestions(code);

  const isCreator =
    room !== undefined &&
    myPrincipalText !== undefined &&
    room.creator.toText() === myPrincipalText;

  const activeQuestion = questions.find((q) => isVoteOpen(q.status));
  const closedQuestions = questions.filter((q) => !isVoteOpen(q.status));

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast.success("Room code copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (roomLoading) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6"
        data-ocid="room.loading_state"
      >
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  // ── Error / not found ──────────────────────────────────────────────────────
  if (roomError || !room) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center gap-5 text-center"
        data-ocid="room.error_state"
      >
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <ShieldOff className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-1">
            Room not found
          </h2>
          <p className="text-sm text-muted-foreground">
            No room with code{" "}
            <span className="font-mono text-foreground">{code}</span> exists, or
            you don't have access yet.
          </p>
        </div>
        <Link to="/rooms">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to My Rooms
          </Button>
        </Link>
      </div>
    );
  }

  // ── Main view ──────────────────────────────────────────────────────────────
  return (
    <div
      className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6"
      data-ocid="room.page"
    >
      {/* Room header */}
      <motion.div
        className="bg-card border border-border rounded-2xl p-5 shadow-subtle"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        data-ocid="room.header"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Code + copy */}
          <div className="space-y-1">
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono">
              Room Code
            </p>
            <div className="flex items-center gap-2">
              <span
                className="font-display text-3xl font-black tracking-widest text-foreground select-all"
                data-ocid="room.code_display"
              >
                {code}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted hover:bg-secondary text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Copy room code"
                data-ocid="room.copy_code_button"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-accent" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Creator badge + raise question + history */}
          <div className="flex items-center gap-2 flex-wrap">
            {isCreator && (
              <Badge className="bg-primary/20 text-primary border border-primary/30 text-xs">
                Creator
              </Badge>
            )}
            {isCreator && (
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 font-semibold glow-accent"
                onClick={() => setShowRaiseModal(true)}
                data-ocid="room.raise_question_button"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Raise Question
              </Button>
            )}
            <Button
              asChild
              size="sm"
              variant="outline"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              data-ocid="room.view_history_button"
            >
              <Link to="/rooms/$code/history" params={{ code }}>
                <Clock className="w-4 h-4" />
                View History
              </Link>
            </Button>
          </div>
        </div>

        {/* Member list */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 mb-2">
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">
              {formatCount(room.memberCount)} member
              {room.memberCount !== 1n ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5" data-ocid="room.member_list">
            {room.members.map((member, i) => {
              const text = member.toText();
              const isMe = text === myPrincipalText;
              return (
                <span
                  key={text}
                  title={text}
                  data-ocid={`room.member.${i + 1}`}
                  className={`font-mono text-[11px] px-2 py-0.5 rounded-md border ${
                    isMe
                      ? "bg-primary/15 border-primary/30 text-primary"
                      : "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  {truncatePrincipal(text)}
                  {isMe && <span className="ml-1 text-primary/60">(you)</span>}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Active question zone */}
      <AnimatePresence mode="wait">
        {questionsLoading ? (
          <Skeleton
            key="skeleton"
            className="h-48 w-full rounded-2xl"
            data-ocid="room.questions_loading_state"
          />
        ) : activeQuestion ? (
          <ActiveQuestion
            key="active"
            question={activeQuestion}
            isCreator={isCreator}
            roomCode={code}
            myPrincipalText={myPrincipalText}
          />
        ) : (
          <motion.div
            key="no-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-muted/30 border border-dashed border-border rounded-2xl px-6 py-10 text-center"
            data-ocid="room.no_active_question_empty_state"
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
              <MessageSquarePlus className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-display text-base font-semibold text-foreground mb-1">
              No active vote
            </p>
            <p className="text-sm text-muted-foreground">
              {isCreator
                ? "Raise a question to start a vote for this room."
                : "Waiting for the room creator to raise a question."}
            </p>
            {isCreator && (
              <Button
                size="sm"
                className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
                onClick={() => setShowRaiseModal(true)}
                data-ocid="room.empty_state_raise_button"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Raise Question
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past questions list */}
      {closedQuestions.length > 0 && (
        <section data-ocid="question_list.section">
          <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            Past Questions
          </h3>
          <div className="space-y-2">
            {closedQuestions.map((q, i) => (
              <QuestionCard
                key={q.questionId.toString()}
                question={q}
                isCreator={isCreator}
                roomCode={code}
                myPrincipalText={myPrincipalText}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {/* All questions list (when no closed, show all) */}
      {closedQuestions.length === 0 &&
        questions.length > 0 &&
        !activeQuestion && (
          <section data-ocid="question_list.section">
            <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              All Questions
            </h3>
            <div className="space-y-2">
              {questions.map((q, i) => (
                <QuestionCard
                  key={q.questionId.toString()}
                  question={q}
                  isCreator={isCreator}
                  roomCode={code}
                  myPrincipalText={myPrincipalText}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

      {/* Raise Question Modal */}
      <AnimatePresence>
        {showRaiseModal && (
          <RaiseQuestionModal
            roomCode={code}
            onClose={() => setShowRaiseModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
