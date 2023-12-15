/* eslint-disable no-undef */
describe("first test suite", () => {
  test("first case", () => {
    expect(new Date().toISOString().split("T")[0]).toBe("2023-12-15");
  });
});
