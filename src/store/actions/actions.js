export const setTabType = (tabType) => {
    return { type: 'setTabType', payload: tabType };
};

export const setFitleredDataFromModal = (filteredInput) => {
    return {
        type: 'setFilterDataByModal',
        payload: filteredInput
    }
};

export const resetFitleredDataFromModal = () => {
    return {
        type: 'resetFilterDataByModal'
    }
}

export const setFiteredDataByName = (name) => {
    return {
        type: 'setFiteredDataByName',
        payload: name
    }
}