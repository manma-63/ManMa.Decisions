import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Inbox,
  Users,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useRoomQuestions } from "../hooks/useBackend";
import { isVoteClosed, isVoteOpen } from "../types";
import type { VoteSummary } from "../types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTimestamp(id: bigint): string {
  // questionId encodes nanosecond timestamp on IC; fall back to sequential display
  const ms = Number(id / 1_000_000n);
  if (ms > 1_600_000_000_000) {
    return new Date(ms).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
  return `Question #${String(id)}`;
}

// ─── Vote Bar ────────────────────────────────────────────────────────────────

function VoteBar({
  yesPercent,
  noPercent,
}: { yesPercent: bigint; noPercent: bigint }) {
  const yes = Number(yesPercent);
  const no = Number(noPercent);
  return (
    <div className="flex items-center gap-2 mt-3">
      <span className="text-xs font-mono text-chart-3 w-8 text-right">
        {yes}%
      </span>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-smooth"
          style={{ width: `${yes}%`, background: "oklch(var(--chart-3))" }}
        />
      </div>
      <span className="text-xs font-mono text-destructive w-8">{no}%</span>
    </div>
  );
}

// ─── Question Card ────────────────────────────────────────────────────────────

function QuestionCard({
  question,
  index,
}: { question: VoteSummary; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const open = isVoteOpen(question.status);
  const closed = isVoteClosed(question.status);
  const yesCount = Number(question.yesCount);
  const noCount = Number(question.noCount);
  const totalVotes = Number(question.totalVotes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      data-ocid={`history.item.${index + 1}`}
      className="rounded-xl border border-border bg-card shadow-subtle overflow-hidden"
    >
      {/* Card header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-muted/30 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={expanded}
        data-ocid={`history.toggle.${index + 1}`}
      >
        {/* Status icon */}
        <div className="mt-0.5 shrink-0">
          {open ? (
            <Clock className="w-5 h-5 text-accent" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-chart-3" />
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-foreground text-base truncate">
              {question.title}
            </h3>
            <Badge
              variant={open ? "outline" : "secondary"}
              className={
                open
                  ? "border-accent/60 text-accent bg-accent/10 text-xs"
                  : "bg-chart-3/15 text-chart-3 border-chart-3/30 text-xs"
              }
              data-ocid={`history.status.${index + 1}`}
            >
              {open ? "Open" : "Closed"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
            {question.description}
          </p>

          {/* Vote summary row */}
          <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span className="font-mono">{totalVotes}</span>
              <span>votes</span>
            </span>
            <span className="flex items-center gap-1 text-chart-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-mono">{yesCount}</span>
              <span className="text-muted-foreground">yes</span>
            </span>
            <span className="flex items-center gap-1 text-destructive">
              <XCircle className="w-3.5 h-3.5" />
              <span className="font-mono">{noCount}</span>
              <span className="text-muted-foreground">no</span>
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              {formatTimestamp(question.questionId)}
            </span>
          </div>

          {closed && (
            <VoteBar
              yesPercent={question.yesPercent}
              noPercent={question.noPercent}
            />
          )}
        </div>

        {/* Chevron */}
        <div className="shrink-0 text-muted-foreground mt-0.5">
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-1 border-t border-border bg-muted/20 space-y-4"
              data-ocid={`history.detail.${index + 1}`}
            >
              {/* Selected submission */}
              <div>
                <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-1">
                  Selected Submission
                </p>
                {question.selectedSubmission ? (
                  <p className="font-mono text-sm text-accent break-all">
                    {question.selectedSubmission.toString()}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No submission selected yet.
                  </p>
                )}
              </div>

              {/* Detailed vote breakdown */}
              <div>
                <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-2">
                  Vote Breakdown
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="rounded-lg bg-card border border-border px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-mono font-bold text-lg text-foreground">
                      {totalVotes}
                    </p>
                  </div>
                  <div className="rounded-lg bg-card border border-border px-3 py-2 text-center">
                    <p className="text-xs text-chart-3">Yes</p>
                    <p className="font-mono font-bold text-lg text-chart-3">
                      {yesCount}
                    </p>
                  </div>
                  <div className="rounded-lg bg-card border border-border px-3 py-2 text-center">
                    <p className="text-xs text-destructive">No</p>
                    <p className="font-mono font-bold text-lg text-destructive">
                      {noCount}
                    </p>
                  </div>
                  <div className="rounded-lg bg-card border border-border px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Approval</p>
                    <p className="font-mono font-bold text-lg text-accent">
                      {Number(question.yesPercent)}%
                    </p>
                  </div>
                </div>

                {totalVotes > 0 && (
                  <div className="mt-3">
                    <VoteBar
                      yesPercent={question.yesPercent}
                      noPercent={question.noPercent}
                    />
                  </div>
                )}
              </div>

              {/* Full description */}
              <div>
                <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-1">
                  Full Description
                </p>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                  {question.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ code }: { code: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="history.empty_state"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
        No questions yet
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Questions raised in room{" "}
        <span className="font-mono text-accent">{code}</span> will appear here
        once members start voting.
      </p>
      <Button
        asChild
        variant="outline"
        className="mt-6"
        data-ocid="history.go_to_room_button"
      >
        <Link to="/rooms/$code" params={{ code }}>
          Go to Room
        </Link>
      </Button>
    </motion.div>
  );
}

// ─── Skeleton List ────────────────────────────────────────────────────────────

function SkeletonList() {
  return (
    <div className="space-y-3" data-ocid="history.loading_state">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-card p-5 space-y-3"
        >
          <div className="flex gap-3 items-center">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-5 w-14 rounded-full ml-auto" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoomHistoryPage() {
  const { code } = useParams({ from: "/rooms/$code/history" });
  const { data: questions, isLoading, isError } = useRoomQuestions(code);

  // Sort newest-first (by questionId descending)
  const sorted = [...(questions ?? [])].sort((a, b) =>
    a.questionId > b.questionId ? -1 : a.questionId < b.questionId ? 1 : 0,
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-ocid="history.page">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground"
          data-ocid="history.back_button"
        >
          <Link to="/rooms/$code" params={{ code }}>
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Back to room</span>
          </Link>
        </Button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-xl font-bold text-foreground">
              Question History
            </h1>
            <BarChart2 className="w-4 h-4 text-accent shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Room{" "}
            <span className="font-mono text-accent tracking-widest">
              {code}
            </span>
          </p>
        </div>

        {!isLoading && sorted.length > 0 && (
          <Badge
            variant="secondary"
            className="shrink-0 font-mono"
            data-ocid="history.count_badge"
          >
            {sorted.length}
          </Badge>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <SkeletonList />
      ) : isError ? (
        <div
          className="rounded-xl border border-destructive/40 bg-destructive/10 px-5 py-6 text-center text-sm text-destructive"
          data-ocid="history.error_state"
        >
          Failed to load questions. Please try again.
        </div>
      ) : sorted.length === 0 ? (
        <EmptyState code={code} />
      ) : (
        <div className="space-y-3">
          {sorted.map((q, i) => (
            <QuestionCard key={String(q.questionId)} question={q} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
