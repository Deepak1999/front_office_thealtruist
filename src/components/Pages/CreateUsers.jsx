import React from 'react'
import { useTable } from 'react-table';

function CreateUsers() {

    const handleReset = () => {

    }

    const data = React.useMemo(() => [
        {
            userName: 'john_doe',
            role: 'Admin',
            locationId: 'LOC001',
            dateTime: '2025-04-25 10:00',
            employeeName: 'John Doe',
            isActive: true,
            roleId: 1,
        },
        {
            userName: 'jane_smith',
            role: 'User',
            locationId: 'LOC002',
            dateTime: '2025-04-24 14:30',
            employeeName: 'Jane Smith',
            isActive: false,
            roleId: 2,
        },
    ], []);

    const columns = React.useMemo(() => [
        { Header: 'User Name', accessor: 'userName' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Location ID', accessor: 'locationId' },
        { Header: 'Date/Time', accessor: 'dateTime' },
        { Header: 'Employee Name', accessor: 'employeeName' },
        { Header: 'Is Active', accessor: row => (row.isActive ? 'Yes' : 'No'), id: 'isActive' },
        { Header: 'Role ID', accessor: 'roleId' },
    ], []);

    const tableInstance = useTable({ columns, data });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <main id="main" className="main">
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Create User</h5>
                                    <form className="row g-3">
                                        <div className="col-md-6">
                                            <label for="inputEmail5" className="form-label">User Name</label>
                                            <input type="email" className="form-control" id="inputEmail5" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputPassword5" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="inputPassword5" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputPassword5" className="form-label">Employee Name</label>
                                            <input type="password" className="form-control" id="inputPassword5" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputState" className="form-label">Location</label>
                                            <select id="inputState" className="form-select">
                                                <option selected>Choose...</option>
                                                <option>...</option>
                                                <option>...</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                        <div className="col text-center">
                                            <button type="submit" className="btn btn-primary me-3">Submit</button>
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Created Users List</h5>
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
                                                {rows.map(row => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr {...row.getRowProps()}>
                                                            {row.cells.map(cell => (
                                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                            ))}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default CreateUsers