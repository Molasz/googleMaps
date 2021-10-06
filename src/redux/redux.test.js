import { reducer } from "./reducer";

describe("Given reducer function", () => {
  const state = { markers: [] };
  describe("When addMarker action is recived", () => {
    const action = { type: "addMarker", payload: "PAYLOAD" };
    it("Then add payload to markers array in state", () => {
      const expectedState = { markers: ["PAYLOAD"] };
      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe("When different action is recived", () => {
    const action = { type: "different" };
    it("Then return same state", () => {
      state.markers = [];
      const expectedState = { markers: [] };
      expect(reducer(state, action)).toEqual(expectedState);
    });
  });
});
