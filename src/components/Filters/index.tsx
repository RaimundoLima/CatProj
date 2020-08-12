import React, { Component, useState, useEffect } from 'react';
import './style.css';
import { IonRow, IonCol, IonLabel, IonSelectOption, IonSelect, IonIcon, IonButton } from '@ionic/react';
import { filterSharp } from 'ionicons/icons';
import CatApi from '../../service/CatApi';



const Filters: React.FC<{ setter: Function }> = (props) => {

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


	const[filterCategory,setFilterCategory]=useState("")
	const[filterBreed,setFilterBreed]=useState("")
	const[filterType,setFilterType]=useState("")

	const updateFilters = () => {
		props.setter({
			category: filterCategory,
			breed: filterBreed,
			type: filterType
		})
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
					<IonSelect onIonChange={(e) => { setFilterType(e.detail.value) }} className="select" value={filterType}  >
						<IonSelectOption value="">All</IonSelectOption>
						<IonSelectOption value="gif">Animate</IonSelectOption>
						<IonSelectOption value="jpg,png,jpeg">Static</IonSelectOption>
					</IonSelect>

				</IonCol>
				<IonCol>
					<IonLabel>Category</IonLabel>
					<IonSelect onIonChange={(e) => { setFilterCategory(e.detail.value) }} className="select" value={filterCategory} >
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
					<IonSelect onIonChange={(e) => { setFilterBreed(e.detail.value) }} className="select" value={filterBreed} >
						<IonSelectOption value="">All</IonSelectOption>
						{breeds.map(breeds => (
							<IonSelectOption value={breeds.id}>{breeds.name}</IonSelectOption>
						))}
					</IonSelect>

				</IonCol>
			</IonRow>
			<IonButton onClick={updateFilters} expand="full">Update filters</IonButton>

			<div onClick={changeFilter} className="filterIcon">
				<div>
					<IonIcon icon={filterSharp}></IonIcon>
				</div>
			</div>
		</div>
	)
}
export default Filters