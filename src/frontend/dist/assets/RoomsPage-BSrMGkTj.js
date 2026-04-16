import { c as createLucideIcon, u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, U as Users } from "./index-Cx9npM13.js";
import { I as Input, u as ue, C as Check, a as Copy } from "./index-z8YNTiwJ.js";
import { u as useMyRooms, a as useCreateRoom, b as useJoinRoom, A as AnimatePresence, S as Skeleton } from "./useBackend-CTDXeWqJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
];
const DoorOpen = createLucideIcon("door-open", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function RoomCodeBadge({ code }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      ue.success("Room code copied!");
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border hover:border-accent/50 transition-smooth group",
      "aria-label": `Copy room code ${code}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground tracking-widest", children: code }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground group-hover:text-accent transition-smooth", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }) })
      ]
    }
  );
}
function RoomCard({
  room,
  isCreator,
  index
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.07, ease: "easeOut" },
      className: "group relative",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/rooms/$code", params: { code: room.code } }),
          className: "w-full text-left block",
          "data-ocid": `rooms.item.${index + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl border border-border bg-card hover:border-accent/40 hover:bg-card/80 transition-smooth shadow-subtle hover:shadow-elevated cursor-pointer", children: [
            isCreator && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/80 via-accent to-accent/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCodeBadge, { code: room.code }),
                  isCreator && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-semibold border border-accent/25", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" }),
                    "Creator"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      Number(room.memberCount),
                      " member",
                      Number(room.memberCount) !== 1 ? "s" : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: new Date(
                    Number(room.createdAt) / 1e6
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted/60 group-hover:bg-accent/15 group-hover:text-accent text-muted-foreground transition-smooth mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-0.5 transition-smooth" }) })
            ] }) })
          ] })
        }
      )
    }
  );
}
function NewRoomBanner({
  code,
  onDismiss
}) {
  const navigate = useNavigate();
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95, y: -10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: -10 },
      transition: { duration: 0.3, ease: "easeOut" },
      className: "relative overflow-hidden rounded-xl border border-accent/40 bg-card shadow-elevated",
      "data-ocid": "rooms.new_room_banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/5 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/80 to-primary/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-semibold uppercase tracking-wider mb-1", children: "Room Created!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Share this code with others to invite them:" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background/60 border border-border backdrop-blur-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-4 h-4 text-accent shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-bold text-foreground tracking-[0.2em]", children: code })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: handleCopy,
                  className: "gap-1.5 border-accent/30 hover:border-accent hover:bg-accent/10 hover:text-accent transition-smooth",
                  "data-ocid": "rooms.copy_room_code_button",
                  children: [
                    copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                    copied ? "Copied!" : "Copy"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => navigate({ to: "/rooms/$code", params: { code } }),
                  className: "gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
                  "data-ocid": "rooms.go_to_room_button",
                  children: [
                    "Enter Room",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onDismiss,
              className: "absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-smooth text-xs",
              "aria-label": "Dismiss",
              "data-ocid": "rooms.dismiss_banner_button",
              children: "✕"
            }
          )
        ] })
      ]
    }
  );
}
function EmptyState({ onCreateRoom }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center justify-center py-20 text-center",
      "data-ocid": "rooms.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mb-5 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DoorOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-2", children: "No rooms yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-6", children: "Create a room to start raising questions, or join one with a code from a friend." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onCreateRoom,
            className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
            "data-ocid": "rooms.empty_create_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Create your first room"
            ]
          }
        )
      ]
    }
  );
}
function RoomCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-xl border border-border bg-card p-5",
      "data-ocid": "rooms.loading_state",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28 rounded-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full shrink-0" })
      ] })
    }
  );
}
function RoomsPage() {
  const { principal } = useAuth();
  const { data: rooms, isLoading } = useMyRooms();
  const createRoom = useCreateRoom();
  const joinRoom = useJoinRoom();
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = reactExports.useState("");
  const [newRoomCode, setNewRoomCode] = reactExports.useState(null);
  const [joinError, setJoinError] = reactExports.useState(null);
  const myPrincipalText = (principal == null ? void 0 : principal.toText()) ?? "";
  const handleCreate = async () => {
    try {
      const room = await createRoom.mutateAsync();
      setNewRoomCode(room.code);
      ue.success("Room created!");
    } catch {
      ue.error("Failed to create room. Please try again.");
    }
  };
  const handleJoin = async (e) => {
    e.preventDefault();
    const trimmed = joinCode.trim().toUpperCase();
    if (!trimmed) return;
    setJoinError(null);
    try {
      const room = await joinRoom.mutateAsync(trimmed);
      if (room) {
        ue.success(`Joined room ${room.code}!`);
        navigate({ to: "/rooms/$code", params: { code: room.code } });
      } else {
        setJoinError("Room not found. Double-check the code and try again.");
      }
    } catch {
      setJoinError("Could not join room. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight", children: "My Rooms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Create or join a room to start raising questions and voting." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: newRoomCode && /* @__PURE__ */ jsxRuntimeExports.jsx(
      NewRoomBanner,
      {
        code: newRoomCode,
        onDismiss: () => setNewRoomCode(null)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, delay: 0.05 },
        className: "grid sm:grid-cols-2 gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Create a Room" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Get a unique code to share with others." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleCreate,
                disabled: createRoom.isPending,
                className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth w-full font-semibold",
                "data-ocid": "rooms.create_room_button",
                children: [
                  createRoom.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-accent-foreground border-t-transparent animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  createRoom.isPending ? "Creating…" : "Create Room"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Join a Room" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Enter a code to join an existing room." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleJoin, className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: joinCode,
                    onChange: (e) => {
                      setJoinCode(e.target.value.toUpperCase());
                      setJoinError(null);
                    },
                    placeholder: "e.g. ABC123",
                    maxLength: 10,
                    className: "font-mono tracking-widest uppercase placeholder:normal-case placeholder:tracking-normal flex-1 bg-background border-input focus:border-accent transition-smooth",
                    "data-ocid": "rooms.join_code_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: joinRoom.isPending || !joinCode.trim(),
                    variant: "outline",
                    className: "border-border hover:border-accent hover:bg-accent/10 hover:text-accent transition-smooth shrink-0",
                    "data-ocid": "rooms.join_room_button",
                    children: joinRoom.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: joinError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  exit: { opacity: 0, height: 0 },
                  className: "text-xs text-destructive",
                  "data-ocid": "rooms.join_error_state",
                  children: joinError
                }
              ) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base mb-4", children: isLoading ? "Loading rooms…" : rooms && rooms.length > 0 ? `${rooms.length} Room${rooms.length !== 1 ? "s" : ""}` : "Your Rooms" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCardSkeleton, {}, i)) }) : rooms && rooms.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "rooms.list", children: rooms.map((room, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        RoomCard,
        {
          room,
          isCreator: room.creator.toText() === myPrincipalText,
          index: i
        },
        room.code
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { onCreateRoom: handleCreate })
    ] })
  ] });
}
export {
  RoomsPage as default
};
