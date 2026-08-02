import { describe, expect, it } from "vitest";
import { createTaskSchema, updateTaskSchema } from "./task.types";

describe("createTaskSchema", () => {
  it("menerima input valid dengan default priority MEDIUM", () => {
    const result = createTaskSchema.parse({
      title: "Implement authentication",
      workspaceId: "ws_1",
    });

    expect(result.priority).toBe("MEDIUM");
  });

  it("menolak title kosong", () => {
    expect(() =>
      createTaskSchema.parse({ title: "", workspaceId: "ws_1" })
    ).toThrow();
  });
});

describe("updateTaskSchema", () => {
  it("mengizinkan partial update", () => {
    const result = updateTaskSchema.parse({ status: "DONE" });
    expect(result.status).toBe("DONE");
  });
});
