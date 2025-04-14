import React, { useEffect, useState, useRef } from 'react';
import 'daterangepicker/daterangepicker.css';
import $ from 'jquery';
import 'daterangepicker';
import ApiBaseUrl from '../Api_base_url/ApiBaseUrl';

function Home() {
    const [cities, setCities] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState('');
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

            const response = await fetch(`https://liveapi-booking.liveabuzz.com/hotel/logix/v1/get/city/details/${userId}`, {
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

            const response = await fetch(`https://liveapi-booking.liveabuzz.com/hotel/logix/v1/get/hotel/details`, {
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

    return (
        <main id="main" className="main">
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">General Form Elements</h6>
                                <form>
                                    <div className="row mb-3">
                                        {/* City Dropdown */}
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
                                            <select id="hotel" className="form-select">
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
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
