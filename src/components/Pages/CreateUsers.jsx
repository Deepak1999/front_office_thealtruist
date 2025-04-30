import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { ApiBaseUrl, ApiBaseUrlNew } from '../Api_base_url/ApiBaseUrl';

function CreateUsers() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [cities, setCities] = useState([]);

    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        employeeName: '',
        location: '',
        roleName: ''
    });

    const fetchUsers = async () => {
        const authToken = localStorage.getItem('token');
        const adminId = localStorage.getItem('id');
        const source = localStorage.getItem('source');

        try {
            const response = await fetch(`${ApiBaseUrl}/abuzz-admin/web/v1/fetch/created-users`, {
                method: 'GET',
                headers: {
                    'Authorization': authToken,
                    'adminId': adminId,
                    'source': source
                }
            });

            const data = await response.json();
            const { statusDescription } = data;
            if (statusDescription) {
                const { statusCode, statusMessage } = statusDescription;
                if (statusCode === 450) {
                    setStatusMessage(statusMessage);
                    setUserData([]);
                    setLoading(false);
                    return;
                } else if (statusCode === 200) {
                    if (data.response && Array.isArray(data.response)) {
                        setUserData(data.response);
                    } else {
                        setError('Invalid data format received from API');
                    }
                } else {
                    setError(statusMessage || 'Unexpected error occurred');
                }
            } else {
                setError('Invalid response structure');
            }

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

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

    const uniqueCities = cities.filter(
        (city, index, self) =>
            index === self.findIndex((c) => c.city === city.city)
    );

    useEffect(() => {
        fetchUsers();
        fetchCities();
    }, []);

    const columns = React.useMemo(() => [
        { Header: 'User Name', accessor: 'userName' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Location ID', accessor: 'locationId' },
        { Header: 'Date/Time', accessor: 'dateTime' },
        { Header: 'Employee Name', accessor: 'employeeName' },
        { Header: 'Is Active', accessor: row => (row.isActive ? 'Yes' : 'No'), id: 'isActive' },
        { Header: 'Role ID', accessor: 'roleId' },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: userData,
            initialState: { pageIndex: 0, pageSize: 3 },
        },
        usePagination
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data: ", formData);

        setFormData({
            userName: '',
            password: '',
            employeeName: '',
            location: '',
            roleName: ''
        });
    };

    return (
        <main id="main" className="main">
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12">
                        {/* Create User Form */}
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Create User</h5>
                                    <form className="row g-3" onSubmit={handleSubmit}>
                                        <div className="col-md-4">
                                            <label htmlFor="userName" className="form-label">User Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userName"
                                                name="userName"
                                                value={formData.userName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="employeeName" className="form-label">Employee Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="employeeName"
                                                name="employeeName"
                                                value={formData.employeeName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="roleName" className="form-label">Role</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="roleName"
                                                name="roleName"
                                                value={formData.roleName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <select
                                                id="location"
                                                name="location"
                                                className="form-select"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select City</option>
                                                {uniqueCities.map((city) => (
                                                    <option key={city.id} value={city.id}>
                                                        {city.city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col text-center">
                                            <button type="submit" className="btn btn-primary me-3">Submit</button>
                                            <button
                                                type="reset"
                                                className="btn btn-secondary"
                                                onClick={() => setFormData({ userName: '', password: '', employeeName: '', location: '', roleName: '' })}
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Created Users List</h5>

                                    {loading && <div>Loading...</div>}
                                    {error && <div className="text-danger">Error: {error}</div>}
                                    {statusMessage && <div className="text-warning">{statusMessage}</div>}

                                    {!loading && !error && !statusMessage && (
                                        <div className="table-responsive">
                                            <table {...getTableProps()} className="table table-striped">
                                                <thead>
                                                    {headerGroups.map(headerGroup => (
                                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                                            {headerGroup.headers.map(column => (
                                                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </thead>
                                                <tbody {...getTableBodyProps()}>
                                                    {page.map((row, i) => {
                                                        prepareRow(row);
                                                        return (
                                                            <tr {...row.getRowProps()} key={i}>
                                                                {row.cells.map(cell => (
                                                                    <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
                                                                ))}
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>

                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <button className="btn btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                                    Previous
                                                </button>
                                                <span>Page {pageIndex + 1} of {pageOptions.length}</span>
                                                <button className="btn btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
                                                    Next
                                                </button>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default CreateUsers;