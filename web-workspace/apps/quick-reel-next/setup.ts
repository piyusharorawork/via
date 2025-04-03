import { vi } from "vitest";

const localStorage = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

vi.stubGlobal("localStorage", localStorage);
vi.stubGlobal("window", { localStorage });
