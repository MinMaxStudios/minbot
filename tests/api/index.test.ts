import { describe, expect, test } from "bun:test";

import { api } from "@/api";

describe("api", () => {
  describe("/lb", () => {
    describe("/points", () => {
      test("should return a list of users", async () => {
        const res = await api.fetch(new Request("http://localhost/lb/points"));
        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toBe("application/json; charset=UTF-8");

        const data = await res.json();
        expect(data).toHaveProperty("users");
        expect(data.users).toBeArray();
        expect(data.users).toContainEqual(
          {
            id: "UC7Pw1zHdjkBXY3q8mVoLdQ",
            name: "ToastedToast",
            avatar: "https://toasted.dev/logo.png",
            points: 0,
          },
        );
      });
    });
  });

  describe("/total", () => {
    test("should return the total points and messages", async () => {
      const res = await api.fetch(new Request("http://localhost/total"));
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toBe("application/json; charset=UTF-8");

      const data = await res.json();
      expect(data).toHaveProperty("points");
      expect(data.points).toBeNumber();
      expect(data).toHaveProperty("messages");
      expect(data.messages).toBeNumber();
    });
  });

  describe("/count", () => {
    test("should return the current count", async () => {
      const res = await api.fetch(new Request("http://localhost/count"));
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toBe("application/json; charset=UTF-8");
      expect(await res.json()).toEqual({
        count: 1,
      });
    });
  });
});
