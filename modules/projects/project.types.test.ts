import { describe, expect, it } from "vitest";
import { createProjectSchema, updateProjectSchema } from "./project.types";

describe("createProjectSchema", () => {
  it("menerima input valid", () => {
    const result = createProjectSchema.parse({
      name: "Website Revamp",
      workspaceId: "ws_1",
    });

    expect(result.name).toBe("Website Revamp");
  });

  it("menolak nama kosong", () => {
    expect(() =>
      createProjectSchema.parse({ name: "", workspaceId: "ws_1" })
    ).toThrow();
  });
});

describe("updateProjectSchema", () => {
  it("menolak progress di luar 0-100", () => {
    expect(() => updateProjectSchema.parse({ progress: 150 })).toThrow();
  });

  it("menerima progress valid", () => {
    const result = updateProjectSchema.parse({ progress: 60, status: "IN_PROGRESS" });
    expect(result.progress).toBe(60);
  });
});
