export const isFetching = ({ initialState, types }) => {
    const [requestType, successType, failureType] = types
  
    let init = false;
    if (initialState) {
        init = initialState
    }
  
    return (state = init, action) => {
        switch (action.type) {
            case requestType:
                return true
            case successType:
                return false
            case failureType:
                return false
            default:
                return state
        }
    };
};
  
export const isFetched = ({ types }) => {
    const [requestType, successType] = types
  
    return (state = false, action) => {
        switch (action.type) {
            case requestType:
                return false
            case successType:
                return true
            default:
                return state
        }
    };
  };

export const errorMessage = (state = null, action) => {
    const { error } = action

    if (error) return error

    return state
};
  