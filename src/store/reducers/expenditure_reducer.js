import { data1 } from "../../db";

export const accountReducer = (state = { tabType: 'Your', data: data1, filteredData: [], filterByName: "" }, action) => {
    let newState = {};
    const data = state.filteredData.length > 0 ? state.filteredData : state.data[state.tabType];
    switch (action.type) {
        case 'setTabType':
            newState = { ...state, tabType: action.payload };
            break;
        case 'filter':
            break;

        case 'setFilterDataByModal':
            const filteredData = data.filter((card) => (action.payload.subscription && card.card_type == 'subscription') || (action.payload.burner && card.card_type == 'burner'))
            newState = { ...state, filteredData };
            break;

        case 'resetFilterDataByModal':
            newState = { ...state, filteredData: [] };
            break;

        case 'setFiteredDataByName':
            newState = { ...state, filterByName: action.payload };
            break;

        default:
            return state;
    }
    return newState;
};

