export const defaultState = { markers: [] };

export function reducer(state = defaultState, action) {
  let result = {};

  switch (action.type) {
    case "addMarker":
      result = { ...state, markers: [...state.markers, action.payload] };
      break;
    default:
      result = { ...defaultState };
      break;
  }

  return result;
}
