import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as createSlot, d as cn, e as useParams, u as useAuth, L as Link, B as Button, m as motion, C as Clock, U as Users } from "./index-Cx9npM13.js";
import { i as isVoteOpen, A as ArrowLeft, B as Badge, h as hasVotedYes, C as CircleCheck, a as hasVotedNo, b as ChevronUp, c as ChevronDown } from "./index-wo_Z7RvN.js";
import { u as ue, C as Check, a as Copy, I as Input } from "./index-z8YNTiwJ.js";
import { c as useRoom, d as useRoomQuestions, S as Skeleton, A as AnimatePresence, e as useCastVote, f as useCloseVoting, g as useRaiseQuestion } from "./useBackend-CTDXeWqJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M12 7v6", key: "lw1j43" }],
  ["path", { d: "M9 10h6", key: "9gxzsh" }]
];
const MessageSquarePlus = createLucideIcon("message-square-plus", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M17 14V2", key: "8ymqnk" }],
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }
  ]
];
const ThumbsDown = createLucideIcon("thumbs-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function truncatePrincipal(id) {
  return id.length > 10 ? `${id.slice(0, 8)}…` : id;
}
function formatCount(n) {
  return n.toString();
}
function VoteBar({ yesPercent, noPercent }) {
  const yes = Number(yesPercent);
  const no = Number(noPercent);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-2.5 w-full rounded-full overflow-hidden bg-muted",
      role: "progressbar",
      "aria-label": "Vote distribution",
      "aria-valuenow": yes,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      tabIndex: 0,
      children: [
        yes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full bg-accent",
            initial: { width: 0 },
            animate: { width: `${yes}%` },
            transition: { duration: 0.6, ease: "easeOut" }
          }
        ),
        no > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full bg-muted-foreground/40",
            initial: { width: 0 },
            animate: { width: `${no}%` },
            transition: { duration: 0.6, ease: "easeOut", delay: 0.05 }
          }
        )
      ]
    }
  );
}
function QuestionCard({
  question,
  isCreator,
  roomCode,
  myPrincipalText,
  index
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const castVote = useCastVote();
  const closeVoting = useCloseVoting();
  const open = isVoteOpen(question.status);
  const isSelected = question.selectedSubmission !== void 0 && myPrincipalText !== void 0 && question.selectedSubmission.toText() === myPrincipalText;
  function handleVote(choice) {
    castVote.mutate(
      { questionId: question.questionId, choice, roomCode },
      {
        onError: (e) => ue.error(e.message ?? "Failed to cast vote")
      }
    );
  }
  function handleClose() {
    closeVoting.mutate(
      { questionId: question.questionId, roomCode },
      {
        onSuccess: () => ue.success("Voting closed"),
        onError: (e) => ue.error(e.message ?? "Failed to close voting")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06 },
      "data-ocid": `question_list.item.${index + 1}`,
      className: "bg-card border border-border rounded-xl overflow-hidden transition-smooth hover:border-primary/40",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((v) => !v),
            className: "w-full flex items-start gap-3 p-4 text-left",
            "aria-expanded": expanded,
            "data-ocid": `question_list.item.${index + 1}.toggle`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm truncate", children: question.title }),
                  open ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "default",
                      className: "bg-accent text-accent-foreground text-[10px] shrink-0",
                      children: "OPEN"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px] shrink-0", children: "CLOSED" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }),
                    " ",
                    formatCount(question.yesCount)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3 h-3" }),
                    " ",
                    formatCount(question.noCount)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    formatCount(question.totalVotes),
                    " votes"
                  ] })
                ] })
              ] }),
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 space-y-4 border-t border-border pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: question.description }),
              question.selectedSubmission && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs bg-muted rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Selected voter:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: truncatePrincipal(question.selectedSubmission.toText()) }),
                isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-accent border-accent text-[10px]",
                    children: "You"
                  }
                )
              ] }),
              Number(question.totalVotes) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  VoteBar,
                  {
                    yesPercent: question.yesPercent,
                    noPercent: question.noPercent
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-medium", children: [
                    "Yes ",
                    formatCount(question.yesPercent),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "No ",
                    formatCount(question.noPercent),
                    "%"
                  ] })
                ] })
              ] }),
              open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: hasVotedYes(question.myVote) ? "default" : "outline",
                    className: hasVotedYes(question.myVote) ? "bg-accent text-accent-foreground hover:bg-accent/90 glow-accent" : "border-accent/50 text-accent hover:bg-accent/10 transition-smooth",
                    onClick: () => handleVote({ "#yes": null }),
                    disabled: castVote.isPending,
                    "data-ocid": `question_list.item.${index + 1}.yes_button`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Yes",
                      hasVotedYes(question.myVote) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 ml-1.5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: hasVotedNo(question.myVote) ? "secondary" : "outline",
                    className: hasVotedNo(question.myVote) ? "bg-secondary text-secondary-foreground" : "border-border text-muted-foreground hover:bg-muted transition-smooth",
                    onClick: () => handleVote({ "#no": null }),
                    disabled: castVote.isPending,
                    "data-ocid": `question_list.item.${index + 1}.no_button`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "No",
                      hasVotedNo(question.myVote) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 ml-1.5" })
                    ]
                  }
                ),
                isCreator && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "text-destructive hover:bg-destructive/10 ml-auto",
                    onClick: handleClose,
                    disabled: closeVoting.isPending,
                    "data-ocid": `question_list.item.${index + 1}.close_voting_button`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Close Voting"
                    ]
                  }
                )
              ] })
            ] })
          }
        ) })
      ]
    }
  );
}
function RaiseQuestionModal({ roomCode, onClose }) {
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const raiseQuestion = useRaiseQuestion();
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    raiseQuestion.mutate(
      { roomCode, title: title.trim(), description: description.trim() },
      {
        onSuccess: (result) => {
          if ("err" in result) {
            ue.error(result.err);
          } else {
            ue.success("Question raised! Voting is now open.");
            onClose();
          }
        },
        onError: (e2) => ue.error(e2.message ?? "Failed to raise question")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "raise_question.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative bg-card border border-border rounded-2xl shadow-elevated w-full max-w-md p-6 z-10",
            initial: { scale: 0.95, y: 16, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
            exit: { scale: 0.95, y: 16, opacity: 0 },
            transition: { duration: 0.2 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Raise a Question" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
                    "aria-label": "Close",
                    "data-ocid": "raise_question.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "question-title", className: "text-sm text-foreground", children: [
                    "Title ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "question-title",
                      placeholder: "e.g. Should we extend the deadline?",
                      value: title,
                      onChange: (e) => setTitle(e.target.value),
                      maxLength: 120,
                      required: true,
                      "data-ocid": "raise_question.title_input",
                      className: "bg-background border-input focus:ring-2 focus:ring-primary/40"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "question-desc", className: "text-sm text-foreground", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "question-desc",
                      placeholder: "Add context, options, or any details that help members decide…",
                      value: description,
                      onChange: (e) => setDescription(e.target.value),
                      rows: 4,
                      maxLength: 600,
                      "data-ocid": "raise_question.description_textarea",
                      className: "bg-background border-input focus:ring-2 focus:ring-primary/40 resize-none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground text-right", children: [
                    description.length,
                    "/600"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      onClick: onClose,
                      className: "flex-1",
                      "data-ocid": "raise_question.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: !title.trim() || raiseQuestion.isPending,
                      className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90 glow-accent",
                      "data-ocid": "raise_question.submit_button",
                      children: raiseQuestion.isPending ? "Raising…" : "Raise Question"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ActiveQuestion({
  question,
  isCreator,
  roomCode,
  myPrincipalText
}) {
  const castVote = useCastVote();
  const closeVoting = useCloseVoting();
  const isSelected = question.selectedSubmission !== void 0 && myPrincipalText !== void 0 && question.selectedSubmission.toText() === myPrincipalText;
  function handleVote(choice) {
    castVote.mutate(
      { questionId: question.questionId, choice, roomCode },
      {
        onError: (e) => ue.error(e.message ?? "Failed to cast vote"),
        onSuccess: () => ue.success("Vote cast!")
      }
    );
  }
  function handleClose() {
    closeVoting.mutate(
      { questionId: question.questionId, roomCode },
      {
        onSuccess: () => ue.success("Voting closed"),
        onError: (e) => ue.error(e.message ?? "Failed to close voting")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "bg-card border border-primary/40 rounded-2xl overflow-hidden shadow-elevated glow-primary",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      "data-ocid": "active_question.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border-b border-primary/20 px-5 py-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-semibold text-primary tracking-widest uppercase", children: "Active Vote" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-xl font-bold text-foreground leading-snug",
                "data-ocid": "active_question.title",
                children: question.title
              }
            ),
            question.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground leading-relaxed", children: question.description })
          ] }),
          question.selectedSubmission && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-muted/60 border border-border rounded-xl px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wide font-medium", children: "Randomly selected member" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-mono text-sm text-foreground truncate",
                  "data-ocid": "active_question.selected_member",
                  children: question.selectedSubmission.toText()
                }
              )
            ] }),
            isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent text-accent-foreground ml-auto shrink-0 text-xs", children: "You!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              VoteBar,
              {
                yesPercent: question.yesPercent,
                noPercent: question.noPercent
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 text-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg py-2 px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg font-display font-bold text-accent",
                    "data-ocid": "active_question.yes_count",
                    children: formatCount(question.yesCount)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Yes" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg py-2 px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg font-display font-bold text-foreground",
                    "data-ocid": "active_question.total_count",
                    children: formatCount(question.totalVotes)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Total" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg py-2 px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg font-display font-bold text-muted-foreground",
                    "data-ocid": "active_question.no_count",
                    children: formatCount(question.noCount)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "No" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: `flex-1 h-11 text-sm font-semibold transition-smooth ${hasVotedYes(question.myVote) ? "bg-accent text-accent-foreground hover:bg-accent/90 glow-accent" : "bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20"}`,
                onClick: () => handleVote({ "#yes": null }),
                disabled: castVote.isPending,
                "data-ocid": "active_question.yes_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-4 h-4 mr-2" }),
                  "Yes",
                  hasVotedYes(question.myVote) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 ml-2 opacity-80" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: `flex-1 h-11 text-sm font-semibold transition-smooth ${hasVotedNo(question.myVote) ? "bg-secondary text-secondary-foreground border border-border" : "bg-muted/50 border border-border text-muted-foreground hover:bg-muted hover:text-foreground"}`,
                onClick: () => handleVote({ "#no": null }),
                disabled: castVote.isPending,
                "data-ocid": "active_question.no_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-4 h-4 mr-2" }),
                  "No",
                  hasVotedNo(question.myVote) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 ml-2 opacity-80" })
                ]
              }
            )
          ] }),
          isCreator && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full text-destructive hover:bg-destructive/10 border border-destructive/20",
              onClick: handleClose,
              disabled: closeVoting.isPending,
              "data-ocid": "active_question.close_voting_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 mr-2" }),
                closeVoting.isPending ? "Closing…" : "Close Voting"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function RoomPage() {
  const { code } = useParams({ from: "/rooms/$code" });
  const { principal } = useAuth();
  const myPrincipalText = principal == null ? void 0 : principal.toText();
  const [copied, setCopied] = reactExports.useState(false);
  const [showRaiseModal, setShowRaiseModal] = reactExports.useState(false);
  const {
    data: room,
    isLoading: roomLoading,
    isError: roomError
  } = useRoom(code);
  const { data: questions = [], isLoading: questionsLoading } = useRoomQuestions(code);
  const isCreator = room !== void 0 && myPrincipalText !== void 0 && room.creator.toText() === myPrincipalText;
  const activeQuestion = questions.find((q) => isVoteOpen(q.status));
  const closedQuestions = questions.filter((q) => !isVoteOpen(q.status));
  const handleCopy = reactExports.useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      ue.success("Room code copied!");
      setTimeout(() => setCopied(false), 2e3);
    });
  }, [code]);
  if (roomLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6",
        "data-ocid": "room.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" })
        ]
      }
    );
  }
  if (roomError || !room) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center gap-5 text-center",
        "data-ocid": "room.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-1", children: "Room not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "No room with code",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: code }),
              " exists, or you don't have access yet."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rooms", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to My Rooms"
          ] }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6",
      "data-ocid": "room.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "bg-card border border-border rounded-2xl p-5 shadow-subtle",
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            "data-ocid": "room.header",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-widest font-mono", children: "Room Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display text-3xl font-black tracking-widest text-foreground select-all",
                        "data-ocid": "room.code_display",
                        children: code
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleCopy,
                        className: "w-8 h-8 flex items-center justify-center rounded-lg bg-muted hover:bg-secondary text-muted-foreground hover:text-foreground transition-smooth",
                        "aria-label": "Copy room code",
                        "data-ocid": "room.copy_code_button",
                        children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  isCreator && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/20 text-primary border border-primary/30 text-xs", children: "Creator" }),
                  isCreator && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 font-semibold glow-accent",
                      onClick: () => setShowRaiseModal(true),
                      "data-ocid": "room.raise_question_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquarePlus, { className: "w-4 h-4" }),
                        "Raise Question"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "sm",
                      variant: "outline",
                      className: "gap-1.5 text-muted-foreground hover:text-foreground",
                      "data-ocid": "room.view_history_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/rooms/$code/history", params: { code }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                        "View History"
                      ] })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium", children: [
                    formatCount(room.memberCount),
                    " member",
                    room.memberCount !== 1n ? "s" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", "data-ocid": "room.member_list", children: room.members.map((member, i) => {
                  const text = member.toText();
                  const isMe = text === myPrincipalText;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      title: text,
                      "data-ocid": `room.member.${i + 1}`,
                      className: `font-mono text-[11px] px-2 py-0.5 rounded-md border ${isMe ? "bg-primary/15 border-primary/30 text-primary" : "bg-muted border-border text-muted-foreground"}`,
                      children: [
                        truncatePrincipal(text),
                        isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-primary/60", children: "(you)" })
                      ]
                    },
                    text
                  );
                }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: questionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-48 w-full rounded-2xl",
            "data-ocid": "room.questions_loading_state"
          },
          "skeleton"
        ) : activeQuestion ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ActiveQuestion,
          {
            question: activeQuestion,
            isCreator,
            roomCode: code,
            myPrincipalText
          },
          "active"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "bg-muted/30 border border-dashed border-border rounded-2xl px-6 py-10 text-center",
            "data-ocid": "room.no_active_question_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquarePlus, { className: "w-6 h-6 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-semibold text-foreground mb-1", children: "No active vote" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isCreator ? "Raise a question to start a vote for this room." : "Waiting for the room creator to raise a question." }),
              isCreator && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "mt-4 bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5",
                  onClick: () => setShowRaiseModal(true),
                  "data-ocid": "room.empty_state_raise_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquarePlus, { className: "w-4 h-4" }),
                    "Raise Question"
                  ]
                }
              )
            ]
          },
          "no-active"
        ) }),
        closedQuestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "question_list.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
            "Past Questions"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: closedQuestions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuestionCard,
            {
              question: q,
              isCreator,
              roomCode: code,
              myPrincipalText,
              index: i
            },
            q.questionId.toString()
          )) })
        ] }),
        closedQuestions.length === 0 && questions.length > 0 && !activeQuestion && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "question_list.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "All Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuestionCard,
            {
              question: q,
              isCreator,
              roomCode: code,
              myPrincipalText,
              index: i
            },
            q.questionId.toString()
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showRaiseModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          RaiseQuestionModal,
          {
            roomCode: code,
            onClose: () => setShowRaiseModal(false)
          }
        ) })
      ]
    }
  );
}
export {
  RoomPage as default
};
