export default function (state = [], action) {
  switch (action.type) {
    case 'SEARCH_TRIP':
      return action.payload;
  }
  return state;
}
