import React, {Component} from 'react';
import './styles/parameterStyles.css';

class ParameterComponent extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			dest: "",
			length: 1,
			res: null,
			disabled: true
		}
	}

	onChangeDest = (e) => {
		this.setState({
			dest: e.target.value
		}, () => {
			this.setState({
					disabled: !(this.state.dest !== "" && this.state.length > 0 && this.state.length !== null)
			})
		});
	}
	
	onChangeLength = (e) => {
		e.target.value > 0 ? this.setState({
			length: e.target.value
		}, () => {
			this.setState({
				disabled: !(this.state.dest !== "" && this.state.length > 0 && this.state.length !== null)
			})
		}) : console.log('cannot travel for negative days');
	}

	planTrip = (e) => {
		let LINK = "https://xenown.api.stdlib.com/plan-trip@0.0.5/?destination=" + this.state.dest + "&days=" + this.state.length;
		fetch(LINK, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-type": "application/json"
			}
		}).then((res) => {
			res.json().then((data) => {
				this.setState({
					res: data
				})
				this.props.callBack(data.topChoices, data.hotel);
				console.log(data);
				console.log("Complete");
			})
		});
	}

	render() {
		return(
			<div className='parameter-component'>
				<div className="container">
					<div className="row">
						<div className="col-10">
							<div className="row">
								{/* <div className='location-component'>
									<LocationField/>  
								</div> */}
								<div className="input-group mb-3">
										<div className="input-group-prepend">
										<span className="input-group-text">Destination</span>
										</div>
										<input type="text" className="form-control" onChange={this.onChangeDest} value={this.state.dest}/>
								</div>
							</div>
							<div className="row">
							<div className="input-group mb-3">
										<div className="input-group-prepend">
										<span className="input-group-text">Length of Trip (Days)</span>
										</div>
										<input type="number" className="form-control" onChange={this.onChangeLength} value={this.state.length}></input>
								</div>
							</div>
						</div>
						<div className="col-2">
							<button className={`btn btn-success ${this.state.disabled ? "disabled" : ""}`} align='center' onClick={this.planTrip}>Plan!</button>
						</div>
					</div>
					{this.state.res !== null ?
						<div className="row"> 
							<div className="col">
								<div className="row">
									<div className="ex1 card hotel">
											<div className="container">
												<h5>{this.state.res.hotel.name}</h5>
												<h5>{this.state.res.hotel.address}</h5>
											</div>
									</div>
								</div>
								
								{/* <div className="row"> */}
									<div className='row scrollbox'>
										{this.state.res.topChoices.map(
											(choice, i) => (
											<div className="ex1 card" key={i}>
												<div className="container">
														<h5>{choice.name}</h5>
														{choice.address}
														<br/>
														Rating: {choice.rating}/5
												</div>
											</div>
											)
										)}
									</div>
								{/* </div> */}
							</div>
						</div>
						: <div className="row"></div>
					}
					<div className="row">
						<button className='btn btn-success add-new-button' >Add new item</button>
					</div>
				</div>
				<br/>
				
			</div>
		);
	}
}

export default ParameterComponent;
