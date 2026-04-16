import { c as createLucideIcon, e as useParams, j as jsxRuntimeExports, B as Button, L as Link, m as motion, r as reactExports, C as Clock, U as Users } from "./index-Cx9npM13.js";
import { A as ArrowLeft, B as Badge, i as isVoteOpen, d as isVoteClosed, C as CircleCheck, b as ChevronUp, c as ChevronDown } from "./index-wo_Z7RvN.js";
import { d as useRoomQuestions, S as Skeleton, A as AnimatePresence } from "./useBackend-CTDXeWqJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode);
function formatTimestamp(id) {
  const ms = Number(id / 1000000n);
  if (ms > 16e11) {
    return new Date(ms).toLocaleString(void 0, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }
  return `Question #${String(id)}`;
}
function VoteBar({
  yesPercent,
  noPercent
}) {
  const yes = Number(yesPercent);
  const no = Number(noPercent);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-chart-3 w-8 text-right", children: [
      yes,
      "%"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full transition-smooth",
        style: { width: `${yes}%`, background: "oklch(var(--chart-3))" }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-destructive w-8", children: [
      no,
      "%"
    ] })
  ] });
}
function QuestionCard({
  question,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const open = isVoteOpen(question.status);
  const closed = isVoteClosed(question.status);
  const yesCount = Number(question.yesCount);
  const noCount = Number(question.noCount);
  const totalVotes = Number(question.totalVotes);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06, duration: 0.35 },
      "data-ocid": `history.item.${index + 1}`,
      className: "rounded-xl border border-border bg-card shadow-subtle overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((v) => !v),
            className: "w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-muted/30 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "aria-expanded": expanded,
            "data-ocid": `history.toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 shrink-0", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-chart-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base truncate", children: question.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: open ? "outline" : "secondary",
                      className: open ? "border-accent/60 text-accent bg-accent/10 text-xs" : "bg-chart-3/15 text-chart-3 border-chart-3/30 text-xs",
                      "data-ocid": `history.status.${index + 1}`,
                      children: open ? "Open" : "Closed"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 line-clamp-2", children: question.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-sm flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: totalVotes }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "votes" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-chart-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: yesCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "yes" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-destructive", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: noCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "no" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: formatTimestamp(question.questionId) })
                ] }),
                closed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  VoteBar,
                  {
                    yesPercent: question.yesPercent,
                    noPercent: question.noPercent
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 text-muted-foreground mt-0.5", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-5 pb-5 pt-1 border-t border-border bg-muted/20 space-y-4",
                "data-ocid": `history.detail.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display uppercase tracking-wider text-muted-foreground mb-1", children: "Selected Submission" }),
                    question.selectedSubmission ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-accent break-all", children: question.selectedSubmission.toString() }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No submission selected yet." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display uppercase tracking-wider text-muted-foreground mb-2", children: "Vote Breakdown" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border border-border px-3 py-2 text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-lg text-foreground", children: totalVotes })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border border-border px-3 py-2 text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-chart-3", children: "Yes" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-lg text-chart-3", children: yesCount })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border border-border px-3 py-2 text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "No" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-lg text-destructive", children: noCount })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border border-border px-3 py-2 text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Approval" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-lg text-accent", children: [
                          Number(question.yesPercent),
                          "%"
                        ] })
                      ] })
                    ] }),
                    totalVotes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      VoteBar,
                      {
                        yesPercent: question.yesPercent,
                        noPercent: question.noPercent
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display uppercase tracking-wider text-muted-foreground mb-1", children: "Full Description" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words", children: question.description })
                  ] })
                ]
              }
            )
          },
          "details"
        ) })
      ]
    }
  );
}
function EmptyState({ code }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center justify-center py-20 text-center",
      "data-ocid": "history.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "No questions yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-xs", children: [
          "Questions raised in room",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-accent", children: code }),
          " will appear here once members start voting."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "mt-6",
            "data-ocid": "history.go_to_room_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rooms/$code", params: { code }, children: "Go to Room" })
          }
        )
      ]
    }
  );
}
function SkeletonList() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "history.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card p-5 space-y-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-5 h-5 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full ml-auto" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
        ] })
      ]
    },
    i
  )) });
}
function RoomHistoryPage() {
  const { code } = useParams({ from: "/rooms/$code/history" });
  const { data: questions, isLoading, isError } = useRoomQuestions(code);
  const sorted = [...questions ?? []].sort(
    (a, b) => a.questionId > b.questionId ? -1 : a.questionId < b.questionId ? 1 : 0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", "data-ocid": "history.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          size: "icon",
          className: "shrink-0 text-muted-foreground hover:text-foreground",
          "data-ocid": "history.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/rooms/$code", params: { code }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Back to room" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Question History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-accent shrink-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          "Room",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-accent tracking-widest", children: code })
        ] })
      ] }),
      !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "secondary",
          className: "shrink-0 font-mono",
          "data-ocid": "history.count_badge",
          children: sorted.length
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonList, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl border border-destructive/40 bg-destructive/10 px-5 py-6 text-center text-sm text-destructive",
        "data-ocid": "history.error_state",
        children: "Failed to load questions. Please try again."
      }
    ) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { code }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sorted.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionCard, { question: q, index: i }, String(q.questionId))) })
  ] });
}
export {
  RoomHistoryPage as default
};
