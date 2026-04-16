import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

// Lazy-loaded pages (written by subsequent agents)
const RoomsPage = lazy(() => import("./pages/RoomsPage"));
const RoomPage = lazy(() => import("./pages/RoomPage"));
const RoomHistoryPage = lazy(() => import("./pages/RoomHistoryPage"));

// ─── Page suspense wrapper ──────────────────────────────────────────────────
function PageFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

// ─── Root layout route ──────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// ─── Routes ─────────────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const roomsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rooms",
  component: () => (
    <ProtectedRoute>
      <RoomsPage />
    </ProtectedRoute>
  ),
});

const roomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rooms/$code",
  component: () => (
    <ProtectedRoute>
      <RoomPage />
    </ProtectedRoute>
  ),
});

const roomHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rooms/$code/history",
  component: () => (
    <ProtectedRoute>
      <RoomHistoryPage />
    </ProtectedRoute>
  ),
});

// ─── Router ──────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  roomsRoute,
  roomRoute,
  roomHistoryRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
