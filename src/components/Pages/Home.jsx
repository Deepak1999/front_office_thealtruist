import React, { useEffect, useState, useRef } from 'react';
import 'daterangepicker/daterangepicker.css';
import $ from 'jquery';
import 'daterangepicker';
import TableData from '../TableData/TableData';
import { ApiBaseUrlNew } from '../Api_base_url/ApiBaseUrl';

function Home() {
    const [cities, setCities] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState('');
    const [selectedHotelId, setSelectedHotelId] = useState('');
    const [bookingData, setBookingData] = useState([]);
    const [arrivalsBookingData, setArrivalsBookingData] = useState([]);
    const [noShowBookingData, setNoShowBookingData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const hasFetchedCities = useRef(false);

    useEffect(() => {
        $('#dateRange').daterangepicker({
            opens: 'left',
            locale: {
                format: 'YYYY-MM-DD'
            }
        });
    }, []);

    useEffect(() => {
        if (hasFetchedCities.current) return;
        hasFetchedCities.current = true;
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const userId = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            const source = localStorage.getItem('source');

            if (!userId || !token || !source) {
                console.error('Missing credentials in localStorage');
                return;
            }

            const response = await fetch(`${ApiBaseUrlNew}/hotel/logix/v1/get/city/details/${userId}`, {
                method: 'GET',
                headers: {
                    'jwttoken': token,
                    'source': source
                }
            });

            if (!response.ok) throw new Error('Failed to fetch cities');

            const data = await response.json();
            setCities(data.locationMaster || []);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const fetchHotels = async (cityName) => {
        try {
            const token = localStorage.getItem('token');
            const source = localStorage.getItem('source');
            const Id = localStorage.getItem('id');

            const response = await fetch(`${ApiBaseUrlNew}/hotel/logix/v1/get/hotel/details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                    'source': source,
                    'adminuserid': Id,
                },
                body: JSON.stringify({ city: cityName })
            });

            if (!response.ok) throw new Error('Failed to fetch hotels');

            const data = await response.json();
            setHotels(data.locationMaster || []);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const uniqueCities = Array.from(
        new Map(cities.map(city => [city.cityId, city])).values()
    );

    const handleCityChange = (e) => {
        const cityId = e.target.value;
        setSelectedCityId(cityId);

        const selectedCity = uniqueCities.find(city => city.cityId.toString() === cityId);
        if (selectedCity) {
            fetchHotels(selectedCity.city);
        } else {
            setHotels([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dateRange = $('#dateRange').val();
        const [strDate, endDate] = dateRange.split(' - ');

        const token = localStorage.getItem('token');
        const adminuserid = localStorage.getItem('id');
        const source = localStorage.getItem('source');

        if (!strDate || !endDate || !selectedHotelId) {
            alert('Please select all fields');
            return;
        }

        setStartDate(strDate);
        setEndDate(endDate);

        try {

            const bookingResponse = await fetch(`${ApiBaseUrlNew}/hotel/logix/v1/find/cust/booking/details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                    'adminuserid': adminuserid,
                    'source': source
                },
                body: JSON.stringify({
                    strDate,
                    endDate,
                    locationId: selectedHotelId
                })
            });

            const bookingData = await bookingResponse.json();
            setBookingData(bookingData.altruistUserContacts || []);

            const arrivalsResponse = await fetch(`${ApiBaseUrlNew}/v2/get-all/The/Altruist/Guest/Details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                    'adminuserid': adminuserid,
                    'source': source
                },
                body: JSON.stringify({
                    startDate: strDate,
                    endDate,
                    location: selectedHotelId
                })
            });

            const arrivalsData = await arrivalsResponse.json();
            setArrivalsBookingData(arrivalsData.altruistPosExcelDatas || []);

            const noShowResponse = await fetch(`${ApiBaseUrlNew}/hotel/logix/v2/get-no-show/The/Altruist/Guest/Details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwttoken': token,
                    'adminuserid': adminuserid,
                    'source': source
                },
                body: JSON.stringify({
                    startDate: strDate,
                    endDate,
                    location: selectedHotelId
                })
            });

            const noShowData = await noShowResponse.json();
            setNoShowBookingData(noShowData.altruistPosExcelDatas || []);

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const handleReset = () => {
        setSelectedCityId('');
        setHotels([]);
        setSelectedHotelId('');
        setBookingData([]);
        setStartDate('');
        setEndDate('');

        $('#dateRange').val('');
        $('#dateRange').data('daterangepicker').setStartDate('');
        $('#dateRange').data('daterangepicker').setEndDate('');
    };

    return (
        <main id="main" className="main">
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">General Form Elements</h6>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <select
                                                id="city"
                                                className="form-select"
                                                value={selectedCityId}
                                                onChange={handleCityChange}
                                            >
                                                <option value="">Select City</option>
                                                {uniqueCities.map(city => (
                                                    <option key={city.cityId} value={city.cityId}>
                                                        {city.city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="hotel" className="form-label">Hotel Name</label>
                                            <select
                                                id="hotel"
                                                className="form-select"
                                                value={selectedHotelId}
                                                onChange={(e) => setSelectedHotelId(e.target.value)}
                                            >
                                                <option value="">Select Hotel</option>
                                                {hotels.map(hotel => (
                                                    <option key={hotel.id} value={hotel.id}>
                                                        {hotel.hotelName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="dateRange" className="form-label">Date Range</label>
                                            <input
                                                id="dateRange"
                                                className="form-control"
                                                type="text"
                                                placeholder="Select date range"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col text-center">
                                            <button type="submit" className="btn btn-primary me-3">Submit</button>
                                            <button type="reset" onClick={handleReset} className="btn btn-secondary">Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <TableData
                            uploadedData={bookingData}
                            arrivalsData={arrivalsBookingData}
                            noShowData={noShowBookingData}
                        />

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
