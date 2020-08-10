import React, { Component, useState, useEffect } from 'react';
import './style.css';
import { IonRow, IonCol, IonLabel, IonSelectOption, IonSelect, IonIcon, IonButton } from '@ionic/react';
import { filterSharp } from 'ionicons/icons';
import CatApi from '../../service/CatApi';



const Filters: React.FC = () => {

	const [categorys, setCategorys] = useState([{
		id: "",
		name: ""
	}])

	const [breeds, setBreeds] = useState([{
		id: 0,
		name: ""
	}])

	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		const api = new CatApi();

		setCategorys(await api.ListCategory())

		setBreeds(await api.ListBreeds())
	}
	const [filterOpen, setFilterOpen] = useState(false)

	const changeFilter = () => {
		setFilterOpen(!filterOpen)
	}

	return (
		<div className={"filterBody "+ 
                                (filterOpen
				? 'filterOpen'
				: null)
		}>
			<IonRow>

				<IonCol>
					<IonLabel>Type</IonLabel>
					<IonSelect className="select" value=""  >
						<IonSelectOption value="">All</IonSelectOption>
						<IonSelectOption value="gif">Animate</IonSelectOption>
						<IonSelectOption value="[jpg,png,jpeg]">Static</IonSelectOption>
					</IonSelect>

				</IonCol>
				<IonCol>
					<IonLabel>Category</IonLabel>
					<IonSelect className="select" value="" >
						<IonSelectOption value="">All</IonSelectOption>
						{categorys.map(category => (
							<IonSelectOption value={category.id}>{category.name}</IonSelectOption>
						))}
					</IonSelect>

				</IonCol>
			</IonRow>
			<IonRow>

				<IonCol>
					<IonLabel>Bread</IonLabel>
					<IonSelect className="select" value="" >
						<IonSelectOption value="">All</IonSelectOption>
						{breeds.map(breeds => (
							<IonSelectOption value={breeds.id}>{breeds.name}</IonSelectOption>
						))}
					</IonSelect>

				</IonCol>
			</IonRow>
			<IonButton expand="full">Update filters</IonButton>
			<div onClick={changeFilter} className="filterIcon">
				<div>
					<IonIcon icon={filterSharp}></IonIcon>
				</div>
			</div>
		</div>
	)
}
export default Filters