import { describe, expect, it } from "vitest";
import {
  createKnowledgeDocSchema,
  updateKnowledgeDocSchema,
} from "./knowledge.types";

describe("createKnowledgeDocSchema", () => {
  it("menerima input valid dengan default type DOCUMENT", () => {
    const result = createKnowledgeDocSchema.parse({
      title: "API Documentation v2",
      workspaceId: "ws_1",
    });

    expect(result.type).toBe("DOCUMENT");
    expect(result.content).toBe("");
  });

  it("menolak judul kosong", () => {
    expect(() =>
      createKnowledgeDocSchema.parse({ title: "", workspaceId: "ws_1" }),
    ).toThrow();
  });
});

describe("updateKnowledgeDocSchema", () => {
  it("mengizinkan partial update", () => {
    const result = updateKnowledgeDocSchema.parse({ type: "GUIDE" });
    expect(result.type).toBe("GUIDE");
  });
});
