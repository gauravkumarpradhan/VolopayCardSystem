import React, { useState, useEffect, useRef } from 'react'
import './tabs-styles.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { resetFitleredDataFromModal, setFiteredDataByName, setFitleredDataFromModal, setTabType } from '../../store/actions/actions';
import Modal from '../Modal/modal';


const TABS_LIST = ['Your', 'All', 'Blocked'];

export const tabsObj = {
    YOUR: 'Your',
    ALL: 'All',
    BLOCKED: 'Blocked'
};

const Tabs = () => {

    const tabType = useSelector(state => state.account.tabType);

    const dispatch = useDispatch();

    const filterData = useSelector(state => state.account.filteredData);

    const [isOpen, setIsOpen] = useState(false);

    const [filterObjByCardType, setFilterObj] = useState({
        subscription: false,
        burner: false
    });


    const handleTabClick = (tabName) => {
        dispatch(setTabType(tabName));
    }

    const handleCloseModal = (type) => {
        if (type == 'cancel') {
            setIsOpen(false);
        }
        else {
            dispatch(setFitleredDataFromModal(filterObjByCardType));
        }
    }

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleInputForName = (event) => {
        dispatch(setFiteredDataByName(event.target.value));
    }

    useEffect(() => {
        dispatch(resetFitleredDataFromModal());
    }, [tabType]);

    useEffect(() => {
        handleCloseModal('cancel');
        setFilterObj({ subscription: false, burner: false });
    }, [filterData]);

    return (
        <div>
            <div className='tab-list'>
                {
                    TABS_LIST.map((tab, index) => {
                        return (
                            <h1
                                key={index}
                                className='tab-element'
                                style={{ borderBottom: tab == tabType ? '2px solid #FF0833' : '' }}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab}
                            </h1>
                        )
                    })
                }
            </div>
            <hr />
            <div className='search-filter-section'>
                <div className='search-section'>
                    <input type='text' className='search_input' onChange={(event) => handleInputForName(event)} />
                    <div className='search-icon'>
                        <AiOutlineSearch />
                    </div>
                </div>
                <div className='filter-section' onClick={handleOpenModal}>
                    <BsFilter />
                    <h4 className='filter-label'>Filter</h4>
                </div>
            </div>
            <Modal isOpen={isOpen} handleCloseModal={handleCloseModal} >
                <FilterForm filterObjByCardType={filterObjByCardType} setFilterObj={setFilterObj} />
            </Modal>
        </div>

    )
}

export default Tabs;

export const FilterForm = ({ setFilterObj, filterObjByCardType }) => {

    const handleFilterChange = (event) => {
        setFilterObj({ ...filterObjByCardType, [event.target.name]: event.target.checked });
    }

    return (
        <div className='filter-form'>
            <h2>Filters</h2>
            <hr />
            <div>
                <h1 className='type-label'>Type</h1>
                <div className='card_type_section'>
                    <input type="checkbox" id='subscription' name='subscription' onClick={(event) => handleFilterChange(event)} /><label htmlFor="subscription" className='subscription-label'>Subscription</label>
                    <input type="checkbox" id='burner' name='burner' onClick={(event) => handleFilterChange(event)} /><label htmlFor="subscription">Burner</label>
                </div>
            </div>
        </div>
    )
}