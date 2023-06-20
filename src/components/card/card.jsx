import React, { useEffect, useState } from 'react'
import './card-styles.css';
import { BiRefresh } from 'react-icons/bi';
import { BsFire } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Card = () => {

	const tabType = useSelector(state => state.account.tabType);
	const data = useSelector(state => state.account.data);
	const filterData = useSelector(state => state.account.filteredData);
	const name = useSelector(state => state.account.filterByName);
	const owner_id = useSelector(state => state.account.owner_id);
	let reqData = filterData.length > 0 ? filterData : data[tabType];
	const [paginationObj, setPaginationObj] = useState({ paginatedData: [], page: 1, limit: 10 });

	const showCard = (cardInfo) => {
		if (cardInfo.owner_id == owner_id) {
			if (name.length <= 0) {
				return true;
			}
			else {
				if (name.toLowerCase() == cardInfo.name.toLowerCase()) {
					return true;
				}
				else {
					return false;
				}
			}
		}
		else {
			return false;
		}

	}


	const handlePagination = (tabType) => {
		let { page, limit } = paginationObj;
		if (typeof tabType == "string") {
			page = 1;
			limit = 10;
			paginationObj.paginatedData = [];
		}
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		let newData = [];
		if (reqData.length > endIndex) {
			newData = reqData.slice(startIndex, endIndex);
		} else {
			if (reqData.length - startIndex > 0) {
				newData = reqData.slice(startIndex, (startIndex + reqData.length - startIndex));
			}
		}
		setPaginationObj({ ...paginationObj, paginatedData: [...paginationObj.paginatedData, ...newData], page: page + 1 });
	};

	useEffect(() => {
		setPaginationObj({ paginatedData: [], page: 1, limit: 10 });
		handlePagination(tabType);
	}, [tabType]);

	useEffect(() => {
		handlePagination();
	}, []);


	return (
		<div className='main-container'>
			<div className='sub-section'>
				{
					paginationObj.paginatedData.map((cardInfo, index) => {
						return (
							showCard(cardInfo) && <div className='card-section' key={index}>
								<div className='upper-section'>
									<div className='basic-info-section'>
										<div className='names-section'>
											<h4>{cardInfo.name}</h4>
										</div>
										<div className='card-type'>
											<h5>{cardInfo.budget_name}</h5>
										</div>
									</div>
									<Icon cardType={cardInfo.card_type} />
								</div>


								<div className='counts-section'>

									{cardInfo.expiry && cardInfo.card_type == 'burner' && <StatsSection statsLabel={'Expiry'} value={cardInfo.expiry} />}
									{cardInfo.limit && cardInfo.card_type == 'subscription' && <StatsSection statsLabel={'Limit'} value={cardInfo.limit} />}

								</div>
								<div className='conclusion-section'>
									<ExpenditureSection expenditureType={'Spend'} value={cardInfo.spent.value} currency={cardInfo.spent.currency} />
									<ExpenditureSection expenditureType={'Balance'} value={cardInfo.available_to_spend.value} currency={cardInfo.available_to_spend.currency} />
								</div>
							</div>
						)
					})
				}
			</div>

			<div className='load-more-section'>
				<button className='load-more-btn' onClick={handlePagination}>Load More</button>
			</div>
		</div>
	)
}

export default Card;

const Icon = ({ cardType }) => {
	return (
		<div className='icon-container' style={{ background: cardType === 'burner' ? '#FFD68A' : '#ffc0cb' }}>
			{
				cardType == 'burner' ? (
					<BsFire size='15px' color='#F05B06' />
				) : (
					<BiRefresh className='icon' size='30px' />
				)

			}
		</div >
	)
};

const ExpenditureSection = ({ expenditureType, value, currency }) => {
	return (
		<div className='expenditure-section'>
			<div className='expenditure-title-section'>
				<div
					style={
						{
							width: '10px',
							height: '10px', borderRadius: '50%',
							background: expenditureType == 'Spend' ? '#ff647f' : '#00d100',
							marginRight: '8px'
						}}>

				</div>
				<div>
					{expenditureType}
				</div>
			</div>
			<div>
				{value + currency}
			</div>
		</div >
	)
}

const StatsSection = ({ statsLabel, value }) => {
	return (
		<div className='counts-stats'>
			<h5 className='counts-title'>{statsLabel}</h5>
			<h5 className='counts-number'>{value}</h5>
		</div>
	)
}